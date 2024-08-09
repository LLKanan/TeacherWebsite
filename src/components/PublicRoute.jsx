import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ isLoggedIn, children }) => {
  console.log('PublicRoute invoked, isLoggedIn:', isLoggedIn);
  return !isLoggedIn ? children : <Navigate replace to="/teachers" />;
};

export default PublicRoute;
