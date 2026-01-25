import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase";
import { doc, deleteDoc } from "firebase/firestore";
import ConfirmModal from "../ConfirmModal";
import ReauthModal from "../ReauthModal";
import "./Dashboard.css";

// Import assets from Dashboard-images folder
import statusBarImg from "../Dashboard-images/UntitledArtwork20 3.png";
import chatBubbleImg from "../Dashboard-images/Untitled design (28) 2.png";
import crabMascotImg from "../Dashboard-images/crabby_1.png";
import starDecoLeft from "../Dashboard-images/Untitled design (12) 1.png";
import starDecoQR from "../Dashboard-images/Untitled design (12) 3.png";

const Dashboard = () => {
    const navigate = useNavigate();
    const { currentUser, deleteAccount, logout, reauthenticateGoogle, reauthenticateEmail } = useAuth();
    const [isWithdrawing, setIsWithdrawing] = useState(false);
    const [showWithdrawModal, setShowWithdrawModal] = useState(false);
    const [showReauthModal, setShowReauthModal] = useState(false);
    const [error, setError] = useState("");

    const handleEditClick = () => {
        navigate("/apply", { state: { editing: true } });
    };

    const handleWithdrawClick = () => {
        setShowWithdrawModal(true);
        setError("");
    };

    const handleConfirmWithdraw = async () => {
        setShowWithdrawModal(false);
        // Show re-authentication modal
        setShowReauthModal(true);
    };

    const handleReauthenticate = async (password = null) => {
        try {
            setIsWithdrawing(true);
            setError("");

            // Re-authenticate based on provider
            if (isGoogleUser) {
                await reauthenticateGoogle();
            } else {
                if (!password) {
                    throw new Error("Password is required");
                }
                await reauthenticateEmail(password);
            }

            // After successful re-authentication, proceed with deletion
            setShowReauthModal(false);

            // Delete application from Firestore
            if (currentUser) {
                const applicationRef = doc(db, "applications", currentUser.uid);
                await deleteDoc(applicationRef);
            }

            // Delete user account from Firebase Authentication
            await deleteAccount();

            // Log out (this will happen automatically when account is deleted, but explicit for safety)
            await logout();

            // Redirect to home page
            navigate("/");
        } catch (error) {
            console.error("Error withdrawing application:", error);
            setIsWithdrawing(false);
            const errorMessage = error.message || "Failed to withdraw application. Please try again.";
            setError(errorMessage);
            // Keep reauth modal open if re-authentication failed
            if (error.code === "auth/wrong-password" || 
                error.code === "auth/invalid-credential" ||
                error.code === "auth/requires-recent-login") {
                // Don't close modal on authentication errors
            } else {
                setShowReauthModal(false);
                alert(errorMessage);
            }
        }
    };

    const handleCancelWithdraw = () => {
        setShowWithdrawModal(false);
        setError("");
    };

    const handleCancelReauth = () => {
        setShowReauthModal(false);
        setIsWithdrawing(false);
        setError("");
    };

    const isGoogleUser = currentUser?.providerData?.some(
        provider => provider.providerId === "google.com"
    );

    return (
        <main className="dashboard-container">

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
                        <button 
                            className="dashboard-btn edit-btn"
                            onClick={handleEditClick}
                        >
                            EDIT
                        </button>
                        <button 
                            className="dashboard-btn withdraw-btn"
                            onClick={handleWithdrawClick}
                            disabled={isWithdrawing}
                        >
                            {isWithdrawing ? "WITHDRAWING..." : "WITHDRAW"}
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

            <ConfirmModal
                isOpen={showWithdrawModal}
                onConfirm={handleConfirmWithdraw}
                onCancel={handleCancelWithdraw}
                title="Withdraw Application"
                message="Are you sure you want to withdraw your application? This will permanently delete your account and all your data. This action cannot be undone."
                confirmText="WITHDRAW"
                cancelText="CANCEL"
                isDestructive={true}
            />

            <ReauthModal
                isOpen={showReauthModal}
                onConfirm={handleReauthenticate}
                onCancel={handleCancelReauth}
                isGoogleUser={isGoogleUser}
                error={error}
            />
        </main>
    );
};

export default Dashboard;
