"use client";

import { useState, useEffect } from "react";
import "./assets/styles.css";

export default function AdminCreateNews() {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]); // ⭐ DB categories state

  // Load categories from DB
  useEffect(() => {
    fetch("/api/categories/all")
      .then((res) => res.json())
      .then((data) => setCategories(data)) // data = [{_id,name}]
      .catch(() => {});
  }, []);

  async function submitForm(e) {
    e.preventDefault();
    e.stopPropagation();

    setLoading(true);

    const form = new FormData(e.target);

    const res = await fetch("/api/news/create", {
      method: "POST",
      body: form,
    });

    const data = await res.json();

    if (data.success) {
      alert("News created successfully!");
      e.target.reset();
    } else {
      alert("Error: " + data.error);
    }

    setLoading(false);
  }

  return (
    <div className="dashboard-wrapper">
      <h1 className="dashboard-title">News Creation Dashboard</h1>

      <form
        method="POST"
        encType="multipart/form-data"
        className="dashboard-card"
        onSubmit={submitForm}
      >
        {/* BASIC INFO */}
        <div className="section-title">Basic Information</div>

        <label>Title *</label>
        <input type="text" name="title" required />


        <label>Slug *</label>
        <input type="text" name="slug" required />

        <label>Category *</label>

        {/* ⭐ CATEGORY DROPDOWN */}
        <select name="category" required className="category-select">
          <option value="">Select Category</option>

          {categories.map((cat) => (
            <option key={cat._id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* CONTENT */}
        <div className="section-title">Content</div>

        <label>Full Content *</label>
        <textarea name="content" required></textarea>

        {/* MEDIA */}
        <div className="section-title">Media</div>

        <label>Feature Image *</label>
        <input type="file" name="feature_image" required />

        <label>Gallery Images (8–10 images)</label>
        <input type="file" name="images" multiple />

        <label>YouTube Video ID</label>
        <input type="text" name="youtube_url" />

        {/* AUTHOR */}
        <div className="section-title">Author</div>

        <label>Author Name *</label>
        <input
          type="text"
          name="user_name"
          placeholder="Leave empty for default"
        />

        <label>Author Photo *</label>
        <input type="file" name="user_image" />

        <button type="submit">
          {loading ? "Uploading..." : "Create News"}
        </button>
      </form>
    </div>
  );
}
