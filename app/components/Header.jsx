"use client";
import "header.css";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function KxHeader() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.body.classList.add(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    document.body.classList.remove("light", "dark");
    document.body.classList.add(newTheme);
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  const openMobileMenu = () => {
    const nav = document.getElementById("kxMainNav");
    const ham = document.getElementById("kxHamburger");

    nav.classList.toggle("active");
    ham.classList.toggle("open");
  };

  const closeMenuOnClick = () => {
    const nav = document.getElementById("kxMainNav");
    const ham = document.getElementById("kxHamburger");

    nav.classList.remove("active");
    ham.classList.remove("open");
  };

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

      {/* THE FIX — id="kxMainNav" added */}
      <nav id="kxMainNav" className="kx-nav" onClick={closeMenuOnClick}>
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
          id="kxHamburger"
          className="kx-hamburger"
          onClick={openMobileMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>
    </header>
  );
}

