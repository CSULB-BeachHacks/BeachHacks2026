// src/App.js
import React, { useState } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Tracks from "./components/Tracks";
import Speakers from "./components/Speakers";
import FAQ from "./components/FAQ";
import Sponsors from "./components/Sponsors";
import Teams from "./components/Teams";

import { AuthProvider } from "./contexts/AuthContext";

function App() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark((prev) => !prev);

  // base background class is is-default, dark just swaps the image
  const appClassName = `App is-default ${isDark ? "dark" : ""}`;

  return (
    <AuthProvider>
      <div className={appClassName}>
        <Navbar isDark={isDark} onToggleTheme={toggleTheme} />
        <Hero />
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
