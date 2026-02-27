// src/App.js
import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Tracks from "./components/Tracks/Tracks";
import Speakers from "./components/Speakers/Speakers";
import FAQ from "./components/FAQ/FAQ";
import Sponsors from "./components/Sponsors/Sponsors";
import Teams from "./components/Teams/Teams";
import Application from "./components/Application/Application";
import Dashboard from "./components/Dashboard/Dashboard";
import AdminLogin from "./components/Dashboard/AdminLogin";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import UserDetail from "./components/UserDetail/UserDetail";
import ConfettiCheck from "./components/Cofetti/ConfettiCheck";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";


// Auth Provider + hook
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

// Protected Route Component - redirects to home if not authenticated
function ProtectedRoute({ children }) {
    const { currentUser } = useAuth();
    return currentUser ? children : <Navigate to="/" replace />;
}

// Admin Protected Route - only allows admin user (checks Firestore isAdmin flag)
function AdminProtectedRoute({ children }) {
    const { currentUser } = useAuth();
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function checkAdmin() {
            if (!currentUser) {
                setLoading(false);
                return;
            }

            try {
                const userRef = doc(db, "users", currentUser.uid);
                const userSnap = await getDoc(userRef);
                setIsAdmin(userSnap.exists() && userSnap.data().isAdmin);
            } catch (error) {
                console.error("Error checking admin status:", error);
                setIsAdmin(false);
            } finally {
                setLoading(false);
            }
        }

        checkAdmin();
    }, [currentUser]);

    if (loading) {
        return (
            <div
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <p>Loading...</p>
            </div>
        );
    }

    if (!currentUser || !isAdmin) {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
}

function App() {
    const [isDark, setIsDark] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [showLoadingForTheme, setShowLoadingForTheme] = useState(false);

    const toggleTheme = () => {
        // Show loading screen first, then change theme
        if (!isLoading) {
            // Show loading screen immediately
            setShowLoadingForTheme(true);

            // Wait a bit to ensure loading screen is rendered and visible before changing theme
            setTimeout(() => {
                setIsDark((prev) => !prev);
            }, 50);

            // Hide loading screen after animation completes (600ms show + 500ms fade = 1100ms total)
            setTimeout(() => {
                setShowLoadingForTheme(false);
            }, 1100);
        } else {
            // If still loading initially, just change theme
            setIsDark((prev) => !prev);
        }
    };

    const handleLoadComplete = () => {
        setIsLoading(false);
    };

    // single global background for the whole app
    const appClassName = `App is-default ${isDark ? "dark" : ""}`;

    return (
        <AuthProvider>
            <Router>
                {(isLoading || showLoadingForTheme) && (
                    <LoadingScreen
                        isDark={isDark}
                        onLoadComplete={handleLoadComplete}
                        skipInitialLoad={showLoadingForTheme}
                    />
                )}
                <Routes>
                    {/* Landing page */}
                    <Route
                        path="/"
                        element={
                            <div className={appClassName}>
                                <ConfettiCheck />
                                <Navbar
                                    isDark={isDark}
                                    onToggleTheme={toggleTheme}
                                />
                                <Hero />
                                <About />
                                <Tracks />
                                <Speakers />
                                <FAQ />
                                <Sponsors />
                                <Teams />
                            </div>
                        }
                    />

                    {/* Application page (protected) */}
                    <Route
                        path="/apply"
                        element={
                            <ProtectedRoute>
                                <div className={appClassName}>
                                    <Navbar
                                        isDark={isDark}
                                        onToggleTheme={toggleTheme}
                                    />
                                    <Application />
                                </div>
                            </ProtectedRoute>
                        }
                    />

                    {/* Dashboard (protected) */}
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <div className={appClassName}>
                                    <Navbar
                                        isDark={isDark}
                                        onToggleTheme={toggleTheme}
                                    />
                                    <Dashboard />
                                    <Teams />
                                </div>
                            </ProtectedRoute>
                        }
                    />

                    {/* Admin Login Page */}
                    <Route
                        path="/admin/login"
                        element={
                            <div className={appClassName}>
                                <AdminLogin />
                            </div>
                        }
                    />

                    {/* Admin Dashboard (protected - admin only) */}
                    <Route
                        path="/admin/dashboard"
                        element={
                            <AdminProtectedRoute>
                                <div className={appClassName}>
                                    <Navbar
                                        isDark={isDark}
                                        onToggleTheme={toggleTheme}
                                    />
                                    <AdminDashboard />
                                    <Teams />
                                </div>
                            </AdminProtectedRoute>
                        }
                    />

                    {/* User Detail Page (protected - admin only) */}
                    <Route
                        path="/admin/users/:userId"
                        element={
                            <AdminProtectedRoute>
                                <div className={appClassName}>
                                    <Navbar
                                        isDark={isDark}
                                        onToggleTheme={toggleTheme}
                                    />
                                    <UserDetail />
                                    <Teams />
                                </div>
                            </AdminProtectedRoute>
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
