import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./Teams.css";

gsap.registerPlugin(ScrollTrigger);

const Teams = () => {
    const containerRef = useRef(null);
    const textPathRef = useRef(null);
    const bubblesWrapperRef = useRef(null);
    const crabRef = useRef(null);

    useGSAP(
        () => {
            const spinDuration = 12;
            const cutoffPoint = "-60%";

            // Infinite scrolling animation
            gsap.fromTo(
                textPathRef.current,
                { attr: { startOffset: "100%" } },
                {
                    attr: { startOffset: cutoffPoint },
                    duration: spinDuration,
                    repeat: -1,
                    ease: "none",
                },
            );
        },
        { scope: containerRef },
    );

    // Bubble animation - bubbles coming out of the crab
    useEffect(() => {
        const container = bubblesWrapperRef.current;
        if (!container) return;

        const createBubble = () => {
            const bubble = document.createElement("img");
            bubble.src = "/bubbles-3.png";
            bubble.alt = "";
            bubble.className = "animated-bubble";
            container.appendChild(bubble);

            // Random size between 40px and 80px
            const size = Math.random() * 40 + 40;
            bubble.style.width = `${size}px`;
            bubble.style.height = "auto";

            // Start near center (0,0 in the wrapper is the center of the crab)
            // No need for getBoundingClientRect as we are in a relative container
            const startX = (Math.random() - 0.5) * 40;
            const startY = (Math.random() - 0.5) * 40;

            // Random angle for bubble to float upwards and outwards
            // Move up significantly (-Y) and spread horizontally (X)
            const endX = (Math.random() - 0.5) * 400;
            const endY = -300 - Math.random() * 200;

            // Random duration between 3-5 seconds
            const duration = 3 + Math.random() * 2;

            // Initialize position
            gsap.set(bubble, {
                x: startX,
                y: startY,
                opacity: 0,
                scale: 0.2,
                position: "absolute",
                top: 0,
                left: 0,
            });

            // Animate
            const tl = gsap.timeline({
                onComplete: () => {
                    if (bubble.parentNode) bubble.remove();
                },
            });

            tl.to(bubble, {
                opacity: 0.8,
                scale: 1,
                duration: 0.5,
                ease: "power1.out",
            })
                .to(
                    bubble,
                    {
                        x: endX,
                        y: endY,
                        rotation: Math.random() * 90 - 45,
                        duration: duration,
                        ease: "power1.out",
                    },
                    "<",
                )
                .to(
                    bubble,
                    {
                        opacity: 0,
                        duration: 0.5,
                    },
                    `-=${0.5}`,
                );
        };

        const interval = setInterval(createBubble, 1200);
        return () => clearInterval(interval);
    }, []);

    const fullText =
        "BeachHacks 9.0 Committee • BeachHacks 9.0 Committee • BeachHacks 9.0 Committee • BeachHacks 9.0 Committee • BeachHacks 9.0 Committee • ";

    // List of committee members for the slider
    const committeeMembers = [
        {
            name: "Keshav Jindal",
            role: "Co-President",
            image: "/crabby_pyamid_1.png",
        },
        {
            name: "Winston Ta",
            role: "Co-President",
            image: "/crabby_pyamid_1.png",
        },
        {
            name: "Vansh Patel",
            role: "Tech Director",
            image: "/vansh_patel.jpeg",
            imageStyle: { transform: "scale(1.3)" },
        },
        {
            name: "Marisol Morales",
            role: "Logistics Director",
            image: "/marisol_morales.jpg",
        },
        {
            name: "Krisha Hemani",
            role: "Treasurer",
            image: "/crabby_pyamid_1.png",
        },
        {
            name: "Karan Verma",
            role: "Placeholder",
            image: "/karan_verma.jpg",
            imageStyle: { objectPosition: "70% 75%" },
        },
        {
            name: "Jesus Santiago",
            role: "Placeholder",
            image: "/jesus_santiago.png",
            imageStyle: {
                width: "100%",
                height: "auto",
                objectFit: "unset",
                transform: "scale(0.98) translateY(-7px)",
            },
        },
        {
            name: "Oscar Arenas",
            role: "Placeholder",
            image: "/oscar-arenas-head-shot.jpg",
            imageStyle: { objectPosition: "50% 35%" },
        },
        {
            name: "Sanchit Kaushik",
            role: "Placeholder",
            image: "/sanchit_kaushik.png",
            imageStyle: { transform: "scale(1.3)" },
        },
        {
            name: "Jaden Le",
            role: "Placeholder",
            image: "/jaden_le.jpg",
            imageStyle: { transform: "scale(1.3) translate(15px, -15px)" },
        },
    ];

    // Duplicate the list for seamless infinite scroll
    const sliderMembers = [
        ...committeeMembers,
        ...committeeMembers,
        ...committeeMembers,
    ];

    return (
        <section className="teams" id="teams" ref={containerRef}>
            <div className="container">
                <div className="teams-hero-wrapper">
                    <div className="crab-pyramid-container">
                        <div
                            className="bubbles-wrapper"
                            ref={bubblesWrapperRef}
                        ></div>
                        <img
                            draggable="false"
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
                    <path
                        fill="#D2C79A"
                        fillOpacity="1"
                        d="M0,96L80,106.7C160,117,320,139,480,138.7C640,139,800,117,960,96C1120,75,1280,53,1360,42.7L1440,32L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
                    ></path>
                </svg>
            </div>

            <div className="teams-ticker-container">
                <div className="teams-ticker-wrapper">
                    <div className="teams-ticker-track">
                        {sliderMembers.map((member, index) => (
                            <div className="team-member-card" key={index}>
                                <div className="member-image-wrapper">
                                    <img
                                        draggable="false"
                                        src={member.image}
                                        alt={member.name}
                                        className="member-image"
                                        style={member.imageStyle || {}}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.style.display = "none";
                                            e.target.parentNode.classList.add(
                                                "image-placeholder",
                                            );
                                        }}
                                    />
                                </div>
                                <h3 className="member-name">{member.name}</h3>
                                <p className="member-role">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Teams;
