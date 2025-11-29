"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function NewsFilter({ categories }) {
  const router = useRouter();
  const params = useSearchParams();

  // Selected category always live from URL
  const selected = params.get("cat")?.toLowerCase() || "all";

  const normalizedCats = [...new Set(categories.map(c => c.toLowerCase()))];

  return (
    <select
      value={selected}
      onChange={(e) => {
        const v = e.target.value;
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
