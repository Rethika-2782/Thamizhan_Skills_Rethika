# Backend - User Management System API

Node.js + Express.js + MongoDB API server for user authentication and profile management.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB running locally or MongoDB Atlas account

### Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create .env file:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/user_management
   JWT_SECRET=your-secret-key-here
   ```

3. **Start server:**
   ```bash
   npm start
   ```
   
   Or with auto-restart (development):
   ```bash
   npm run dev
   ```

Server will run on `http://localhost:5000`

## 📁 Project Structure

```
backend/
├── models/
│   └── User.js              # MongoDB User schema
├── controllers/
│   └── authController.js    # Authentication logic
├── routes/
│   └── authRoutes.js        # API endpoint definitions
├── middleware/
│   └── protect.js           # JWT verification middleware
├── server.js                # Express server setup
├── package.json             # Dependencies
└── .env.example             # Environment template
```

## 🔌 API Endpoints

### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Login User
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Get User Profile (Protected)
```
GET /api/auth/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

**Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

## 🗄️ Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  name: String,           // Required, min 2 characters
  email: String,          // Required, unique, valid email
  password: String,       // Required, hashed with bcrypt
  createdAt: Date         // Auto-generated timestamp
}
```

## 🔐 Security

- **Password Hashing**: Passwords hashed with bcrypt (10 salt rounds)
- **JWT Token**: Token expires in 7 days
- **Token Verification**: Protected routes verify JWT before access
- **Input Validation**: All inputs validated on backend
- **CORS**: Cross-origin requests allowed for frontend

## 📦 Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT generation and verification
- **cors**: Cross-origin requests
- **dotenv**: Environment variables

## 🛠️ Development

### Scripts
```bash
npm start          # Start server
npm run dev        # Start with auto-restart (nodemon)
```

### Middleware Explained

**protect.js** - JWT Verification Middleware
- Extracts token from Authorization header
- Verifies token signature and expiration
- Adds user ID to request object
- Returns 401 if token invalid/missing

### Controllers Explained

**authController.js** contains three main functions:

1. **register()** - Create new user
   - Validates input (name, email, password)
   - Checks email uniqueness
   - Hashes password before saving
   - Generates JWT token
   - Returns user data and token

2. **login()** - Authenticate user
   - Validates email and password
   - Finds user in database
   - Compares password with bcrypt
   - Generates JWT token
   - Returns user data and token

3. **profile()** - Get logged-in user info
   - Protected route (requires valid JWT)
   - Fetches user from database
   - Returns user profile information

## 🔧 Environment Variables

Create `.env` file with:

```env
# Server
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/user_management
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name

# Authentication
JWT_SECRET=your-secret-key-change-this-in-production
```

## ⚠️ Common Issues

### MongoDB Connection Failed
- Check if MongoDB is running (`mongod`)
- Verify MONGODB_URI in .env
- For Atlas: Check IP whitelist and credentials

### Port Already in Use
- Change PORT in .env
- Or kill process: `lsof -ti:5000 | xargs kill -9`

### Nodemon Not Working
- Install globally: `npm install -g nodemon`
- Or use: `npx nodemon server.js`

### JWT Token Errors
- Ensure JWT_SECRET is set in .env
- Check token format in Authorization header (Bearer {token})
- Tokens expire after 7 days - user needs to login again

## 📚 Learning Resources

- [Express.js Guide](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [JWT Introduction](https://jwt.io/introduction)
- [Bcryptjs Guide](https://github.com/dcodeIO/bcrypt.js)

## 🤝 Integration with Frontend

Frontend connects to this backend at `http://localhost:5000`

Frontend automatically:
- Stores JWT token in localStorage
- Sends token in Authorization header for protected routes
- Redirects to login if token is invalid/expired

---

Created for educational purposes 🎓
