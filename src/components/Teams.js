import React, { useEffect, useMemo, useRef, useState } from "react";
import "./Teams.css";
import crabImg from "../crabby_pyamid 1.png";
import bubbleImg from "../name_bubble.png";

const Teams = () => {
  return (
    <section className="teams" id="teams">
      <div className="container">
        <div className="team-badge">
          
        </div>
      </div>

      <BubbleScene />
    </section>
  );
};

function BubbleScene() {
  const [bubbles, setBubbles] = useState([]);
  const idRef = useRef(0);

  const CONFIG = useMemo(
    () => ({
      spawnEveryMs: 1000,  // how often to spawn a bubble
      maxBubbles: 1,     // cap DOM nodes
      minSize: 205,
      maxSize: 245,
      minDuration: 10,     // seconds
      maxDuration: 20,
    }),
    []
  );
function getSafeLeft() {
  // two bands: [0, 30] and [70, 100]
  const useLeftBand = Math.random() < 0.5;

  if (useLeftBand) {
    // 0–30%
    return Math.random() * 30;
  } else {
    // 70–100%
    return 70 + Math.random() * 30;
  }
}
  useEffect(() => {
    const timer = setInterval(() => {
      setBubbles((prev) => {
        if (prev.length >= CONFIG.maxBubbles) return prev;

        const id = idRef.current++;
        const size = CONFIG.minSize + Math.random() * (CONFIG.maxSize - CONFIG.minSize);

        return [
          ...prev,
          {
            id,
            size,
            left: getSafeLeft(),                              // 0..100%
            drift: (Math.random() - 0.5) * 40,                  // -20..20 px
            duration: CONFIG.minDuration + Math.random() * (CONFIG.maxDuration - CONFIG.minDuration),
            delay: Math.random() * 0.4,
          },
        ];
      });
    }, CONFIG.spawnEveryMs);

    return () => clearInterval(timer);
  }, [CONFIG]);

  const handleEnd = (id) => setBubbles((prev) => prev.filter((b) => b.id !== id));

  return (
    <div className="bh-bubble-stage">
      {bubbles.map((b) => (
        <img
          key={b.id}
          src={bubbleImg}
          alt=""
          className="bh-bubble-img"
          style={{
            left: `${b.left}%`,
            width: b.size,                    // numbers = px in React inline styles
            height: b.size,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
            // custom CSS var consumed by the keyframes for horizontal drift
            "--bh-drift": `${b.drift}px`,
          }}
          onAnimationEnd={() => handleEnd(b.id)}
          draggable={false}
        />
      ))}
      
      <img src={crabImg} alt="Crab" className="bh-crab" />
       <div className="bh-sand"></div>
    </div>
  );
}

export default Teams;
