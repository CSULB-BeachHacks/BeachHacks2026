import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./Teams.css";

gsap.registerPlugin(ScrollTrigger);

const Teams = () => {
    const containerRef = useRef(null);
    const textPathRef = useRef(null);
    const bubblesContainerRef = useRef(null);
    const crabRef = useRef(null);

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

    // Bubble animation - bubbles coming out of the crab
    useEffect(() => {
        if (!bubblesContainerRef.current || !crabRef.current) return;

        const bubblesContainer = bubblesContainerRef.current;
        const crab = crabRef.current;

        const getCrabPosition = () => {
            const crabRect = crab.getBoundingClientRect();
            const containerRect = bubblesContainer.getBoundingClientRect();
            
            // Calculate crab center position relative to bubbles container
            const crabCenterX = crabRect.left - containerRect.left + crabRect.width / 2;
            const crabCenterY = crabRect.top - containerRect.top + crabRect.height / 2;
            
            return { x: crabCenterX, y: crabCenterY };
        };

        const createBubble = () => {
            const { x: crabCenterX, y: crabCenterY } = getCrabPosition();
            
            const bubble = document.createElement("img");
            bubble.src = "/bubbles-3.png";
            bubble.alt = "";
            bubble.className = "animated-bubble";
            bubblesContainer.appendChild(bubble);

            // Random size between 80px and 150px
            const size = Math.random() * 70 + 80;
            bubble.style.width = `${size}px`;
            bubble.style.height = "auto";

            // Random angle for bubble to float (prefer upward angles)
            const angle = (Math.random() * Math.PI * 1.5) - Math.PI * 0.25; // -45° to 135°
            const distance = 200 + Math.random() * 300; // Distance bubbles travel
            const endX = crabCenterX + Math.cos(angle) * distance;
            const endY = crabCenterY + Math.sin(angle) * distance - 200; // Float upward

            // Random duration between 2-4 seconds
            const duration = 2 + Math.random() * 2;

            // Start from crab center
            gsap.set(bubble, {
                x: crabCenterX - size / 2,
                y: crabCenterY - size / 2,
                opacity: 0,
                scale: 0.3,
            });

            // Animate bubble floating out
            gsap.to(bubble, {
                x: endX - size / 2,
                y: endY - size / 2,
                opacity: 0.8,
                scale: 1,
                duration: duration,
                ease: "power1.out",
                onComplete: () => {
                    bubble.remove();
                },
            });

            // Fade out near the end
            gsap.to(bubble, {
                opacity: 0,
                duration: 0.6,
                delay: duration - 0.6,
            });
        };

        // Wait a bit for layout to settle, then start creating bubbles
        const timeout = setTimeout(() => {
            // Create bubbles continuously
            const interval = setInterval(createBubble, 1200); // New bubble every 1.2 seconds

            // Store interval for cleanup
            bubblesContainer._bubbleInterval = interval;
        }, 500);

        return () => {
            clearTimeout(timeout);
            if (bubblesContainer._bubbleInterval) {
                clearInterval(bubblesContainer._bubbleInterval);
            }
            // Clean up any remaining bubbles
            const bubbles = bubblesContainer.querySelectorAll(".animated-bubble");
            bubbles.forEach((bubble) => bubble.remove());
        };
    }, []);

    // Placeholder members list
    const members = Array.from({ length: 10 }, (_, i) => `Member #${i + 1}`);
    const membersString = members.join(" \u2022 ");
    const fullText = `Created by BeachHacks 9.0 Committee \u2022 ${membersString} \u2022 ${membersString}`;

    return (
        <section className="teams" id="teams" ref={containerRef}>
            <div className="bubbles-container" ref={bubblesContainerRef}></div>

            <div className="container">
                <div className="teams-hero-wrapper">
                    <div className="crab-pyramid-container">
                        <img
                            ref={crabRef}
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
                                    fill="currentColor"
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
            
            <div className="teams-wave">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#D2C79A" fillOpacity="1" d="M0,96L80,106.7C160,117,320,139,480,138.7C640,139,800,117,960,96C1120,75,1280,53,1360,42.7L1440,32L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
                </svg>
            </div>
        </section>
    );
};

export default Teams;
