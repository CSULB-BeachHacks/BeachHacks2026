import React, { useEffect, useRef } from "react";
import "./Rain.css";

const NUM_RAINDROPS = 200;

const range = (a, b) => (b - a) * Math.random() + a;

class Raindrop {
  constructor(w, h) {
    this.w = w;
    this.h = h;
    this.reset();
  }

  reset() {
    this.x = range(0, this.w);
    this.y = range(-200, -50);
    this.length = range(10, 30);
    this.speed = range(5, 15);
    this.opacity = range(0.3, 0.8);
  }

  draw(context) {
    context.beginPath();
    context.moveTo(this.x, this.y);
    context.lineTo(this.x, this.y + this.length);
    context.strokeStyle = `rgba(100, 150, 200, ${this.opacity})`;
    context.lineWidth = 2;
    context.stroke();
    
    this.y += this.speed;
    
    if (this.y > this.h) {
      this.reset();
      this.y = range(-200, -50);
    }
  }
}

export default function RainAnimation() {
  const canvasRef = useRef(null);
  const raindropsRef = useRef([]);
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
      // Recreate raindrops with new dimensions
      raindropsRef.current = Array.from({ length: NUM_RAINDROPS }, () => new Raindrop(w, h));
    };

    window.addEventListener("resize", resizeWindow);
    resizeWindow();

    const step = () => {
      if (canvas && context && w > 0 && h > 0) {
        context.clearRect(0, 0, w, h);
        raindropsRef.current.forEach(raindrop => raindrop.draw(context));
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

  return <canvas id="rain-world" ref={canvasRef} className="rain-canvas" />;
}
