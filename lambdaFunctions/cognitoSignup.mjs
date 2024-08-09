import { CognitoIdentityProviderClient, SignUpCommand } from '@aws-sdk/client-cognito-identity-provider';

import crypto from 'crypto';

 

const client = new CognitoIdentityProviderClient({region:'ap-southeast-2'});

 

export const handler = async (event) => {

  const {firstName, lastName, email, password} = event;

  const clientSecret = process.env.clientSecret;

  const clientID =  process.env.clientID;

  const secretHash = crypto.createHmac('sha256',clientSecret).update(email + clientID).digest('base64');

 

  const params = {

    ClientId: clientID,

    SecretHash:secretHash,

    Username: email,

    Password: password,

    UserAttributes: [

      {Name: 'email',Value: email},

      {Name: 'given_name', Value: firstName},

      {Name: 'family_name', Value: lastName}

      ]

  };

  console.log(params)

  

  try{

    const command = new SignUpCommand(params);

    const response = await client.send(command);

    return{

      statusCode: 200,

      body: JSON.stringify({message: 'User signed up successfully!',response})

    };

  } catch(error){

    return{

      statusCode: 500,

      body:JSON.stringify({message: 'Error signing up user',error: error.message})

    };

  }

};
