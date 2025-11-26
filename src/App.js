import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";

// Import all components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Tracks from "./components/Tracks";
import Speakers from "./components/Speakers";
import FAQ from "./components/FAQ";
import Sponsors from "./components/Sponsors";
import Teams from "./components/Teams";
import Application from "./components/Application";
import Dashboard from "./components/Dashboard/Dashboard";

// Import Auth Provider
import { AuthProvider, useAuth } from "./contexts/AuthContext";

// Protected Route Component - redirects to home if not authenticated
function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/" replace />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <div className="App is-default">
                {/*Hero keeps its own background */}
                <div className="is-landing">
                  <Navbar />
                  <Hero />
                </div>
                <About />
                <Tracks />
                <Speakers />
                <FAQ />
                <Sponsors />
                <Teams />
              </div>
            }
          />
          <Route
            path="/apply"
            element={
              <ProtectedRoute>
                <div className="App is-default">
                  <Navbar />
                  <Application />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <div className="App is-landing">
                  <Dashboard />
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
