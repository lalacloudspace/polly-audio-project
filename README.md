# Polly Text-to-Speech Lambda Project

## Overview

This project leverages AWS Lambda and AWS Polly to convert text into speech and store the resulting audio file in an S3 bucket. The text-to-speech conversion is triggered through a Lambda function that processes input text and outputs an MP3 file in an S3 bucket.

## Project Structure

- **index.js**: Contains the main Lambda function code that converts text to speech using AWS Polly and uploads the result to an S3 bucket.
- **input.json**: A sample JSON file that holds the input text to be converted into speech. This file is used for testing the Lambda function in AWS.
- **README.md**: This file, which provides an overview and instructions for the project.

## Prerequisites

1. **Node.js**: This project is built using Node.js 20.x. Ensure you have Node.js installed on your local machine.
2. **AWS SDK**: Make sure the AWS SDK is available in your Lambda function environment. If testing locally, install it using `npm install aws-sdk`.

## How to Use

### Setting up the Lambda function:

1. Create a new Lambda function in AWS Console.
2. Upload `index.js` as your function code.
3. Create a new S3 bucket or use an existing one to store the MP3 files.

### Testing the function:

1. Create a new test event in AWS Lambda.
2. Use the `input.json` file to specify the text you want to convert into audio.
3. Run the test, and the resulting MP3 file will be stored in the specified S3 bucket.

