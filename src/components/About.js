import React from "react";
import "./About.css";

const About = () => {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">About BeachHacks</h2>
          <p className="section-subtitle">
            Empowering the next generation of innovators
          </p>
        </div>

        <div className="about-content">
          <div className="about-text">
            <p className="about-description">
              BeachHacks is California's premier student hackathon, bringing
              together hundreds of passionate developers, designers, and
              entrepreneurs for an unforgettable 36-hour experience. Since our
              inception, we've been committed to fostering innovation,
              creativity, and collaboration in the tech community.
            </p>

            <div className="about-stats">
              <div className="stat-item">
                <div className="stat-number">500+</div>
                <div className="stat-label">Participants</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">36</div>
                <div className="stat-label">Hours</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">50+</div>
                <div className="stat-label">Projects</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">$10K+</div>
                <div className="stat-label">Prizes</div>
              </div>
            </div>
          </div>

          <div className="about-features">
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3 className="feature-title">Innovation</h3>
              <p className="feature-description">
                Push the boundaries of technology and create something amazing
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🤝</div>
              <h3 className="feature-title">Collaboration</h3>
              <p className="feature-description">
                Work with talented peers and industry professionals
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">💡</div>
              <h3 className="feature-title">Learning</h3>
              <p className="feature-description">
                Attend workshops and learn from experienced mentors
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🏆</div>
              <h3 className="feature-title">Competition</h3>
              <p className="feature-description">
                Compete for amazing prizes and recognition
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
