# 🚀 Quick Start Guide

## For First Time Users

This guide will help you get the User Management System running in less than 5 minutes!

## Prerequisites Check

Make sure you have installed:
- **Node.js** (check by running: `node -v`)
- **MongoDB** (either local or create free account on MongoDB Atlas)
- **npm** (comes with Node.js, check by running: `npm -v`)

## Step-by-Step Setup

### 1️⃣ Start MongoDB

**Option A:** Local MongoDB
```bash
# Open MongoDB in terminal/command prompt
mongod
```

**Option B:** MongoDB Atlas (Cloud)
- Create free account and cluster at https://mongodb.com/cloud/atlas
- Get your connection string from Atlas dashboard

### 2️⃣ Setup Backend (First Terminal)

```bash
# Go to backend folder
cd backend

# Install packages
npm install

# Create .env file (copy from .env.example)
# Windows:
copy .env.example .env
# Mac/Linux:
cp .env.example .env

# Edit .env file and set:
# - MONGODB_URI (your MongoDB connection)
# - JWT_SECRET (any random string)

# Start backend server
npm start
```

✅ You should see: "✓ Server running on http://localhost:5000"

### 3️⃣ Setup Frontend (Second Terminal)

```bash
# Go to frontend folder
cd frontend

# Install packages
npm install

# Start React app
npm start
```

✅ Browser will open at http://localhost:3000

## 🎯 Test the Application

1. **Go to Home Page:** http://localhost:3000
2. **Register:** Click "Create Account" → Fill form → Sign Up
3. **Login:** Click "Login" → Enter credentials → Login
4. **View Profile:** See your dashboard with profile info
5. **Logout:** Click "Logout" button

## ❓ Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| "Cannot connect to MongoDB" | Start mongod service or check MongoDB Atlas connection string |
| "Port 5000 already in use" | Change PORT in backend/.env |
| "Module not found" | Run `npm install` in that folder |
| "CORS error" | Make sure backend is running on port 5000 |

## 📚 File Structure (Key Files)

```
Backend API Calls:
├── /api/auth/register    → Create account
├── /api/auth/login       → Login user
└── /api/auth/profile     → Get user info (protected)

React Pages:
├── /                 → Home/Landing
├── /register         → Registration form
├── /login            → Login form
└── /dashboard        → Profile (after login)
```

## 🔐 How Authentication Works

1. **Register:** Create account → Password hashed → Token sent → Stored in browser
2. **Login:** Verify credentials → Token generated → Stored in browser
3. **Dashboard:** Token sent with request → Server verifies → Shows profile
4. **Logout:** Token removed from browser

## 📝 Important Notes

- **Passwords:** Never sent back after hashing - bcrypt ensures security
- **Token:** Stored in localStorage - sent with every API request
- **Protected Routes:** Dashboard checks for token before showing
- **Frontend Proxy:** package.json has proxy to backend for easy API calls

## 🎓 Next Steps to Learn More

1. Read the code comments - they explain everything!
2. Try modifying the styling in CSS files
3. Add new features (password reset, edit profile, etc.)
4. Deploy to Heroku/Vercel for practice

## 📞 Need Help?

1. Check the main README.md for detailed guide
2. Look at code comments in the files
3. Check browser console (F12) for errors
4. Check terminal for backend errors

---

**You're all set! Happy coding! 🎉**
