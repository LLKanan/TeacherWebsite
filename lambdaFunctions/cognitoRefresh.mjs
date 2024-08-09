import {CognitoIdentityProviderClient, InitiateAuthCommand } from '@aws-sdk/client-cognito-identity-provider';

import crypto from 'crypto';

const client = new CognitoIdentityProviderClient({region:'ap-southeast-2'})

 

export const handler = async (event) => {

 

  const { refreshToken, username} = {event};

  const clientId = process.env.clientID;

  const clientSecret = process.env.clientSecret;

  

  const secretHash = crypto.createHmac('sha256',clientSecret).update(username + clientId).digest('base64')

 

  const params = {

    AuthFlow: 'REFRESH_TOKEN_AUTH',

    ClientId: clientId,

    AuthParameters:{

      'REFRESH_TOKEN' : refreshToken,

      'SECRET_HASH': secretHash

    }

  };

 

  try{

    const command = new InitiateAuthCommand(params);

    const response = await client.send(command);

    return{

      statusCode:200,

      body:JSON.stringify({

        accessToken:response.AuthenticationResult.AccessToken,

        refreshToken:response.AuthenticationResult.RefreshToken,

        idToken:response.AuthenticationResult.IdToken

      })

    };

  }catch(error){

    return{

      statusCode: 400,

      body:JSON.stringify({error:error.message})

    }

  }

};
