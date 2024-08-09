import {DynamoDBClient, ScanCommand} from '@aws-sdk/client-dynamodb';

 

const client = new DynamoDBClient({region: 'ap-southeast-2'});

 

export const handler = async (event, context) => {

 

  const params = {

    TableName: 'Students'

  };

 

  try{

    const command = new ScanCommand(params);

    const data = await client.send(command);

    return{

      statusCode:200,

      body: JSON.stringify(data.Items)

    };

  } catch (error) {

    console.error('Error scanning table:', error);

    return{

      statusCode: 500,

      body: JSON.stringify({message: 'Failed to retrieve students', error: error.message})

    };

  }

};
