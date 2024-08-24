import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem('token'); // Check if the token exists in localStorage
  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/Login" />;
};

export default ProtectedRoute;
