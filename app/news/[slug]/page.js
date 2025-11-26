import { splitHTMLIntoBlocks } from "@/lib/splitHtml";
import { connectDB } from "@/lib/mongo";
import { News } from "@/lib/models/News";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function NewsDetail({ params }) {
  const p = await params;
  const { slug } = p;

  await connectDB();
  const news = await News.findOne({ slug }).lean();

  if (!news) return notFound();

  const blocks = splitHTMLIntoBlocks(news.content || "");
  const images = Array.isArray(news.images) ? news.images : [];

  const totalBlocks = blocks.length || 1;
  const totalImages = images.length;

  let inserted = 0;

  // 🔥 FEATURE IMAGE (direct cloudinary url)
  const featureImg = news.feature_image || "/preview.jpg";

  return (
    <main className="news-wrapper">
      <div className="news-card-kanxer">

        {/* BACK BUTTON */}
        <Link href="/news" className="back-btn">
          ← Back to News
        </Link>

        {/* TITLE */}
        <h1 className="news-title">{news.title}</h1>
        {news.short_description && (
          <p className="news-short-desc">{news.short_description}</p>
        )}   
        <img
          src={featureImg}
          className="feature-img-full"
          alt={news.title}
        />       
        {/* AUTHOR INFO */}
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

        {/* SHORT DESCRIPTION */}


        {/* FEATURE IMAGE */}


        {/* YOUTUBE VIDEO */}
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

        {/* MAIN CONTENT + AUTO-PLACED IMAGES */}
        <article className="news-content">
          {blocks.map((block, index) => {
            const out = [];

            // HTML text block
            out.push(
              <div
                key={`b-${index}`}
                dangerouslySetInnerHTML={{ __html: block }}
              />
            );

            // calculated position for gallery images
            const expected = Math.round(((index + 1) / totalBlocks) * totalImages);

            // insert gallery images
            while (inserted < expected && inserted < totalImages) {
              out.push(
                <img
                  key={`img-${inserted}`}
                  src={images[inserted]}      // 🔥 cloudinary image direct
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

          {/* leftover gallery images */}
          {images.slice(inserted).map((img, i) => (
            <img
              key={`extra-${i}`}
              src={img}   // 🔥 cloudinary url
              className="img-mid"
              alt=""
            />
          ))}
        </article>
      </div>
    </main>
  );
}
