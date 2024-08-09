import React, {useState} from 'react'
import '../components/css/main.css';

const RemoveStudent = () => {

  const [studentID, setStudentID] = useState('');

  let [studentIDError,setStudentIDError] = useState('');
  let [serverError,setServerError] = useState('');
  
  const apiEndpoint = 'https://2a2tyby9f2.execute-api.ap-southeast-2.amazonaws.com/Test/DDB/deleteStudent';

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (studentID == ''){
      setStudentIDError('Error: Empty Student ID');
      return
    }
    else{
      setStudentIDError('');
    }
    //Send Payload to API Gateway
    const payload = {
      studentID: studentID
    }

    try {
      const response = await fetch(apiEndpoint, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
      });

      if (response.ok) {
        console.log('API call successful');
        const data = await response.json(); // Extract the response data
        console.log('Response data:', data);
        const parsedBody = JSON.parse(data.body);
        if (parsedBody.error){
          setServerError(parsedBody.error);
        }
        else{
          const msg = 'Successfully deleted ' + studentID;
          setServerError(msg);
        }
    } else {
        console.error('API call failed');
        console.log('Response status:', response.status);
        setServerError(response.status)
    }
    } catch (error) {
    console.error('An error occurred:', error);
    }
  };


  return(
    <div className='container'>
      <div className='header'>
        <div className='text'>Delete Student</div>
      </div>
      <div className='inputs'>
        <div className='input'>
            <input
              type="text"
              placeholder="Student ID"
              value={studentID}
              onChange={(e) => setStudentID(e.target.value)}
            />
        </div>
        <span id='studentIDError' className='error'>{studentIDError}</span>
      </div>
      <span id='serverError' className='serverError'>{serverError}</span>
      <div className='submit-container'>
      <button onClick={handleSubmit} className='submit'>Delete Student</button>
      </div>
    </div>
  )
}

export default RemoveStudent