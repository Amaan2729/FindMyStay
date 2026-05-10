# Firebase Authentication Setup Guide

## Overview
This project now uses Firebase Authentication for secure user management. Firebase provides:
- Email/Password authentication
- Secure token management
- Real-time user state management
- Easy integration with backend

## Prerequisites
- Google/Firebase Account (free tier available at https://firebase.google.com)
- Node.js and npm installed
- Backend and frontend dependencies installed

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"**
3. Enter your project name: `findmystay` (or any name)
4. Accept the terms and continue
5. Select or create a Google Cloud project
6. Disable Google Analytics (optional) and create project
7. Wait for the project to be created

## Step 2: Set Up Firebase Authentication

### Frontend Configuration:

1. In Firebase Console, go to **Build > Authentication**
2. Click **"Get started"**
3. Enable **Email/Password** provider
4. Click **"Email/Password"** and toggle both options:
   - Email/password
   - Email link (optional)
5. Save changes

### Get Firebase Config:

1. Go to **Project Settings** (gear icon)
2. Click **"Your apps"** section
3. Click **"</> Web"** to create a web app
4. Enter app name: `findmystay-frontend`
5. Register app
6. Copy the Firebase config object
7. Update the `.env` file in `frontend/` with these values:

```env
VITE_FIREBASE_API_KEY=YOUR_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_APP_ID
VITE_BACKEND_URL=http://localhost:5000
```

## Step 3: Set Up Backend Firebase Admin SDK

### Generate Service Account Key:

1. Go to **Project Settings** (gear icon)
2. Click **"Service accounts"** tab
3. Click **"Generate new private key"**
4. A JSON file will download - **keep it safe!**
5. Open the JSON and extract:
   - `project_id` → FIREBASE_PROJECT_ID
   - `private_key` → FIREBASE_PRIVATE_KEY (replace `\n` with actual newlines)
   - `client_email` → FIREBASE_CLIENT_EMAIL

### Update Backend `.env`:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=findmystay

FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxx@your_project.iam.gserviceaccount.com

NODE_ENV=development
```

## Step 4: Update Database Models

Add `firebaseUid` field to your User model:

```javascript
// In models/User.js, add:
firebaseUid: {
  type: DataTypes.STRING,
  unique: true,
  allowNull: false
}
```

## Step 5: Install Dependencies

### Frontend:
```bash
cd frontend
npm install
npm install firebase
```

### Backend:
```bash
cd backend
npm install
npm install firebase-admin dotenv
```

## Step 6: Update App.jsx

Wrap your app with AuthProvider:

```jsx
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      {/* Your existing components */}
    </AuthProvider>
  );
}
```

## Step 7: Start the Application

### Terminal 1 - Backend:
```bash
cd backend
node server.js
```

### Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

## API Endpoints

All Firebase auth endpoints require an `Authorization: Bearer <token>` header.

### POST `/api/auth/signup`
- **Body:**
  ```json
  {
    "uid": "firebase_uid",
    "email": "user@example.com",
    "name": "User Name"
  }
  ```
- **Response:** User created successfully

### POST `/api/auth/login`
- **Body:**
  ```json
  {
    "uid": "firebase_uid",
    "email": "user@example.com"
  }
  ```
- **Response:** Login successful

### GET `/api/auth/me`
- **Response:** Current user details

## Usage in Components

### Get Current User:
```jsx
import { useAuth } from "../context/AuthContext";

export default function MyComponent() {
  const { user, isAuthenticated, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return <div>Please log in</div>;
  
  return <div>Welcome, {user.email}</div>;
}
```

### Sign Up:
```jsx
import { signUp } from "../utils/authService";

const handleSignUp = async (email, password, name) => {
  try {
    const result = await signUp(email, password, name);
    console.log("Signup successful:", result);
  } catch (error) {
    console.error("Signup failed:", error.message);
  }
};
```

### Sign In:
```jsx
import { signIn } from "../utils/authService";

const handleSignIn = async (email, password) => {
  try {
    const result = await signIn(email, password);
    console.log("Sign in successful:", result);
  } catch (error) {
    console.error("Sign in failed:", error.message);
  }
};
```

### Sign Out:
```jsx
import { logout } from "../utils/authService";

const handleSignOut = async () => {
  try {
    await logout();
  } catch (error) {
    console.error("Sign out failed:", error.message);
  }
};
```

## Troubleshooting

### Firebase config not loading
- Ensure `.env` file is in the `frontend/` directory
- Restart the dev server: `npm run dev`
- Check that all environment variables are set correctly

### Backend can't verify tokens
- Verify Firebase Admin SDK is initialized
- Check `.env` file in `backend/` has correct credentials
- Ensure `FIREBASE_PRIVATE_KEY` uses actual newlines, not escaped `\n`

### Database errors
- Update User model with `firebaseUid` field
- Run migrations/sync database
- Check database credentials in `.env`

### CORS issues
- Backend CORS is configured for `*` in development
- Change to your frontend URL in production

## Security Best Practices

1. **Never commit `.env` files** - Add to `.gitignore`
2. **Use environment-specific configs** - Different Firebase projects for dev/prod
3. **Keep Firebase private key safe** - Never expose in frontend
4. **Enable Firestore Security Rules** - Restrict data access
5. **Use HTTPS in production** - Firebase requires secure connections
6. **Implement backend token verification** - Always verify tokens server-side

## Next Steps

1. Configure Firestore for additional data storage
2. Set up email verification
3. Implement password reset functionality
4. Add Google/GitHub OAuth providers
5. Set up custom claims for admin roles
6. Configure rate limiting and account lockout

## Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Firestore Database](https://firebase.google.com/docs/firestore)
