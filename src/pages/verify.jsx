import React, {useState} from 'react'
import {Link} from 'react-router-dom';
import '../components/css/main.css'
import { validateEmail } from '../components/js/main';

const Verify = () => {
  const [email, setEmail] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');

  let [emailError,setEmailError] = useState('');
  let [confirmationError,setConfirmationError] = useState('A confirmation code has been sent to your email');

  const apiEndpoint = 'https://2a2tyby9f2.execute-api.ap-southeast-2.amazonaws.com/Test/verify';

  const handleSubmit = async(e) => {
    e.preventDefault();
    //Validate email and password locally
    if (validateEmail(email) === false){
      setEmailError('Error: Email is invalid');
      return
    }
    else{
      setEmailError('');
    }

    //Send Payload to API Gateway
    const payload = {
      username: email,
      confirmationCode: confirmationCode
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
        const data = await response.json(); 
        console.log('Response data:', data);
        const parsedBody = JSON.parse(data.body);
        if (parsedBody.error){
          setConfirmationError('Error: User confirmation failed');
        }
        else{
          window.location.href = '/login';
        }
    } else {
        console.error('API call failed');
        console.log('Response status:', response.status);
        setConfirmationError('Error: ',response.status);
    }
    } catch (error) {
    console.error('An error occurred:', error);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Verify</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <span id='emailError' className='error'>{emailError}</span>
        <div className="input">
          <input
            type="text"
            placeholder="Confirmation Code"
            value={confirmationCode}
            onChange={(e) => setConfirmationCode(e.target.value)}
          />
        </div>
        <span id='confirmationError' className='error'>{confirmationError}</span>
      </div>
      <div className="submit-container">
        <button onClick={handleSubmit} className="submit">
          Verify
        </button>
      </div>
    </div>
  );
};

export default Verify;