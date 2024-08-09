import { DynamoDBClient, DeleteItemCommand } from '@aws-sdk/client-dynamodb';

 

const client = new DynamoDBClient({region:'ap-southeast-2'});

 

export const handler = async (event) => {

  const studentID = event.studentID;

 

  const params = {

    TableName: 'Students',

    Key: {

      StudentID: {S: studentID}

    }

  };

  console.log(params);

 

  try{

    const command = new DeleteItemCommand(params);

    await client.send(command);

    return{

      statusCode:200,

      body: JSON.stringify({message: 'Student deleted successfully'})

    };

  } catch (error) {

    console.error('Error deleting student:',error);

    return{

      statusCode: 500,

      body: JSON.stringify({message: "Failed to delete student", error: error.message})

    };

  }

};
