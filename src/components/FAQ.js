import React, { useState } from "react";
import "./FAQ.css";

// Import images
import blueSmallStar from "./FAQ-images/blue_small_star.png";
import cyanSmallStar from "./FAQ-images/cyan_small_star.png";
import cyanStar from "./FAQ-images/cyan_star.png";
import purpleSmallStar from "./FAQ-images/purple_small_star.png";

const FAQ = () => {
    const [openItem, setOpenItem] = useState(null);

    const faqData = {
        general: [
            {
                id: 1,
                question: "Who can participate in BeachHacks?",
                answer: "[blank]",
                star: purpleSmallStar,
            },
            {
                id: 2,
                question: "What should I bring to the hackathon?",
                answer: "[blank]",
                star: blueSmallStar,
            },
            {
                id: 3,
                question: "Will there be food provided?",
                answer: "[blank]",
                star: cyanSmallStar,
            },
            {
                id: 4,
                question: "What if I'm new to coding?",
                answer: "[blank]",
                star: purpleSmallStar,
            },
            {
                id: 5,
                question: "Can I work on existing projects?",
                answer: "[blank]",
                star: blueSmallStar,
            },
        ],
        registration: [
            {
                id: 6,
                question: "How do I register for BeachHacks?",
                answer: "[blank]",
                star: purpleSmallStar,
            },
            {
                id: 7,
                question: "Do I need a team to register?",
                answer: "[blank]",
                star: blueSmallStar,
            },
            {
                id: 8,
                question: "Is there a registration fee?",
                answer: "[blank]",
                star: cyanSmallStar,
            },
            {
                id: 9,
                question: "When does registration close?",
                answer: "[blank]",
                star: purpleSmallStar,
            },
            {
                id: 10,
                question: "What if I can't attend after registering?",
                answer: "[blank]",
                star: blueSmallStar,
            },
        ],
        tracks: [
            {
                id: 11,
                question: "What are hackathon tracks?",
                answer: "[blank]",
                star: purpleSmallStar,
            },
            {
                id: 12,
                question: "Can I switch tracks during the event?",
                answer: "[blank]",
                star: blueSmallStar,
            },
            {
                id: 13,
                question: "What are the available tracks?",
                answer: "[blank]",
                star: cyanSmallStar,
            },
            {
                id: 14,
                question: "What are the judging criteria?",
                answer: "[blank]",
                star: purpleSmallStar,
            },
            {
                id: 15,
                question: "Can I submit to multiple tracks?",
                answer: "[blank]",
                star: blueSmallStar,
            },
        ],
        location: [
            {
                id: 16,
                question: "Where is BeachHacks held?",
                answer: "[blank]",
                star: purpleSmallStar,
            },
            {
                id: 17,
                question: "Is parking available?",
                answer: "[blank]",
                star: blueSmallStar,
            },
            {
                id: 18,
                question: "What facilities are provided?",
                answer: "[blank]",
                star: cyanSmallStar,
            },
        ],
    };

    const toggleItem = (id) => {
        setOpenItem(openItem === id ? null : id);
    };

    return (
        <section className="faq" id="faq" aria-labelledby="faq-main-title">
            <div className="container">
                <header className="faq-header">
                    <h2 id="faq-main-title" className="faq-title">
                        FAQ
                    </h2>
                    <img
                        src={cyanStar}
                        alt="Cyan star"
                        className="header-star"
                    />
                </header>

                <div className="faq-grid">
                    <section
                        className="faq-column"
                        aria-labelledby="general-title"
                    >
                        <h3 id="general-title" className="column-title">
                            GENERAL
                        </h3>
                        <ul className="faq-list">
                            {faqData.general.map((item) => (
                                <li key={item.id} className="faq-item">
                                    <button
                                        className="faq-question"
                                        onClick={() => toggleItem(item.id)}
                                        aria-expanded={openItem === item.id}
                                        aria-controls={`faq-answer-${item.id}`}
                                    >
                                        <img
                                            src={item.star}
                                            alt=""
                                            className="question-star"
                                        />
                                        <span className="question-text">
                                            {item.question}
                                        </span>
                                    </button>
                                    <div
                                        id={`faq-answer-${item.id}`}
                                        className={`faq-answer ${
                                            openItem === item.id ? "open" : ""
                                        }`}
                                        role="region"
                                    >
                                        <p>{item.answer}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section
                        className="faq-column"
                        aria-labelledby="registration-title"
                    >
                        <h3 id="registration-title" className="column-title">
                            REGISTRATION
                        </h3>
                        <ul className="faq-list">
                            {faqData.registration.map((item) => (
                                <li key={item.id} className="faq-item">
                                    <button
                                        className="faq-question"
                                        onClick={() => toggleItem(item.id)}
                                        aria-expanded={openItem === item.id}
                                        aria-controls={`faq-answer-${item.id}`}
                                    >
                                        <img
                                            src={item.star}
                                            alt=""
                                            className="question-star"
                                        />
                                        <span className="question-text">
                                            {item.question}
                                        </span>
                                    </button>
                                    <div
                                        id={`faq-answer-${item.id}`}
                                        className={`faq-answer ${
                                            openItem === item.id ? "open" : ""
                                        }`}
                                        role="region"
                                    >
                                        <p>{item.answer}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section
                        className="faq-column"
                        aria-labelledby="tracks-title"
                    >
                        <h3 id="tracks-title" className="column-title">
                            TRACKS
                        </h3>
                        <ul className="faq-list">
                            {faqData.tracks.map((item) => (
                                <li key={item.id} className="faq-item">
                                    <button
                                        className="faq-question"
                                        onClick={() => toggleItem(item.id)}
                                        aria-expanded={openItem === item.id}
                                        aria-controls={`faq-answer-${item.id}`}
                                    >
                                        <img
                                            src={item.star}
                                            alt=""
                                            className="question-star"
                                        />
                                        <span className="question-text">
                                            {item.question}
                                        </span>
                                    </button>
                                    <div
                                        id={`faq-answer-${item.id}`}
                                        className={`faq-answer ${
                                            openItem === item.id ? "open" : ""
                                        }`}
                                        role="region"
                                    >
                                        <p>{item.answer}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section
                        className="faq-column"
                        aria-labelledby="location-title"
                    >
                        <h3 id="location-title" className="column-title">
                            LOCATION
                        </h3>
                        <ul className="faq-list">
                            {faqData.location.map((item) => (
                                <li key={item.id} className="faq-item">
                                    <button
                                        className="faq-question"
                                        onClick={() => toggleItem(item.id)}
                                        aria-expanded={openItem === item.id}
                                        aria-controls={`faq-answer-${item.id}`}
                                    >
                                        <img
                                            src={item.star}
                                            alt=""
                                            className="question-star"
                                        />
                                        <span className="question-text">
                                            {item.question}
                                        </span>
                                    </button>
                                    <div
                                        id={`faq-answer-${item.id}`}
                                        className={`faq-answer ${
                                            openItem === item.id ? "open" : ""
                                        }`}
                                        role="region"
                                    >
                                        <p>{item.answer}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
