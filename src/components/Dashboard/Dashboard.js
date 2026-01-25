import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase";
import { doc, deleteDoc, getDoc } from "firebase/firestore";
import ConfirmModal from "../ConfirmModal";
import ReauthModal from "../ReauthModal";
import ChangePasswordModal from "../ChangePasswordModal";
import ConfettiAnimation from "../Confetti";
import RainAnimation from "../Rain";
import { QRCodeSVG } from "qrcode.react";
import "./Dashboard.css";

// Import assets from Dashboard-images folder
import statusBarImg from "../Dashboard-images/UntitledArtwork20 3.png";
import chatBubbleImg from "../Dashboard-images/Untitled design (28) 2.png";
import crabMascotImg from "../Dashboard-images/crabby_1.png";
import starDecoLeft from "../Dashboard-images/Untitled design (12) 1.png";
import starDecoQR from "../Dashboard-images/Untitled design (12) 3.png";

const Dashboard = () => {
    const navigate = useNavigate();
    const { currentUser, deleteAccount, logout, changePassword, reauthenticateGoogle, reauthenticateEmail } = useAuth();
    const [isWithdrawing, setIsWithdrawing] = useState(false);
    const [showWithdrawModal, setShowWithdrawModal] = useState(false);
    const [showReauthModal, setShowReauthModal] = useState(false);
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
    const [error, setError] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [hasApplication, setHasApplication] = useState(false);
    const [applicationStatus, setApplicationStatus] = useState(null); // "pending", "accepted", "waitlisted", "rejected"
    const [loading, setLoading] = useState(true);

    // Check if application is submitted
    useEffect(() => {
        async function checkApplicationStatus() {
            if (!currentUser) {
                setLoading(false);
                return;
            }

            // Block admin user from accessing regular dashboard
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

            try {
                const applicationRef = doc(db, "applications", currentUser.uid);
                const applicationSnap = await getDoc(applicationRef);
                
                if (applicationSnap.exists()) {
                    const data = applicationSnap.data();
                    setHasApplication(true);
                    setIsSubmitted(!!data.submittedAt);
                    // Get the status from Firestore (pending, accepted, waitlisted, rejected)
                    setApplicationStatus(data.status || "pending");
                } else {
                    setHasApplication(false);
                    setIsSubmitted(false);
                    setApplicationStatus(null);
                }
            } catch (error) {
                console.error("Error checking application status:", error);
            } finally {
                setLoading(false);
            }
        }

        checkApplicationStatus();
    }, [currentUser, navigate]);

    const handleEditClick = () => {
        navigate("/apply");
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

    const handleChangePasswordClick = () => {
        setShowChangePasswordModal(true);
        setError("");
    };

    const handleChangePassword = async (newPassword) => {
        try {
            setError("");
            await changePassword(newPassword);
            setShowChangePasswordModal(false);
            alert("Password changed successfully!");
        } catch (error) {
            console.error("Error changing password:", error);
            setError(error.message || "Failed to change password. Please try again.");
            throw error; // Re-throw so modal can handle it
        }
    };

    const handleCancelChangePassword = () => {
        setShowChangePasswordModal(false);
        setError("");
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/");
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    // Check if user signed in with Google
    // Email/password users have providerId "password", Google users have "google.com"
    const isGoogleUser = currentUser?.providerData?.some(
        provider => provider && provider.providerId === "google.com"
    ) || false;

    return (
        <main className="dashboard-container">
            {applicationStatus === "accepted" && <ConfettiAnimation />}
            {applicationStatus === "rejected" && <RainAnimation />}

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
                            STATUS: {loading ? "Loading..." : (
                                applicationStatus === "accepted" ? "ACCEPTED" :
                                applicationStatus === "waitlisted" ? "WAITLISTED" :
                                applicationStatus === "rejected" ? "REJECTED" :
                                isSubmitted ? "We are currently reviewing your submission" :
                                hasApplication ? "Incomplete" : "Not Submitted"
                            )}
                        </figcaption>
                    </figure>

                    <div
                        className="action-buttons"
                        role="group"
                        aria-label="Application actions"
                    >
                        {!loading && !isSubmitted && (
                            <button 
                                className="dashboard-btn edit-btn"
                                onClick={handleEditClick}
                            >
                                EDIT
                            </button>
                        )}
                        <button 
                            className="dashboard-btn withdraw-btn"
                            onClick={handleWithdrawClick}
                            disabled={isWithdrawing}
                        >
                            {isWithdrawing ? "WITHDRAWING..." : "WITHDRAW"}
                        </button>
                    </div>

                    {!loading && currentUser && (
                        <div
                            className="account-actions"
                            role="group"
                            aria-label="Account actions"
                        >
                            {!isGoogleUser && (
                                <button 
                                    className="dashboard-btn change-password-btn"
                                    onClick={handleChangePasswordClick}
                                >
                                    CHANGE PASSWORD
                                </button>
                            )}
                            <button 
                                className="dashboard-btn logout-btn"
                                onClick={handleLogout}
                            >
                                LOGOUT
                            </button>
                        </div>
                    )}
                </section>

                {/* Show different content based on application status */}
                {applicationStatus === "accepted" ? (
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
                                {currentUser && applicationStatus === "accepted" ? (
                                    <QRCodeSVG
                                        value={currentUser.uid}
                                        size={240}
                                        level="H"
                                        includeMargin={false}
                                        className="qr-code"
                                    />
                                ) : (
                                    <div className="qr-box"></div>
                                )}
                            </div>
                        </section>
                    </section>
                ) : (
                    <section
                        className="bottom-section"
                        aria-label="Status Message"
                    >
                        <aside className="mascot-container" aria-label="Mascot">
                            <div className="chat-bubble-container">
                                <img
                                    src={chatBubbleImg}
                                    alt="Chat Bubble"
                                    className="chat-bubble-bg"
                                />
                                <div className="chat-text">
                                    {applicationStatus === "rejected" ? (
                                        <>
                                            We're sorry, but your
                                            <br />
                                            application was not
                                            <br />
                                            accepted this time.
                                            <br />
                                            Thank you for your
                                            <br />
                                            interest in BeachHacks 9.0!
                                            <br />
                                            -BeachHacks 9.0
                                            <br />
                                            committee
                                        </>
                                    ) : applicationStatus === "waitlisted" ? (
                                        <>
                                            Your application is
                                            <br />
                                            currently waitlisted.
                                            <br />
                                            We need a little more
                                            <br />
                                            time to review, but
                                            <br />
                                            there's a high chance
                                            <br />
                                            you'll be accepted!
                                            <br />
                                            -BeachHacks 9.0
                                            <br />
                                            committee
                                        </>
                                    ) : !isSubmitted ? (
                                        <>
                                            Submit your application
                                            <br />
                                            for review
                                            <br />
                                            -BeachHacks 9.0
                                            <br />
                                            committee
                                        </>
                                    ) : isSubmitted && (applicationStatus === "pending" || !applicationStatus) ? (
                                        <>
                                            We are currently
                                            <br />
                                            reviewing your
                                            <br />
                                            submission
                                            <br />
                                            -BeachHacks 9.0
                                            <br />
                                            committee
                                        </>
                                    ) : (
                                        <>
                                            Thank you for
                                            <br />
                                            participating.
                                            <br />
                                            Happy Hacking!
                                            <br />
                                            -BeachHacks 9.0
                                            <br />
                                            committee
                                        </>
                                    )}
                                </div>
                            </div>
                            <img
                                src={crabMascotImg}
                                alt="Crab Mascot"
                                className="crab-mascot"
                            />
                        </aside>
                    </section>
                )}
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

            <ChangePasswordModal
                isOpen={showChangePasswordModal}
                onConfirm={handleChangePassword}
                onCancel={handleCancelChangePassword}
                error={error}
            />
        </main>
    );
};

export default Dashboard;
