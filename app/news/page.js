
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import useSWR from "swr";
import NewsFilter from "@/app/components/NewsFilter";
import NewsCard from "@/app/components/NewsCard";
import "./assets/styles.css";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function NewsPage() {
  const params = useSearchParams();
  const router = useRouter();

  const category = params.get("cat")?.toLowerCase() || "all";

  const { data, isLoading } = useSWR(`/api/news?cat=${category}`, fetcher);

  if (isLoading || !data) {
    return <p className="loading">Loading...</p>;
  }

  const newsList = data.news;
  const categories = data.categories;

  return (
    <div className="news-wrapper news-list-page">
      <div className="container">
        <div className="top-row">
          <h2 className="page-heading">Latest News</h2>

          <div className="filter-wrap">
            <NewsFilter categories={categories} selected={category} />
          </div>
        </div>

        <div className="news-grid">
          {newsList.map((post) => (
            <NewsCard key={post._id} post={post} />
          ))}
        </div>

        {newsList.length === 0 && (
          <p className="empty">No articles found in this category.</p>
        )}
      </div>
    </div>
  );
}
