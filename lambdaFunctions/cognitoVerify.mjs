import { CognitoIdentityProviderClient, ConfirmSignUpCommand, AdminAddUserToGroupCommand} from "@aws-sdk/client-cognito-identity-provider";

import crypto from 'crypto';

 

// Initialize the Cognito client

const client = new CognitoIdentityProviderClient({ region: "ap-southeast-2" });

 

export const handler = async (event, context) => {

    try {

        // Retrieve environment variables

        const clientID = process.env.clientID;

        const clientSecret = process.env.clientSecret;

 

        // Extract user information from the event and generate secret Hash

        const { username, confirmationCode } = event;

        const secretHash = crypto.createHmac('sha256',clientSecret).update(username + clientID).digest('base64');

 

        // Confirm the user's sign-up

        const confirmParams = {

            ClientId: clientID,

            Username: username,

            ConfirmationCode: confirmationCode,

            SecretHash: secretHash

        };

       

        const confirmCommand = new ConfirmSignUpCommand(confirmParams);

        await client.send(confirmCommand);

 

        // Add user to group

        const groupParams = {

            GroupName: 'Teachers',

            UserPoolId: process.env.userPoolID,

            Username: username

        };

       

        

        try{

            await client.send(new AdminAddUserToGroupCommand(groupParams));

            console.log('User adder to group successfully');

        } catch(error){

            console.error('Error adding user to group:',error);

        }

       

        // Return successful status code

        return {

            statusCode: 200,

            body: JSON.stringify({ message: "User confirmed successfully!" }),

        };

    } catch (error) {

        console.error("Error confirming user:", error);

        return {

            statusCode: 500,

            body: JSON.stringify({ error: "User confirmation failed." }),

        };

    }

};
