"use client";
import "./assets/styles.css"
import { useState } from "react";

export default function AdminLogin() {
  const [loading, setLoading] = useState(false);

    async function login(e) {
    e.preventDefault();

    const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",   // ⭐ MUST HAVE
        body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value
        })
    });

    const data = await res.json();

    if (data.success) {
        window.location.href = "/admin/";
    } else {
        alert(data.error);
    }
    }


  return (
    <div className="login-wrap">
      <form onSubmit={login} className="login-box">
        <h2>Admin Login</h2>

        <input name="username" placeholder="Username" required />
        <input name="password" placeholder="Password" type="password" required />

        <button type="submit" disabled={loading}>
          {loading ? "Logging..." : "Login"}
        </button>
      </form>
    </div>
  );
}
