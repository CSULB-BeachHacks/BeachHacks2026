import React, { useState, useEffect } from "react";
import "./ChangePasswordModal.css";

export default function ChangePasswordModal({ 
  isOpen, 
  onConfirm, 
  onCancel,
  error: externalError = ""
}) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Update internal error when external error changes
  useEffect(() => {
    if (externalError) {
      setError(externalError);
    }
  }, [externalError]);

  // Clear form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setNewPassword("");
      setConfirmPassword("");
      setError("");
      setLoading(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setError("");

    // Validation
    if (!newPassword) {
      setError("Please enter a new password");
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await onConfirm(newPassword);
      // Success - modal will be closed by parent
    } catch (err) {
      setError(err.message || "Failed to change password. Please try again.");
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setNewPassword("");
    setConfirmPassword("");
    setError("");
    setLoading(false);
    onCancel();
  };

  if (!isOpen) return null;

  return (
    <div className="change-password-modal-overlay" onClick={handleCancel}>
      <div className="change-password-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="change-password-modal-header">
          <h2 className="change-password-modal-title">Change Password</h2>
          <button 
            className="change-password-modal-close"
            onClick={handleCancel}
            aria-label="Close"
          >
            &times;
          </button>
        </div>
        <div className="change-password-modal-body">
          <form onSubmit={handleSubmit} className="change-password-form">
            <div className="form-group">
              <label htmlFor="new-password" className="form-label">
                New Password
              </label>
              <input
                type="password"
                id="new-password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  if (error) setError("");
                }}
                className="form-input"
                placeholder="Enter new password (min 6 characters)"
                required
                minLength="6"
                autoFocus
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirm-password" className="form-label">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (error) setError("");
                }}
                className="form-input"
                placeholder="Confirm new password"
                required
                minLength="6"
              />
            </div>

            {error && (
              <div className="error-message" style={{ marginTop: "1rem" }}>
                {error}
              </div>
            )}
          </form>
        </div>
        <div className="change-password-modal-actions">
          <button
            className="change-password-modal-btn change-password-modal-btn-cancel"
            onClick={handleCancel}
            disabled={loading}
            type="button"
          >
            CANCEL
          </button>
          <button
            className="change-password-modal-btn change-password-modal-btn-confirm"
            onClick={handleSubmit}
            disabled={loading}
            type="button"
          >
            {loading ? "CHANGING..." : "CHANGE PASSWORD"}
          </button>
        </div>
      </div>
    </div>
  );
}
