// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAw0mKNWttyMxaLnKv94n2cG19EPo9g48c",
  authDomain: "beachhacks2026.firebaseapp.com",
  projectId: "beachhacks2026",
  storageBucket: "beachhacks2026.firebasestorage.app",
  messagingSenderId: "680344948119",
  appId: "1:680344948119:web:f9aa1782ca57cce3ae48d2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
