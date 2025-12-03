// src/components/Navbar.js
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Login from "./Login";
import Signup from "./Signup";
import "./Navbar.css";

const Navbar = ({ isDark = false, onToggleTheme }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      // If on dashboard, just scroll up; otherwise go to dashboard
      if (location.pathname === "/dashboard") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate("/dashboard");
      }
    } else {
      openSignup();
    }
  };

  const handleAuthSuccess = () => {
    closeModals();
    navigate("/apply");
  };

  const handleNavLinkClick = (e, sectionId) => {
    e.preventDefault();

    // Close mobile menu when a link is clicked
    setIsMenuOpen(false);

    // If not on main page, go there first then scroll
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    setIsMenuOpen(false);

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
          {/* LOGO */}
          <a href="#top" className="nav-logo" onClick={handleLogoClick}>
            <img
              src={isDark ? "/white_logo.svg" : "/acm_logo.png"}
              alt="ACM BeachHacks logo"
              className="nav-logo-img"
            />
          </a>

          {/* NAV MENU */}
          <ul className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
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
          <div
            className="nav-toggle"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </div>
      </nav>

      {/* LOGIN/SIGNUP MODALS */}
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
