// src/components/Hero.js
import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import Countdown from "./Countdown";
import "./Hero.css";

export default function Hero() {
  const eventStart = "2026-03-21T09:00:00-07:00";

  // refs for animation targets
  const sectionRef = useRef(null);
  const crabRef = useRef(null);
  const copyRef = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
  
    mm.add("(min-width: 981px)", () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline();
        tl.fromTo(
          crabRef.current,
          { x: "-60vw", y: 60, rotation: -6, opacity: 0 },
          { x: 0, y: 0, rotation: 0, opacity: 1, duration: 1.4, ease: "power3.out" }
        );
        tl.fromTo(
          copyRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.4"
        );
        gsap.to(crabRef.current, {
          keyframes: [{ y: -10, rotation: -1.5, duration: 2 }, { y: 0, rotation: 0.8, duration: 2 }],
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true
        });
  
        // Desktop-only parallax
        const onMove = (e) => {
          const rect = sectionRef.current.getBoundingClientRect();
          const relX = (e.clientX - rect.left) / rect.width - 0.5;
          const relY = (e.clientY - rect.top) / rect.height - 0.5;
          gsap.to(crabRef.current, { xPercent: relX * 3, yPercent: relY * 3, duration: 0.3 });
        };
        sectionRef.current.addEventListener("mousemove", onMove);
  
        return () => sectionRef.current?.removeEventListener("mousemove", onMove);
      }, sectionRef);
      return () => ctx.revert();
    });
  
    mm.add("(max-width: 980px)", () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline();
  
        // Mobile: keep element centered with xPercent so CSS centering isn't overridden
        tl.fromTo(
          crabRef.current,
          { xPercent: -120, y: 40, rotation: -6, opacity: 0 },
          { xPercent: -50, y: 0, rotation: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
        );
  
        tl.fromTo(
          copyRef.current,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
          "-=0.3"
        );
  
        gsap.to(crabRef.current, {
          keyframes: [{ y: -8, rotation: -1.2, duration: 2 }, { y: 0, rotation: 0.6, duration: 2 }],
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true
        });
      }, sectionRef);
      return () => ctx.revert();
    });
  
    return () => mm.revert();
  }, []);
  
  return (
    <section
      id="home-hero"
      className="hero"
      ref={sectionRef}
      aria-label="BeachHacks Hero"
    >
      <img
        ref={crabRef}
        className="hero__crab"
        src="/landing_cravby.svg"
        alt=""
        draggable="false"
      />
      <div ref={copyRef} className="hero__copy">
        <h1 className="hero__title">BeachHacks 9.0</h1>
        <p className="hero__date">(03/21)–(03/22)</p>
        <h2 className="hero__sub">DIVE IN</h2>
        <div className="hero__countdown">
          <Countdown date={eventStart} />
        </div>
      </div>
    </section>
  );
  
}
