"use client";

import { useRouter } from "next/navigation";

export default function NewsFilter({ categories, selected }) {
  const router = useRouter();
  const uniqueCats = [...new Set(categories)];

  function changeCat(cat) {
    router.push(`/news?cat=${cat}`, { scroll: false });
  }

  return (
    <select
      defaultValue={selected}
      className="news-filter-select"
      onChange={(e) => changeCat(e.target.value)}
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
