"use client";

import { useState, useEffect } from "react";
import "./assets/styles.css";

export default function AdminCreateNews() {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  // Load categories
  useEffect(() => {
    fetch("/api/categories/all")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(() => {});
  }, []);

  async function submitForm(e) {
    e.preventDefault();
    e.stopPropagation();

    setLoading(true);

    const form = new FormData(e.target);

    // ❌ SLUG NOT ALLOWED – remove manually
    form.delete("slug");

    // If Author Name empty → remove, backend auto-fill
    if (!form.get("user_name")?.trim()) {
      form.delete("user_name");
    }

    // If Author Image empty → remove, backend auto-fill
    const authorImage = e.target.user_image.files[0];
    if (!authorImage) {
      form.delete("user_image");
    }

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

        {/* ❌ SLUG REMOVED FROM UI */}
        {/* No slug field now */}

        <label>Category *</label>
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

        {/* SHORT DESCRIPTION REMOVED */}
        {/* No short_description field */}

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

        <label>Author Name</label>
        <input
          type="text"
          name="user_name"
          placeholder="Leave empty for default admin"
        />

        <label>Author Photo</label>
        <input type="file" name="user_image" />

        <button type="submit">
          {loading ? "Uploading..." : "Create News"}
        </button>
      </form>
    </div>
  );
}
