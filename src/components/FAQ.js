import React, { useState } from "react";
import "./FAQ.css";

const FAQ = () => {
  const [openItem, setOpenItem] = useState(null);

  const faqData = [
    {
      id: 1,
      question: "Who can participate in BeachHacks?",
      answer:
        "BeachHacks is open to all students currently enrolled in high school, undergraduate, or graduate programs. We welcome participants from all backgrounds and skill levels, from beginners to experienced developers.",
    },
    {
      id: 2,
      question: "Do I need to have a team before registering?",
      answer:
        "No, you don't need a team before registering! You can register individually and we'll help you find teammates during our team formation activities. Teams can have 1-4 members.",
    },
    {
      id: 3,
      question: "What should I bring to the hackathon?",
      answer:
        "Bring your laptop, charger, and any other equipment you need for coding. We'll provide meals, snacks, drinks, and a comfortable workspace. Don't forget to bring a valid student ID!",
    },
    {
      id: 4,
      question: "Is there a registration fee?",
      answer:
        "BeachHacks is completely free to attend! We provide meals, snacks, swag, and prizes at no cost to participants. We believe in making hackathons accessible to everyone.",
    },
    {
      id: 5,
      question: "What if I'm new to coding?",
      answer:
        "No problem! BeachHacks is beginner-friendly. We'll have workshops, mentors, and experienced participants to help you learn. Many successful projects have been built by first-time hackers!",
    },
    {
      id: 6,
      question: "What are the judging criteria?",
      answer:
        "Projects are judged based on technical innovation, creativity, impact, and execution. We have different tracks with specific criteria, and judges include industry professionals and academic experts.",
    },
    {
      id: 7,
      question: "Will there be food provided?",
      answer:
        "Yes! We provide all meals during the 36-hour event, including breakfast, lunch, dinner, and snacks. We accommodate various dietary restrictions and preferences.",
    },
    {
      id: 8,
      question: "Can I work on a project I started before the hackathon?",
      answer:
        "No, all projects must be built during the 36-hour hackathon period. However, you can use pre-existing libraries, frameworks, and tools. The idea and implementation should be original to the hackathon.",
    },
  ];

  const toggleItem = (id) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <section className="faq" id="faq">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Everything you need to know about BeachHacks 2026
          </p>
        </div>

        <div className="faq-container">
          {faqData.map((item) => (
            <div key={item.id} className="faq-item">
              <div className="faq-question" onClick={() => toggleItem(item.id)}>
                <h3>{item.question}</h3>
                <span
                  className={`faq-icon ${openItem === item.id ? "open" : ""}`}
                >
                  +
                </span>
              </div>

              <div
                className={`faq-answer ${openItem === item.id ? "open" : ""}`}
              >
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="faq-cta">
          <h3>Still have questions?</h3>
          <p>Don't hesitate to reach out to us. We're here to help!</p>
          <div className="contact-info">
            <div className="contact-item">
              <span className="contact-label">Email:</span>
              <a href="mailto:info@beachhacks.com" className="contact-link">
                info@beachhacks.com
              </a>
            </div>
            <div className="contact-item">
              <span className="contact-label">Discord:</span>
              <a href="#" className="contact-link">
                Join our server
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
