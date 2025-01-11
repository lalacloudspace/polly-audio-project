const { PollyClient, SynthesizeSpeechCommand } = require('@aws-sdk/client-polly');
const { S3Client } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');

// Initialize clients
const polly = new PollyClient({ region: 'us-east-1' });
const s3 = new S3Client({ region: 'us-east-1' });

exports.handler = async (event) => {
    try {
        const text = event.text;

        if (!text || typeof text !== 'string') {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Text input must be a non-empty string.' }),
            };
        }

        const params = {
            Text: text,
            OutputFormat: 'mp3',
            VoiceId: 'Joanna',
        };

        const data = await polly.send(new SynthesizeSpeechCommand(params));

        const key = `audio-${Date.now()}.mp3`;

        const upload = new Upload({
            client: s3,
            params: {
                Bucket: 'polly-audio-files-storage-bucket',
                Key: key,
                Body: data.AudioStream,
                ContentType: 'audio/mpeg',
            },
        });

        await upload.done();

        return {
            statusCode: 200,
            body: JSON.stringify({ message: `Audio file successfully uploaded with key: ${key}` }),
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal server error', error: error.message }),
        };
    }
};
