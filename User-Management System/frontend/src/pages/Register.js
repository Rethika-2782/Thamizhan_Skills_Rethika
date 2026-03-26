// Import React hooks and dependencies
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser, saveToken } from '../services/api';
import '../styles/form.css';

// Register component for user registration
const Register = () => {
  // State for form input fields
  const [formData, setFormData] = useState({
    name: '',
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
      if (!formData.name || !formData.email || !formData.password) {
        setError('Please fill all fields');
        setLoading(false);
        return;
      }

      // Check if password is at least 6 characters
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        setLoading(false);
        return;
      }

      // Call registration API
      const response = await registerUser(formData);

      if (response.success) {
        // Save token to localStorage
        saveToken(response.token);
        
        // Show success message and redirect to dashboard
        alert('Registration successful! Welcome ' + response.user.name);
        navigate('/dashboard');
      } else {
        // Show error message from server
        setError(response.message || 'Registration failed');
      }
    } catch (err) {
      setError('Something went wrong. Please try again');
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <h1>Create Account</h1>
        <p className="form-subtitle">Sign up to get started</p>

        {/* Display error message if any */}
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Name input field */}
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              required
            />
          </div>

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
              placeholder="Enter password (min 6 characters)"
              required
            />
          </div>

          {/* Submit button */}
          <button 
            type="submit" 
            className="submit-button"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Sign Up'}
          </button>
        </form>

        {/* Link to login page */}
        <p className="form-footer">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
