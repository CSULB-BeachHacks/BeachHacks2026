import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import * as XLSX from "xlsx";
import "./QRScanner.css";

export default function QRScanner() {
  const [qrCode, setQrCode] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [bulkLoading, setBulkLoading] = useState(false);
  const [bulkResults, setBulkResults] = useState(null);
  const [bulkError, setBulkError] = useState("");

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

  const handleBulkCheckIn = async (codes) => {
    const results = {
      successful: [],
      failed: [],
      alreadyCheckedIn: [],
      notFound: [],
      notAccepted: [],
    };

    for (const code of codes) {
      const trimmedCode = code.trim();
      if (!trimmedCode) continue;

      try {
        const userRef = doc(db, "applications", trimmedCode);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          results.notFound.push(trimmedCode);
          continue;
        }

        const data = userSnap.data();

        if (data.status !== "accepted") {
          results.notAccepted.push({
            code: trimmedCode,
            name: `${data.firstName || ""} ${data.lastName || ""}`.trim() || "Unknown",
          });
          continue;
        }

        if (data.studentParticipant) {
          results.alreadyCheckedIn.push({
            code: trimmedCode,
            name: `${data.firstName || ""} ${data.lastName || ""}`.trim() || "Unknown",
          });
          continue;
        }

        // Check in the user
        await updateDoc(userRef, {
          studentParticipant: true,
          checkedInAt: new Date(),
        });

        results.successful.push({
          code: trimmedCode,
          name: `${data.firstName || ""} ${data.lastName || ""}`.trim() || "Unknown",
        });
      } catch (error) {
        console.error(`Error checking in user ${trimmedCode}:`, error);
        results.failed.push({
          code: trimmedCode,
          error: error.message || "Unknown error",
        });
      }
    }

    return results;
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      setBulkError("Please upload a valid Excel file (.xlsx or .xls)");
      return;
    }

    setBulkLoading(true);
    setBulkError("");
    setBulkResults(null);

    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const data = new Uint8Array(event.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          
          // Get the first sheet
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          
          // Convert to JSON
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          
          // Find the "Codes" column (case-insensitive)
          let codesColumn = null;
          const headers = Object.keys(jsonData[0] || {});
          for (const header of headers) {
            if (header.toLowerCase() === "codes" || header.toLowerCase() === "code") {
              codesColumn = header;
              break;
            }
          }

          if (!codesColumn) {
            setBulkError("Could not find a 'Codes' column in the Excel file. Please ensure your file has a column named 'Codes'.");
            setBulkLoading(false);
            return;
          }

          // Extract codes from the column
          const codes = jsonData
            .map(row => row[codesColumn])
            .filter(code => code !== null && code !== undefined && code !== "")
            .map(code => String(code).trim());

          if (codes.length === 0) {
            setBulkError("No codes found in the 'Codes' column. Please check your Excel file.");
            setBulkLoading(false);
            return;
          }

          // Process bulk check-in
          const results = await handleBulkCheckIn(codes);
          setBulkResults(results);
        } catch (error) {
          console.error("Error processing file:", error);
          setBulkError("Error processing Excel file. Please make sure the file is valid.");
        } finally {
          setBulkLoading(false);
        }
      };

      reader.onerror = () => {
        setBulkError("Error reading file. Please try again.");
        setBulkLoading(false);
      };

      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error("Error uploading file:", error);
      setBulkError("Error uploading file. Please try again.");
      setBulkLoading(false);
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
            disabled={loading || bulkLoading}
          />
        </div>
        <button type="submit" className="qr-submit-btn" disabled={loading || bulkLoading}>
          {loading ? "Loading..." : "Lookup User"}
        </button>
      </form>

      {/* Bulk Check-In Section */}
      <div className="qr-bulk-section">
        <h3 className="qr-bulk-title">Bulk Check-In (Excel File)</h3>
        <p className="qr-bulk-description">
          Upload an Excel file (.xlsx) with a "Codes" column containing user UIDs to check in multiple users at once.
        </p>
        <div className="qr-file-input-group">
          <label htmlFor="qr-file-input" className="qr-file-label">
            Choose Excel File
          </label>
          <input
            id="qr-file-input"
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileUpload}
            className="qr-file-input"
            disabled={loading || bulkLoading}
          />
        </div>
        {bulkLoading && (
          <div className="qr-bulk-loading">
            Processing bulk check-in... Please wait.
          </div>
        )}
        {bulkError && <div className="qr-error">{bulkError}</div>}
      </div>

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

      {/* Bulk Check-In Results */}
      {bulkResults && (
        <div className="qr-bulk-results">
          <h3 className="qr-bulk-results-title">Bulk Check-In Results</h3>
          
          {bulkResults.successful.length > 0 && (
            <div className="qr-bulk-result-section qr-bulk-success">
              <h4 className="qr-bulk-result-header">
                ✓ Successfully Checked In ({bulkResults.successful.length})
              </h4>
              <ul className="qr-bulk-result-list">
                {bulkResults.successful.map((user, idx) => (
                  <li key={idx}>{user.name} ({user.code})</li>
                ))}
              </ul>
            </div>
          )}

          {bulkResults.alreadyCheckedIn.length > 0 && (
            <div className="qr-bulk-result-section qr-bulk-warning">
              <h4 className="qr-bulk-result-header">
                ⚠ Already Checked In ({bulkResults.alreadyCheckedIn.length})
              </h4>
              <ul className="qr-bulk-result-list">
                {bulkResults.alreadyCheckedIn.map((user, idx) => (
                  <li key={idx}>{user.name} ({user.code})</li>
                ))}
              </ul>
            </div>
          )}

          {bulkResults.notAccepted.length > 0 && (
            <div className="qr-bulk-result-section qr-bulk-error">
              <h4 className="qr-bulk-result-header">
                ✗ Not Accepted ({bulkResults.notAccepted.length})
              </h4>
              <ul className="qr-bulk-result-list">
                {bulkResults.notAccepted.map((user, idx) => (
                  <li key={idx}>{user.name} ({user.code})</li>
                ))}
              </ul>
            </div>
          )}

          {bulkResults.notFound.length > 0 && (
            <div className="qr-bulk-result-section qr-bulk-error">
              <h4 className="qr-bulk-result-header">
                ✗ Not Found ({bulkResults.notFound.length})
              </h4>
              <ul className="qr-bulk-result-list">
                {bulkResults.notFound.map((code, idx) => (
                  <li key={idx}>{code}</li>
                ))}
              </ul>
            </div>
          )}

          {bulkResults.failed.length > 0 && (
            <div className="qr-bulk-result-section qr-bulk-error">
              <h4 className="qr-bulk-result-header">
                ✗ Failed ({bulkResults.failed.length})
              </h4>
              <ul className="qr-bulk-result-list">
                {bulkResults.failed.map((item, idx) => (
                  <li key={idx}>{item.code}: {item.error}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="qr-bulk-summary">
            <p>
              <strong>Total Processed:</strong> {
                bulkResults.successful.length +
                bulkResults.alreadyCheckedIn.length +
                bulkResults.notAccepted.length +
                bulkResults.notFound.length +
                bulkResults.failed.length
              }
            </p>
            <p>
              <strong>Successfully Checked In:</strong> {bulkResults.successful.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
