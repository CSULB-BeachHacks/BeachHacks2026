import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
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
        <div className="nav-toggle">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
