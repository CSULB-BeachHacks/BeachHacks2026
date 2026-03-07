import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import ChangePasswordModal from "../ChangePasswordModal/ChangePasswordModal";
import QRScanner from "../QRScanner/QRScanner";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { currentUser, logout, changePassword } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [error, setError] = useState("");
  const [globalSearchQuery, setGlobalSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // "all", "pending", "accepted", "waitlisted", "rejected"

  useEffect(() => {
    async function checkAdminAndLoadUsers() {
      if (!currentUser) {
        navigate("/admin/login");
        return;
      }

      try {
        // Check if user is admin
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists() || !userSnap.data().isAdmin) {
          navigate("/admin/login");
          return;
        }

        setIsAdmin(true);

        // Load all applications
        const applicationsRef = collection(db, "applications");
        const applicationsSnap = await getDocs(applicationsRef);

        const usersList = [];
        applicationsSnap.forEach((doc) => {
          const data = doc.data();
          usersList.push({
            id: doc.id,
            ...data,
          });
        });

        // Sort by submittedAt if it exists, otherwise put at end
        usersList.sort((a, b) => {
          if (a.submittedAt && b.submittedAt) {
            return b.submittedAt.toMillis() - a.submittedAt.toMillis();
          }
          if (a.submittedAt) return -1;
          if (b.submittedAt) return 1;
          return 0;
        });

        setUsers(usersList);
      } catch (error) {
        console.error("Error loading users:", error);
      } finally {
        setLoading(false);
      }
    }

    checkAdminAndLoadUsers();
  }, [currentUser, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/admin/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
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

  const handleUserClick = (userId) => {
    navigate(`/admin/users/${userId}`);
  };

  const isGoogleUser = currentUser?.providerData?.some(
    provider => provider.providerId === "google.com"
  );

  if (loading) {
    return (
      <div className="admin-dashboard-loading">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="admin-dashboard-loading">
        <p>Checking access...</p>
      </div>
    );
  }

  return (
    <main className="admin-dashboard">
      <div className="admin-dashboard-container">
        <div className="admin-dashboard-header">
          <h1 className="admin-dashboard-title">Admin Dashboard</h1>
          <p className="admin-dashboard-subtitle">BeachHacks 9.0 Administration</p>
          <div className="admin-header-actions">
            {!isGoogleUser && (
              <button onClick={handleChangePasswordClick} className="admin-change-password-btn">
                Change Password
              </button>
            )}
            <button onClick={handleLogout} className="admin-logout-btn">
              Logout
            </button>
          </div>
        </div>

        <div className="admin-dashboard-content">
          <div className="admin-welcome">
            <p>Welcome, {currentUser.email}</p>
            <div className="admin-stats">
              <p className="admin-info">Total Applications: {users.length}</p>
              <p className="admin-info">Applied: {users.filter(u => (u.status || "pending") === "pending" && u.submittedAt).length}</p>
              <p className="admin-info">Waitlisted: {users.filter(u => u.status === "waitlisted").length}</p>
              <p className="admin-info">Accepted: {users.filter(u => u.status === "accepted").length}</p>
              <p className="admin-info">Rejected: {users.filter(u => u.status === "rejected").length}</p>
            </div>
          </div>

          <div className="admin-filters-section">
            <div className="admin-search-container global">
              <input
                type="text"
                placeholder="Search globally by name, email, or school..."
                value={globalSearchQuery}
                onChange={(e) => setGlobalSearchQuery(e.target.value)}
                className="admin-search-input"
              />
            </div>
            <div className="admin-status-filter-container">
              <label htmlFor="status-filter" className="admin-status-filter-label">Filter by Status:</label>
              <select
                id="status-filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="admin-status-dropdown"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="waitlisted">Waitlisted</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          {/* QR Code Scanner Section */}
          <div className="admin-qr-section">
            <QRScanner />
          </div>

          {/* Applied (Pending) Section */}
          {(statusFilter === "all" || statusFilter === "pending") && (
            <div className="admin-users-list">
              <h2 className="admin-list-title">Applied (Pending Review)</h2>
              {(() => {
                let appliedUsers = users.filter(u => (u.status || "pending") === "pending" && u.submittedAt);

                // Apply global search filter
                if (globalSearchQuery.trim()) {
                  const query = globalSearchQuery.toLowerCase().trim();
                  appliedUsers = appliedUsers.filter(user => {
                    const fullName = `${user.firstName || ""} ${user.lastName || ""}`.toLowerCase();
                    const email = (user.email || user.userId || "").toLowerCase();
                    const school = (user.school || "").toLowerCase();
                    return fullName.includes(query) || email.includes(query) || school.includes(query);
                  });
                }

                return appliedUsers.length === 0 ? (
                  <p className="admin-no-users">No applications pending review.</p>
                ) : (
                  <div className="admin-users-grid">
                    {appliedUsers.map((user) => (
                      <div
                        key={user.id}
                        className="admin-user-card"
                        onClick={() => handleUserClick(user.id)}
                      >
                        <div className="admin-user-card-header">
                          <h3 className="admin-user-name">
                            {user.firstName} {user.lastName}
                          </h3>
                          <span className="admin-status-badge admin-status-pending">
                            pending
                          </span>
                        </div>
                        <div className="admin-user-details">
                          <p className="admin-user-email">{user.email || user.userId}</p>
                          <p className="admin-user-school">{user.school}</p>
                          <p className="admin-submitted">Submitted</p>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          )}

          {/* Waitlisted Section */}
          {(statusFilter === "all" || statusFilter === "waitlisted") && (
            <div className="admin-users-list">
              <h2 className="admin-list-title">Waitlisted</h2>
              {(() => {
                let waitlistedUsers = users.filter(u => u.status === "waitlisted");

                // Apply global search filter
                if (globalSearchQuery.trim()) {
                  const query = globalSearchQuery.toLowerCase().trim();
                  waitlistedUsers = waitlistedUsers.filter(user => {
                    const fullName = `${user.firstName || ""} ${user.lastName || ""}`.toLowerCase();
                    const email = (user.email || user.userId || "").toLowerCase();
                    const school = (user.school || "").toLowerCase();
                    return fullName.includes(query) || email.includes(query) || school.includes(query);
                  });
                }

                return waitlistedUsers.length === 0 ? (
                  <p className="admin-no-users">No waitlisted applications.</p>
                ) : (
                  <div className="admin-users-grid">
                    {waitlistedUsers.map((user) => (
                      <div
                        key={user.id}
                        className="admin-user-card"
                        onClick={() => handleUserClick(user.id)}
                      >
                        <div className="admin-user-card-header">
                          <h3 className="admin-user-name">
                            {user.firstName} {user.lastName}
                          </h3>
                          <span className="admin-status-badge admin-status-waitlisted">
                            waitlisted
                          </span>
                        </div>
                        <div className="admin-user-details">
                          <p className="admin-user-email">{user.email || user.userId}</p>
                          <p className="admin-user-school">{user.school}</p>
                          <p className="admin-submitted">
                            {user.submittedAt ? "Submitted" : "Not Submitted"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          )}

          {(statusFilter === "all" || statusFilter === "accepted") && (
            <div className="admin-users-list">
              <div className="admin-list-header">
                <h2 className="admin-list-title">Accepted</h2>
              </div>
              {(() => {
                let acceptedUsers = users.filter((u) => u.status === "accepted");

                // Apply global search filter
                if (globalSearchQuery.trim()) {
                  const query = globalSearchQuery.toLowerCase().trim();
                  acceptedUsers = acceptedUsers.filter((user) => {
                    const fullName = `${user.firstName || ""} ${user.lastName || ""}`.toLowerCase();
                    const email = (user.email || user.userId || "").toLowerCase();
                    const school = (user.school || "").toLowerCase();
                    return (
                      fullName.includes(query) ||
                      email.includes(query) ||
                      school.includes(query)
                    );
                  });
                }

                return acceptedUsers.length === 0 ? (
                  <p className="admin-no-users">No users found.</p>
                ) : (
                  <div className="admin-users-grid">
                    {acceptedUsers.map((user) => (
                      <div
                        key={user.id}
                        className="admin-user-card"
                        onClick={() => handleUserClick(user.id)}
                      >
                        <div className="admin-user-card-header">
                          <h3 className="admin-user-name">
                            {user.firstName} {user.lastName}
                          </h3>
                          <span className="admin-status-badge admin-status-accepted">
                            accepted
                          </span>
                        </div>
                        <div className="admin-user-details">
                          <p className="admin-user-email">
                            {user.email || user.userId}
                          </p>
                          <p className="admin-user-school">{user.school}</p>
                          <p className="admin-submitted">
                            {user.submittedAt ? "Submitted" : "Not Submitted"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          )}

          {(statusFilter === "all" || statusFilter === "rejected") && (
            <div className="admin-users-list">
              <h2 className="admin-list-title">Rejected</h2>
              {(() => {
                let rejectedUsers = users.filter((u) => u.status === "rejected");

                // Apply global search filter
                if (globalSearchQuery.trim()) {
                  const query = globalSearchQuery.toLowerCase().trim();
                  rejectedUsers = rejectedUsers.filter((user) => {
                    const fullName = `${user.firstName || ""} ${user.lastName || ""}`.toLowerCase();
                    const email = (user.email || user.userId || "").toLowerCase();
                    const school = (user.school || "").toLowerCase();
                    return (
                      fullName.includes(query) ||
                      email.includes(query) ||
                      school.includes(query)
                    );
                  });
                }

                return rejectedUsers.length === 0 ? (
                  <p className="admin-no-users">No rejected applications.</p>
                ) : (
                  <div className="admin-users-grid">
                    {rejectedUsers.map((user) => (
                      <div
                        key={user.id}
                        className="admin-user-card"
                        onClick={() => handleUserClick(user.id)}
                      >
                        <div className="admin-user-card-header">
                          <h3 className="admin-user-name">
                            {user.firstName} {user.lastName}
                          </h3>
                          <span className="admin-status-badge admin-status-rejected">
                            rejected
                          </span>
                        </div>
                        <div className="admin-user-details">
                          <p className="admin-user-email">
                            {user.email || user.userId}
                          </p>
                          <p className="admin-user-school">{user.school}</p>
                          <p className="admin-submitted">
                            {user.submittedAt ? "Submitted" : "Not Submitted"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      </div>

      <ChangePasswordModal
        isOpen={showChangePasswordModal}
        onConfirm={handleChangePassword}
        onCancel={handleCancelChangePassword}
        error={error}
      />
    </main>
  );
}
