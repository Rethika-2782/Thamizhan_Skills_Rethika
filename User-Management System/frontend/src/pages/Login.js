// Import React hooks and dependencies
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser, saveToken } from '../services/api';
import '../styles/form.css';

// Login component for user authentication
const Login = () => {
  // State for form input fields
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // State for handling loading and error messages
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Hook to navigate to different pages
  const navigate = useNavigate();

  // Handle input change - update state as user types
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user starts typing
    setError('');
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Check if all fields are filled
      if (!formData.email || !formData.password) {
        setError('Please enter email and password');
        setLoading(false);
        return;
      }

      // Call login API
      const response = await loginUser(formData);

      if (response.success) {
        // Save token to localStorage
        saveToken(response.token);
        
        // Show success message and redirect to dashboard
        alert('Login successful! Welcome back, ' + response.user.name);
        navigate('/dashboard');
      } else {
        // Show error message from server
        setError(response.message || 'Login failed');
      }
    } catch (err) {
      setError('Something went wrong. Please try again');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <h1>Login</h1>
        <p className="form-subtitle">Sign in to your account</p>

        {/* Display error message if any */}
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Email input field */}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password input field */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit button */}
          <button 
            type="submit" 
            className="submit-button"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Link to registration page */}
        <p className="form-footer">
          Don't have an account? <Link to="/register">Sign up here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
