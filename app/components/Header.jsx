"use client";

import "./assets/header.css";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function KxHeader() {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Prevent hydration crash
  useEffect(() => {
    setMounted(true);
  }, []);

  // Load theme only after mount (safe)
  useEffect(() => {
    if (!mounted) return;

    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);

    document.body.classList.remove("light", "dark");
    document.body.classList.add(savedTheme);
  }, [mounted]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    document.body.classList.remove("light", "dark");
    document.body.classList.add(newTheme);

    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  if (!mounted) return null; // Prevents mobile crash

  return (
    <header className="kx-header">
      <div className="kx-logo">
        <div className="kx-dot">SKS</div>

        <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
          <div>
            <h1>Sahil Srivastava</h1>
            <div className="kx-small">Black Hat Hacker & Developer</div>
          </div>
        </Link>
      </div>

      {/* MOBILE MENU FIX (React-controlled) */}
      <nav
        className={`kx-nav ${menuOpen ? "active" : ""}`}
        onClick={closeMenu}
      >
        <Link href="/">Home</Link>
        <Link href="/phone_info">OSINT</Link>
        <Link href="/news">News</Link>
        <Link href="/#projects">Projects</Link>
        <Link href="/#contact">Contact</Link>
      </nav>

      <div className="kx-right">
        <button
          aria-label="Toggle Theme"
          className="kx-theme-btn"
          onClick={toggleTheme}
        >
          {theme === "light" ? "🌙" : "💡"}
        </button>

        <button
          className={`kx-hamburger ${menuOpen ? "open" : ""}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
