import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./LoadingScreen.css";

export default function LoadingScreen({ isDark, onLoadComplete, skipInitialLoad = false }) {
  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("Loading");
  const [isFadingOut, setIsFadingOut] = useState(false);
  const crabRef = useRef(null);
  const screenRef = useRef(null);

  useEffect(() => {
    // Animate crab up and down
    if (crabRef.current) {
      gsap.to(crabRef.current, {
        y: -20,
        duration: 1,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });
    }

    // Animate loading dots
    let dotCount = 0;
    const dotInterval = setInterval(() => {
      dotCount = (dotCount + 1) % 4;
      setLoadingText("Loading" + ".".repeat(dotCount));
    }, 500);

    // If this is just for theme change, skip the initial load check
    if (skipInitialLoad) {
      // Ensure it's visible immediately when mounted
      const ensureVisible = () => {
        if (screenRef.current) {
          gsap.set(screenRef.current, { opacity: 1, display: 'flex' });
        }
      };
      
      // Try immediately and also on next frame to ensure visibility
      ensureVisible();
      requestAnimationFrame(ensureVisible);
      
      // For theme changes, just show briefly then fade out
      const timer = setTimeout(() => {
        setIsFadingOut(true);
        if (screenRef.current) {
          gsap.to(screenRef.current, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => {
              setLoading(false);
            }
          });
        } else {
          setLoading(false);
        }
      }, 600);
      
      return () => {
        clearInterval(dotInterval);
        clearTimeout(timer);
      };
    }

    // Check if page is fully loaded (only for initial load)
    const handleLoad = () => {
      // Wait a bit for smooth transition and ensure all assets are loaded
      setTimeout(() => {
        setIsFadingOut(true);
        if (screenRef.current) {
          gsap.to(screenRef.current, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => {
              setLoading(false);
              if (onLoadComplete) onLoadComplete();
            }
          });
        } else {
          setLoading(false);
          if (onLoadComplete) onLoadComplete();
        }
      }, 800);
    };

    // Check if window is already loaded
    if (document.readyState === "complete") {
      // Give React time to render components
      setTimeout(handleLoad, 500);
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      clearInterval(dotInterval);
      window.removeEventListener("load", handleLoad);
    };
  }, [onLoadComplete, skipInitialLoad]);

  // Don't render anything if not loading and not fading out
  if (!loading && !isFadingOut) {
    return null;
  }

  return (
    <div 
      ref={screenRef} 
      className={`loading-screen ${isFadingOut ? 'fading-out' : ''}`}
    >
      <div className="loading-content">
        <img
          ref={crabRef}
          className="loading-crab"
          src="/landing_cravby.svg"
          alt="Loading"
        />
        <div className="loading-text">
          {loadingText}
        </div>
      </div>
    </div>
  );
}
