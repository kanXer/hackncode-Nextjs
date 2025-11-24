"use client";
import "./assets/styles.css"
import { useState, useEffect } from "react";

export default function EditNewsClient({ slug }) {
  // STATES
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [content, setContent] = useState("");
  const [youtube, setYoutube] = useState("");
  const [userName, setUserName] = useState("");

  const [featurePreview, setFeaturePreview] = useState(null);
  const [galleryPreview, setGalleryPreview] = useState([]);
  const [removeGallery, setRemoveGallery] = useState([]); // delete list

  // -----------------------------
  // LOAD NEWS
  // -----------------------------
  useEffect(() => {
    if (!slug) return;

    async function load() {
      try {
        const res = await fetch(`/api/news/bySlug?slug=${slug}`, {
          cache: "no-store",
        });

        const json = await res.json();

        if (!res.ok || json.error) {
          alert("Post not found");
          setLoading(false);
          return;
        }

        // Fill form
        setTitle(json.title || "");
        setShortDesc(json.short_description || "");
        setContent(json.content || "");
        setYoutube(json.youtube_url || "");
        setUserName(json.user_name || "");

        // FEATURE URL CHECK
        setFeaturePreview(
          json.feature_image?.startsWith("http")
            ? json.feature_image
            : json.feature_image
            ? `/uploads/${json.feature_image}`
            : null
        );

        // GALLERY URLs CHECK
        setGalleryPreview(
          (json.images || []).map((img) =>
            img.startsWith("http") ? img : `/uploads/${img}`
          )
        );

        setLoading(false);
      } catch (err) {
        console.error("Load error:", err);
        alert("Error loading post");
        setLoading(false);
      }
    }

    load();
  }, [slug]);

  // Remove gallery image
  function removeImage(imgUrl) {
    setGalleryPreview((prev) => prev.filter((i) => i !== imgUrl));
    setRemoveGallery((prev) => [...prev, imgUrl]);
  }

  // -----------------------------
  // UPDATE NEWS
  // -----------------------------
  async function updateNews(e) {
    e.preventDefault();

    const form = new FormData();

    form.append("slug", slug);
    form.append("title", title);
    form.append("short_description", shortDesc);
    form.append("content", content);
    form.append("youtube_url", youtube);
    form.append("user_name", userName);

    form.append("remove_images", JSON.stringify(removeGallery));

    // FEATURE UPDATE
    if (e.target.feature_image.files[0]) {
      form.append("feature_image", e.target.feature_image.files[0]);
    }

    // NEW GALLERY IMAGES
    if (e.target.images.files.length > 0) {
      for (const img of e.target.images.files) {
        form.append("images", img);
      }
    }

    const res = await fetch("/api/news/edit", {
      method: "POST",
      body: form,
    });

    const json = await res.json();

    if (json.success) {
      alert("Post updated successfully!");
      location.reload();
    } else {
      alert("Update failed!");
    }
  }

  if (loading) {
    return <p style={{ padding: 30, fontSize: "18px" }}>Loading post...</p>;
  }

  return (
    <div className="edit-wrapper">
      <h1>Edit News</h1>

      <form onSubmit={updateNews} className="edit-form">

        {/* Title */}
        <label>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />

        {/* Short Desc */}
        <label>Short Description</label>
        <input
          value={shortDesc}
          onChange={(e) => setShortDesc(e.target.value)}
        />

        {/* Content */}
        <label>Content</label>
        <textarea
          rows={8}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {/* YouTube ID */}
        <label>YouTube Video ID</label>
        <input value={youtube} onChange={(e) => setYoutube(e.target.value)} />

        {/* Author */}
        <label>Author Name</label>
        <input value={userName} onChange={(e) => setUserName(e.target.value)} />

        {/* FEATURE IMAGE */}
        <label>Feature Image</label>

        {featurePreview && (
          <div className="feature-preview-box">
            <img src={featurePreview} className="feature-preview-img" />

            <button
              type="button"
              className="feature-remove-btn"
              onClick={() => setFeaturePreview(null)}
            >
              Remove Image
            </button>
          </div>
        )}

        <input name="feature_image" type="file" accept="image/*" />

        {/* GALLERY */}
        <label>Gallery Images</label>

        <div className="gallery-preview">
          {galleryPreview.map((img, i) => (
            <div key={i} className="gallery-item">
              <img src={img} className="preview-img-small" />

              <button
                type="button"
                className="remove-btn"
                onClick={() => removeImage(img)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <input name="images" type="file" accept="image/*" multiple />

        <button className="save-btn">Save Changes</button>
      </form>
    </div>
  );
}
