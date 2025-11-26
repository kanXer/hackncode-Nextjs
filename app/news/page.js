// ==============================
// NEWS LIST PAGE (100% NO-CACHE)
// ==============================

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

import { connectDB } from "@/lib/mongo";
import { News } from "@/lib/models/News";
import NewsFilter from "@/app/components/NewsFilter";
import NewsCard from "@/app/components/NewsCard";
import "./assets/styles.css";

export default async function NewsPage({ searchParams }) {
  const category = searchParams?.cat || "all";

  await connectDB();

  const filter = category !== "all" ? { category } : {};

  const newsList = await News.find(filter)
    .sort({ _id: -1 })
    .lean();

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
