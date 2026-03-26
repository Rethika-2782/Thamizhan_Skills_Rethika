// Import Axios
import axios from 'axios';

// Create Axios instance with base URL
// This will automatically prepend the base URL to all requests
const API = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Add JWT token to all requests if it exists
// This middleware runs before every request
API.interceptors.request.use((config) => {
  // Get token from localStorage
  const token = localStorage.getItem('token');
  
  // If token exists, add it to Authorization header
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

// ==================== Authentication APIs ====================

// Register new user
// Expected body: { name, email, password }
export const registerUser = async (userData) => {
  try {
    const response = await API.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    // Return error message from server or generic error message
    return error.response?.data || { success: false, message: 'Registration failed' };
  }
};

// Login user
// Expected body: { email, password }
export const loginUser = async (userData) => {
  try {
    const response = await API.post('/auth/login', userData);
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: 'Login failed' };
  }
};

// Get user profile
// Requires valid JWT token in localStorage
export const getUserProfile = async () => {
  try {
    const response = await API.get('/auth/profile');
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: 'Failed to fetch profile' };
  }
};

// Helper function: Save token to localStorage
export const saveToken = (token) => {
  localStorage.setItem('token', token);
};

// Helper function: Get token from localStorage
export const getToken = () => {
  return localStorage.getItem('token');
};

// Helper function: Remove token from localStorage (logout)
export const removeToken = () => {
  localStorage.removeItem('token');
};

// Helper function: Check if user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};
