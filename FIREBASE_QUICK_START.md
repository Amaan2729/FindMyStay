# Firebase Authentication - Quick Start Guide

## Files Created/Modified

### Frontend Files:
- **`frontend/.env`** - Environment variables (Firebase config)
- **`frontend/src/config/firebase.js`** - Firebase initialization
- **`frontend/src/utils/authService.js`** - Authentication functions
- **`frontend/src/context/AuthContext.jsx`** - Auth context provider
- **`frontend/src/components/ProtectedRoute.jsx`** - Protected route wrapper
- **`frontend/src/pages/LoginPage.jsx`** - Updated login page (Firebase)
- **`frontend/src/pages/SignupPage.jsx`** - Updated signup page (Firebase)
- **`frontend/src/pages/AdminLogin.jsx`** - Updated admin login (Firebase)
- **`frontend/package.json`** - Added Firebase dependency

### Backend Files:
- **`backend/.env`** - Environment variables (Firebase Admin SDK)
- **`backend/config/firebase.js`** - Firebase Admin SDK initialization
- **`backend/middleware/firebaseAuth.js`** - Token verification middleware
- **`backend/routes/authFirebase.js`** - Firebase auth routes
- **`backend/models/User.js`** - Updated User model (added firebaseUid)
- **`backend/server.js`** - Updated to use Firebase routes and dotenv
- **`backend/package.json`** - Added Firebase Admin SDK dependency

### Documentation:
- **`FIREBASE_AUTH_SETUP.md`** - Complete setup guide

## Installation Steps

### 1. Install Dependencies

**Frontend:**
```bash
cd frontend
npm install
npm install firebase
```

**Backend:**
```bash
cd backend
npm install
npm install firebase-admin dotenv
```

### 2. Get Firebase Credentials

1. Go to https://console.firebase.google.com
2. Create a new project or use existing one
3. Enable Email/Password authentication
4. Get web app config from Project Settings
5. Generate service account key for backend

### 3. Configure Environment Variables

**`frontend/.env`:**
```env
VITE_FIREBASE_API_KEY=your_api_key_from_firebase
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_BACKEND_URL=http://localhost:5000
```

**`backend/.env`:**
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=findmystay

FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=your_private_key_from_service_account
FIREBASE_CLIENT_EMAIL=your_client_email_from_service_account

NODE_ENV=development
```

### 4. Update Database (if needed)

The User model now includes:
- `firebaseUid` - Firebase user ID
- `password` - Optional (for backward compatibility)

Run your database migration/sync to apply changes.

### 5. Start the Application

**Terminal 1 - Backend:**
```bash
cd backend
node server.js
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

## Usage Examples

### In Components:

```jsx
import { useAuth } from "../context/AuthContext";
import { signIn, signUp, logout } from "../utils/authService";

// Get current user
export default function Component() {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return <div>Please log in</div>;
  
  return <div>Welcome, {user.email}</div>;
}
```

### Protected Routes:

```jsx
import ProtectedRoute from "./components/ProtectedRoute";

<ProtectedRoute>
  <AdminPage />
</ProtectedRoute>
```

### Sign Up:

```jsx
const handleSignUp = async () => {
  try {
    await signUp("email@example.com", "password123", "User Name");
    // User created and logged in
  } catch (error) {
    console.error(error.message);
  }
};
```

### Sign In:

```jsx
const handleSignIn = async () => {
  try {
    await signIn("email@example.com", "password123");
    // User logged in
  } catch (error) {
    console.error(error.message);
  }
};
```

### Sign Out:

```jsx
const handleSignOut = async () => {
  try {
    await logout();
    // User logged out
  } catch (error) {
    console.error(error.message);
  }
};
```

## API Endpoints

All endpoints require Firebase ID token in Authorization header:
```
Authorization: Bearer <firebase_id_token>
```

### POST `/api/auth/signup`
Creates new user in database

**Request:**
```json
{
  "uid": "firebase_uid",
  "email": "user@example.com",
  "name": "User Name"
}
```

**Response:**
```json
{
  "message": "User created successfully!",
  "user": {
    "id": 1,
    "name": "User Name",
    "email": "user@example.com"
  }
}
```

### POST `/api/auth/login`
Syncs user login to database

**Request:**
```json
{
  "uid": "firebase_uid",
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "name": "User Name",
    "email": "user@example.com",
    "firebaseUid": "firebase_uid"
  }
}
```

### GET `/api/auth/me`
Get current user details

**Response:**
```json
{
  "user": {
    "id": 1,
    "name": "User Name",
    "email": "user@example.com",
    "firebaseUid": "firebase_uid"
  }
}
```

## Features

✅ Email/Password Authentication  
✅ Secure Token Management  
✅ User Registration  
✅ User Login/Logout  
✅ Protected Routes  
✅ Auth Context for State Management  
✅ Automatic User Sync with Backend Database  
✅ Admin Authentication  
✅ Error Handling & Validation  
✅ Loading States  

## Security Notes

- Firebase tokens are verified on backend before any operation
- Private keys should never be exposed in frontend
- `.env` files should be added to `.gitignore`
- Use HTTPS in production
- Implement rate limiting for auth endpoints
- Enable Firebase Security Rules for Firestore (if using)

## Troubleshooting

**"Firebase is not initialized"**
- Ensure `.env` file is in `frontend/` directory
- Restart dev server: `npm run dev`

**"Token verification failed"**
- Check Firebase Admin SDK is initialized on backend
- Verify `.env` file has correct Firebase credentials
- Ensure `FIREBASE_PRIVATE_KEY` contains actual newlines

**"CORS errors"**
- Backend allows all origins in development (`*`)
- Update to specific URL in production

**Database errors**
- Ensure User model includes `firebaseUid` field
- Check database connection in `.env`

## Next Steps

1. ✅ Basic authentication is working
2. 🔄 Implement email verification
3. 🔄 Add password reset functionality
4. 🔄 Add Google/GitHub OAuth
5. 🔄 Set up custom claims for admin roles
6. 🔄 Configure Firestore for additional data
7. 🔄 Set up Firebase Storage for user avatars

## Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)
- Complete setup guide: `FIREBASE_AUTH_SETUP.md`
