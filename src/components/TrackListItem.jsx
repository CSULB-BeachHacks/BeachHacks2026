import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import '../index.css'
import pearl from './TrackImages/pearl.svg';

export default function TrackListItem({open, closed, name}) {
    const containerRef = useRef(null);
    const imgRef = useRef(null);
    const [hasShaken, setHasShaken] = useState(false);
    const [imgSrc, setImgSrc] = useState(closed);

    useGSAP(() => {
        if (containerRef.current) {
            gsap.fromTo(containerRef.current, {
                y: -5,
            }, {
                y: 5,
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut',
            });
        }
    }, [])


    const handleMouseEnter = () => {
        if (hasShaken || !imgRef.current) return;

        // Temporarily stop the hover animation
        gsap.killTweensOf(containerRef.current);

        // Shake animation
        gsap.to(imgRef.current, {
            y: -5,
            duration: 0.1,
            repeat: 9,
            yoyo: true,
            ease: 'power1.inOut',
            onComplete: () => {
                // Swap image source after shake completes
                setImgSrc(open);
                setHasShaken(true);
                
                // Reset image y position
                gsap.set(imgRef.current, { y: 0 });

                // Restart the hover animation on the container
                gsap.fromTo(containerRef.current, {
                    y: -5,
                }, {
                    y: 5,
                    duration: 3,
                    repeat: -1,
                    yoyo: true,
                    ease: 'power1.inOut',
                });
            }
        });
    };


    return (
        <div ref={containerRef} className="relative flex items-center justify-center">
            <img
                ref={imgRef}
                src={imgSrc} 
                alt='' 
                onMouseEnter={handleMouseEnter}
            />
            {hasShaken && (
                <>
                    <img 
                        src={pearl} 
                        className="absolute" 
                        alt="pearl" 
                    />
                    <h1 className="absolute text-4xl">
                        {name}
                    </h1>
                </>
            )}
        </div>
    );
}