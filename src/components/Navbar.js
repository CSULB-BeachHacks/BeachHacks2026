// src/components/Navbar.js
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Login from "./Login";
import Signup from "./Signup";
import "./Navbar.css";

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

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
      // If on dashboard, stay on dashboard. If on main page, go to dashboard
      if (location.pathname === "/dashboard") {
        // Already on dashboard, do nothing or scroll to top
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate("/dashboard");
      }
    } else {
      openSignup(); // show signup (users can switch to login)
    }
  };

  const handleAuthSuccess = () => {
    closeModals();
    navigate("/apply");
  };

  const handleNavLinkClick = (e, sectionId) => {
    e.preventDefault();
    // If on dashboard or apply page, navigate to main page first, then scroll
    if (location.pathname !== "/") {
      navigate("/");
      // Wait for navigation, then scroll to section
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      // Already on main page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    // If on dashboard or apply page, navigate to main page
    if (location.pathname !== "/") {
      navigate("/");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <a href="#top" className="nav-logo" onClick={handleLogoClick}>
            <img
              src="/acm_logo.png"
              alt="ACM BeachHacks logo"
              className="nav-logo-img"
            />
          </a>

          <ul className="nav-menu">
            <li className="nav-item">
              <a
                href="#about"
                className="nav-link"
                onClick={(e) => handleNavLinkClick(e, "about")}
              >
                About
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#tracks"
                className="nav-link"
                onClick={(e) => handleNavLinkClick(e, "tracks")}
              >
                Tracks
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#speakers"
                className="nav-link"
                onClick={(e) => handleNavLinkClick(e, "speakers")}
              >
                Speakers
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#faq"
                className="nav-link"
                onClick={(e) => handleNavLinkClick(e, "faq")}
              >
                FAQ
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#sponsors"
                className="nav-link"
                onClick={(e) => handleNavLinkClick(e, "sponsors")}
              >
                Sponsors
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#teams"
                className="nav-link"
                onClick={(e) => handleNavLinkClick(e, "teams")}
              >
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
        <Login
          onClose={closeModals}
          onSwitchToSignup={openSignup}
          onAuthSuccess={handleAuthSuccess}
        />
      )}
      {showSignup && (
        <Signup
          onClose={closeModals}
          onSwitchToLogin={openLogin}
          onAuthSuccess={handleAuthSuccess}
        />
      )}
    </>
  );
};

export default Navbar;
