"use client";

import { useEffect, useState } from "react";

export default function AdminNav() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    fetch("/api/admin/check")
      .then(res => res.json())
      .then(data => setLoggedIn(data.loggedIn));
  }, []);

  return (
    <div className="admin-nav">
      <a href="/admin" className="nav-item">Dashboard</a>
      <a href="/admin/news" className="nav-item">Create News</a>

      {loggedIn && (
        <a className="logout-btn" href="/api/admin/logout">Logout</a>
      )}
    </div>
  );
}
