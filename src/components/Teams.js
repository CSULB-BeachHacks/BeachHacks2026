import React from "react";
import "./Teams.css";

const Teams = () => {
  const organizers = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Director",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      bio: "Computer Science student passionate about organizing amazing tech events",
      social: { linkedin: "#", twitter: "#" },
    },
    {
      id: 2,
      name: "Sarah Martinez",
      role: "Co-Director",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      bio: "Software Engineering major with experience in event planning and community building",
      social: { linkedin: "#", twitter: "#" },
    },
    {
      id: 3,
      name: "David Chen",
      role: "Tech Lead",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      bio: "Full-stack developer and hackathon enthusiast with 5+ years of experience",
      social: { linkedin: "#", twitter: "#" },
    },
    {
      id: 4,
      name: "Emily Rodriguez",
      role: "Marketing Lead",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      bio: "Marketing and Communications student focused on growing the tech community",
      social: { linkedin: "#", twitter: "#" },
    },
    {
      id: 5,
      name: "Michael Kim",
      role: "Sponsorship Lead",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
      bio: "Business student with a passion for connecting companies with talented students",
      social: { linkedin: "#", twitter: "#" },
    },
    {
      id: 6,
      name: "Lisa Wang",
      role: "Operations Lead",
      image:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop&crop=face",
      bio: "Project management expert ensuring smooth execution of all hackathon activities",
      social: { linkedin: "#", twitter: "#" },
    },
  ];

  const committees = [
    {
      name: "Technical Committee",
      description:
        "Handles all technical aspects including platform setup, judging, and technical workshops",
      members: 8,
      color: "#3498db",
    },
    {
      name: "Marketing Committee",
      description:
        "Responsible for social media, outreach, and promoting the hackathon",
      members: 6,
      color: "#e74c3c",
    },
    {
      name: "Logistics Committee",
      description:
        "Manages venue, food, swag, and all operational aspects of the event",
      members: 10,
      color: "#27ae60",
    },
    {
      name: "Sponsorship Committee",
      description:
        "Builds relationships with companies and secures funding for the event",
      members: 5,
      color: "#f39c12",
    },
  ];

  return (
    <section className="teams" id="teams">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Meet Our Team</h2>
          <p className="section-subtitle">
            The passionate students behind BeachHacks 2026
          </p>
        </div>

        <div className="organizers-section">
          <h3 className="subsection-title">Organizing Team</h3>
          <div className="organizers-grid">
            {organizers.map((organizer) => (
              <div key={organizer.id} className="organizer-card">
                <div className="organizer-image">
                  <img src={organizer.image} alt={organizer.name} />
                  <div className="organizer-overlay">
                    <div className="organizer-social">
                      <a
                        href={organizer.social.linkedin}
                        className="social-link"
                      >
                        LinkedIn
                      </a>
                      <a
                        href={organizer.social.twitter}
                        className="social-link"
                      >
                        Twitter
                      </a>
                    </div>
                  </div>
                </div>

                <div className="organizer-info">
                  <h4 className="organizer-name">{organizer.name}</h4>
                  <p className="organizer-role">{organizer.role}</p>
                  <p className="organizer-bio">{organizer.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="committees-section">
          <h3 className="subsection-title">Committees</h3>
          <div className="committees-grid">
            {committees.map((committee, index) => (
              <div
                key={index}
                className="committee-card"
                style={{ "--committee-color": committee.color }}
              >
                <div className="committee-header">
                  <div
                    className="committee-icon"
                    style={{ backgroundColor: committee.color }}
                  >
                    {committee.name.charAt(0)}
                  </div>
                  <h4 className="committee-name">{committee.name}</h4>
                </div>

                <p className="committee-description">{committee.description}</p>

                <div className="committee-meta">
                  <span className="member-count">
                    {committee.members} members
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="teams-cta">
          <h3>Want to Join Our Team?</h3>
          <p>
            We're always looking for passionate students to help organize
            BeachHacks
          </p>
          <div className="join-benefits">
            <div className="benefit-item">
              <span className="benefit-icon">🎯</span>
              <span className="benefit-text">Gain leadership experience</span>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">🤝</span>
              <span className="benefit-text">
                Network with industry professionals
              </span>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">🚀</span>
              <span className="benefit-text">Make a lasting impact</span>
            </div>
          </div>
          <button className="btn btn-primary">Join Our Team</button>
        </div>
      </div>
    </section>
  );
};

export default Teams;
