import { connectDB } from "@/lib/mongo";
import { News } from "@/lib/models/News";
import Link from "next/link";
import sanitizeHtml from "sanitize-html";

export default async function LatestPosts() {
  await connectDB();

  const posts = await News.find()
    .sort({ created_at: -1 })
    .limit(8)
    .lean();

  if (!posts || posts.length === 0) return null;

  return (
    <section className="latest-posts" style={{ marginBottom: "40px" }}>
      <h1 style={{ marginBottom: "20px" }}>Latest Posts</h1>

      <div className="latest-post-grid">
        {posts.map((post) => {
          // HTML sanitize + remove tags + slice
          const cleanHTML = sanitizeHtml(
            post.content ||
            "",
            { allowedTags: [], allowedAttributes: {} }
          ).slice(0, 140);

          return (
            <Link
              href={`/news/${post.slug}`}
              key={post._id}
              className="latest-post-card"
            >
              <div className="thumb">
                <img src={post.feature_image || "/preview.jpg"} alt="" />
              </div>

              <h3>{post.title}</h3>

              <p className="news-excerpt">
                {cleanHTML}...
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

