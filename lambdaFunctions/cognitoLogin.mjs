import { CognitoIdentityProviderClient, InitiateAuthCommand } from "@aws-sdk/client-cognito-identity-provider";

import crypto from 'crypto';

 

// Initialize the Cognito client

const client = new CognitoIdentityProviderClient({});

 

// Calculate the secret hash

const calculateSecretHash = (clientSecret, username) => {

    const data = `${username}${process.env.clientID}`;

    const hmac = crypto.createHmac("sha256", clientSecret);

    hmac.update(data);

    return hmac.digest("base64");

};

 

// Lambda function to authenticate using environment variables

export const handler = async (event) => {

    const { username, password } = event;

 

    const clientId = process.env.clientID;

    const clientSecret = process.env.clientSecret;

 

    const secretHash = calculateSecretHash(clientSecret, username);

 

    const authParams = {

        AuthFlow: "USER_PASSWORD_AUTH",

        ClientId: clientId,

        AuthParameters: {

            USERNAME: username,

            PASSWORD: password,

            SECRET_HASH: secretHash,

        },

    };

 

    try {

        const response = await client.send(new InitiateAuthCommand(authParams));

        console.log("Authentication successful:", response.AuthenticationResult);

        return {

            statusCode: 200,

            body: JSON.stringify({message: 'Authentication Succesful', auth: response.AuthenticationResult})

        };

    } catch (error) {

        return{

            statusCode: 500,

            body:JSON.stringify({message: 'Error logging in user',error: error.message})

        }

    }

};
