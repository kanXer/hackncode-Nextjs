"use client";

import { useRouter } from "next/navigation";

export default function NewsFilter({ categories, selected }) {
  const router = useRouter();

  const uniqueCats = [...new Set(categories.map(c => c.toLowerCase()))];

  return (
    <select
      defaultValue={selected.toLowerCase()}
      className="news-filter-select"
      onChange={(e) => {
        router.push(`/news?cat=${e.target.value.toLowerCase()}`, { scroll: false });
      }}
    >
      <option value="all">All</option>

      {uniqueCats.map((c) => (
        <option key={c} value={c}>
          {c.toUpperCase()}
        </option>
      ))}
    </select>
  );
}
