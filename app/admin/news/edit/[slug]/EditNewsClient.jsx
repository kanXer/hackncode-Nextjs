"use client";

import "./assets/styles.css";
import { useState, useEffect } from "react";

export default function EditNewsClient({ slug }) {
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [youtube, setYoutube] = useState("");

  const [featurePreview, setFeaturePreview] = useState(null);
  const [galleryPreview, setGalleryPreview] = useState([]);
  const [removeGallery, setRemoveGallery] = useState([]);

  // LOAD NEWS
  useEffect(() => {
    if (!slug) return;

    async function load() {
      const res = await fetch(`/api/news/bySlug?slug=${slug}`, {
        cache: "no-store",
      });
      const json = await res.json();

      if (!res.ok || json.error) {
        alert("Post not found");
        setLoading(false);
        return;
      }

      setTitle(json.title || "");
      setContent(json.content || "");
      setYoutube(json.youtube_url || "");

      setFeaturePreview(json.feature_image);

      setGalleryPreview(json.images || []);

      setLoading(false);
    }
    load();
  }, [slug]);

  function removeImage(img) {
    setGalleryPreview((prev) => prev.filter((i) => i !== img));
    setRemoveGallery((prev) => [...prev, img]);
  }

  async function updateNews(e) {
    e.preventDefault();

    const form = new FormData();
    form.append("title", title);
    form.append("content", content);
    form.append("youtube_url", youtube);
    form.append("remove_images", JSON.stringify(removeGallery));

    if (e.target.feature_image.files[0]) {
      form.append("feature_image", e.target.feature_image.files[0]);
    }

    for (const img of e.target.images.files) {
      form.append("images", img);
    }

    const res = await fetch(`/api/news/edit?slug=${slug}`, {
      method: "POST",
      body: form,
    });

    const json = await res.json();

    if (json.success) {
      alert("Updated Successfully!");
      location.reload();
    } else {
      alert("Update failed: " + json.error);
    }
  }

  if (loading)
    return <p style={{ padding: 20 }}>Loading post…</p>;

  return (
    <div className="edit-wrapper">
      <h1>Edit News</h1>

      <form onSubmit={updateNews} className="edit-form">
        
        <label>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />

        <label>Content</label>
        <textarea
          rows={8}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <label>YouTube Video ID</label>
        <input value={youtube} onChange={(e) => setYoutube(e.target.value)} />

        <label>Feature Image</label>

        {featurePreview && (
          <div className="feature-preview-box">
            <img src={featurePreview} className="feature-preview-img" />
            <button type="button" onClick={() => setFeaturePreview(null)}>
              Remove
            </button>
          </div>
        )}

        <input type="file" name="feature_image" accept="image/*" />

        <label>Gallery Images</label>
        <div className="gallery-preview">
          {galleryPreview.map((img, i) => (
            <div key={i} className="gallery-item">
              <img src={img} className="preview-img-small" />
              <button type="button" onClick={() => removeImage(img)}>
                Remove
              </button>
            </div>
          ))}
        </div>

        <input type="file" name="images" multiple accept="image/*" />

        <button className="save-btn">Save Changes</button>
      </form>
    </div>
  );
}
