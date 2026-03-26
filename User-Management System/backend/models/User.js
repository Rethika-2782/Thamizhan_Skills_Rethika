// Import dependencies
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define User schema
const userSchema = new mongoose.Schema({
  // Name field - required string
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters']
  },
  
  // Email field - required, unique, and must be valid email format
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },
  
  // Password field - required, will be hashed before saving
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false // Don't include password by default when fetching user
  },
  
  // Created at timestamp - automatically set when user is created
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware: Hash password before saving user
// This runs before save() is called
userSchema.pre('save', async function(next) {
  // Only hash password if it has been modified
  if (!this.isModified('password')) {
    next();
    return;
  }

  try {
    // Generate salt for hashing
    const salt = await bcrypt.genSalt(10);
    
    // Hash the password with salt
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password during login
// Returns true if password matches, false otherwise
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create and export User model
module.exports = mongoose.model('User', userSchema);
