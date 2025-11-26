// ==============================
// File: src/app/news/page.jsx
// Server component for News List (Next.js App Router)
// ==============================

import { connectDB } from "@/lib/mongo";
import { News } from "@/lib/models/News";
import NewsFilter from "@/app/components/NewsFilter";
import NewsCard from "@/app/components/NewsCard";


export const revalidate = 30;

export default async function NewsPage({ searchParams }) {
  const params = await searchParams;
  const category = params?.cat || "all";

  await connectDB();

  const filter = category !== "all" ? { category } : {};

  const newsList = JSON.parse(
    JSON.stringify(
      await News.find(filter)
        .sort({ _id: -1 })
        .limit(100)
        .lean()
    )
  );

  const categories = await News.distinct("category");

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

