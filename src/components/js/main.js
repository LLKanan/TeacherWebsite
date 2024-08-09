import React, { createContext, useContext, useState, useEffect } from 'react';

const AccessTokenContext = createContext();

export function AccessTokenProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    } else {
      localStorage.removeItem('accessToken');
    }
  }, [accessToken]);
    
  return (
    <AccessTokenContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AccessTokenContext.Provider>
  );
}

export function useAccessToken() {
  return useContext(AccessTokenContext);
}

export const TokenRefresher = ({ isLoggedIn }) => {
  const { setAccessToken } = useAccessToken();
  const refreshToken = async () => {
    const refreshToken = sessionStorage.getItem('refreshToken');
    const username = sessionStorage.getItem('username');

    const response = await fetch('https://2a2tyby9f2.execute-api.ap-southeast-2.amazonaws.com/Test/refreshToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ refreshToken, username })
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setAccessToken(data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      console.log('Access token refreshed:', data.accessToken);
    } else {
      const error = await response.json();
      console.error('Error refreshing token:', error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      const interval = setInterval(() => {
        refreshToken();
      }, 3600000); // 1 hour in milliseconds

      return () => clearInterval(interval); 
    }
  }, [isLoggedIn]);

  return null; 
};


export function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,7}$/;
  return regex.test(email.toLowerCase());
}

export function validatePassword(password) {
  // Check if the password contains at least:
  // 1. One number
  // 2. One special character (from the provided list)
  // 3. One uppercase letter
  // 4. One lowercase letter

  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\-\\/]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);

  return hasNumber && hasSpecialChar && hasUppercase && hasLowercase;
}

