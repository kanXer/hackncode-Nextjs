import "./assets/styles.css";
import { connectDB } from "@/lib/mongo";
import { News } from "@/lib/models/News";
export async function generateMetadata({ params }) {
  const { slug } = await params;

  await connectDB();
  const news = await News.findOne({ slug }).lean();

  if (!news) {
    return {
      title: "Article Not Found | KanXer News",
      description: "This article does not exist or has been removed.",
    };
  }

  const title = news.title || "KanXer News Article";
  const desc =
    news.short_description ||
    "Read the full article on KanXer News.";
  const img =
    news.feature_image ||
    (Array.isArray(news.images) && news.images[0]) ||
    "https://hackncode.live/news-preview.jpg";

  const url = `https://hackncode.live/news/${slug}`;

  return {
    title,
    description: desc,

    alternates: {
      canonical: url,
    },

    openGraph: {
      title,
      description: desc,
      type: "article",
      url,
      siteName: "KanXer News",
      images: [
        {
          url: img,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
      images: [img],
      creator: "@KanXerOfficial",
    },
  };
}

export default function NewsDetailLayout({ children }) {
  return <>{children}</>;
}



