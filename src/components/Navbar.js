// src/components/Navbar.js
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Login from "./Login";
import Signup from "./Signup";
import "./Navbar.css";

const Navbar = ({ isDark = false, onToggleTheme }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser } = useAuth();

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

  const handleApplyClick = (e) => {
    e.preventDefault();
    if (currentUser) {
      window.location.href = "/apply"; // adjust if needed
    } else {
      openSignup();
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">

          {/* LOGO */}
          <a href="#top" className="nav-logo">
            <img
              src={isDark ? "/white_logo.svg" : "/acm_logo.png"}
              alt="ACM BeachHacks logo"
              className="nav-logo-img"
            />
          </a>

          {/* NAV MENU */}
          <ul className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
            <li className="nav-item">
              <a href="#about" className="nav-link" onClick={() => setIsMenuOpen(false)}>About</a>
            </li>
            <li className="nav-item">
              <a href="#tracks" className="nav-link" onClick={() => setIsMenuOpen(false)}>Tracks</a>
            </li>
            <li className="nav-item">
              <a href="#speakers" className="nav-link" onClick={() => setIsMenuOpen(false)}>Speakers</a>
            </li>
            <li className="nav-item">
              <a href="#faq" className="nav-link" onClick={() => setIsMenuOpen(false)}>FAQ</a>
            </li>
            <li className="nav-item">
              <a href="#sponsors" className="nav-link" onClick={() => setIsMenuOpen(false)}>Sponsors</a>
            </li>
            <li className="nav-item">
              <a href="#teams" className="nav-link" onClick={() => setIsMenuOpen(false)}>Teams</a>
            </li>
          </ul>

          {/* RIGHT SIDE: APPLY + SUN/MOON */}
          <div className="nav-right">
            <button className="apply-btn" onClick={handleApplyClick}>
              APPLY
            </button>

            {onToggleTheme && (
              <button
                type="button"
                className="nav-theme-icon"
                onClick={onToggleTheme}
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              >
                <img
                  src={isDark ? "/sun.png" : "/moon.png"}
                  alt="Toggle theme"
                  className="nav-theme-icon-img"
                />
              </button>
            )}
          </div>

          {/* HAMBURGER ICON */}
          <div className="nav-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </div>
      </nav>

      {/* LOGIN/SIGNUP MODALS */}
      {showLogin && (
        <Login onClose={closeModals} onSwitchToSignup={openSignup} />
      )}
      {showSignup && (
        <Signup onClose={closeModals} onSwitchToLogin={openLogin} />
      )}
    </>
  );
};

export default Navbar;
