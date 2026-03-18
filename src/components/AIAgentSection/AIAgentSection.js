import React from "react";
import ASI1LogoWhite from "../../assets/ASI1_logo_white.svg";
import ASI1LogoBlack from "../../assets/ASI1_logo_black.svg";
import "./AIAgentSection.css";

const AIAgentSection = () => {
    return (
        <section className="ai-section" id="ai-agent">
            {/* background decoration */}
            <div className="ai-bg-grid" aria-hidden="true" />
            <div className="ai-bg-glow" aria-hidden="true" />

            <div className="container">
                <div className="ai-card">
                    {/* left column */}
                    <div className="ai-card-left">
                        {/* powered-by pill */}
                        <div className="ai-pill">
                            <span className="ai-pill-dot" />
                            <span>Powered by</span>
                            <img src={ASI1LogoWhite} alt="ASI:One" className="ai-pill-logo ai-pill-logo--white" />
                            <img src={ASI1LogoBlack} alt="ASI:One" className="ai-pill-logo ai-pill-logo--black" />
                            &amp; Agentverse
                        </div>

                        <h2 className="ai-heading">
                            Meet the<br />
                            <span className="ai-heading-accent">BeachHacks Agent</span>
                        </h2>

                        <p className="ai-body">
                            Chat with the BeachHacks AI agent to get instant answers about
                            schedules, venue details, logistics, and what to bring.
                            Access it through <strong>ASI:One</strong>, powered by Agentverse.
                        </p>

                        <a
                            href="https://fetch.ai/beachhacks"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ai-cta"
                        >
                            <svg className="ai-cta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                            </svg>
                            Chat with BeachHacks Agent
                            <svg className="ai-cta-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </a>
                    </div>

                    {/* right column: glowing logo */}
                    <div className="ai-card-right" aria-hidden="true">
                        <div className="ai-logo-ring ring-outer" />
                        <div className="ai-logo-ring ring-inner" />
                        <div className="ai-logo-circle">
                            <img src={ASI1LogoWhite} alt="ASI:One" className="ai-logo-big ai-logo-big--white" />
                            <img src={ASI1LogoBlack} alt="ASI:One" className="ai-logo-big ai-logo-big--black" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AIAgentSection;
