export const metadata = {
  title: "Latest Tech & Cyber News | KanXer News",
  description:
    "Explore the latest tech updates, cybersecurity alerts, OSINT news, and KanXer exclusive articles.",
  
  applicationName: "KanXer News",
  keywords: [
    "KanXer",
    "News",
    "Tech News",
    "Cybersecurity News",
    "OSINT Updates",
    "Hacking News",
    "Programming Updates",
  ],

  alternates: {
    canonical: "https://hackncode.live/news/",
  },

  openGraph: {
    title: "Latest Tech & Cyber News | KanXer",
    description:
      "Explore the latest tech updates, cybersecurity alerts, OSINT news, and KanXer exclusive articles.",
    url: "https://hackncode.live/news/",
    siteName: "KanXer News",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://hackncode.live/news-preview.jpg",
        width: 1200,
        height: 630,
        alt: "KanXer News Preview",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Latest Tech & Cyber News | KanXer",
    description:
      "Explore the latest tech updates, cybersecurity alerts, OSINT news, and KanXer exclusive articles.",
    images: ["https://hackncode.live/news-preview.jpg"],
    creator: "@KanXerOfficial",
  },
};

export default function NewsLayout({ children }) {
  return <>{children}</>;
}

