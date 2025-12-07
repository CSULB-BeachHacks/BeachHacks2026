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
                question: "What is a Hackathon?",
                answer: "Hackathons are events where programmers collaborate together to create new software and hardware projects. While websites and mobile apps are common types of projects, you are encouraged to build anything you can imagine. The goal is to learn new skills, meet fellow innovators, and leave with a functional prototype that didn't exist before the event started. ",
                star: purpleSmallStar,
            },
            {
                id: 2,
                question: "Who can come?",
                answer: "BeachHacks manages admissions carefully to ensure all hackers have a fair and equal opportunity to attend the event. However, to ensure a strong local presence and maintain a valuable experience for our host campus, we offer priority consideration to CSU Long Beach students who submit their applications by the specified priority deadline.",
                star: blueSmallStar,
            },
            {
                id: 3,
                question: "What does it cost?",
                answer: "BeachHacks is entirely complimentary for all admitted participants! Thanks to our amazing sponsors, we are thrilled to provide the full hackathon experience; including meals, exclusive swag, workshops, and prizes—at absolutely no expense to you. We are dedicated to making BeachHacks an accessible event for everyone.",
                star: cyanSmallStar,
            },
            {
                id: 4,
                question: "What is the BeachHacks code of conduct?",
                answer: "Our local code of conduct focuses on creating a friendly and respectful environment for everyone, and taking good care of the space. Crucially, all projects must be built from scratch during the hackathon. Using pre-built code or projects will lead to disqualification.",
                star: purpleSmallStar,
            },
            {
                id: 5,
                question: "What is the MLH Code of Conduct?",
                answer: (
                    <>
                        BeachHacks is an MLH Member Event, and all participants
                        must adhere to the Major League Hacking (MLH) Code of
                        Conduct, which ensures an inclusive and safe environment
                        for everyone. You can find the full text of the MLH Code
                        of Conduct here:{" "}
                        <a
                            href="https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md"
                            target="_blank"
                            rel="noreferrer"
                        >
                            https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md
                        </a>
                        <br /> TL;DR: Be respectful. Harassment and abuse are
                        never tolerated.
                    </>
                ),
                star: blueSmallStar,
            },
            {
                id: 6,
                question: "What if I don't know how to code?",
                answer: "BeachHacks is the perfect opportunity to learn! We highly encourage beginners to attend, as the environment is specifically designed for collaboration and education, meaning no prior experience is necessary. To help you get started, we provide beginner-friendly workshops covering fundamental skills and popular technologies. Additionally, dedicated mentors will be available throughout the event to answer your questions, troubleshoot issues, and guide you through the building process so you can leave with a project you can be proud of.",
                star: cyanSmallStar,
            },
            {
                id: 7,
                question: "What if I don't have a team?",
                answer: "You do not need to worry if you arrive without a team. Once you are accepted, we will have a dedicated channel on our Discord server for you to connect with other participants looking for collaborators before the event starts. Furthermore, we will designate a specific period during the opening of the hackathon for attendees to  find compatible teammates in person. You will have plenty of opportunities to find a great team before the hacking begins.",
                star: purpleSmallStar,
            },
            {
                id: 8,
                question: "What can I build?",
                answer: "Anything your imagination inspires! We fully support projects across all categories, including web applications, mobile apps, gaming, and more. To help spark your creativity, we will feature several project tracks that come with extra resources, dedicated sponsored challenges, and specialized workshops.",
                star: blueSmallStar,
            },
        ],
        registration: [
            {
                id: 9,
                question: "How do I register for BeachHacks?",
                answer: "[blank]",
                star: purpleSmallStar,
            },
            {
                id: 10,
                question: "Do I need a team to register?",
                answer: "[blank]",
                star: blueSmallStar,
            },
            {
                id: 11,
                question: "Is there a registration fee?",
                answer: "[blank]",
                star: cyanSmallStar,
            },
            {
                id: 12,
                question: "When does registration close?",
                answer: "[blank]",
                star: purpleSmallStar,
            },
            {
                id: 13,
                question: "What if I can't attend after registering?",
                answer: "[blank]",
                star: blueSmallStar,
            },
        ],
        tracks: [
            {
                id: 14,
                question: "What are hackathon tracks?",
                answer: "[blank]",
                star: purpleSmallStar,
            },
            {
                id: 15,
                question: "Can I switch tracks during the event?",
                answer: "[blank]",
                star: blueSmallStar,
            },
            {
                id: 16,
                question: "What are the available tracks?",
                answer: "[blank]",
                star: cyanSmallStar,
            },
            {
                id: 17,
                question: "What are the judging criteria?",
                answer: "[blank]",
                star: purpleSmallStar,
            },
            {
                id: 18,
                question: "Can I submit to multiple tracks?",
                answer: "[blank]",
                star: blueSmallStar,
            },
        ],
        location: [
            {
                id: 19,
                question: "Where is BeachHacks held?",
                answer: "[blank]",
                star: purpleSmallStar,
            },
            {
                id: 20,
                question: "Is parking available?",
                answer: "[blank]",
                star: blueSmallStar,
            },
            {
                id: 21,
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
