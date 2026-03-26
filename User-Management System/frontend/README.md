# Frontend - User Management System React App

React.js application for user registration, login, and profile management.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- Backend API running on http://localhost:5000

### Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm start
   ```
   
   Application opens at `http://localhost:3000`

## 📁 Project Structure

```
frontend/
├── public/
│   └── index.html           # HTML entry point
├── src/
│   ├── pages/
│   │   ├── Home.js          # Landing page
│   │   ├── Register.js      # Registration form
│   │   ├── Login.js         # Login form
│   │   └── Dashboard.js     # User profile (protected)
│   ├── components/
│   │   └── ProtectedRoute.js    # Route guard component
│   ├── services/
│   │   └── api.js           # Axios API client
│   ├── styles/
│   │   ├── form.css         # Form styling
│   │   ├── dashboard.css    # Dashboard styling
│   │   ├── home.css         # Home page styling
│   ├── App.js               # Main routing
│   ├── App.css              # Global styles
│   └── index.js             # React entry point
└── package.json             # Dependencies & config
```

## 🧩 Components & Pages

### Home Page (`pages/Home.js`)
- Landing page with feature list
- Links to Register and Login
- Information about the application

### Register Page (`pages/Register.js`)
- User registration form
- Input validation (name, email, password)
- Creates account and auto-logs in user
- Redirects to Dashboard on success

### Login Page (`pages/Login.js`)
- Email and password form
- Validates credentials against backend
- Stores JWT token in localStorage
- Redirects to Dashboard on success

### Dashboard Page (`pages/Dashboard.js`)
- Protected route (requires authentication)
- Displays logged-in user's profile
- Shows: Name, Email, Member Since, Status
- Logout functionality
- Auto-redirects to Login if not authenticated

### ProtectedRoute Component (`components/ProtectedRoute.js`)
- Wraps routes that require authentication
- Checks for JWT token in localStorage
- Redirects to Login if no token found
- Allows access if token exists

## 🔌 API Integration (`services/api.js`)

Axios client for communicating with backend:

```javascript
// API Functions Available:
registerUser(userData)      // POST /api/auth/register
loginUser(userData)         // POST /api/auth/login
getUserProfile()            // GET /api/auth/profile

// Token Management:
saveToken(token)            // Store in localStorage
getToken()                  // Retrieve from localStorage
removeToken()               // Delete from localStorage
isAuthenticated()           // Check if token exists
```

### How API Works

1. **Request Interceptor**: Automatically adds JWT token to Authorization header
2. **Error Handling**: Returns server error or generic message
3. **Token Storage**: Tokens stored in browser's localStorage
4. **Auto-Login**: Token persists across page refreshes

## 🎨 Styling

### Color Scheme
- **Primary Gradient**: Purple (#667eea to #764ba2)
- **Success**: Green (#27ae60)
- **Error**: Red (#c33)
- **Text**: Dark gray (#333)

### CSS Files

**App.css** - Global styles
- Base element styles
- Button and link styling
- Responsive utilities

**form.css** - Form pages (Register/Login)
- Form container and wrapper
- Input field styling
- Button states (hover, disabled)
- Error message styling
- Responsive design for mobile

**dashboard.css** - Dashboard page
- Header with user greeting and logout
- Profile card with info display
- Card styling and shadows
- Grid layout for information
- Responsive mobile layout

**home.css** - Home page
- Feature list styling
- Call-to-action buttons (gradient)
- Information section
- Responsive mobile design

## 🔄 Application Flow

```
Home → Register/Login → Dashboard
  ↓                         ↓
  └─────→ Logout ←─────────┘
```

1. User visits Home page
2. Can Register (new account) or Login (existing account)
3. On success, token stored and redirected to Dashboard
4. Dashboard requires valid token (ProtectedRoute)
5. User can Logout (token removed)

## 📦 Dependencies

- **react**: UI library
- **react-dom**: React rendering
- **react-router-dom**: Page navigation
- **axios**: HTTP client for API calls

## 🚀 Available Scripts

```bash
npm start       # Start development server
npm build       # Build for production
npm test        # Run tests
npm eject       # Expose configuration (⚠️ irreversible)
```

## 🔐 Security Features

- **Protected Routes**: Dashboard accessible only with valid JWT
- **Token Storage**: Stored securely in localStorage
- **Password Not Stored**: Frontend never has access to raw passwords
- **CORS Enabled**: Backend allows frontend requests
- **Input Validation**: Email and password format checked

## 🧠 State Management

Components use React Hooks:

**useState**
- `formData`: Store form input values
- `loading`: Show loading state during API calls
- `error`: Display error messages
- `user`: Store logged-in user profile

**useEffect**
- Fetch user profile on Dashboard mount
- Check authentication on app load
- Cleanup on unmount

**useNavigate**
- Redirect after successful login/register
- Redirect to login if not authenticated
- Navigate on logout

## 🔧 Configuration

### Proxy Setup
`package.json` has proxy for backend:
```json
"proxy": "http://localhost:5000"
```
This allows Axios to call `/api/...` without full URL.

### Environment Variables
Create `.env` in frontend folder if needed:
```
REACT_APP_API_URL=http://localhost:5000
```

## ⚠️ Common Issues

### API Calls Failing
- Check if backend is running on port 5000
- Open browser DevTools → Network tab to see requests
- Check terminal for API errors

### Token Issues
- Clear localStorage: Open DevTools → Application → Clear All
- Login again to get fresh token
- Check if token is sent in Authorization header

### Components Not Updating
- React renders on state change
- Check if setState is properly called
- Use React DevTools to debug component state

### Routing Not Working
- Ensure React Router paths match in App.js
- Check browser URL bar for current route
- Verify ProtectedRoute wrapper

## 📚 Learning Resources

Key files to understand:
1. **App.js** - Understand routing and how pages are loaded
2. **pages/Login.js** - Learn form handling and API calls
3. **services/api.js** - Understand HTTP client setup
4. **components/ProtectedRoute.js** - Learn conditional rendering
5. **Dashboard.js** - Learn useEffect and data fetching

## 💡 Tips for Beginners

1. **Chrome DevTools** (F12) - Essential for debugging
   - Console: JavaScript errors
   - Network: API requests/responses
   - Application: localStorage tokens

2. **React DevTools Extension** - See component structure and state

3. **Modify Styling** - Try changing colors in CSS files

4. **Add Features** - Try adding password reset, edit profile, etc.

## 🎯 Next Steps to Enhance

- Add password reset functionality
- Add user profile edit feature
- Add email verification
- Add user list/search feature
- Add refresh tokens for better security
- Deploy to Vercel/Netlify

---

Created for educational purposes 🎓
