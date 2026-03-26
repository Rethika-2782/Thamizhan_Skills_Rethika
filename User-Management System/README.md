# User Management System - MERN Stack Application

A beginner-friendly full-stack application built with MongoDB, Express.js, React.js, and Node.js for user authentication and profile management.

## 🚀 Features

- ✅ User Registration with validation
- ✅ Secure Login with JWT authentication
- ✅ Password encryption using bcrypt
- ✅ User Profile page (protected route)
- ✅ Responsive modern UI
- ✅ REST API structure
- ✅ Input validation and error handling
- ✅ Token-based authentication

## 📋 Project Structure

```
User-Management System/
├── backend/
│   ├── models/
│   │   └── User.js                 # MongoDB User schema
│   ├── controllers/
│   │   └── authController.js       # Register, Login, Profile logic
│   ├── routes/
│   │   └── authRoutes.js           # API endpoints
│   ├── middleware/
│   │   └── protect.js              # JWT verification middleware
│   ├── server.js                   # Express server setup
│   ├── package.json                # Backend dependencies
│   └── .env.example                # Environment variables template
│
└── frontend/
    ├── public/
    │   └── index.html              # HTML entry point
    ├── src/
    │   ├── pages/
    │   │   ├── Home.js             # Landing page
    │   │   ├── Register.js         # Registration form
    │   │   ├── Login.js            # Login form
    │   │   └── Dashboard.js        # User profile (protected)
    │   ├── components/
    │   │   └── ProtectedRoute.js   # Route protection component
    │   ├── services/
    │   │   └── api.js              # Axios API calls
    │   ├── styles/
    │   │   ├── form.css            # Form styling
    │   │   ├── dashboard.css       # Dashboard styling
    │   │   ├── home.css            # Home page styling
    │   ├── App.js                  # Main app routing
    │   ├── App.css                 # Global styles
    │   └── index.js                # React entry point
    ├── package.json                # Frontend dependencies
    └── .gitignore
```

## 🛠️ Tech Stack

**Backend:**
- Node.js - JavaScript runtime
- Express.js - Web framework
- MongoDB - NoSQL database
- Mongoose - MongoDB ODM
- bcryptjs - Password hashing
- jsonwebtoken - JWT authentication
- CORS - Cross-origin requests

**Frontend:**
- React.js - UI library
- React Router - Navigation
- Axios - HTTP client
- CSS3 - Styling

## 📦 Prerequisites

Before starting, ensure you have installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - Either local installation or MongoDB Atlas (cloud)
- **npm** (comes with Node.js)

## ⚙️ Setup Instructions

### Step 1: Clone or Extract the Project

Extract the project folder to your desired location.

### Step 2: Setup Backend

1. **Navigate to backend folder:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create .env file:**
   - Copy `.env.example` to `.env`
   - Fill in your environment variables:
     ```
     PORT=5000
     MONGODB_URI=mongodb://localhost:27017/user_management
     JWT_SECRET=your-super-secret-jwt-key-12345
     ```

4. **MongoDB Setup Options:**

   **Option A: Local MongoDB (Recommended for beginners)**
   - Install MongoDB locally from [mongodb.com](https://www.mongodb.com/try/download/community)
   - Start MongoDB service
   - Use `mongodb://localhost:27017/user_management` as MONGODB_URI

   **Option B: MongoDB Atlas (Cloud)**
   - Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free cluster
   - Get connection string
   - Use it in .env: `MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/user_management`

5. **Start backend server:**
   ```bash
   npm start
   ```
   Server will run on http://localhost:5000

   **Tip:** Use `npm run dev` for development with auto-restart on code changes

### Step 3: Setup Frontend

1. **In a new terminal, navigate to frontend folder:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start React development server:**
   ```bash
   npm start
   ```
   Application will open at http://localhost:3000

## 🎯 How to Use

1. **Open in Browser:** http://localhost:3000

2. **Register New Account:**
   - Click "Create Account" on home page
   - Fill in name, email, and password (min 6 characters)
   - Click "Sign Up"

3. **Login:**
   - Click "Login" or use registered email
   - Enter credentials
   - Click "Login" button

4. **View Profile:**
   - After successful login, you'll see your dashboard
   - View your profile information
   - Click "Logout" to exit

## 📝 API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /api/auth/register | Register new user | No |
| POST | /api/auth/login | Login user | No |
| GET | /api/auth/profile | Get user profile | Yes (JWT) |

### Request/Response Examples

**Register:**
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Login:**
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Get Profile:**
```bash
GET /api/auth/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...

Response:
{
  "success": true,
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

## 🔒 Security Features

1. **Password Hashing:** Passwords are hashed with bcrypt before storing
2. **JWT Token:** Secure token-based authentication
3. **Protected Routes:** Dashboard is only accessible with valid token
4. **Input Validation:** All inputs are validated on both frontend and backend
5. **CORS:** Cross-origin requests are controlled

## 🐛 Troubleshooting

### Issue: "Cannot GET /" 
- Make sure backend server is running on port 5000
- Check if node_modules is installed in backend folder

### Issue: "MongoDB connection failed"
- Check if MongoDB is running
- Verify MONGODB_URI in .env file
- For Atlas, ensure IP whitelist includes your IP

### Issue: "Port already in use"
- Change PORT in .env file for backend
- Or kill the process using the port

### Issue: CORS errors
- Backend is already configured with CORS
- Ensure frontend proxy is set to http://localhost:5000 in package.json

### Issue: Token not working
- Clear browser localStorage and login again
- Check if JWT_SECRET is set in .env
- Ensure token is sent in Authorization header as "Bearer {token}"

## 📚 Learning Resources

- **MongoDB:** [https://docs.mongodb.com/](https://docs.mongodb.com/)
- **Express.js:** [https://expressjs.com/](https://expressjs.com/)
- **React.js:** [https://react.dev/](https://react.dev/)
- **JWT:** [https://jwt.io/](https://jwt.io/)
- **Bcrypt:** [https://github.com/dcodeIO/bcrypt.js](https://github.com/dcodeIO/bcrypt.js)

## 📝 Code Comments

The code includes detailed comments explaining:
- What each function does
- How authentication flows
- Database operations
- Frontend components logic
- API integration

This makes it perfect for beginners to understand the entire workflow.

## 🎓 Key Concepts Learned

1. **Backend Development:**
   - Setting up Express server
   - MongoDB database operations
   - Password hashing with bcrypt
   - JWT token generation and verification
   - Middleware for request handling
   - REST API design

2. **Frontend Development:**
   - React components and hooks
   - React Router for navigation
   - State management with useState
   - API integration with Axios
   - Protected routes
   - Local storage for token management

3. **Full Stack Integration:**
   - Client-server communication
   - Token-based authentication
   - CORS handling
   - Error handling across layers

## 📄 License

This project is created for educational purposes.

## 🤝 Support

If you encounter any issues:
1. Check the Troubleshooting section
2. Review comments in the code
3. Verify all dependencies are installed
4. Ensure MongoDB is running
5. Check browser console for errors (F12)

---

**Happy Learning! 🚀**

This is a beginner-friendly project perfect for learning MERN stack development.
