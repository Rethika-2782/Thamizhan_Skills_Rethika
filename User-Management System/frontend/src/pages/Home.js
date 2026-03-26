// Import React and dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css';

// Home component - landing page
const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        {/* Welcome section */}
        <h1>User Management System</h1>
        <p className="home-subtitle">
          A simple and secure way to manage your account
        </p>

        {/* Features list */}
        <div className="features">
          <h2>Features</h2>
          <ul>
            <li>✓ Secure user registration</li>
            <li>✓ Password encryption with bcrypt</li>
            <li>✓ JWT authentication</li>
            <li>✓ User profile management</li>
            <li>✓ Secure logout</li>
          </ul>
        </div>

        {/* Call to action buttons */}
        <div className="cta-buttons">
          <Link to="/register" className="cta-button register-btn">
            Create Account
          </Link>
          <Link to="/login" className="cta-button login-btn">
            Login
          </Link>
        </div>

        {/* Information section */}
        <div className="home-info">
          <p>
            This is a beginner-friendly MERN (MongoDB, Express, React, Node.js) 
            application demonstrating user authentication and profile management.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
