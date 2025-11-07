import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import pearl from "./TrackImages/pearl.svg";
import "./Tracks.css";

export default function TrackListItem({ open, closed, name }) {
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const [hasShaken, setHasShaken] = useState(false);
  const [imgSrc, setImgSrc] = useState(closed);

  // idle float loop
  useGSAP(() => {
    if (!containerRef.current) return;
    gsap.fromTo(
      containerRef.current,
      { y: -5 },
      {
        y: 5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      }
    );
  }, []);

  const handleMouseEnter = () => {
    if (hasShaken || !imgRef.current) return;

    // pause/kill the float on the container while we rattle the image
    gsap.killTweensOf(containerRef.current);

    const el = imgRef.current;

    // timeline where only the duration shrinks each step
    const steps = 10;       // number of back/forth moves
    const amp = 5;          // constant distance (px)
    const durStart = 0.14;  // starting duration (s)
    const durDecay = 0.85;  // duration multiplier per step

    const tl = gsap.timeline({
      defaults: { ease: "power1.inOut" },
      onComplete: () => {
        setImgSrc(open);
        setHasShaken(true);
        gsap.set(el, { y: 0 });
        gsap.fromTo(
          containerRef.current,
          { y: -5 },
          {
            y: 5,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
          }
        );
      },
    });

    let dir = 1;
    for (let i = 0; i < steps; i++) {
      const dur = durStart * Math.pow(durDecay, i);
      tl.to(el, { y: dir * amp, duration: dur });
      dir *= -1;
    }
    tl.to(el, { y: 0, duration: 0.08 });
  };

  return (
    <div ref={containerRef} className="track-item">
      <img ref={imgRef} src={imgSrc} alt="" onMouseEnter={handleMouseEnter} />
      {hasShaken && (
        <>
          <img src={pearl} className="track-item__pearl" alt="pearl" />
          <h1 className="track-item__name">{name}</h1>
        </>
      )}
    </div>
  );
}
