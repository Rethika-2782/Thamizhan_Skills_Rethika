// Import dependencies
const express = require('express');
const { register, login, profile } = require('../controllers/authController');
const { protect } = require('../middleware/protect');

// Create router
const router = express.Router();

// Public routes
// POST /api/auth/register - Register new user
router.post('/register', register);

// POST /api/auth/login - Login user
router.post('/login', login);

// Protected routes (require valid JWT token)
// GET /api/auth/profile - Get logged-in user profile
router.get('/profile', protect, profile);

// Export router
module.exports = router;
