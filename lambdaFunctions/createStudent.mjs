import { DynamoDBClient,PutItemCommand } from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient({});

 

const validateEmail = (email) => {

  return String(email)

    .toLowerCase()

    .match(

      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    );

};

 

export const handler = async (event, context) => {

  const { studentID, firstName, lastName, DOB, email} = event;

  let item = {};

 

  if (studentID){

    item.StudentID = {S: studentID};

  }

  else{

    let response = {

      statusCode: '400',

      body: JSON.stringify({ error: 'Missing Student ID'}),

      headers: {

        'Content-Type': 'application/json'

      }

    };

    return response;

  }

 

  if (email){

    if (validateEmail(email)) item.Email = { S: email};

  }

  if (firstName) item.FirstName = { S: firstName};

  if (lastName) item.LastName = { S: lastName};

  if (DOB){

    if (!isNaN(Date.parse(DOB))){

      const currentDate = new Date();

      const dobDate = new Date(DOB);

 

      if (dobDate < currentDate){

        item.DOB = {S: DOB};

      }

      else{

        console.log("DOB is after today");

      }

    }

    else{

      console.log("Invalid Date ignoring date")

    }

  }

 

  const params = {

    TableName: 'Students',

    Item: item

  };

 

  console.log(params);

 

  try{

    const command = new PutItemCommand(params);

    const result = await client.send(command);

    console.log('Put Item succeeded:', result);

    const response = {

      statusCode: 200,

      body: JSON.stringify({message:'Successfully input student'}),

    };

    return response;

  } catch(error){

    console.error('Error:',error);

  }

 

};
