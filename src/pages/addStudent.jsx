import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import '../components/css/main.css';
import { validateEmail, validatePassword } from '../components/js/main';

const AddStudent = () => {

  const [studentID, setStudentID] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setdob] = useState('');

  let [studentIDError,setStudentIDError] = useState('');
  let [firstNameError,setfirstNameError] = useState('');
  let [emailError,setEmailError] = useState('');
  let [dobError,setdobError] = useState('');
  let [serverError,setServerError] = useState('');
  
  const apiEndpoint = 'https://2a2tyby9f2.execute-api.ap-southeast-2.amazonaws.com/Test/DDB/createStudent';

  const handleSubmit = async(e) => {
    e.preventDefault();
    //Validate inputs
    let localValidation = true;
    if (studentID == ''){
      localValidation=false;
      setStudentIDError('Error: Empty Student ID');
    }
    else{
      setStudentIDError('');
    }
    if (firstName == ''){
      localValidation=false;
      setStudentIDError('Error: Empty First Name');
    }
    else{
      setStudentIDError('');
    }

    //Only check email if it isn't empty
    if(email != ''){
      if (validateEmail(email) === false){
        setEmailError('Error: Email is invalid');
        localValidation = false;
      }
      else{
        setEmailError('');
      }
    }

    if (localValidation === false){
      return
    }
    //Send Payload to API Gateway
    const payload = {
      studentID: studentID,
      firstName: firstName,
      lastName: lastName,
      email: email,
      DOB: dob
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
          const msg = 'Successfully added Student ID ' + studentID;
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
        <div className='text'>Add Student</div>
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
        <div className='input'>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <span id='firstNameError' className='error'>{firstNameError}</span>
        <div className='input'>
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <span className='error'></span>
        <div className='input'>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <span id='emailError' className='error'>{emailError}</span>
        <div className='input'>
          <input
            type="date"
            placeholder="Select Date of Birth"
            value={dob}
            onChange={(e) => setdob(e.target.value)}
          />
        </div>
        <span className='error'></span>
      <span id='serverError' className='serverError'>{serverError}</span>
      </div>
      <div className='submit-container'>
      <button onClick={handleSubmit} className='submit'>Add Student</button>
      </div>
    </div>
  )
}

export default AddStudent
