import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import Login from "../Login";
import Signup from "../Signup";
import "./About.css";

import blueStar from "../../assets/bluestar.svg";
import cyanStar from "../../assets/cyan_small_star.svg";
import leftAboutCoral from "../../assets/l_about_coral.svg";
import rightAboutCoral from "../../assets/r_about_coral.svg";

const About = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        async function checkAdminStatus() {
            if (currentUser) {
                try {
                    const userRef = doc(db, "users", currentUser.uid);
                    const userSnap = await getDoc(userRef);
                    setIsAdmin(userSnap.exists() && userSnap.data().isAdmin);
                } catch (error) {
                    console.error("Error checking admin status:", error);
                    setIsAdmin(false);
                }
            } else {
                setIsAdmin(false);
            }
        }

        checkAdminStatus();
    }, [currentUser]);

    const openLogin = () => {
        setShowSignup(false);
        setShowLogin(true);
    };

    const openSignup = () => {
        setShowLogin(false);
        setShowSignup(true);
    };

    const closeModals = () => {
        setShowLogin(false);
        setShowSignup(false);
    };

    const handleApplyClick = () => {
        if (currentUser) {
            if (isAdmin) {
                navigate("/admin/dashboard");
                return;
            }

            if (location.pathname === "/apply") {
                window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
                navigate("/apply");
            }
        } else {
            openSignup();
        }
    };

    const handleAuthSuccess = async () => {
        closeModals();

        if (currentUser) {
            try {
                const userRef = doc(db, "users", currentUser.uid);
                const userSnap = await getDoc(userRef);
                if (userSnap.exists() && userSnap.data().isAdmin) {
                    navigate("/admin/dashboard");
                    return;
                }
            } catch (error) {
                console.error("Error checking admin status:", error);
            }
        }

        navigate("/apply");
    };

    return (
        <>
            <section className="about" id="about">
                <img
                    draggable="false"
                    className="blue-star bg-img"
                    src={blueStar}
                    alt="blue star"
                />
                <img
                    draggable="false"
                    className="cyan-star bg-img"
                    src={cyanStar}
                    alt="cyan star"
                />
                <img
                    draggable="false"
                    className="right-about-coral bg-img"
                    src={leftAboutCoral}
                    alt="big coral"
                />
                <img
                    draggable="false"
                    className="left-about-coral bg-img"
                    src={rightAboutCoral}
                    alt="big coral"
                />

                <div className="container">
                    <div className="about-content">
                        <div className="section-header">
                            <h1 className="about-title">About</h1>
                        </div>

                        <p className="about-description">
                            BeachHacks is one of the largest hackathons hosted at
                            California State University Long Beach<span style={{ color: "red", fontWeight: "bold", verticalAlign: "super", fontSize: "smaller" }}>*</span>. <br /> This year BeachHacks 9.0 will
                            be hosted at the Pointe. Interested in seeing what
                            you can build yourself?
                        </p>
                        <div className="about-apply-wrap">
                            <button
                                type="button"
                                className="apply-btn about-apply-btn"
                                onClick={handleApplyClick}
                            >
                                APPLY NOW!
                            </button>
                        </div>
                        <p
                            className="about-description"
                            style={{
                                fontSize: "0.9rem",
                                marginTop: "1rem",
                                fontStyle: "italic",
                                opacity: 0.8,
                            }}
                        >
                            <span style={{ color: "red", fontWeight: "bold" }}>*</span>{" "}
                            - Due to the closure of the USU and venue restrictions, this
                            event will not be an overnight on-campus event like prior
                            BeachHacks.
                        </p>
                    </div>

                    <div className="about-shark-column">
                        <div className="about-shark-wrap">
                            <div className="about-stats-arc">
                                <div className="about-stat-bubble stat-1">
                                    <img
                                        draggable="false"
                                        className="about-stat-bg"
                                        src="/placeholderaboutsection.png"
                                        alt=""
                                        aria-hidden="true"
                                    />
                                    <div className="about-stat-text">
                                        <span className="about-stat-number">200+</span>
                                        <span className="about-stat-label">Hackers</span>
                                    </div>
                                </div>
                                <div className="about-stat-bubble stat-2">
                                    <img
                                        draggable="false"
                                        className="about-stat-bg"
                                        src="/placeholderaboutsection.png"
                                        alt=""
                                        aria-hidden="true"
                                    />
                                    <div className="about-stat-text">
                                        <span className="about-stat-number">24</span>
                                        <span className="about-stat-label">Hours</span>
                                    </div>
                                </div>
                                <div className="about-stat-bubble stat-3">
                                    <img
                                        draggable="false"
                                        className="about-stat-bg"
                                        src="/placeholderaboutsection.png"
                                        alt=""
                                        aria-hidden="true"
                                    />
                                    <div className="about-stat-text">
                                        <span className="about-stat-number">Valuable</span>
                                        <span className="about-stat-label">Prizes</span>
                                    </div>
                                </div>
                            </div>

                            <img
                                draggable="false"
                                className="about-shark"
                                src="/cuteshark.png"
                                alt="pixel shark"
                            />
                        </div>
                    </div>

                </div>
            </section>
            {showLogin && (
                <Login
                    onClose={closeModals}
                    onSwitchToSignup={openSignup}
                    onAuthSuccess={handleAuthSuccess}
                />
            )}
            {showSignup && (
                <Signup
                    onClose={closeModals}
                    onSwitchToLogin={openLogin}
                    onAuthSuccess={handleAuthSuccess}
                />
            )}
        </>
    );
};

export default About;
