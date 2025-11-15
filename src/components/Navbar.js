// src/components/Navbar.js
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Login from "./Login";
import Signup from "./Signup";
import "./Navbar.css";

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
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
      window.location.href = "/apply"; // replace with your actual route
    } else {
      openSignup(); // show signup (users can switch to login)
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <a href="#top" className="nav-logo">
            <img
              src="/acm_logo.png"
              alt="ACM BeachHacks logo"
              className="nav-logo-img"
            />
          </a>

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

          <button className="apply-btn" onClick={handleApplyClick}>
            APPLY
          </button>
        </div>
      </nav>

      {/* Modals */}
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
