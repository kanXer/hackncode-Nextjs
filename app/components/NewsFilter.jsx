"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function NewsFilter({ categories }) {
  const router = useRouter();
  const params = useSearchParams();

  const selected = params.get("cat") || "all";

  const uniqueCats = [...new Set(categories.map(c => c.toLowerCase()))];

  const handleChange = (e) => {
    const value = e.target.value.toLowerCase();

    const url = value === "all" ? "/news" : `/news?cat=${value}`;

    router.push(url, { scroll: false });
  };

  return (
    <select
      value={selected}
      onChange={handleChange}
      className="news-filter-select"
    >
      <option value="all">All</option>

      {uniqueCats.map((c) => (
        <option key={c} value={c.toLowerCase()}>
          {c.toUpperCase()}
        </option>
      ))}
    </select>
  );
}
