import React from "react";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            BeachHacks <span className="highlight">2026</span>
          </h1>
          <p className="hero-subtitle">
            California's Premier 36-Hour Hackathon
          </p>
          <p className="hero-description">
            Join hundreds of innovative minds for an unforgettable weekend of
            coding, creativity, and collaboration at the beautiful California
            State University, Long Beach.
          </p>
          <div className="hero-details">
            <div className="detail-item">
              <span className="detail-label">Date:</span>
              <span className="detail-value">March 15-16, 2026</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Location:</span>
              <span className="detail-value">CSU Long Beach</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Duration:</span>
              <span className="detail-value">36 Hours</span>
            </div>
          </div>
          <div className="hero-buttons">
            <button className="btn btn-primary">Register Now</button>
            <button className="btn btn-secondary">Learn More</button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-graphic">
            <div className="floating-element element-1"></div>
            <div className="floating-element element-2"></div>
            <div className="floating-element element-3"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
