import React from "react";
import ASI1LogoWhite from "../../assets/ASI1_logo_white.svg";
import ASI1LogoBlack from "../../assets/ASI1_logo_black.svg";
import "./Sponsors.css";

export default function Sponsors() {
    return (
        <section className="bhx-section" id="sponsors">
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
                </div>
            </div>
        </section>
    );
}
