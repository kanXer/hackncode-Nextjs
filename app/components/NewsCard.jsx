"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";

export default function NewsCard({ post }) {
  const featureImg = post.feature_image || "/preview.jpg";

  // Clean + shorten HTML content
  const cleanHTML = DOMPurify.sanitize(
    post.short_description ||
    post.excerpt ||
    post.content ||
    ""
  );

  // Slice after removing HTML tags
  const previewText = cleanHTML
    .replace(/<[^>]*>/g, "")
    .slice(0, 140);

  return (
    <motion.article
      className="news-card thin-card"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ translateY: -6 }}
      transition={{ duration: 0.25 }}
    >
      <Link href={`/news/${post.slug}`} className="thumb-link">
        <div
          className="news-thumb big-thumb"
          style={{ backgroundImage: `url(${featureImg})` }}
          role="img"
          aria-label={post.title}
        />
      </Link>

      <div className="news-body">
        <div>
          <span className="news-category">{post.category || "General"}</span>

          <h3 className="news-title">{post.title}</h3>

          {/* HTML PARSED EXCERPT */}
          <p className="news-excerpt" dangerouslySetInnerHTML={{ __html: previewText +" ..."}}/>
        </div>

        <div className="meta-row-bottom">
          <div className="news-meta-row">
            <img
              src={post.author_image || "/logo.jpeg"}
              className="news-user-img"
              alt={post.author_name || "author"}
            />

            <div className="author-block">
              <div className="news-user-name">{post.author_name || "Unknown"}</div>
              <div className="news-time">
                {new Date(post.created_at).toLocaleDateString()}
              </div>
            </div>
          </div>

          <Link href={`/news/${post.slug}`} className="read-more">
            Read More →
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
