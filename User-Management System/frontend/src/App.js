// Import React and dependencies
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import components
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

// Import global styles
import './App.css';

// Main App component
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Home page - public route */}
          <Route path="/" element={<Home />} />

          {/* Register page - public route */}
          <Route path="/register" element={<Register />} />

          {/* Login page - public route */}
          <Route path="/login" element={<Login />} />

          {/* Dashboard page - protected route (requires authentication) */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Fallback route - redirect to home for undefined routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
