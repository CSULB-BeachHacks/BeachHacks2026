// src/components/Hero.js
import React from "react";
import Countdown from "./Countdown";
import "./Hero.css";

export default function Hero() {
  const eventStart = "2026-04-18T09:00:00-07:00";

  return (
    <section
      className="hero"
      id="home"
      aria-label="BeachHacks Hero"
      style={{ backgroundImage: 'url(/LANDING_PAGE-litght.svg)' }} // <-- from /public
    >
      <img className="hero__crab" src="/landing_cravby.svg" alt="" draggable="false" />
      <div className="hero__copy">
        <h1 className="hero__title">BeachHacks 9.0</h1>
        <p className="hero__date">(date)–(date)</p>
        <h2 className="hero__sub">DIVE IN</h2>
        <div className="hero__countdown"><Countdown date={eventStart} /></div>
      </div>
    </section>
  );
}
