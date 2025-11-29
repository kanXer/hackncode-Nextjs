"use client";

import { useSearchParams } from "next/navigation";
import NewsFilter from "@/app/components/NewsFilter";
import NewsCard from "@/app/components/NewsCard";
import useSWR from "swr";
import "./assets/styles.css";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function NewsPage() {
  const params = useSearchParams();
  const cat = params.get("cat")?.toLowerCase() || "all";

  const { data, isLoading } = useSWR(`/api/news?cat=${cat}`, fetcher);

  if (isLoading || !data) return <p>Loading...</p>;

  const { news, categories } = data;

  return (
    <div className="news-wrapper news-list-page">
      <div className="container">
        <div className="top-row">
          <h2 className="page-heading">Latest News</h2>
          <div className="filter-wrap">
            <NewsFilter categories={categories} />
          </div>
        </div>

        <div className="news-grid">
          {news.map((post) => (
            <NewsCard key={post._id} post={post} />
          ))}
        </div>

        {news.length === 0 && <p className="empty">No articles found.</p>}
      </div>
    </div>
  );
        }
