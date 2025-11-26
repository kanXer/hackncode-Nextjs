"use client";
import "globalLoader.css";
import { useState, useEffect } from "react";
export default function GlobalLoader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="global-intro-screen">
      <img src="/logo.jpeg" className="global-intro-pic" />

      <div className="global-name">Sahil Srivastava</div>
      <p className="global-slogn">Developer • Black Hat Hacker • Security Researcher</p>

      <h1 className="global-welcome">Let’s Begin the Journey</h1>

      <div className="global-dots">
        <span>.</span><span>.</span><span>.</span>
      </div>
    </div>
  );
}

