import React from "react";
import "./Sponsors.css";

const Sponsors = () => {
  const sponsors = {
    platinum: [
      {
        name: "Google",
        logo: "https://via.placeholder.com/200x100/4285F4/FFFFFF?text=Google",
        website: "https://google.com",
      },
      {
        name: "Microsoft",
        logo: "https://via.placeholder.com/200x100/00BCF2/FFFFFF?text=Microsoft",
        website: "https://microsoft.com",
      },
      {
        name: "Amazon",
        logo: "https://via.placeholder.com/200x100/FF9900/FFFFFF?text=Amazon",
        website: "https://amazon.com",
      },
    ],
    gold: [
      {
        name: "Meta",
        logo: "https://via.placeholder.com/150x75/1877F2/FFFFFF?text=Meta",
        website: "https://meta.com",
      },
      {
        name: "Apple",
        logo: "https://via.placeholder.com/150x75/000000/FFFFFF?text=Apple",
        website: "https://apple.com",
      },
      {
        name: "Netflix",
        logo: "https://via.placeholder.com/150x75/E50914/FFFFFF?text=Netflix",
        website: "https://netflix.com",
      },
      {
        name: "Tesla",
        logo: "https://via.placeholder.com/150x75/CC0000/FFFFFF?text=Tesla",
        website: "https://tesla.com",
      },
    ],
    silver: [
      {
        name: "GitHub",
        logo: "https://via.placeholder.com/120x60/181717/FFFFFF?text=GitHub",
        website: "https://github.com",
      },
      {
        name: "Slack",
        logo: "https://via.placeholder.com/120x60/4A154B/FFFFFF?text=Slack",
        website: "https://slack.com",
      },
      {
        name: "Discord",
        logo: "https://via.placeholder.com/120x60/5865F2/FFFFFF?text=Discord",
        website: "https://discord.com",
      },
      {
        name: "Spotify",
        logo: "https://via.placeholder.com/120x60/1DB954/FFFFFF?text=Spotify",
        website: "https://spotify.com",
      },
      {
        name: "Adobe",
        logo: "https://via.placeholder.com/120x60/FF0000/FFFFFF?text=Adobe",
        website: "https://adobe.com",
      },
      {
        name: "Salesforce",
        logo: "https://via.placeholder.com/120x60/00A1E0/FFFFFF?text=Salesforce",
        website: "https://salesforce.com",
      },
    ],
    partners: [
      {
        name: "CSULB",
        logo: "https://via.placeholder.com/100x50/003366/FFFFFF?text=CSULB",
        website: "https://csulb.edu",
      },
      {
        name: "ACM",
        logo: "https://via.placeholder.com/100x50/FF6B35/FFFFFF?text=ACM",
        website: "https://acm.org",
      },
      {
        name: "IEEE",
        logo: "https://via.placeholder.com/100x50/00629B/FFFFFF?text=IEEE",
        website: "https://ieee.org",
      },
      {
        name: "DevPost",
        logo: "https://via.placeholder.com/100x50/003E54/FFFFFF?text=DevPost",
        website: "https://devpost.com",
      },
    ],
  };

  return (
    <section className="sponsors" id="sponsors">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Our Sponsors</h2>
          <p className="section-subtitle">
            Thank you to our amazing sponsors who make BeachHacks possible
          </p>
        </div>

        <div className="sponsor-tiers">
          <div className="sponsor-tier">
            <h3 className="tier-title platinum">Platinum Sponsors</h3>
            <div className="sponsor-logos platinum-logos">
              {sponsors.platinum.map((sponsor, index) => (
                <a
                  key={index}
                  href={sponsor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sponsor-logo platinum-logo"
                >
                  <img src={sponsor.logo} alt={sponsor.name} />
                </a>
              ))}
            </div>
          </div>

          <div className="sponsor-tier">
            <h3 className="tier-title gold">Gold Sponsors</h3>
            <div className="sponsor-logos gold-logos">
              {sponsors.gold.map((sponsor, index) => (
                <a
                  key={index}
                  href={sponsor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sponsor-logo gold-logo"
                >
                  <img src={sponsor.logo} alt={sponsor.name} />
                </a>
              ))}
            </div>
          </div>

          <div className="sponsor-tier">
            <h3 className="tier-title silver">Silver Sponsors</h3>
            <div className="sponsor-logos silver-logos">
              {sponsors.silver.map((sponsor, index) => (
                <a
                  key={index}
                  href={sponsor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sponsor-logo silver-logo"
                >
                  <img src={sponsor.logo} alt={sponsor.name} />
                </a>
              ))}
            </div>
          </div>

          <div className="sponsor-tier">
            <h3 className="tier-title partners">Partners</h3>
            <div className="sponsor-logos partners-logos">
              {sponsors.partners.map((sponsor, index) => (
                <a
                  key={index}
                  href={sponsor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sponsor-logo partners-logo"
                >
                  <img src={sponsor.logo} alt={sponsor.name} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="sponsors-cta">
          <h3>Interested in Sponsoring?</h3>
          <p>
            Join our community of sponsors and help us create an amazing
            experience for students
          </p>
          <div className="sponsor-benefits">
            <div className="benefit-item">
              <span className="benefit-icon">👥</span>
              <span className="benefit-text">Reach 500+ talented students</span>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">🎯</span>
              <span className="benefit-text">Recruit top talent</span>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">🚀</span>
              <span className="benefit-text">Showcase your technology</span>
            </div>
          </div>
          <button className="btn btn-primary">Become a Sponsor</button>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
