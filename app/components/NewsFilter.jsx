"use client";

import { useRouter } from "next/navigation";

export default function NewsFilter({ categories, selected }) {
  const router = useRouter();

  const normalizedCats = [...new Set(categories.map(c => c.toLowerCase()))];

  return (
    <select
      value={selected.toLowerCase()}
      onChange={(e) => {
        const v = e.target.value.toLowerCase();
        if (v === "all") {
          router.push("/news", { scroll: false });
        } else {
          router.push(`/news?cat=${v}`, { scroll: false });
        }
      }}
      className="news-filter-select"
    >
      <option value="all">All</option>

      {normalizedCats.map((c) => (
        <option key={c} value={c}>
          {c.toUpperCase()}
        </option>
      ))}
    </select>
  );
}
