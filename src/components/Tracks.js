import React from "react";
import "./Tracks.css";

const Tracks = () => {
  const tracks = [
    {
      id: 1,
      title: "Web Development",
      description:
        "Build innovative web applications using modern frameworks and technologies",
      technologies: ["React", "Node.js", "Python", "JavaScript"],
      color: "#3498db",
    },
    {
      id: 2,
      title: "Mobile Development",
      description: "Create mobile apps for iOS and Android platforms",
      technologies: ["React Native", "Flutter", "Swift", "Kotlin"],
      color: "#e74c3c",
    },
    {
      id: 3,
      title: "AI & Machine Learning",
      description:
        "Develop intelligent solutions using artificial intelligence and machine learning",
      technologies: ["Python", "TensorFlow", "PyTorch", "OpenAI"],
      color: "#9b59b6",
    },
    {
      id: 4,
      title: "Blockchain & Web3",
      description:
        "Explore decentralized applications and blockchain technology",
      technologies: ["Solidity", "Ethereum", "Web3.js", "IPFS"],
      color: "#f39c12",
    },
    {
      id: 5,
      title: "Data Science",
      description:
        "Analyze data and create insights using data science techniques",
      technologies: ["Python", "R", "SQL", "Pandas"],
      color: "#27ae60",
    },
    {
      id: 6,
      title: "Cybersecurity",
      description:
        "Protect systems and data from cyber threats and vulnerabilities",
      technologies: ["Python", "C++", "Linux", "Cryptography"],
      color: "#e67e22",
    },
  ];

  return (
    <section className="tracks" id="tracks">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Competition Tracks</h2>
          <p className="section-subtitle">
            Choose your path and showcase your skills in specialized categories
          </p>
        </div>

        <div className="tracks-grid">
          {tracks.map((track) => (
            <div
              key={track.id}
              className="track-card"
              style={{ "--track-color": track.color }}
            >
              <div className="track-header">
                <div
                  className="track-icon"
                  style={{ backgroundColor: track.color }}
                >
                  {track.title.charAt(0)}
                </div>
                <h3 className="track-title">{track.title}</h3>
              </div>

              <p className="track-description">{track.description}</p>

              <div className="track-technologies">
                <h4 className="tech-title">Technologies:</h4>
                <div className="tech-tags">
                  {track.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <button className="track-button">Learn More</button>
            </div>
          ))}
        </div>

        <div className="tracks-cta">
          <h3>Ready to compete?</h3>
          <p>
            Register now and choose your track to get started on your hackathon
            journey!
          </p>
          <button className="btn btn-primary">Register Now</button>
        </div>
      </div>
    </section>
  );
};

export default Tracks;
