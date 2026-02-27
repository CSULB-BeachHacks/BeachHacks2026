import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./Speakers.css";

const Speakers = () => {
    const sectionRef = useRef(null);
    const crabRef = useRef(null);
    const speakerContainerRef = useRef(null);
    const contentRef = useRef(null);
    const floatingAnimationRef = useRef(null);
    const [currentSpeakerIndex, setCurrentSpeakerIndex] = useState(0);

    const speakers = [
        {
            name: "Daniel Keyes",
            description:
                "Passionate about technology and innovation, our featured speaker brings years of experience in software development and entrepreneurship.",
            image: "/speaker.jpg",
        },
        {
            name: "Bryant Pickford",
            description:
                "Leading expert in artificial intelligence and machine learning, with over 15 years of experience in cutting-edge research and development.",
            image: "/speaker2.jpg",
        },
        {
            name: "Mekhi Hart",
            description:
                "Full-stack developer and startup founder, specializing in web technologies and building scalable applications for modern businesses.",
            image: "/speaker3.jpg",
        },
    ];

    useEffect(() => {
        const sectionEl = sectionRef.current;
        const crabEl = crabRef.current;
        if (!sectionEl || !crabEl) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        crabEl.classList.remove("animate");
                        void crabEl.offsetWidth;
                        crabEl.classList.add("animate");
                    } else {
                        crabEl.classList.remove("animate");
                    }
                });
            },
            { threshold: 0.35 },
        );

        observer.observe(sectionEl);
        return () => observer.disconnect();
    }, []);

    // GSAP continuous floating animation (parent container)
    useEffect(() => {
        if (!speakerContainerRef.current) return;

        const container = speakerContainerRef.current;

        // Create continuous floating animation and store reference
        floatingAnimationRef.current = gsap.to(container, {
            y: -30,
            duration: 1.8,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
        });
    }, []);

    // Speaker transition animation (child content)
    useEffect(() => {
        const interval = setInterval(() => {
            if (!contentRef.current) return;

            // Optional: Pause parent floating for a cleaner "shoot up" effect
            if (floatingAnimationRef.current) {
                floatingAnimationRef.current.pause();
            }

            const tl = gsap.timeline({
                onComplete: () => {
                    // Resume floating
                    if (floatingAnimationRef.current) {
                        floatingAnimationRef.current.resume();
                    }
                },
            });

            // 1. Float UP and vanish (Exit)
            tl.to(contentRef.current, {
                y: -150,
                opacity: 0,
                duration: 0.5,
                ease: "power2.in",
            })
                .call(() => {
                    // 2. Change content state
                    setCurrentSpeakerIndex(
                        (prevIndex) => (prevIndex + 1) % speakers.length,
                    );
                })
                .set(contentRef.current, {
                    y: 150, // Move to bottom
                    opacity: 0,
                })
                // 3. Float In from bottom (Enter)
                .to(contentRef.current, {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "back.out(1)",
                });
        }, 5000); // Change every 5 seconds

        return () => clearInterval(interval);
    }, [speakers.length]);

    return (
        <section className="speakers" id="speakers" ref={sectionRef}>
            <div className="speakers-grid">
                <div className="row-top">
                    <img
                        draggable="false"
                        ref={crabRef}
                        src="/crab_waving.png"
                        alt="Crab"
                        className="crab-flow"
                    />
                    <h2 className="speakers-title">Speakers</h2>
                    <img
                        draggable="false"
                        src="/purple_star.png"
                        alt="Star"
                        className="star-title"
                    />
                </div>

                <div className="row-middle">
                    <div
                        ref={speakerContainerRef}
                        className="floating-speaker-container"
                    >
                        <div className="bubbles-wrap" ref={contentRef}>
                            <img
                                draggable="false"
                                src="/bubbles.png"
                                alt="Bubbles"
                                className="bubbles-center"
                            />

                            {/* Top Left: Speaker Image */}
                            <img
                                draggable="false"
                                src={speakers[currentSpeakerIndex].image}
                                alt="Speaker"
                                className="speaker-photo"
                            />

                            {/* Middle Right: Speaker Name */}
                            <h3 className="speaker-name">
                                {speakers[currentSpeakerIndex].name}
                            </h3>

                            {/* Bottom Left: Speaker Description */}
                            <p className="speaker-description">
                                {speakers[currentSpeakerIndex].description}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="row-bottom">
                    <img
                        draggable="false"
                        src="/purple_star.png"
                        alt="Star"
                        className="star-flow"
                    />
                    <div className="kelp-wrap">
                        <img
                            draggable="false"
                            src="/dark_blue_kelp.png"
                            alt="Kelp"
                            className="kelp-flow"
                        />
                        <img
                            draggable="false"
                            src="/dark_blue_kelp.png"
                            alt="Kelp overlay"
                            className="kelp-flow kelp-flow-overlay"
                        />
                        <img
                            draggable="false"
                            src="/bottom_rock.png"
                            alt="Rock"
                            className="bottom-rock"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Speakers;
