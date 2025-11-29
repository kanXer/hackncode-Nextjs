"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function NewsFilter({ categories }) {
  const router = useRouter();
  const params = useSearchParams();

  const selected = params.get("cat")?.toLowerCase() || "all";
  const cats = [...new Set(categories.map(c => c.toLowerCase()))];

  return (
    <select
      value={selected}
      onChange={(e) => {
        const v = e.target.value;

        if (v === "all") {
          router.replace("/news");  // STATIC reload
        } else {
          router.replace(`/news?cat=${v}`); // STATIC reload
        }

        // 🔥 STATIC PAGES: force reload
        window.location.reload();
      }}
      className="news-filter-select"
    >
      <option value="all">ALL</option>
      {cats.map(c => (
        <option key={c} value={c}>
          {c.toUpperCase()}
        </option>
      ))}
    </select>
  );
}
