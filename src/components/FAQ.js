import React, { useState } from "react";
import "./FAQ.css";

const FAQ = () => {
  const [openItem, setOpenItem] = useState(null);

  const faqData = {
    general: [
      {
        id: 1,
        question: "Who can participate in BeachHacks?",
        answer: "[blank]",
        star: "purple_small_star.png"
      },
      {
        id: 2,
        question: "What should I bring to the hackathon?", 
        answer: "[blank]",
        star: "blue_small_star.png"
      },
      {
        id: 3,
        question: "Will there be food provided?",
        answer: "[blank]",
        star: "cyan_small_star.png"
      },
      {
        id: 4,
        question: "What if I'm new to coding?",
        answer: "[blank]",
        star: "purple_small_star.png"
      },
      {
        id: 5,
        question: "Can I work on existing projects?",
        answer: "[blank]",
        star: "blue_small_star.png"
      }
    ],
    registration: [
      {
        id: 6,
        question: "How do I register for BeachHacks?",
        answer: "[blank]",
        star: "purple_small_star.png"
      },
      {
        id: 7,
        question: "Do I need a team to register?",
        answer: "[blank]",
        star: "blue_small_star.png"
      },
      {
        id: 8,
        question: "Is there a registration fee?",
        answer: "[blank]",
        star: "cyan_small_star.png"
      },
      {
        id: 9,
        question: "When does registration close?",
        answer: "[blank]",
        star: "purple_small_star.png"
      },
      {
        id: 10,
        question: "What if I can't attend after registering?",
        answer: "[blank]",
        star: "blue_small_star.png"
      }
    ],
    tracks: [
      {
        id: 11,
        question: "What are hackathon tracks?",
        answer: "[blank]",
        star: "purple_small_star.png"
      },
      {
        id: 12,
        question: "Can I switch tracks during the event?",
        answer: "[blank]",
        star: "blue_small_star.png"
      },
      {
        id: 13,
        question: "What are the available tracks?",
        answer: "[blank]",
        star: "cyan_small_star.png"
      },
      {
        id: 14,
        question: "What are the judging criteria?",
        answer: "[blank]",
        star: "purple_small_star.png"
      },
      {
        id: 15,
        question: "Can I submit to multiple tracks?",
        answer: "[blank]",
        star: "blue_small_star.png"
      }
    ],
    location: [
      {
        id: 16,
        question: "Where is BeachHacks held?",
        answer: "[blank]",
        star: "purple_small_star.png"
      },
      {
        id: 17,
        question: "Is parking available?",
        answer: "[blank]",
        star: "blue_small_star.png"
      },
      {
        id: 18,
        question: "What facilities are provided?",
        answer: "[blank]",
        star: "cyan_small_star.png"
      }
    ]
  };

  const toggleItem = (id) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <section className="faq" id="faq">
      <div className="container">
        <div className="faq-header">
          <h2 className="faq-title">FAQ</h2>
          <img src="/cyan_star.png" alt="Cyan star" className="header-star" />
        </div>

        <div className="faq-grid">
          <div className="faq-column">
            <h3 className="column-title">GENERAL</h3>
            {faqData.general.map((item) => (
              <div key={item.id} className="faq-item">
                <div className="faq-question" onClick={() => toggleItem(item.id)}>
                  <img src={`/${item.star}`} alt="Star" className="question-star" />
                  <span className="question-text">{item.question}</span>
                </div>
                <div className={`faq-answer ${openItem === item.id ? "open" : ""}`}>
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="faq-column">
            <h3 className="column-title">REGISTRATION</h3>
            {faqData.registration.map((item) => (
              <div key={item.id} className="faq-item">
                <div className="faq-question" onClick={() => toggleItem(item.id)}>
                  <img src={`/${item.star}`} alt="Star" className="question-star" />
                  <span className="question-text">{item.question}</span>
                </div>
                <div className={`faq-answer ${openItem === item.id ? "open" : ""}`}>
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="faq-column">
            <h3 className="column-title">TRACKS</h3>
            {faqData.tracks.map((item) => (
              <div key={item.id} className="faq-item">
                <div className="faq-question" onClick={() => toggleItem(item.id)}>
                  <img src={`/${item.star}`} alt="Star" className="question-star" />
                  <span className="question-text">{item.question}</span>
                </div>
                <div className={`faq-answer ${openItem === item.id ? "open" : ""}`}>
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="faq-column">
            <h3 className="column-title">LOCATION</h3>
            {faqData.location.map((item) => (
              <div key={item.id} className="faq-item">
                <div className="faq-question" onClick={() => toggleItem(item.id)}>
                  <img src={`/${item.star}`} alt="Star" className="question-star" />
                  <span className="question-text">{item.question}</span>
                </div>
                <div className={`faq-answer ${openItem === item.id ? "open" : ""}`}>
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
