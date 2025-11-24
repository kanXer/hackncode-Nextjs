// src/lib/utils.js

export function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function cleanExcerpt(text, limit = 180) {
  text = text.replace(/<\/?[^>]+>/g, "").replace(/\s+/g, " ").trim();

  if (text.length <= limit) return text;

  let cut = text.slice(0, limit);
  return cut.slice(0, cut.lastIndexOf(" ")) + "...";
}

export function uploadsUrl(file) {
  return `/uploads/${encodeURIComponent(file)}`;
}
    