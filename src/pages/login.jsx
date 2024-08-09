import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import '../components/css/main.css'
import { validateEmail, validatePassword, useAccessToken } from '../components/js/main';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAccessToken } = useAccessToken();

  let [emailError,setEmailError] = useState('');
  let [passwordError,setPasswordError] = useState('');
  let [serverError,setServerError] = useState('');

  const apiEndpoint = 'https://2a2tyby9f2.execute-api.ap-southeast-2.amazonaws.com/Test/login';

  const navigate = useNavigate();

  const HandleSubmit = async(e) => {
    e.preventDefault();
    //Validate email and password locally
    let localValidation = true;
    if (validateEmail(email) === false){
      setEmailError('Error: Email is invalid');
      localValidation = false;
    }
    else{
      setEmailError('');
    }

    //Check passwords valid
    if(validatePassword(password) !== true){
      setPasswordError('Error: Password is not valid');
      localValidation=false;
    }
    else{
      setPasswordError('');

    }
    if (localValidation === false){
      return
    }
    //Send Payload to API Gateway
    const payload = {
      username: email,
      password: password
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
        if (JSON.parse(data.body).error){
          setServerError(JSON.parse(data.body).error);
        }
        else{
          const accessToken = JSON.parse(data.body).auth.AccessToken;
          const refreshToken = JSON.parse(data.body).auth.refreshToken;
          console.log('Access Token from Login.jsx:' + accessToken);
          setAccessToken(accessToken);
          sessionStorage.setItem('accessToken', accessToken);
          sessionStorage.setItem('refreshToken', refreshToken);
          sessionStorage.setItem('username',email);
          navigate('/teacher');
        }
        
    } else {
        console.error('API call failed');
        console.log('Response status:', response.status);
    }
    } catch (error) {
    console.error('An error occurred:', error);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Login</div>
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
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
        </div>
      <span id='passwordError' className='error'>{passwordError}</span>
      </div>
      <span id='serverError' className='serverError'>{serverError}</span>
      <div className="subheader">
        New User? <Link to="/signup">Click Here!</Link>
      </div>
      <div className="submit-container">
        <button onClick={HandleSubmit} className="submit">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;