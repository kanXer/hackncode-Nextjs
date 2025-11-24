import { connectDB } from "@/lib/mongo";
import { News } from "@/lib/models/News";
import Link from "next/link";
import { cleanExcerpt } from "@/lib/utils";
import NewsFilter from "@/app/components/NewsFilter";
import "./assets/styles.css";

export const revalidate = 30;

export default async function NewsPage({ searchParams }) {
  const params = await searchParams;
  const category = params?.cat || "all";

  await connectDB();

  const filter = category !== "all" ? { category } : {};

  const newsList = await News.find(filter)
    .sort({ _id: -1 })
    .limit(100)
    .lean();

  const categories = await News.distinct("category");

  return (
    <div className="news-wrapper">

      {/* CATEGORY FILTER */}
      <div className="news-filter-bar">
        <NewsFilter categories={categories} selected={category} />
      </div>

      <h2 className="news-heading">Latest News</h2>

      <div className="news-grid">
        {newsList.map((post) => {
          
          // 🔥 FIXED FEATURE IMAGE (Cloudinary URL direct)
          const featureImg = post.feature_image || "/preview.jpg";

          return (
            <div key={post._id} className="news-card thin-card">

              {/* CLICKABLE THUMBNAIL */}
              <Link href={`/news/${post.slug}`} className="thumb-link">
                <div
                  className="news-thumb big-thumb"
                  style={{ backgroundImage: `url(${featureImg})` }}
                ></div>
              </Link>

              {/* CARD CONTENT */}
              <div className="news-body">

                {/* CATEGORY BADGE */}
                <span className="news-category">
                  {post.category || "General"}
                </span>

                {/* TITLE */}
                <h3 className="news-title">{post.title}</h3>

                {/* SHORT EXCERPT */}
                <p className="news-excerpt">
                  {cleanExcerpt(post.content, 140)}
                </p>

                {/* AUTHOR INFO */}
                <div className="news-meta-row">

                  {/* 🔥 FIXED AUTHOR IMAGE */}
                  <img
                    src={post.author_image || "/logo.jpeg"}
                    className="news-user-img"
                    alt="author"
                  />

                  {/* 🔥 FIXED AUTHOR NAME */}
                  <span className="news-user-name">
                    {post.author_name || "Unknown Author"}
                  </span>

                  {/* DATE */}
                  <span className="news-time">
                    {new Date(post.created_at).toLocaleDateString()}
                  </span>
                </div>

                {/* READ MORE BUTTON */}
                <Link href={`/news/${post.slug}`} className="read-more">
                  Read More →
                </Link>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
