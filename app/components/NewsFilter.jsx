"use client";

export default function NewsFilter({ categories, selected }) {
  // Remove duplicates + sort cleanly
  const uniqueCats = [...new Set(categories)];

  return (
    <form>
      <select
        name="cat"
        defaultValue={selected}
        className="news-filter-select"
        onChange={(e) => e.target.form.submit()}
      >
        <option value="all">All</option>

        {uniqueCats.map((c, i) => (
          <option key={i} value={c}>
            {c.toUpperCase()}
          </option>
        ))}
      </select>
    </form>
  );
}
