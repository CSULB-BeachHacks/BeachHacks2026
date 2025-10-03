import React from "react";
import "./Speakers.css";

const Speakers = () => {
  const speakers = [
    {
      id: 1,
      name: "Sarah Chen",
      title: "Senior Software Engineer at Google",
      company: "Google",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      bio: "Expert in machine learning and AI applications with 8+ years experience",
      topics: ["AI/ML", "Software Engineering", "Career Growth"],
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      title: "CTO at TechStart",
      company: "TechStart",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      bio: "Serial entrepreneur and full-stack developer passionate about innovation",
      topics: ["Entrepreneurship", "Full-Stack", "Startups"],
    },
    {
      id: 3,
      name: "Dr. Emily Watson",
      title: "Research Scientist at MIT",
      company: "MIT",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      bio: "Leading researcher in quantum computing and cryptography",
      topics: ["Quantum Computing", "Cryptography", "Research"],
    },
    {
      id: 4,
      name: "Alex Kim",
      title: "Product Manager at Meta",
      company: "Meta",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      bio: "Product strategist with expertise in social media and user experience",
      topics: ["Product Management", "UX/UI", "Social Media"],
    },
    {
      id: 5,
      name: "Lisa Park",
      title: "Blockchain Developer at Coinbase",
      company: "Coinbase",
      image:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop&crop=face",
      bio: "Blockchain expert and advocate for decentralized technologies",
      topics: ["Blockchain", "Web3", "Cryptocurrency"],
    },
    {
      id: 6,
      name: "David Thompson",
      title: "Cybersecurity Consultant",
      company: "Independent",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
      bio: "Cybersecurity expert with 15+ years protecting enterprise systems",
      topics: ["Cybersecurity", "Ethical Hacking", "Network Security"],
    },
  ];

  return (
    <section className="speakers" id="speakers">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Featured Speakers</h2>
          <p className="section-subtitle">
            Learn from industry experts and thought leaders in technology
          </p>
        </div>

        <div className="speakers-grid">
          {speakers.map((speaker) => (
            <div key={speaker.id} className="speaker-card">
              <div className="speaker-image">
                <img src={speaker.image} alt={speaker.name} />
                <div className="speaker-overlay">
                  <div className="speaker-social">
                    <a href="#" className="social-link">
                      LinkedIn
                    </a>
                    <a href="#" className="social-link">
                      Twitter
                    </a>
                  </div>
                </div>
              </div>

              <div className="speaker-info">
                <h3 className="speaker-name">{speaker.name}</h3>
                <p className="speaker-title">{speaker.title}</p>
                <p className="speaker-company">{speaker.company}</p>

                <p className="speaker-bio">{speaker.bio}</p>

                <div className="speaker-topics">
                  {speaker.topics.map((topic, index) => (
                    <span key={index} className="topic-tag">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="speakers-cta">
          <h3>Want to speak at BeachHacks?</h3>
          <p>
            We're always looking for inspiring speakers to share their knowledge
            and experience
          </p>
          <button className="btn btn-primary">Apply to Speak</button>
        </div>
      </div>
    </section>
  );
};

export default Speakers;
