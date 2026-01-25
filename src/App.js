// src/App.js
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./App.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Tracks from "./components/Tracks";
import Speakers from "./components/Speakers";
import FAQ from "./components/FAQ";
import Sponsors from "./components/Sponsors";
import Teams from "./components/Teams";
import Application from "./components/Application";
import Dashboard from "./components/Dashboard/Dashboard";

// Auth Provider + hook
import { AuthProvider, useAuth } from "./contexts/AuthContext";

// Protected Route Component - redirects to home if not authenticated
function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/" replace />;
}

function App() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark((prev) => !prev);

  // single global background for the whole app
  const appClassName = `App is-default ${isDark ? "dark" : ""}`;

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Landing page */}
          <Route
            path="/"
            element={
              <div className={appClassName}>
                <Navbar isDark={isDark} onToggleTheme={toggleTheme} />
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
                  <Navbar isDark={isDark} onToggleTheme={toggleTheme} />
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
                  <Navbar isDark={isDark} onToggleTheme={toggleTheme} />
                  <Dashboard />
                  <Teams />
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
