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

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <About />
      <Tracks />
      <Speakers />
      <FAQ />
      <Sponsors />
      <Teams />
    </div>
  );
}

export default App;
