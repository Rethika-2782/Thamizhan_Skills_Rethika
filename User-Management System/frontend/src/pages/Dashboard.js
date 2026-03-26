// Import React hooks and dependencies
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile, removeToken } from '../services/api';
import '../styles/dashboard.css';

// Dashboard component - displays user profile after login
const Dashboard = () => {
  // State for storing user profile data
  const [user, setUser] = useState(null);
  
  // State for loading and error handling
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Hook to navigate to different pages
  const navigate = useNavigate();

  // useEffect: Fetch user profile when component mounts
  useEffect(() => {
    // Check if user is logged in (token exists)
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to login if no token
      navigate('/login');
      return;
    }

    // Fetch user profile
    const fetchProfile = async () => {
      try {
        const response = await getUserProfile();
        
        if (response.success) {
          setUser(response.user);
          setError('');
        } else {
          setError(response.message || 'Failed to fetch profile');
          // If profile fetch fails, redirect to login
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        }
      } catch (err) {
        setError('Error fetching profile');
        console.error('Profile error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  // Handle logout
  const handleLogout = () => {
    // Confirm logout
    if (window.confirm('Are you sure you want to logout?')) {
      // Remove token from localStorage
      removeToken();
      
      // Redirect to login page
      navigate('/login');
    }
  };

  // Show loading state while fetching profile
  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-wrapper">
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  // Show error message if profile fetch failed
  if (error) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-wrapper">
          <div className="error-message">{error}</div>
          <button onClick={() => navigate('/login')} className="button-primary">
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-wrapper">
        {/* Header section */}
        <div className="dashboard-header">
          <h1>Welcome, {user?.name}!</h1>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>

        {/* Profile card */}
        <div className="profile-card">
          <h2>Your Profile</h2>
          
          {/* User information display */}
          <div className="profile-info">
            <div className="info-group">
              <label>Full Name</label>
              <p>{user?.name}</p>
            </div>

            <div className="info-group">
              <label>Email Address</label>
              <p>{user?.email}</p>
            </div>

            <div className="info-group">
              <label>Member Since</label>
              <p>{new Date(user?.createdAt).toLocaleDateString()}</p>
            </div>

            <div className="info-group">
              <label>Account Status</label>
              <p className="status-active">✓ Active</p>
            </div>
          </div>
        </div>

        {/* Additional information */}
        <div className="dashboard-info">
          <p>Your account is secure and your password is encrypted.</p>
          <p>You can logout anytime by clicking the logout button above.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
