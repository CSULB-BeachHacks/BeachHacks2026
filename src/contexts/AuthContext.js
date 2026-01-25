import React, { createContext, useContext, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
  deleteUser,
  reauthenticateWithPopup,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sign up with email and password
  async function signup(email, password, displayName) {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) {
      await updateProfile(result.user, { displayName });
    }
    return result;
  }

  // Sign in with email and password
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Sign in with Google
  function loginWithGoogle() {
    return signInWithPopup(auth, googleProvider);
  }

  // Sign out
  function logout() {
    return signOut(auth);
  }

  // Update user profile
  function updateUserProfile(profile) {
    return updateProfile(currentUser, profile);
  }

  // Re-authenticate user (for Google sign-in)
  async function reauthenticateGoogle() {
    if (!currentUser) {
      throw new Error("No user is currently signed in");
    }
    return reauthenticateWithPopup(currentUser, googleProvider);
  }

  // Re-authenticate user (for email/password)
  async function reauthenticateEmail(password) {
    if (!currentUser || !currentUser.email) {
      throw new Error("No user is currently signed in");
    }
    const credential = EmailAuthProvider.credential(currentUser.email, password);
    return reauthenticateWithCredential(currentUser, credential);
  }

  // Delete user account (requires re-authentication first)
  async function deleteAccount() {
    if (!currentUser) {
      throw new Error("No user is currently signed in");
    }
    await deleteUser(currentUser);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    loginWithGoogle,
    logout,
    updateUserProfile,
    deleteAccount,
    reauthenticateGoogle,
    reauthenticateEmail,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
