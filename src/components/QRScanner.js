import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import "./QRScanner.css";

export default function QRScanner() {
  const [qrCode, setQrCode] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Reset form when QR code changes
    if (qrCode) {
      setUserData(null);
      setError("");
      setSuccess("");
    }
  }, [qrCode]);

  const handleQRInput = async (e) => {
    e.preventDefault();
    if (!qrCode.trim()) {
      setError("Please enter a QR code");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");
    setUserData(null);

    try {
      // The QR code contains the user's UID
      const userRef = doc(db, "applications", qrCode.trim());
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        setError("User not found. Please check the QR code.");
        setLoading(false);
        return;
      }

      const data = userSnap.data();
      
      // Check if user is accepted
      if (data.status !== "accepted") {
        setError("This user is not accepted. Only accepted users can check in.");
        setLoading(false);
        return;
      }

      // Get user email from users collection
      let userEmail = data.email;
      if (!userEmail) {
        const usersRef = doc(db, "users", qrCode.trim());
        const usersSnap = await getDoc(usersRef);
        if (usersSnap.exists()) {
          userEmail = usersSnap.data().email;
        }
      }

      // If user is already checked in, just show status
      if (data.studentParticipant) {
        setUserData({
          uid: qrCode.trim(),
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: userEmail || "Not available",
          studentParticipant: true,
          locationStatus: data.locationStatus || "",
          meals: data.meals || { breakfast: false, lunch: false, dinner: false },
        });
        setSuccess("User is already checked in!");
      } else {
        // Auto check in the user
        await handleCheckIn(qrCode.trim(), data, userEmail);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setError("Error fetching user data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async (uid, data, userEmail) => {
    try {
      const userRef = doc(db, "applications", uid);
      await updateDoc(userRef, {
        studentParticipant: true,
        checkedInAt: new Date(),
      });

      setSuccess("User checked in successfully! They are ready to be given food and can be monitored for location.");
      setUserData({
        uid: uid,
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        email: userEmail || "Not available",
        studentParticipant: true,
        locationStatus: data.locationStatus || "",
        meals: data.meals || { breakfast: false, lunch: false, dinner: false },
      });
    } catch (error) {
      console.error("Error checking in user:", error);
      setError("Error checking in user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="qr-scanner-container">
      <h2 className="qr-scanner-title">QR Code Check-In</h2>
      
      <form onSubmit={handleQRInput} className="qr-input-form">
        <div className="qr-input-group">
          <label htmlFor="qr-code-input" className="qr-input-label">
            Enter QR Code:
          </label>
          <input
            id="qr-code-input"
            type="text"
            value={qrCode}
            onChange={(e) => setQrCode(e.target.value)}
            placeholder="Scan or enter QR code"
            className="qr-input"
            disabled={loading}
          />
        </div>
        <button type="submit" className="qr-submit-btn" disabled={loading}>
          {loading ? "Loading..." : "Lookup User"}
        </button>
      </form>

      {error && <div className="qr-error">{error}</div>}
      {success && <div className="qr-success">{success}</div>}

      {userData && userData.studentParticipant && (
        <div className="qr-user-info">
          <h3 className="qr-user-name">
            {userData.firstName} {userData.lastName}
          </h3>
          <p className="qr-user-email">{userData.email}</p>
          <div className="qr-checked-in-status">
            <p className="qr-status-message">
              ✓ User is checked in and ready to be given food.
            </p>
            <p className="qr-status-message">
              Location monitoring: {userData.locationStatus || "Not set"}
            </p>
            <p className="qr-status-note">
              To update location status and meals, go to Application Details.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
