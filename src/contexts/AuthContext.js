import React, { createContext, useContext, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
  updatePassword,
  deleteUser,
  reauthenticateWithPopup,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

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
    
    // Save user data to Firestore users collection
    try {
      const userRef = doc(db, "users", result.user.uid);
      await setDoc(userRef, {
        email: result.user.email || email,
        displayName: displayName || result.user.displayName || "",
        createdAt: new Date(),
      }, { merge: true });
    } catch (error) {
      console.error("Error saving user to Firestore:", error);
      // Don't throw error - user is created in Auth, Firestore save is secondary
    }
    
    return result;
  }

  // Sign in with email and password
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Sign in with Google
  async function loginWithGoogle() {
    const result = await signInWithPopup(auth, googleProvider);
    
    // Save/update user data to Firestore users collection if it doesn't exist
    try {
      const userRef = doc(db, "users", result.user.uid);
      const userSnap = await getDoc(userRef);
      
      if (!userSnap.exists()) {
        // User doesn't exist in Firestore, create the document
        await setDoc(userRef, {
          email: result.user.email || "",
          displayName: result.user.displayName || "",
          createdAt: new Date(),
        });
      } else {
        // User exists, update email if it's missing
        const userData = userSnap.data();
        if (!userData.email && result.user.email) {
          await setDoc(userRef, {
            email: result.user.email,
          }, { merge: true });
        }
      }
    } catch (error) {
      console.error("Error saving user to Firestore:", error);
      // Don't throw error - user is signed in, Firestore save is secondary
    }
    
    return result;
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

  // Update password (user is already authenticated, no need for re-authentication)
  async function changePassword(newPassword) {
    if (!currentUser) {
      throw new Error("No user is currently signed in");
    }
    
    // Update password directly since user is already authenticated
    await updatePassword(currentUser, newPassword);
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
    changePassword,
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
