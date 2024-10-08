import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ isLoggedIn, children }) => {
  console.log('PrivateRoute invoked, isLoggedIn:', isLoggedIn);
  return isLoggedIn ? children : <Navigate replace to="/login" />;
};

export default PrivateRoute;
