// src/components/Navbar.js
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import Login from "../Login";
import Signup from "../Signup";
import "./Navbar.css";

// Applications open Monday 16 February at 10:00 AM local – timer hides and Apply shows after this
const APPLICATIONS_OPEN_DATE = new Date(2026, 1, 16, 10, 0, 0); // Feb 16, 2026 10:00 AM (month 1 = February)

const Navbar = ({ isDark = false, onToggleTheme }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [applicationsOpen, setApplicationsOpen] = useState(false);

  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);

  // Countdown to applications open (Monday 16 Feb midnight); when done, show Apply button
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const diff = APPLICATIONS_OPEN_DATE.getTime() - now.getTime();
      if (diff <= 0) {
        setApplicationsOpen(true);
        setTimeLeft(null);
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Check if user is admin
  useEffect(() => {
    async function checkAdminStatus() {
      if (currentUser) {
        try {
          const userRef = doc(db, "users", currentUser.uid);
          const userSnap = await getDoc(userRef);
          setIsAdmin(userSnap.exists() && userSnap.data().isAdmin);
        } catch (error) {
          console.error("Error checking admin status:", error);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
    }
    checkAdminStatus();
  }, [currentUser]);

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
      // Check if admin user
      if (isAdmin) {
        navigate("/admin/dashboard");
        return;
      }
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

  const handleAuthSuccess = async () => {
    closeModals();
    // Check if admin user - redirect to admin dashboard instead
    if (currentUser) {
      try {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists() && userSnap.data().isAdmin) {
          navigate("/admin/dashboard");
          return;
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
      }
    }
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
              draggable="false"
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

          {/* RIGHT SIDE: Timer until applications open, then Apply button + theme */}
          <div className="nav-right">
            {!applicationsOpen && timeLeft !== null && (
              <div className="nav-apply-countdown" aria-live="polite">
                <span className="nav-apply-countdown-time">
                  {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
                </span>
                <span className="nav-apply-countdown-date">Opens Feb 16, 10:00 AM</span>
              </div>
            )}
            {applicationsOpen && (
              <button className="apply-btn" onClick={handleApplyClick}>
                APPLY
              </button>
            )}

            {onToggleTheme && (
              <button
                type="button"
                className="nav-theme-icon"
                onClick={onToggleTheme}
                aria-label={
                  isDark ? "Switch to light mode" : "Switch to dark mode"
                }
              >
                <img
                  draggable="false"
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
