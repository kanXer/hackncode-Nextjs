"use client";

import { useEffect, useState } from "react";
import "./assets/styles.css";

// ---------- CATEGORY NORMALIZER ----------
function normalizeCategories(arr) {
  return (arr || [])
    .filter(Boolean)
    .map((c) => {
      if (typeof c === "string") {
        return { _id: c, name: c };
      }
      if (typeof c === "object" && c !== null) {
        return {
          _id:
            c._id ||
            c.id ||
            c.name ||
            c.category ||
            Math.random().toString(36),
          name: c.name || c.category || "",
        };
      }
      return null;
    })
    .filter((x) => x && x.name);
}

export default function AdminDashboard() {
  const [news, setNews] = useState([]);
  const [logs, setLogs] = useState([]);
  const [deleteSlug, setDeleteSlug] = useState(null);
  const [deleteLogId, setDeleteLogId] = useState(null);

  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [selectedCat, setSelectedCat] = useState("all");

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const [popupData, setPopupData] = useState(null);
  const [loading, setLoading] = useState(true);

  // ------- LOAD NEWS -------
  useEffect(() => {
    fetch("/api/news/all")
      .then((res) => res.json())
      .then((data) => {
        setNews(data);
        setLoading(false);
      });
  }, []);

  // ------- LOAD CATEGORIES -------
  useEffect(() => {
    fetch("/api/categories/all")
      .then((res) => res.json())
      .then((data) => setCategories(normalizeCategories(data)));
  }, []);

  // ------- ADD CATEGORY -------
  async function addCategory() {
    if (!newCategory.trim()) return alert("Enter category");

    const res = await fetch("/api/categories/add", {
      method: "POST",
      body: JSON.stringify({ category: newCategory.trim() }),
    });

    const json = await res.json();

    if (json.success) {
      const cat = newCategory.trim();
      setCategories((prev) => [...prev, { _id: cat, name: cat }]);
      setNewCategory("");
    } else {
      alert(json.error);
    }
  }

  // ------- DELETE CATEGORY -------
  async function removeCategory(name) {
    if (!confirm(`Delete category "${name}" ?`)) return;

    const res = await fetch("/api/categories/delete", {
      method: "POST",
      body: JSON.stringify({ category: name }),
    });

    const json = await res.json();

    if (json.success) {
      setCategories((prev) => prev.filter((c) => c.name !== name));
      if (selectedCat === name) setSelectedCat("all");
    } else {
      alert(json.error);
    }
  }

  // NEWS DELETE
  useEffect(() => {
    if (!deleteSlug) return;

    if (!confirm(`Delete post "${deleteSlug}"?`)) {
      setDeleteSlug(null);
      return;
    }

    fetch("/api/news/delete", {
      method: "POST",
      body: JSON.stringify({ slug: deleteSlug }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setNews((prev) => prev.filter((n) => n.slug !== deleteSlug));
        } else {
          alert(json.error);
        }
        setDeleteSlug(null);
      });
  }, [deleteSlug]);

  // LOAD OSINT LOGS
  useEffect(() => {
    fetch("/api/osint/logs")
      .then((res) => res.json())
      .then((data) => setLogs(data));
  }, []);

  // DELETE LOG
  useEffect(() => {
    if (!deleteLogId) return;

    if (!confirm("Delete this log?")) {
      setDeleteLogId(null);
      return;
    }

    fetch("/api/osint/delete", {
      method: "POST",
      body: JSON.stringify({ id: deleteLogId }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setLogs((prev) => prev.filter((l) => l._id !== deleteLogId));
        } else {
          alert(json.error);
        }
        setDeleteLogId(null);
      });
  }, [deleteLogId]);

  const filteredNews =
    selectedCat === "all"
      ? news
      : news.filter((item) => item.category === selectedCat);

  const filteredLogs = logs.filter((log) => {
    const modeMatch = filter === "all" || log.mode === filter;
    const searchMatch =
      search === "" ||
      log.query.toLowerCase().includes(search.toLowerCase());
    return modeMatch && searchMatch;
  });

  if (loading) return <p className="loading-text">Loading...</p>;

  return (
    <div className="dashboard-wrapper">

      {/* =====================================
          CATEGORY TAG STRIP
      ===================================== */}
      <div className="category-strip">
        <h2 className="block-title">Categories</h2>

        <div className="tag-row">
          <div className="tag-item-wrapper">
            <button
              className={`tag-item ${
                selectedCat === "all" ? "active" : ""
              }`}
              onClick={() => setSelectedCat("all")}
            >
              All
            </button>
          </div>

          {categories.map((cat) => (
            <div
              key={cat._id}
              className={`tag-item-wrapper ${
                selectedCat === cat.name ? "active" : ""
              }`}
            >
              <button
                className="tag-item"
                onClick={() => setSelectedCat(cat.name)}
              >
                {cat.name}
              </button>

              <button
                className="tag-delete"
                onClick={() => removeCategory(cat.name)}
              >
                ✖
              </button>
            </div>
          ))}
        </div>

        <div className="add-cat-box inline">
          <input
            placeholder="New category..."
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <button onClick={addCategory}>Add</button>
        </div>
      </div>

      {/* =====================================
          NEWS MANAGEMENT
      ===================================== */}
      <h1 className="dashboard-title">News Management</h1>

      <div className="scroll-box">
        {filteredNews.map((item) => (
          <div key={item._id} className="row-item">
            <div className="row-text">
              <h4>{item.title}</h4>
              <p>{item.slug}</p>
            </div>

            <div className="row-actions">
              <a className="btn-edit" href={`/admin/news/edit/${item.slug}`}>
                Edit
              </a>

              <button
                className="btn-delete"
                onClick={() => setDeleteSlug(item.slug)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <a className="create-btn" href="/admin/news/">
        + Create News Post
      </a>

      {/* =====================================
          OSINT LOGS
      ===================================== */}
      <h1 className="dashboard-title" style={{ marginTop: 50 }}>
        OSINT Lookup Logs
      </h1>

      <div className="osint-controls">
        <input
          className="osint-search"
          placeholder="Search query..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="osint-filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Modes</option>
          <option value="phone">Phone</option>
          <option value="email">Email</option>
          <option value="id">ID</option>
        </select>
      </div>

      <div className="scroll-box">
        {filteredLogs.map((log) => (
          <div key={log._id} className="row-item">
            <div className="row-text">
              <h4>{log.query}</h4>
              <p>
                {log.mode.toUpperCase()} —{" "}
                {new Date(log.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="row-actions">
              <button
                className="btn-view"
                onClick={() => setPopupData(log.result)}
              >
                View JSON
              </button>

              <button
                className="btn-delete"
                onClick={() => setDeleteLogId(log._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ========= JSON POPUP (NEW DESIGN) ========= */}
      {popupData && (
        <div className="popup-overlay" onClick={() => setPopupData(null)}>
          <div className="popup-box" onClick={(e) => e.stopPropagation()}>
            <h3 className="popup-title">JSON Output</h3>

            <div className="popup-content">
              <pre>{JSON.stringify(popupData, null, 2)}</pre>
            </div>

            <button className="popup-close" onClick={() => setPopupData(null)}>
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
