import React from "react";
import "./ConfirmModal.css";

export default function ConfirmModal({ 
  isOpen, 
  onConfirm, 
  onCancel, 
  title = "Confirm Action",
  message,
  confirmText = "CONFIRM",
  cancelText = "CANCEL",
  isDestructive = false
}) {
  if (!isOpen) return null;

  return (
    <div className="confirm-modal-overlay" onClick={onCancel}>
      <div className="confirm-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-modal-header">
          <h2 className="confirm-modal-title">{title}</h2>
        </div>
        <div className="confirm-modal-body">
          <p className="confirm-modal-message">{message}</p>
        </div>
        <div className="confirm-modal-actions">
          <button
            className={`confirm-modal-btn confirm-modal-btn-cancel`}
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button
            className={`confirm-modal-btn confirm-modal-btn-confirm ${
              isDestructive ? "destructive" : ""
            }`}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
