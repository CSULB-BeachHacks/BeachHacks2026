// src/components/EmailSignup.js
import React, { useState, useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { db } from "../firebase";
import { collection, addDoc, query, where, getDocs, serverTimestamp } from "firebase/firestore";
import "./EmailSignup.css";

export default function EmailSignup() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("idle"); // idle, loading, success, error
    const [message, setMessage] = useState("");

    const sectionRef = useRef(null);
    const teaserRef = useRef(null);
    const subtitleRef = useRef(null);
    const formRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Initial fade-in animation
            gsap.fromTo(
                teaserRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
            );

            gsap.fromTo(
                subtitleRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.2 }
            );

            gsap.fromTo(
                formRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.4 }
            );

            // Continuous wave animation for teaser
            gsap.to(teaserRef.current, {
                y: -8,
                duration: 1.5,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true
            });

            // Subtitle follows with slight delay
            gsap.to(subtitleRef.current, {
                y: -6,
                duration: 1.5,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
                delay: 0.2
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate email
        if (!email.trim()) {
            setStatus("error");
            setMessage("Please enter your email address");
            return;
        }

        if (!validateEmail(email)) {
            setStatus("error");
            setMessage("Please enter a valid email address");
            return;
        }

        setStatus("loading");
        setMessage("");

        try {
            // Check if email already exists
            const subscribersRef = collection(db, "newsletter_subscribers");
            const q = query(subscribersRef, where("email", "==", email.toLowerCase()));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                setStatus("success");
                setMessage("You're already subscribed! We'll keep you updated.");
                return;
            }

            // Add new subscriber
            await addDoc(subscribersRef, {
                email: email.toLowerCase(),
                subscribedAt: serverTimestamp(),
                source: "hero_signup"
            });

            setStatus("success");
            setMessage("Thanks for signing up! We'll notify you when applications open.");
            setEmail("");

            // Animate success state
            gsap.fromTo(
                formRef.current,
                { scale: 1 },
                { scale: 1.02, duration: 0.2, yoyo: true, repeat: 1 }
            );

        } catch (error) {
            console.error("Error subscribing:", error);
            setStatus("error");
            setMessage("Something went wrong. Please try again later.");
        }
    };

    return (
        <section
            ref={sectionRef}
            className="email-signup"
            aria-label="Email Signup for Updates"
        >
            <div className="email-signup__container">
                <h2
                    ref={teaserRef}
                    className="email-signup__teaser email-signup__teaser--glow"
                >
                    Applications begin soon!
                </h2>
                <p ref={subtitleRef} className="email-signup__subtitle">
                    Stay tuned for applications opening
                </p>

                <form
                    ref={formRef}
                    className="email-signup__form"
                    onSubmit={handleSubmit}
                >
                    <div className="email-signup__input-wrapper">
                        <input
                            type="email"
                            className="email-signup__input"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={status === "loading"}
                            aria-label="Email address"
                        />
                    </div>
                    <button
                        type="submit"
                        className="email-signup__button"
                        disabled={status === "loading"}
                    >
                        {status === "loading" ? "Signing up..." : "Notify Me"}
                    </button>
                </form>

                {message && (
                    <p
                        className={`email-signup__message email-signup__message--${status}`}
                        role="alert"
                    >
                        {message}
                    </p>
                )}
            </div>
        </section>
    );
}
