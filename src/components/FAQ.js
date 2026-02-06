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
        all: [
            {
                id: 1,
                question: "What is a Hackathon?",
                answer: "Hackathons are events where programmers collaborate together to create new software and hardware projects. While websites and mobile apps are common types of projects, you are encouraged to build anything you can imagine. The goal is to learn new skills, meet fellow innovators, and leave with a functional prototype that didn't exist before the event started.",
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
                id: 8,
                question: "What can I build?",
                answer: "Anything your imagination inspires! We fully support projects across all categories, including web applications, mobile apps, gaming, and more. To help spark your creativity, we will feature several project tracks that come with extra resources, dedicated sponsored challenges, and specialized workshops.",
                star: blueSmallStar,
            },
            {
                id: 10,
                question: "Do I need a team to register?",
                answer: "No, you do not need a team to register! You can sign up individually. Teams can be formed before or during the event.",
                star: purpleSmallStar,
            },
            {
                id: 13,
                question: "What if I can't attend after registering?",
                answer: "If you can't make it, please let us know as soon as possible so we can offer your spot to someone on the waitlist.",
                star: blueSmallStar,
            },
            {
                id: 19,
                question: "Where is BeachHacks held?",
                answer: "BeachHacks is held at California State University, Long Beach (CSULB), at The Pointe (inside the Walter Pyramid).",
                star: cyanSmallStar,
            },
            {
                id: 20,
                question: "Is parking available?",
                answer: "For CSULB students, your current parking pass permit should be functional for the event. For Non-CSULB students, you may be required to pay for an overnight parking pass. Please refer to the CSULB Parking Enforcement page.",
                star: blueSmallStar,
            },
            {
                id: 21,
                question: "What facilities are not provided?",
                answer: "We do not provide computers, monitors, or sleeping gear (sleeping bags, pillows). Please bring your own laptop and charger!",
                star: purpleSmallStar,
            },
            {
                id: 15,
                question: "Can I switch tracks during the event?",
                answer: "Yes, as long as you finish the project and it is fully deployed at the end.",
                star: blueSmallStar,
            },
            {
                id: 18,
                question: "Can I submit to multiple tracks?",
                answer: "Yes, as long as your project is completely deployed at the end of the hackathon.",
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
                        draggable="false"
                        src={cyanStar}
                        alt="Cyan star"
                        className="header-star"
                    />
                </header>

                <div className="faq-single-column">
                    <ul className="faq-list">
                        {faqData.all.map((item) => (
                            <li key={item.id} className="faq-item">
                                <button
                                    className="faq-question"
                                    onClick={() => toggleItem(item.id)}
                                    aria-expanded={openItem === item.id}
                                    aria-controls={`faq-answer-${item.id}`}
                                >
                                    <img
                                        draggable="false"
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
                                    {typeof item.answer === "string" ? (
                                        <p>{item.answer}</p>
                                    ) : (
                                        <div className="answer-content">
                                            {item.answer}
                                        </div>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
