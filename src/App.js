import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AccessTokenProvider, TokenRefresher } from './components/js/main.js';
import Signup from './pages/signup';
import Login from './pages/login';
import Verify from './pages/verify';
import Teachers from './pages/teachers.jsx';
import AddStudent from './pages/addStudent';
import DeleteStudent from './pages/deleteStudent';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

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
        <Route path="login" element={
          <PublicRoute isLoggedIn={isLoggedIn}>
            <Login />
          </PublicRoute>
        } />
        <Route path="signup" element={
          <PublicRoute isLoggedIn={isLoggedIn}>
            <Signup />
          </PublicRoute>
        } />
        <Route path="verify" element={
          <PublicRoute isLoggedIn={isLoggedIn}>
            <Verify />
          </PublicRoute>
        } />
        <Route path="/teachers" element={
          <PrivateRoute isLoggedIn={isLoggedIn}>
            <Teachers />
          </PrivateRoute>
        }>
          <Route path="addStudent" element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <AddStudent />
            </PrivateRoute>
          } />
          <Route path="deleteStudent" element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <DeleteStudent />
            </PrivateRoute>
          } />
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
