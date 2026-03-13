import React from "react";
import ASI1LogoWhite from "../../assets/ASI1_logo_white.svg";
import ASI1LogoBlack from "../../assets/ASI1_logo_black.svg";
import "./Sponsors.css";

const PAST_SPONSORS = [
    {
        src: "/past-sponsor-Google-logo.png",
        alt: "Google",
        large: true,
        link: "https://google.com/",
    },
    {
        src: "/past-sponsor-balsamiq-logo.png",
        alt: "Balsamiq",
        link: "https://balsamiq.com/",
    },
    {
        src: "/past-sponsor-GitHub-logo.png",
        alt: "GitHub",
        large: true,
        link: "https://github.com/",
    },
    {
        src: "/past-sponsor-Interview-Cake-logo.png",
        alt: "Interview Cake",
        link: "https://www.interviewcake.com/",
    },
    {
        src: "/past-sponsor-Boot-Dev-logo.png",
        alt: "Boot.dev",
        large: true,
        link: "https://www.boot.dev/",
    },
    {
        src: "/past-sponsor-code_path-logo.png",
        alt: "CodePath",
        link: "https://www.codepath.org/",
    },
    {
        src: "/past-sponsor-Code-and-Coffee-logo.svg",
        alt: "Code and Coffee",
        large: true,
        link: "https://www.codeandcoffee.dev/",
    },
    {
        src: "/past-sponsor-Dain-Ai-logo.png",
        alt: "Dain AI",
        link: "https://dain.org/",
    },
    {
        src: "/past-sponsor-Patient-Safety-Technology-logo.png",
        alt: "Patient Safety Technology",
        large: true,
        link: "https://www.patientsafetytech.com/",
    },
    {
        src: "/past-sponsor-Bazalu-logo.png",
        alt: "Bazalu",
        link: "https://www.bazalu.com/",
    },
    {
        src: "/past-sponsor-csulb-coe-logo.png",
        alt: "CSULB COE",
        large: true,
        link: "https://www.asicsulb.org/corporate/",
    },
    {
        src: "/past-sponsor-asi-logo.png",
        alt: "ASI",
        large: true,
        link: "https://www.asicsulb.org/corporate/",
    },
    {
        src: "/past-sponsor-csulb-cybersecurity-club.png",
        alt: "CSULB Cybersecurity Club",
        large: true,
        link: "https://linktr.ee/csulbcybersecurity",
    },
];

export default function Sponsors() {
    return (
        <section className="bhx-section bhx-sponsors-section" id="sponsors">
            <div className="bhx-inner">
                <h2 className="bhx-title">Sponsors</h2>
                <div className="bhx-sponsors-grid">
                    <a href="https://fetch.ai/" target="_blank" rel="noopener noreferrer" className="bhx-sponsor-link">
                        <img src="/fetch_ai.webp" alt="Fetch.ai" className="bhx-sponsor-logo" />
                    </a>
                    <a href="https://asi1.ai/" target="_blank" rel="noopener noreferrer" className="bhx-sponsor-link">
                        <img src={ASI1LogoWhite} alt="ASI:One" className="bhx-sponsor-logo bhx-sponsor-logo--asi-white" />
                        <img src={ASI1LogoBlack} alt="ASI:One" className="bhx-sponsor-logo bhx-sponsor-logo--asi-black" />
                    </a>
                    <a href="https://codeandcoffee.dev/" target="_blank" rel="noopener noreferrer" className="bhx-sponsor-link">
                        <img src="/past-sponsor-Code-and-Coffee-logo.svg" alt="Code and Coffee" className="bhx-sponsor-logo bhx-sponsor-logo--coffee" />
                    </a>
                </div>
                <div className="bhx-past-sponsors" id="past-sponsors">
                    <h2 className="bhx-title bhx-title--past">Past Sponsors</h2>
                    <div className="bhx-past-sponsors-grid">
                        {PAST_SPONSORS.map((sponsor, index) => (
                            <div
                                key={sponsor.alt}
                                className="bhx-past-sponsor-item"
                                style={{
                                    animationDelay: `${(index % 5) * 0.4}s`,
                                }}
                            >
                                <a
                                    href={sponsor.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ display: "contents" }}
                                >
                                    <img
                                        src={sponsor.src}
                                        alt={sponsor.alt}
                                        className={`bhx-past-sponsor-logo ${sponsor.large ? "bhx-past-sponsor-logo--large" : ""}`}
                                    />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
