import React, { useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#about", label: "About" },
    { href: "#tracks", label: "Tracks" },
    { href: "#speakers", label: "Speakers" },
    { href: "#faq", label: "FAQ" },
    { href: "#sponsors", label: "Sponsors" },
    { href: "#teams", label: "Teams" },
  ];

  return (
    <nav className="bh-nav" role="navigation" aria-label="Primary">
      <div className="bh-nav-inner">
        {/* Left: Logo */}
        <a href="#home" className="bh-logo" aria-label="BeachHacks Home">
          <img src="../acm_logo.png" alt="" />
        </a>

        {/* Center: Links */}
        <ul className={`bh-links ${open ? "open" : ""}`}>
          {links.map(({ href, label }) => (
            <li key={href}>
              <a href={href} onClick={() => setOpen(false)}>{label}</a>
            </li>
          ))}
        </ul>

        {/* Right: Apply */}
        <div className="bh-right">
          <a href="/apply" className="bh-apply">Apply</a>

          {/* Mobile hamburger */}
          <button
            className={`bh-burger ${open ? "active" : ""}`}
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen(v => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </nav>
  );
}
