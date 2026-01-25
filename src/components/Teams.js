import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./Teams.css";

gsap.registerPlugin(ScrollTrigger);

const Teams = () => {
    const containerRef = useRef(null);
    const textPathRef = useRef(null);

    useGSAP(
        () => {
            // Infinite scrolling animation
            gsap.fromTo(
                textPathRef.current,
                { attr: { startOffset: "100%" } },
                {
                    attr: { startOffset: "-100%" },
                    duration: 20,
                    repeat: -1,
                    ease: "none",
                }
            );
        },
        { scope: containerRef }
    );

    // Placeholder members list
    const members = Array.from({ length: 10 }, (_, i) => `Member #${i + 1}`);
    const membersString = members.join(" \u2022 ");
    const fullText = `Created by BeachHacks 9.0 Committee \u2022 ${membersString} \u2022 ${membersString}`;

    return (
        <section className="teams" id="teams" ref={containerRef}>
            <div className="bubbles-container">
                <img
                    src="/bubbles-3.png"
                    alt=""
                    className="bubble bubble-top-right"
                />
                <img
                    src="/bubbles-3.png"
                    alt=""
                    className="bubble bubble-middle-left"
                />
                <img
                    src="/bubbles-3.png"
                    alt=""
                    className="bubble bubble-center-bottom"
                />
            </div>

            <div className="container">
                <div className="teams-hero-wrapper">
                    <div className="crab-pyramid-container">
                        <img
                            src="/crabby_pyamid_1.png"
                            alt="BeachHacks Crab Mascot"
                            className="crab-mascot"
                        />
                        <div className="rotating-text-ring">
                            <svg
                                viewBox="0 0 300 300"
                                className="text-ring-svg"
                            >
                                <defs>
                                    {/* Semi-circle arc path over the top */}
                                    <path
                                        id="arcPath"
                                        d="M 10, 200 A 140, 140 0 0, 1 290, 200"
                                        fill="none"
                                    />
                                </defs>
                                <text
                                    fill="#2c3e50"
                                    fontSize="14"
                                    fontWeight="bold"
                                    letterSpacing="2"
                                >
                                    <textPath
                                        href="#arcPath"
                                        startOffset="100%"
                                        ref={textPathRef}
                                        textAnchor="middle"
                                    >
                                        {fullText}
                                    </textPath>
                                </text>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Teams;
