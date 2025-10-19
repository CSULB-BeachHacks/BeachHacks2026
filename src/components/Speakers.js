import React, { useEffect, useRef, useState } from "react";
import "./Speakers.css";

const Speakers = () => {
  const sectionRef = useRef(null);
  const crabRef = useRef(null);
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
      }, 1000); // Rotation duration
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
          <div
            className={`floating-speaker-container ${
              isRotating ? "rotating" : ""
            }`}
          >
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
