import React, { useEffect, useRef } from "react";
import "./Confetti.css";

const NUM_CONFETTI = 350;
const COLORS = [[85, 71, 106], [174, 61, 99], [219, 56, 83], [244, 92, 68], [248, 182, 70]];
const PI_2 = 2 * Math.PI;

const range = (a, b) => (b - a) * Math.random() + a;

class Confetti {
  constructor(w, h) {
    this.w = w;
    this.h = h;
    this.style = COLORS[~~range(0, 5)];
    this.rgb = `rgba(${this.style[0]},${this.style[1]},${this.style[2]}`;
    this.r = ~~range(2, 6);
    this.r2 = 2 * this.r;
    this.replace();
  }

  replace() {
    this.opacity = 0;
    this.dop = 0.03 * range(1, 4);
    this.x = range(-this.r2, this.w - this.r2);
    this.y = range(-20, this.h - this.r2);
    this.xmax = this.w - this.r;
    this.ymax = this.h - this.r;
    this.vx = range(0, 2) + range(-1, 1);
    this.vy = 0.7 * this.r + range(-1, 1);
  }

  draw(context) {
    this.x += this.vx;
    this.y += this.vy;
    this.opacity += this.dop;
    if (this.opacity > 1) {
      this.opacity = 1;
      this.dop *= -1;
    }
    if (this.opacity < 0 || this.y > this.ymax) {
      this.replace();
    }
    if (!(0 < this.x && this.x < this.xmax)) {
      this.x = (this.x + this.xmax) % this.xmax;
    }
    
    context.beginPath();
    context.arc(~~this.x, ~~this.y, this.r, 0, PI_2, false);
    context.fillStyle = `${this.rgb},${this.opacity})`;
    context.fill();
  }
}

export default function ConfettiAnimation() {
  const canvasRef = useRef(null);
  const confettiRef = useRef([]);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    let w = 0;
    let h = 0;

    const resizeWindow = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      // Recreate confetti with new dimensions
      confettiRef.current = Array.from({ length: NUM_CONFETTI }, () => new Confetti(w, h));
    };

    window.addEventListener("resize", resizeWindow);
    resizeWindow();

    const step = () => {
      if (canvas && context && w > 0 && h > 0) {
        context.clearRect(0, 0, w, h);
        confettiRef.current.forEach(c => c.draw(context));
        animationFrameRef.current = requestAnimationFrame(step);
      }
    };

    animationFrameRef.current = requestAnimationFrame(step);

    return () => {
      window.removeEventListener("resize", resizeWindow);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return <canvas id="confetti-world" ref={canvasRef} className="confetti-canvas" />;
}
