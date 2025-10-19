// src/components/Countdown.js
import React, { useEffect, useState } from "react";
import "./Countdown.css";

function getTimeLeft(target) {
  const now = new Date();
  const diff = Math.max(0, target - now);
  const s = Math.floor(diff / 1000);
  const days = Math.floor(s / 86400);
  const hours = Math.floor((s % 86400) / 3600);
  const minutes = Math.floor((s % 3600) / 60);
  const seconds = s % 60;
  return { days, hours, minutes, seconds };
}

export default function Countdown({ date }) {
  const target = typeof date === "string" ? new Date(date) : date;
  const [left, setLeft] = useState(getTimeLeft(target));

  useEffect(() => {
    const id = setInterval(() => setLeft(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const bubble = (value, label) => (
    <div className="bh-bubble" key={label} role="group" aria-label={label}>
      <div className="bh-bubble-gloss">
        <img src="../single_blue_ball.svg" alt="" aria-hidden="true" />
        <span className="bh-bubble-number">{String(value).padStart(2, "0")}</span>
      </div>
      <div className="bh-bubble-label">{label}</div>
    </div>
  );

  return (
    <div className="bh-countdown">
      {bubble(left.days, "days")}
      {bubble(left.hours, "hours")}
      {bubble(left.minutes, "minutes")}
      {bubble(left.seconds, "seconds")}
    </div>
  );
}
