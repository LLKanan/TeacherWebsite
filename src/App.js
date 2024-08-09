import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AccessTokenProvider, TokenRefresher } from './components/js/main.js';
import Signup from './pages/signup';
import Login from './pages/login';
import Verify from './pages/verify';
import Teachers from './pages/teachers.jsx';
import AddStudent from './pages/addStudent';
import DeleteStudent from './pages/deleteStudent';

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
        <Route path="/teachers" element={<Teachers />}>
          <Route path="addStudent" element={<AddStudent />} />
          <Route path="deleteStudent" element={<DeleteStudent />} />
        </Route>
        <Route path="*" element={
          isLoggedIn ? <Navigate replace to="/teachers" /> : <Navigate replace to="/login" />
        } />
      </Routes>
      </BrowserRouter>
    </AccessTokenProvider>
    </div>
  );
}

export default App;
