// ======================================
// NEWS DETAIL PAGE (100% FIXED, NO SLUG TOUCH)
// ======================================

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

import { splitHTMLIntoBlocks } from "@/lib/splitHtml";
import { connectDB } from "@/lib/mongo";
import { News } from "@/lib/models/News";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function NewsDetail({ params }) {

  // params must be awaited
  const { slug } = await params;

  console.log("🔍 Using DB Slug:", slug);

  if (!slug) return notFound();

  await connectDB();

  // 👉 FIX: DO NOT EDIT SLUG — USE EXACT DB VALUE
  const news = await News.findOne({ slug }).lean();

  if (!news) return notFound();

  // Split content into blocks
  const blocks = splitHTMLIntoBlocks(news.content || "");
  const images = Array.isArray(news.images) ? news.images : [];

  const totalBlocks = blocks.length || 1;
  const totalImages = images.length;

  let inserted = 0;

  // Feature image fallback
  const featureImg = news.feature_image || "/preview.jpg";

  return (
    <main className="news-wrapper">
      <div className="news-card-kanxer">

        <Link href="/news" className="back-btn">← Back to News</Link>

        <h1 className="news-title">{news.title}</h1>

        {news.short_description && (
          <p className="news-short-desc">{news.short_description}</p>
        )}

        <img src={featureImg} className="feature-img-full" alt={news.title} />

        <div className="detail-meta">
          <img
            src={news.author_image || "/logo.jpeg"}
            className="detail-author-img"
            alt="author"
          />

          <span className="detail-author-name">
            {news.author_name || "Unknown Author"}
          </span>

          <span className="detail-author-time">
            {new Date(news.created_at).toLocaleDateString()}
          </span>
        </div>

        {news.youtube_url && (
          <div className="yt-box">
            <iframe
              width="100%"
              height="420"
              src={`https://www.youtube.com/embed/${news.youtube_url}`}
              allowFullScreen
            />
          </div>
        )}

        <article className="news-content">
          {blocks.map((block, index) => {
            const out = [];

            out.push(
              <div
                key={`b-${index}`}
                dangerouslySetInnerHTML={{ __html: block }}
              />
            );

            const expected = Math.round(((index + 1) / totalBlocks) * totalImages);

            while (inserted < expected && inserted < totalImages) {
              out.push(
                <img
                  key={`img-${inserted}`}
                  src={images[inserted]}
                  className="img-mid"
                  alt=""
                />
              );
              inserted++;
            }

            return (
              <div key={`wrap-${index}`} style={{ marginBottom: 12 }}>
                {out}
              </div>
            );
          })}

          {images.slice(inserted).map((img, i) => (
            <img key={`extra-${i}`} src={img} className="img-mid" alt="" />
          ))}
        </article>
      </div>
    </main>
  );
}
