import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import '../components/css/main.css';
import { validateEmail, validatePassword } from '../components/js/main';

const Signup = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [email, setEmail] = useState('');

  let [firstNameError,setFirstNameError] = useState('');
  let [lastNameError,setLastNameError] = useState('');
  let [emailError,setEmailError] = useState('');
  let [passwordError,setPasswordError] = useState('');
  let [serverError,setServerError] = useState('');
  
  const apiEndpoint = 'https://2a2tyby9f2.execute-api.ap-southeast-2.amazonaws.com/Test/register';

  const handleSubmit = async(e) => {
    e.preventDefault();
    //Validate email and password locally
    let localValidation = true;
    if (firstName == ''){
      localValidation = false;
      setFirstNameError('Error: Empty First Name');
    }
    else{
      setFirstNameError('');
    }
    if (lastName == ''){
      localValidation = false;
      setLastNameError('Error: Empty Last Name');
    }
    else{
      setLastNameError('');
    }

    if (validateEmail(email) === false){
      setEmailError('Error: Email is invalid');
      localValidation = false;
    }
    else{
      setEmailError('');
    }
    //Check passwords valid
    if (password !== password2){
      setPasswordError('Error: Passwords do not match');
      localValidation = false;
    }
    else if(validatePassword(password) !== true){
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
      firstName: firstName,
      lastName: lastName,
      email: email,
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
        const data = await response.json(); // Extract the response data
        console.log('Response data:', data);
        const parsedBody = JSON.parse(data.body);
        if (parsedBody.error){
          setServerError(parsedBody.error);
        }
        else{
          window.location.href = '/verify';
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
        <div className='text'>Sign Up</div>
        <div className='underline'></div>
      </div>
      <div className='inputs'>
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
        <span id='lastNameError' className='error'>{lastNameError}</span>
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
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <span className='error'></span>
        <div className='input'>
          <input
            type="password"
            placeholder="Confirm Password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>
        <span id='passwordError' className='error'>{passwordError}</span>
      <span id='serverError' className='serverError'>{serverError}</span>
      </div>
      <div className='subheader'>Returning User? <Link to='/login'>Click Here!</Link></div>
      <div className='submit-container'>
      <button onClick={handleSubmit} className='submit'>Sign Up</button>
      </div>
    </div>
  )
}

export default Signup