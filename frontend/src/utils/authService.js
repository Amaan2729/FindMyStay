import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../config/firebase";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Sign up with email and password
export const signUp = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Update user profile with display name
    await updateProfile(userCredential.user, {
      displayName: displayName,
    });

    // Get Firebase ID token
    const token = await userCredential.user.getIdToken();

    // Send user data to backend to create/sync user in database
    const response = await fetch(`${BACKEND_URL}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        name: displayName,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to sync user to database");
    }

    return {
      user: userCredential.user,
      token,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Sign in with email and password
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();

    // Notify backend of login
    const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || errorData.message || "Login failed");
    }

    return {
      user: userCredential.user,
      token,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Send password reset email
export const resetPassword = async (email) => {
  try {
    const actionCodeSettings = {
      url: `${window.location.origin}/login`,
      handleCodeInApp: false,
    };

    await sendPasswordResetEmail(auth, email, actionCodeSettings);
  } catch (error) {
    let message = error.message;
    if (error.code === "auth/user-not-found") {
      message = "No account found for this email.";
    } else if (error.code === "auth/invalid-email") {
      message = "Enter a valid email address.";
    } else if (error.code === "auth/too-many-requests") {
      message = "Too many requests. Please try again later.";
    }
    throw new Error(message);
  }
};

// Google sign in
export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const token = await userCredential.user.getIdToken();

    const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || errorData.message || "Google login failed");
    }

    return {
      user: userCredential.user,
      token,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

// GitHub sign in
export const signInWithGitHub = async () => {
  try {
    const provider = new GithubAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const token = await userCredential.user.getIdToken();

    const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || errorData.message || "GitHub login failed");
    }

    return {
      user: userCredential.user,
      token,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Sign out
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get current user
export const getCurrentUser = () => {
  return auth.currentUser;
};

// Listen to auth state changes
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// Get Firebase ID token
export const getIdToken = async () => {
  try {
    const user = auth.currentUser;
    if (user) {
      return await user.getIdToken();
    }
    return null;
  } catch (error) {
    throw new Error(error.message);
  }
};
