import React from "react";
import Navbar from "../Navbar";
import "./Dashboard.css";

// Import assets from Dashboard-images folder
import statusBarImg from "../Dashboard-images/UntitledArtwork20 3.png";
import chatBubbleImg from "../Dashboard-images/Untitled design (28) 2.png";
import crabMascotImg from "../Dashboard-images/crabby_1.png";
import starDecoLeft from "../Dashboard-images/Untitled design (12) 1.png";
import starDecoQR from "../Dashboard-images/Untitled design (12) 3.png";

const Dashboard = () => {
    return (
        <main className="dashboard-container">
            <Navbar />

            <img
                src={starDecoLeft}
                alt="Star Decoration"
                className="star-deco-left"
            />
            <img
                src={starDecoQR}
                alt="Star Decoration QR"
                className="star-deco-qr"
            />

            <section className="dashboard-content">
                <h1 className="dashboard-title">BeachHacks Dashboard</h1>

                <section
                    className="application-status-section"
                    aria-labelledby="status-title"
                >
                    <h2 id="status-title" className="section-title">
                        Current Application
                    </h2>

                    <figure className="status-bar-container">
                        <img
                            src={statusBarImg}
                            alt="Status Bar"
                            className="status-bar-bg"
                        />
                        <figcaption className="status-text">
                            STATUS: Processing Application
                        </figcaption>
                    </figure>

                    <div
                        className="action-buttons"
                        role="group"
                        aria-label="Application actions"
                    >
                        <button className="dashboard-btn edit-btn">EDIT</button>
                        <button className="dashboard-btn withdraw-btn">
                            WITHDRAW
                        </button>
                    </div>
                </section>

                <section
                    className="bottom-section"
                    aria-label="Additional Information"
                >
                    <aside className="mascot-container" aria-label="Mascot">
                        <div className="chat-bubble-container">
                            <img
                                src={chatBubbleImg}
                                alt="Chat Bubble"
                                className="chat-bubble-bg"
                            />
                            <div className="chat-text">
                                Thank you for
                                <br />
                                participating.
                                <br />
                                Happy Hacking!
                                <br />
                                -BeachHacks 9.0
                                <br />
                                committee
                            </div>
                        </div>
                        <img
                            src={crabMascotImg}
                            alt="Crab Mascot"
                            className="crab-mascot"
                        />
                    </aside>

                    <section className="qr-section" aria-labelledby="qr-title">
                        <div className="qr-star-bg"></div>
                        <h3 id="qr-title" className="qr-title">
                            QR Code
                        </h3>
                        <p className="qr-desc">
                            On day of event, scan the qr
                            <br />
                            code to confirm attendance
                            <br />
                            and check-in.
                        </p>
                        <div className="qr-placeholder">
                            {/* QR Code Placeholder */}
                            <div className="qr-box"></div>
                        </div>
                    </section>
                </section>
            </section>
        </main>
    );
};

export default Dashboard;
