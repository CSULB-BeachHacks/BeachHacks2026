import React from "react";
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

// Import Auth Provider
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <div className="App is-landing">
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
    </AuthProvider>
  );
}

export default App;
