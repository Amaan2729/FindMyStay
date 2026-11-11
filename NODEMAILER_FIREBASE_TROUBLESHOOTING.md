# Nodemailer & Firebase Troubleshooting Guide

## Overview

This guide helps you diagnose and fix issues with Nodemailer email service and Firebase authentication in the FindMyStay application.

---

## Part 1: NODEMAILER (Email Service)

### 1. Check Email Configuration

**Required Environment Variables:**
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-character-app-password
ADMIN_EMAIL=admin-email@gmail.com
FRONTEND_URL=http://localhost:5173
```

**Verification Steps:**
1. Open `backend/.env`
2. Verify all email variables are present and correctly set
3. Ensure `EMAIL_PASS` is your Gmail App Password (NOT your regular password)

### 2. Gmail App Password Setup

If you don't have a Gmail App Password:

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Step Verification (if not already enabled)
3. Go to App passwords
4. Select "Mail" and "Windows Computer"
5. Copy the 16-character password
6. Paste it as `EMAIL_PASS` in `.env`

### 3. Test Email Service

**Run email test:**
```bash
cd backend
node test-email.js
```

**Expected Output:**
```
Testing email functionality...

Sending booking confirmation email...
✅ Booking confirmation: Sent

Sending admin notification email...
✅ Admin notification: Sent

Sending welcome email...
✅ Welcome email: Sent

✅ All email tests passed!
```

### 4. Common Nodemailer Errors

| Error | Cause | Solution |
|-------|-------|----------|
| `Missing email credentials` | `EMAIL_USER` or `EMAIL_PASS` not set | Add both to `.env` |
| `Invalid login` | Wrong email/password | Verify Gmail App Password |
| `EAUTH Authentication failed` | Password is incorrect | Use App Password, not regular password |
| `ETIMEDOUT` | Network issue or wrong host | Verify `EMAIL_HOST=smtp.gmail.com` |
| `Failed to send email` | SMTP configuration issue | Check port is 587 for TLS |

### 5. Enable Logging for Email Issues

Add this to `backend/.env` for verbose logging:
```env
DEBUG=nodemailer:*
NODE_ENV=development
```

Then restart the backend server to see detailed email logs.

---

## Part 2: FIREBASE AUTHENTICATION

### 1. Check Firebase Configuration

**Backend - Required Environment Variables:**
```env
FIREBASE_PROJECT_ID=findmystay-5cbb2
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@findmystay-5cbb2.iam.gserviceaccount.com
```

**Frontend - Required Environment Variables:**
```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=findmystay-5cbb2.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=findmystay-5cbb2
VITE_FIREBASE_STORAGE_BUCKET=findmystay-5cbb2.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_BACKEND_URL=http://localhost:5000
```

### 2. Firebase Setup Steps

**Get Service Account Key:**
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select "FindMyStay" project
3. Go to **Project Settings** → **Service Accounts**
4. Click **Generate New Private Key**
5. Copy the JSON contents
6. Extract these fields:
   - `project_id` → `FIREBASE_PROJECT_ID`
   - `private_key` → `FIREBASE_PRIVATE_KEY`
   - `client_email` → `FIREBASE_CLIENT_EMAIL`

**Get Web Configuration:**
1. Go to Firebase Console → Project Settings → Your apps
2. Select the web app
3. Copy Firebase config values to `frontend/.env`

### 3. Private Key Format Issues

**Problem:** Firebase initialization fails

**Common Causes:**
1. Private key is not properly escaped in `.env`
2. Missing `-----BEGIN PRIVATE KEY-----` or `-----END PRIVATE KEY-----`
3. Newlines not properly encoded

**Solution:**
```env
# CORRECT - Escape newlines as \n
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nMIIE...base64...==\n-----END PRIVATE KEY-----\n

# WRONG - Raw newlines won't work in .env
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG...
-----END PRIVATE KEY-----
```

### 4. Test Firebase Connection

**Check if Firebase initializes:**
```bash
cd backend
node -e "require('./config/firebase')"
```

**Expected Output:**
```
🔧 Creating email transporter...
Initializing Firebase Admin SDK...
Project ID: findmystay-5cbb2
Client Email: firebase-adminsdk-fbsvc@findmystay-5cbb2.iam.gserviceaccount.com
✅ Firebase Admin SDK initialized successfully
```

### 5. Common Firebase Errors

| Error | Cause | Solution |
|-------|-------|----------|
| `Missing Firebase environment variable` | Missing env var | Check `backend/.env` |
| `Invalid private key format` | Wrong key format | Verify key has BEGIN/END markers |
| `Cannot read property 'verifyIdToken'` | Firebase not initialized | Ensure `initializeFirebase()` runs |
| `INVALID_ARGUMENT: Incorrect bearer token format` | Token malformed | Verify Bearer token in headers |
| `Invalid ID token` | Expired or wrong token | Refresh token from frontend |

### 6. Test Firebase Auth Flow

**Step 1: Sign Up**
1. Go to frontend (http://localhost:5173)
2. Click "Sign Up"
3. Enter email and password
4. Check backend logs for:
   ```
   🔐 Verifying Firebase token...
   ✅ Firebase token verified for user: email@example.com
   ```

**Step 2: Check Backend Response**
If signup fails, check:
1. Backend is running on port 5000
2. `VITE_BACKEND_URL` in frontend `.env` is correct
3. `CORS` is enabled (should be enabled by default)

**Step 3: Check Logs**
```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend  
cd frontend
npm run dev

# Check both terminals for errors
```

---

## Part 3: INTEGRATED TESTING

### Run All Tests

```bash
cd backend
npm test
```

**Expected Results:**
- ✅ emailService tests PASS
- ✅ models tests PASS
- ✅ utilities tests PASS

### Test Email in Booking Flow

1. **Start Backend:**
   ```bash
   cd backend
   npm start
   ```

2. **Start Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Make a Booking:**
   - Sign up/Sign in
   - Click "Book Now" on any hotel
   - Complete booking details
   - Submit booking

4. **Check Results:**
   - Customer should receive booking confirmation email
   - Admin should receive booking notification email
   - Check `console.log` output in terminal for:
     ```
     📧 Preparing booking confirmation email for: user@example.com
     ✉️ Sending booking confirmation email...
     ✅ Booking confirmation email sent. Message ID: xxxxx
     ```

### Debug Issues

**If emails don't send:**

1. Check email configuration:
   ```bash
   node -e "console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS)"
   ```

2. Test with manual email script:
   ```bash
   node test-email.js
   ```

3. Check logs in backend terminal for error messages

**If Firebase auth fails:**

1. Verify token in network request:
   - Open browser DevTools → Network tab
   - Look for `/api/auth/signup` or `/api/auth/login` request
   - Check `Authorization` header has `Bearer <token>`

2. Check backend middleware logs:
   ```
   🔐 Verifying Firebase token...
   ✅ Firebase token verified for user: ...
   ```

---

## Part 4: DATABASE CONFIGURATION

The backend now supports both database URL formats:

### Option 1: Individual Variables (Current Setup)
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=12345678
DB_NAME=findmystay
```

### Option 2: DATABASE_URL (Production Style)
```env
DATABASE_URL=mysql://root:12345678@localhost:3306/findmystay
```

Both formats are supported automatically.

---

## Quick Diagnostic Checklist

Use this to quickly identify issues:

### Nodemailer Issues
- [ ] `EMAIL_USER` is set to valid Gmail address
- [ ] `EMAIL_PASS` is Gmail App Password (not regular password)
- [ ] 2FA is enabled on Gmail account
- [ ] App password has been generated and copied
- [ ] `EMAIL_HOST=smtp.gmail.com` is correct
- [ ] `EMAIL_PORT=587` is correct
- [ ] `test-email.js` runs successfully

### Firebase Issues
- [ ] All `FIREBASE_*` env vars in `backend/.env` are present
- [ ] All `VITE_FIREBASE_*` env vars in `frontend/.env` are present
- [ ] Private key has `-----BEGIN PRIVATE KEY-----` marker
- [ ] Private key has `-----END PRIVATE KEY-----` marker
- [ ] Private key newlines are escaped as `\n`
- [ ] Firebase admin SDK initializes without errors
- [ ] Backend is running on correct port (5000)
- [ ] CORS is enabled

### Database Issues
- [ ] Database server is running (MySQL/PostgreSQL)
- [ ] `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` are set
- [ ] Database user has proper permissions
- [ ] Port is correct (3306 for MySQL)

---

## Support

If issues persist:

1. **Check logs carefully** - Most errors are in the console output
2. **Verify environment variables** - Use `echo $VAR_NAME` to check
3. **Restart services** - Stop and restart backend/frontend
4. **Clear cache** - Delete `node_modules` and reinstall: `npm install`
5. **Check Firebase console** - Verify project settings and credentials

For detailed debugging, enable verbose logging:
```env
DEBUG=*
NODE_ENV=development
```
