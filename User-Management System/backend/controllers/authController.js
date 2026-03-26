// Import dependencies
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Helper function to generate JWT token
// This token will be sent to frontend and used for authenticated requests
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId }, // Payload (data to encode)
    process.env.JWT_SECRET, // Secret key for signing
    { expiresIn: '7d' } // Token expires in 7 days
  );
};

// Controller: Register new user
// POST /api/auth/register
exports.register = async (req, res) => {
  try {
    // Get user input from request body
    const { name, email, password } = req.body;

    // Validate input - check if all fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password'
      });
    }

    // Validate email format
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email'
      });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters'
      });
    }

    // Check if user already exists with this email
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email already registered. Please login instead'
      });
    }

    // Create new user
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase(),
      password: password
    });

    // Generate JWT token for the new user
    const token = generateToken(user._id);

    // Return success response with token
    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    // Handle any errors during registration
    console.error('Register error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Error during registration. Please try again'
    });
  }
};

// Controller: Login user
// POST /api/auth/login
exports.login = async (req, res) => {
  try {
    // Get email and password from request body
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Find user by email
    // Note: We use .select('+password') because password is not selected by default in schema
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

    // Check if user exists
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check if password matches using the matchPassword method from User model
    const isPasswordCorrect = await user.matchPassword(password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate JWT token for the user
    const token = generateToken(user._id);

    // Return success response with token
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    // Handle any errors during login
    console.error('Login error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Error during login. Please try again'
    });
  }
};

// Controller: Get user profile
// GET /api/auth/profile
// This is a protected route - requires valid JWT token
exports.profile = async (req, res) => {
  try {
    // Get user ID from JWT token (added by protect middleware)
    const userId = req.user.id;

    // Find user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Return user profile
    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
      }
    });

  } catch (error) {
    // Handle any errors while fetching profile
    console.error('Profile error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Error fetching profile'
    });
  }
};
