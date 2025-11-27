"use client";

import "./assets/styles.css";
import { useState } from "react";

export default function AdminLogin() {
  const [loading, setLoading] = useState(false);

  async function login(e) {
    e.preventDefault();
    setLoading(true); // ⭐ IMP: START LOADING

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",   // ⭐ cookie set होने के लिए जरूरी
        body: JSON.stringify({
          username: e.target.username.value,
          password: e.target.password.value,
        }),
      });

      const data = await res.json();

      if (data.success) {
        window.location.replace("/admin");
      } else {
        alert(data.error || "Invalid credentials");
      }
    } catch (err) {
      alert("Network error, try again.");
      console.error(err);
    }

    setLoading(false); // ⭐ IMP: STOP LOADING
  }

  return (
    <div className="login-wrap">
      <form onSubmit={login} className="login-box">
        <h2>Admin Login</h2>

        <input name="username" placeholder="Username" required />
        <input name="password" placeholder="Password" type="password" required />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
