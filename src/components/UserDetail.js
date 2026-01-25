import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import "./UserDetail.css";

export default function UserDetail() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [locationStatus, setLocationStatus] = useState("");
  const [meals, setMeals] = useState({
    breakfast: false,
    lunch: false,
    dinner: false,
  });

  useEffect(() => {
    async function checkAdminAndLoadUser() {
      if (!currentUser) {
        navigate("/admin/login");
        return;
      }

      try {
        // Check if user is admin
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);
        
        if (!userSnap.exists() || !userSnap.data().isAdmin) {
          navigate("/admin/dashboard");
          return;
        }

        setIsAdmin(true);

        // Load user application data
        const applicationRef = doc(db, "applications", userId);
        const applicationSnap = await getDoc(applicationRef);
        
        if (applicationSnap.exists()) {
          const appData = applicationSnap.data();
          
          // If email is not in application, try to get it from users collection
          if (!appData.email) {
            try {
              const userRef = doc(db, "users", userId);
              const userSnap = await getDoc(userRef);
              if (userSnap.exists() && userSnap.data().email) {
                appData.email = userSnap.data().email;
              }
            } catch (error) {
              console.error("Error fetching email from users collection:", error);
            }
          }
          
          setUserData(appData);
          
          // Set location status and meals from user data
          setLocationStatus(appData.locationStatus || "");
          setMeals(appData.meals || { breakfast: false, lunch: false, dinner: false });
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      } finally {
        setLoading(false);
      }
    }

    checkAdminAndLoadUser();
  }, [currentUser, userId, navigate]);

  const handleStatusUpdate = async (newStatus) => {
    if (!userData) return;

    try {
      setUpdating(true);
      const applicationRef = doc(db, "applications", userId);
      await updateDoc(applicationRef, {
        status: newStatus,
        updatedAt: new Date(),
      });
      
      setUserData({ ...userData, status: newStatus });
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  const handleLocationStatusUpdate = async () => {
    if (!userData || !locationStatus) return;

    try {
      setUpdating(true);
      const applicationRef = doc(db, "applications", userId);
      await updateDoc(applicationRef, {
        locationStatus: locationStatus,
        updatedAt: new Date(),
      });
      
      setUserData({ ...userData, locationStatus: locationStatus });
      alert("Location status updated successfully!");
    } catch (error) {
      console.error("Error updating location status:", error);
      alert("Failed to update location status. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  const handleMealToggle = (meal) => {
    const newMeals = {
      ...meals,
      [meal]: !meals[meal],
    };
    setMeals(newMeals);
  };

  const handleMealsUpdate = async () => {
    if (!userData) return;

    try {
      setUpdating(true);
      const applicationRef = doc(db, "applications", userId);
      await updateDoc(applicationRef, {
        meals: meals,
        updatedAt: new Date(),
      });
      
      setUserData({ ...userData, meals: meals });
      alert("Meals updated successfully!");
    } catch (error) {
      console.error("Error updating meals:", error);
      alert("Failed to update meals. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="user-detail-loading">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="user-detail-loading">
        <p>Checking access...</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="user-detail-container">
        <div className="user-detail-content">
          <h1>User Not Found</h1>
          <button onClick={() => navigate("/admin/dashboard")} className="user-detail-back-btn">
            ← Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const isSubmitted = !!userData.submittedAt;
  const currentStatus = userData.status || "pending";

  return (
    <main className="user-detail-container">
      <div className="user-detail-content">
        <div className="user-detail-header">
          <h1 className="user-detail-title">Application Details</h1>
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="user-detail-back-btn"
          >
            ← Back to Dashboard
          </button>
        </div>

        <div className="user-detail-info">
          <div className="user-detail-section">
            <h2 className="user-detail-section-title">Application Status</h2>
            <p className="user-detail-status">
              <strong>Submitted:</strong> {isSubmitted ? "Yes" : "No"}
            </p>
            {isSubmitted && (
              <p className="user-detail-status">
                <strong>Current Status:</strong>{" "}
                <span className={`status-badge status-${currentStatus}`}>
                  {currentStatus}
                </span>
              </p>
            )}
          </div>

          {isSubmitted ? (
            <>
              <div className="user-detail-section">
                <h2 className="user-detail-section-title">Personal Information</h2>
                <div className="user-detail-field">
                  <strong>Name:</strong> {userData.firstName} {userData.lastName}
                </div>
                <div className="user-detail-field">
                  <strong>Email:</strong> {userData.email || userData.userId || "Not available"}
                </div>
                <div className="user-detail-field">
                  <strong>Discord Username:</strong> {userData.discordUsername}
                </div>
                <div className="user-detail-field">
                  <strong>School:</strong> {userData.school}
                </div>
                <div className="user-detail-field">
                  <strong>Year:</strong> {userData.year}
                </div>
              </div>

              <div className="user-detail-section">
                <h2 className="user-detail-section-title">Why Participate</h2>
                <p className="user-detail-answer">{userData.whyParticipate}</p>
              </div>

              {userData.resumeUrl && (
                <div className="user-detail-section">
                  <h2 className="user-detail-section-title">Resume</h2>
                  <a
                    href={userData.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="user-detail-resume-link"
                  >
                    View Resume Document
                  </a>
                </div>
              )}

              {/* Only show status buttons if status is pending or waitlisted */}
              {(currentStatus === "pending" || currentStatus === "waitlisted") && (
                <div className="user-detail-section">
                  <h2 className="user-detail-section-title">Update Status</h2>
                  <div className="user-detail-status-buttons">
                    <button
                      onClick={() => handleStatusUpdate("accepted")}
                      disabled={updating || currentStatus === "accepted"}
                      className={`status-btn status-btn-accepted ${currentStatus === "accepted" ? "active" : ""}`}
                    >
                      Accepted
                    </button>
                    {currentStatus === "waitlisted" && (
                      <button
                        onClick={() => handleStatusUpdate("rejected")}
                        disabled={updating || currentStatus === "rejected"}
                        className={`status-btn status-btn-rejected ${currentStatus === "rejected" ? "active" : ""}`}
                      >
                        Rejected
                      </button>
                    )}
                    {currentStatus === "pending" && (
                      <>
                        <button
                          onClick={() => handleStatusUpdate("waitlisted")}
                          disabled={updating || currentStatus === "waitlisted"}
                          className={`status-btn status-btn-waitlisted ${currentStatus === "waitlisted" ? "active" : ""}`}
                        >
                          Waitlisted
                        </button>
                        <button
                          onClick={() => handleStatusUpdate("rejected")}
                          disabled={updating || currentStatus === "rejected"}
                          className={`status-btn status-btn-rejected ${currentStatus === "rejected" ? "active" : ""}`}
                        >
                          Rejected
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
              
              {/* Show message if status is final (accepted or rejected) */}
              {(currentStatus === "accepted" || currentStatus === "rejected") && (
                <div className="user-detail-section">
                  <p className="user-detail-status-final">
                    Status is final and cannot be changed.
                  </p>
                </div>
              )}

              {/* Show location status and meals controls if user is checked in */}
              {userData.studentParticipant && (
                <>
                  <div className="user-detail-section">
                    <h2 className="user-detail-section-title">Location Status</h2>
                    <div className="user-detail-field">
                      <strong>Current Location:</strong> {userData.locationStatus || "Not set"}
                    </div>
                    <div className="user-detail-location-controls">
                      <label className="user-detail-radio-label">
                        <input
                          type="radio"
                          name="location"
                          value="inside Venue"
                          checked={locationStatus === "inside Venue"}
                          onChange={(e) => setLocationStatus(e.target.value)}
                          className="user-detail-radio"
                        />
                        Inside Venue
                      </label>
                      <label className="user-detail-radio-label">
                        <input
                          type="radio"
                          name="location"
                          value="outside Venue"
                          checked={locationStatus === "outside Venue"}
                          onChange={(e) => setLocationStatus(e.target.value)}
                          className="user-detail-radio"
                        />
                        Outside Venue
                      </label>
                      <button
                        onClick={handleLocationStatusUpdate}
                        disabled={updating || !locationStatus || locationStatus === userData.locationStatus}
                        className="user-detail-update-btn"
                      >
                        {updating ? "Updating..." : "Update Location"}
                      </button>
                    </div>
                  </div>

                  <div className="user-detail-section">
                    <h2 className="user-detail-section-title">Meals</h2>
                    <div className="user-detail-meals-controls">
                      <label className="user-detail-checkbox-label">
                        <input
                          type="checkbox"
                          checked={meals.breakfast}
                          onChange={() => handleMealToggle("breakfast")}
                          className="user-detail-checkbox"
                        />
                        Breakfast
                      </label>
                      <label className="user-detail-checkbox-label">
                        <input
                          type="checkbox"
                          checked={meals.lunch}
                          onChange={() => handleMealToggle("lunch")}
                          className="user-detail-checkbox"
                        />
                        Lunch
                      </label>
                      <label className="user-detail-checkbox-label">
                        <input
                          type="checkbox"
                          checked={meals.dinner}
                          onChange={() => handleMealToggle("dinner")}
                          className="user-detail-checkbox"
                        />
                        Dinner
                      </label>
                      <button
                        onClick={handleMealsUpdate}
                        disabled={updating}
                        className="user-detail-update-btn"
                      >
                        {updating ? "Updating..." : "Update Meals"}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="user-detail-section">
              <p className="user-detail-not-submitted">
                This user has not submitted their application yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
