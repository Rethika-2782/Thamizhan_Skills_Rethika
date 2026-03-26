// Import jwt
const jwt = require('jsonwebtoken');

// Middleware: Protect routes by verifying JWT token
// This middleware checks if user has a valid JWT token
// If valid, it extracts user info and adds it to req.user
exports.protect = async (req, res, next) => {
  try {
    // Get token from Authorization header
    // Expected format: "Bearer <token>"
    const token = req.headers.authorization?.split(' ')[1];

    // Check if token is provided
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided. Please login first'
      });
    }

    // Verify token using the secret key
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        // Token is invalid or expired
        return res.status(401).json({
          success: false,
          message: 'Invalid or expired token'
        });
      }

      // Token is valid - add user info to request object
      // This makes user info available to the next middleware/controller
      req.user = {
        id: decoded.id
      };

      // Continue to next middleware/controller
      next();
    });

  } catch (error) {
    console.error('Protection middleware error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Error verifying token'
    });
  }
};
