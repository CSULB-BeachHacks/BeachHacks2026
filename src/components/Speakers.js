import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./Speakers.css";

const Speakers = () => {
  const sectionRef = useRef(null);
  const crabRef = useRef(null);
  const speakerContainerRef = useRef(null);
  const floatingAnimationRef = useRef(null);
  const [currentSpeakerIndex, setCurrentSpeakerIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(false);

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
      { threshold: 0.35 }
    );

    observer.observe(sectionEl);
    return () => observer.disconnect();
  }, []);

  // GSAP continuous floating animation
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

  // GSAP spin animation when rotating
  useEffect(() => {
    if (!isRotating || !speakerContainerRef.current) return;

    const container = speakerContainerRef.current;

    // Pause floating animation during spin
    if (floatingAnimationRef.current) {
      floatingAnimationRef.current.pause();
    }

    // Create a dynamic spin animation with GSAP timeline
    const spinTimeline = gsap.timeline({
      onComplete: () => {
        // Reset rotation after spin completes
        gsap.set(container, { rotation: 0 });

        // Resume floating animation
        if (floatingAnimationRef.current) {
          floatingAnimationRef.current.resume();
        }
      },
    });

    spinTimeline.to(container, {
      rotation: 1080, // 3 full spins (1080 degrees)
      scale: 1,
      duration: 0.6,
      ease: "power2.out",
      force3D: true,
    });
  }, [isRotating]);

  // Speaker rotation timer
  useEffect(() => {
    const interval = setInterval(() => {
      setIsRotating(true);

      // After rotation animation completes, change speaker
      setTimeout(() => {
        setCurrentSpeakerIndex(
          (prevIndex) => (prevIndex + 1) % speakers.length
        );
        setIsRotating(false);
      }, 1200); // Rotation duration (matches GSAP animation duration)
    }, 7000); // Change every 7 seconds

    return () => clearInterval(interval);
  }, [speakers.length]);

  return (
    <section className="speakers" id="speakers" ref={sectionRef}>
      <div className="speakers-grid">
        <div className="row-top">
          <img
            ref={crabRef}
            src="/crab_waving.png"
            alt="Crab"
            className="crab-flow"
          />
          <h2 className="speakers-title">Speakers</h2>
          <img src="/purple_star.png" alt="Star" className="star-title" />
        </div>

        <div className="row-middle">
          <div ref={speakerContainerRef} className="floating-speaker-container">
            <div className="bubbles-wrap">
              <img
                src="/bubbles.png"
                alt="Bubbles"
                className="bubbles-center"
              />
              <img
                src={speakers[currentSpeakerIndex].image}
                alt="Speaker"
                className="speaker-photo"
              />
              <div className="speaker-text">
                <p className="speaker-description">
                  {speakers[currentSpeakerIndex].description}
                </p>
                <h3 className="speaker-name">
                  {speakers[currentSpeakerIndex].name}
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div className="row-bottom">
          <img src="/purple_star.png" alt="Star" className="star-flow" />
          <div className="kelp-wrap">
            <img src="/dark_blue_kelp.png" alt="Kelp" className="kelp-flow" />
            <img src="/bottom_rock.png" alt="Rock" className="bottom-rock" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Speakers;
