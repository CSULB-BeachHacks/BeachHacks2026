import React from "react";
import ASI1LogoWhite from "../../assets/ASI1_logo_white.svg";
import ASI1LogoBlack from "../../assets/ASI1_logo_black.svg";
import "./Sponsors.css";

const PAST_SPONSORS = [
    { src: "/past-sponsor-Google-logo.png", alt: "Google", link: "https://google.com/", scale: 1.6 },
    { src: "/past-sponsor-balsamiq-logo.png", alt: "Balsamiq", link: "https://balsamiq.com/", scale: 1.0 },
    { src: "/past-sponsor-GitHub-logo.png", alt: "GitHub", link: "https://github.com/", scale: 1.0 },
    { src: "/past_sponsor_interview_cake.png", alt: "Interview Cake", link: "https://www.interviewcake.com/", scale: 1.3 },
    { src: "/past-sponsor-Boot-Dev-logo.png", alt: "Boot.dev", link: "https://www.boot.dev/", scale: 1.8 },
    { src: "/past-sponsor-code_path-logo.png", alt: "CodePath", link: "https://www.codepath.org/", scale: 1.5 },
    { src: "/past-sponsor-Code-and-Coffee-logo.svg", alt: "Code and Coffee", link: "https://www.codeandcoffee.dev/", scale: 1.4 },
    { src: "/past-sponsor-Dain-Ai-logo.png", alt: "Dain AI", link: "https://dain.org/", scale: 1.2 },
    { src: "/past-sponsor-Patient-Safety-Technology-logo.png", alt: "Patient Safety Technology", link: "https://www.patientsafetytech.com/", scale: 1.4 },
    { src: "/past-sponsor-Bazalu-logo.png", alt: "Bazalu", link: "https://www.bazalu.com/", scale: 1.5 },
    { src: "/past-sponsor-csulb-coe-logo.png", alt: "CSULB COE", link: "https://www.asicsulb.org/corporate/", scale: 1.3 },
    { src: "/past-sponsor-asi-logo.png", alt: "ASI", link: "https://www.asicsulb.org/corporate/", scale: 1.5 },
    { src: "/past-sponsor-csulb-cybersecurity-club.png", alt: "CSULB Cybersecurity Club", link: "https://linktr.ee/csulbcybersecurity", scale: 1.6 },
];

export default function Sponsors() {
    return (
        <section className="bhx-section bhx-sponsors-section" id="sponsors">
            <div className="bhx-inner">
                <h2 className="bhx-title">Sponsors</h2>
                <div className="bhx-sponsors-grid">
                    <a href="https://fetch.ai/" target="_blank" rel="noopener noreferrer" className="bhx-sponsor-link">
                        <img src="/Primary_logo_white.svg" alt="Fetch.ai" className="bhx-sponsor-logo bhx-sponsor-logo--fetch-white" />
                        <img src="/Primary_logo_navy.svg" alt="Fetch.ai" className="bhx-sponsor-logo bhx-sponsor-logo--fetch-navy" />
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
                                className={`bhx-past-sponsor-item ${sponsor.bright ? "bhx-past-sponsor-item--bright" : ""}`}
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
                                        className="bhx-past-sponsor-logo"
                                        style={{ transform: `scale(${sponsor.scale || 1})` }}
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
