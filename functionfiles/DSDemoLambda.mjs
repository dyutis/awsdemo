import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });

const functionName = process.env.AWS_LAMBDA_FUNCTION_NAME;
let password;

function processEvent(event) {
}

export const handler = async (event) => {

    const kms = new AWS.KMS();
    try {
      password = process.env['FDDemoSec'];
      let req = {
        CiphertextBlob: Buffer.from(password, 'base64'),
        EncryptionContext: { LambdaFunctionName: functionName },
      };
      let data = await kms.decrypt(req).promise();
      password= data.Plaintext.toString('ascii');
    } catch (err) {
      console.log('Decrypt error:', err);
      throw err;
    }
  
  processEvent(event);
   const response = {
        FDDemoSecu: password
    };
    return response;
};