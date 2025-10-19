import React, { useState } from "react";

import { useAuth } from "../contexts/AuthContext";
import Login from "./Login";
import Signup from "./Signup";
import "./Navbar.css";

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const openLogin = () => {
    setShowSignup(false);
    setShowLogin(true);
  };

  const openSignup = () => {
    setShowLogin(false);
    setShowSignup(true);
  };

  const closeModals = () => {
    setShowLogin(false);
    setShowSignup(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <h2>BeachHacks 2026</h2>
          </div>
          <ul className="nav-menu">
            <li className="nav-item">
              <a href="#about" className="nav-link">
                About
              </a>
            </li>
            <li className="nav-item">
              <a href="#tracks" className="nav-link">
                Tracks
              </a>
            </li>
            <li className="nav-item">
              <a href="#speakers" className="nav-link">
                Speakers
              </a>
            </li>
            <li className="nav-item">
              <a href="#faq" className="nav-link">
                FAQ
              </a>
            </li>
            <li className="nav-item">
              <a href="#sponsors" className="nav-link">
                Sponsors
              </a>
            </li>
            <li className="nav-item">
              <a href="#teams" className="nav-link">
                Teams
              </a>
            </li>
          </ul>

          <div className="nav-auth">
            {currentUser ? (
              <div className="user-menu">
                <span className="user-name">
                  Welcome, {currentUser.displayName || currentUser.email}
                </span>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </div>
            ) : (
              <div className="auth-buttons">
                <button onClick={openLogin} className="auth-btn login-btn">
                  Login
                </button>
                <button onClick={openSignup} className="auth-btn signup-btn">
                  Sign Up
                </button>
              </div>
            )}
          </div>

          <div className="nav-toggle">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </div>
      </nav>

      {showLogin && (
        <Login onClose={closeModals} onSwitchToSignup={openSignup} />
      )}
      {showSignup && (
        <Signup onClose={closeModals} onSwitchToLogin={openLogin} />
      )}
    </>
  );
}
