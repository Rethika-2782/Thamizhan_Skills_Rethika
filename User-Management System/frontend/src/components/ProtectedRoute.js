// Import React and dependencies
import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../services/api';

// ProtectedRoute component - wraps routes that require authentication
// If user is not authenticated, redirects to login page
const ProtectedRoute = ({ children }) => {
  // Check if user has a valid token
  if (!isAuthenticated()) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  // Show the protected component if authenticated
  return children;
};

export default ProtectedRoute;
