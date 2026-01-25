import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import "./AdminLogin.css";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, currentUser, logout } = useAuth();

  // Redirect if already logged in as admin, or redirect regular users away
  useEffect(() => {
    async function checkAdminStatus() {
      if (currentUser) {
        try {
          const userRef = doc(db, "users", currentUser.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists() && userSnap.data().isAdmin) {
            // Already logged in as admin - redirect to admin dashboard
            navigate("/admin/dashboard");
          } else {
            // Regular user is signed in - redirect them away from admin login
            navigate("/dashboard");
          }
        } catch (error) {
          console.error("Error checking admin status:", error);
        }
      }
    }
    checkAdminStatus();
  }, [currentUser, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      const result = await login(email, password);
      
      // Check Firestore for admin flag
      const userRef = doc(db, "users", result.user.uid);
      const userSnap = await getDoc(userRef);
      
      if (!userSnap.exists() || !userSnap.data().isAdmin) {
        // Not an admin user - log them out immediately
        await logout();
        setError("Access denied. This is an admin-only portal.");
        setLoading(false);
        return;
      }
      
      // Admin user - redirect to admin dashboard
      navigate("/admin/dashboard");
    } catch (error) {
      setError("Failed to log in: " + error.message);
      setLoading(false);
    }
  }

  return (
    <section className="admin-login">
      {/* Decorative assets */}
      <img src="/crab_waving.png" alt="Crab" className="admin-crab" />
      <img
        src="/small_cyan_star.svg"
        alt="Cyan Star"
        className="admin-cyan-star"
      />
      <img
        src="/purple_small_star.svg"
        alt="Star"
        className="admin-purple-star"
      />
      <img
        src="/right-rock.png"
        alt="Rock"
        className="admin-rock"
      />
      <img
        src="/purple_sea_plant.svg"
        alt="Sea Plant"
        className="admin-sea-plant"
      />
      <img
        src="/dark_blue_kelp_rigtht.png"
        alt="Kelp"
        className="admin-kelp"
      />

      <div className="admin-login-container">
        <div className="admin-login-content">
          <div className="admin-header">
            <h1 className="admin-title">Admin Login</h1>
            <p className="admin-subtitle">BeachHacks 9.0 Administration</p>
          </div>

          {error && (
            <div className="admin-error-message">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="admin-form">
            <div className="admin-form-group">
              <label htmlFor="admin-email">Email</label>
              <div className="admin-input-wrap">
                <img
                  src="/input_field.png"
                  alt=""
                  aria-hidden="true"
                  className="admin-input-image"
                />
                <input
                  type="email"
                  id="admin-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="admin-input"
                  required
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label htmlFor="admin-password">Password</label>
              <div className="admin-input-wrap">
                <img
                  src="/input_field.png"
                  alt=""
                  aria-hidden="true"
                  className="admin-input-image"
                />
                <input
                  type="password"
                  id="admin-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="admin-input"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`admin-submit-btn ${loading ? "submitting" : ""}`}
            >
              {loading ? (
                <span>
                  Signing In
                  <span className="admin-loading-dots">
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                  </span>
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="admin-footer">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="admin-back-btn"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
