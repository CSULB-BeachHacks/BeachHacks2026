import { useRef, useState } from "react";
import gsap from "gsap";
import pearl from "../assets/pearl.svg";
import "./Tracks/Tracks.css";

export default function TrackListItem({ open, closed, name }) {
    const containerRef = useRef(null);
    const imgRef = useRef(null);
    const [hasShaken, setHasShaken] = useState(false);
    const [imgSrc, setImgSrc] = useState(closed);

    const handleHoverStart = () => {
        if (!containerRef.current) return;
        gsap.killTweensOf(containerRef.current);
        gsap.to(
            containerRef.current,
            {
                y: -6,
                duration: 0.45,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut",
            },
        );
    };

    const handleHoverEnd = () => {
        if (!containerRef.current) return;
        gsap.killTweensOf(containerRef.current);
        gsap.to(containerRef.current, {
            y: 0,
            duration: 0.2,
            ease: "power2.out",
        });
    };

    const handleReveal = () => {
        if (hasShaken || !imgRef.current) return;

        const el = imgRef.current;
        el.style.animation = "none";

        // timeline where only the duration shrinks each step
        const steps = 10; // number of back/forth moves
        const amp = 5; // constant distance (px)
        const durStart = 0.14; // starting duration (s)
        const durDecay = 0.85; // duration multiplier per step

        const tl = gsap.timeline({
            defaults: { ease: "power1.inOut" },
            onComplete: () => {
                setImgSrc(open);
                setHasShaken(true);
                gsap.set(el, { y: 0 });
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
            <img
                draggable="false"
                ref={imgRef}
                className="track-item__shell"
                src={imgSrc}
                alt=""
                onMouseEnter={handleHoverStart}
                onMouseLeave={handleHoverEnd}
                onClick={handleReveal}
                style={{ cursor: "pointer" }}
            />
            {hasShaken && (
                <>
                    <img
                        draggable="false"
                        src={pearl}
                        className="track-item__pearl"
                        alt="pearl"
                    />
                    <h1 className="track-item__name">
                        {name === "Mental Health" || name === "Best Overall" || name === "Code and Coffee"
                            ? name.split(" ").map((word, i) => (
                                <span key={i}>
                                    {word}
                                    <br />
                                </span>
                            ))
                            : name}
                    </h1>
                </>
            )}
        </div>
    );
}
