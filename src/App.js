import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import { AuthProvider } from "./contexts/AuthContext";

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
                                {/* rest of the site sits on site-wide background */}
                                {/* <Application /> */}
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
                        path="/dashboard"
                        element={
                            <div className="App is-landing">
                                <Dashboard />
                            </div>
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
