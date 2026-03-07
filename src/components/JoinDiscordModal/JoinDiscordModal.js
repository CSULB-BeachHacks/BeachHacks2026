import React, { useState } from "react";
import "./JoinDiscordModal.css";

const JoinDiscordModal = ({ isOpen, onClose, onConfirm, hasAgreed, discordLink }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showLink, setShowLink] = useState(hasAgreed);

    if (!isOpen) return null;

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    };

    const handleSubmit = async () => {
        if (!isChecked && !hasAgreed) return;

        setIsSubmitting(true);
        try {
            if (!hasAgreed) {
                await onConfirm();
            }
            setShowLink(true);
        } catch (error) {
            console.error("Failed to agree to overnight policy", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="discord-modal-overlay">
            <div className="discord-modal-content">
                <h2 className="discord-modal-title">Join the Hacker Discord!</h2>
                <p className="discord-modal-message">
                    Welcome to BeachHacks 9.0! Since this is NOT an overnight event this year, we need to ensure all attendees are prepared and understand the schedule.
                </p>

                {showLink ? (
                    <div className="discord-link-container">
                        <p className="discord-success-message">You're all set! Click below to join the server:</p>
                        <a
                            href={discordLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="discord-join-btn final"
                            onClick={onClose}
                        >
                            JOIN BEACHHACKS DISCORD
                        </a>
                    </div>
                ) : (
                    <div className="discord-agreement-section">
                        <label className="checkbox-container">
                            <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                                disabled={isSubmitting}
                            />
                            <span className="checkmark"></span>
                            <span className="checkbox-text">
                                I understand that the event is NOT an overnight event and I have accommodated for that scenario.
                            </span>
                        </label>

                        <div className="discord-modal-actions">
                            <button
                                className="discord-btn discord-cancel"
                                onClick={onClose}
                                disabled={isSubmitting}
                            >
                                CANCEL
                            </button>
                            <button
                                className="discord-btn discord-submit"
                                onClick={handleSubmit}
                                disabled={!isChecked || isSubmitting}
                            >
                                {isSubmitting ? "PROCESSING..." : "I AGREE, SHOW LINK"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JoinDiscordModal;
