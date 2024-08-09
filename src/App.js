import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AccessTokenProvider, TokenRefresher } from './components/js/main.js';
import Signup from './pages/signup';
import Login from './pages/login';
import Verify from './pages/verify';

function App() {
  function isLoggedIn() {
    const token = sessionStorage.getItem('accessToken');
    return token !== null;
  }
  return (
    <div>
    <AccessTokenProvider>
      {isLoggedIn && <TokenRefresher isLoggedIn={isLoggedIn} />}
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to='/login' />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="verify" element={<Verify />} />
      </Routes>
      </BrowserRouter>
    </AccessTokenProvider>
    </div>
  );
}

export default App;
