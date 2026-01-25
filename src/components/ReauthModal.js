import React, { useState, useEffect } from "react";
import "./ReauthModal.css";

export default function ReauthModal({ 
  isOpen, 
  onConfirm, 
  onCancel, 
  isGoogleUser = false,
  error: externalError = ""
}) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Update internal error when external error changes
  useEffect(() => {
    if (externalError) {
      setError(externalError);
    }
  }, [externalError]);

  // Clear error when modal closes
  useEffect(() => {
    if (!isOpen) {
      setPassword("");
      setError("");
      setLoading(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isGoogleUser) {
        // For Google users, just call onConfirm (they'll re-authenticate with popup)
        await onConfirm();
      } else {
        // For email/password users, pass the password
        if (!password) {
          setError("Please enter your password");
          setLoading(false);
          return;
        }
        await onConfirm(password);
      }
    } catch (err) {
      setError(err.message || "Re-authentication failed. Please try again.");
      setLoading(false);
      throw err; // Re-throw so parent can handle
    }
  };

  const handleCancel = () => {
    setPassword("");
    setError("");
    setLoading(false);
    onCancel();
  };

  if (!isOpen) return null;

  return (
    <div className="reauth-modal-overlay" onClick={handleCancel}>
      <div className="reauth-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="reauth-modal-header">
          <h2 className="reauth-modal-title">Re-authentication Required</h2>
        </div>
        <div className="reauth-modal-body">
          <p className="reauth-modal-message">
            For security reasons, please re-authenticate to confirm this action.
          </p>
          
          {!isGoogleUser && (
            <form onSubmit={handleSubmit} className="reauth-form">
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError(""); // Clear error when user types
                  }}
                  className="form-input"
                  placeholder="Enter your password"
                  required
                  autoFocus
                />
              </div>
              {error && (
            <div className="error-message" style={{ marginTop: "1rem" }}>
              {error}
            </div>
          )}
            </form>
          )}

          {isGoogleUser && (
            <p className="reauth-modal-info">
              Click "CONFIRM" to sign in with Google again.
            </p>
          )}
        </div>
        <div className="reauth-modal-actions">
          <button
            className="reauth-modal-btn reauth-modal-btn-cancel"
            onClick={handleCancel}
            disabled={loading}
          >
            CANCEL
          </button>
          <button
            className="reauth-modal-btn reauth-modal-btn-confirm"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "AUTHENTICATING..." : "CONFIRM"}
          </button>
        </div>
      </div>
    </div>
  );
}
