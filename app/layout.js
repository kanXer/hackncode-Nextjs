import "./globals.css";
import LoaderWrapper from "./components/LoaderWrapper";
import HeaderWrapper from "./components/HeaderWrapper";
import FooterWrapper from "./components/FooterWrapper";
import "./components/assets/header.css";
import "./components/assets/globalLoader.css";
import './assets/home.css';
export const metadata = {
  title: "KanXer OSINT — Intelligence Tools, Cyber Lookup & Investigations",
  description:
    "KanXer OSINT is a modern intelligence toolkit offering phone lookup, email OSINT, ID search, breach data checks, and cyber investigation tools.",

  applicationName: "KanXer OSINT",
  keywords: [
    "OSINT",
    "KanXer",
    "Cybersecurity",
    "Phone Lookup",
    "Email Lookup",
    "Dox Tools",
    "Cyber Tools",
    "Investigation Tools"
  ],

  alternates: {
    canonical: "https://hackncode.live/",
  },

  openGraph: {
    title: "KanXer OSINT — Cyber Intelligence & OSINT Toolkit",
    description:
      "Explore KanXer OSINT — advanced phone lookup, email intelligence, breach monitoring, and deep investigation tools in one place.",
    url: "https://hackncode.live/",
    siteName: "KanXer OSINT",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://hackncode.live/preview.jpg",
        width: 1200,
        height: 630,
        alt: "KanXer OSINT — Intelligence & Lookup Toolkit",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "KanXer OSINT — Cyber Intelligence Tools",
    description:
      "Powerful OSINT suite for phone lookup, email intelligence, breaches, and more. Fast, secure, and KanXer-themed.",
    images: ["https://hackncode.live/preview.jpg"],
    creator: "@YourTwitterHandle",
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='20' ry='20' fill='%23050705'/%3E%3Ctext x='50' y='63' font-size='42' font-family='Inter' text-anchor='middle' fill='%2314b866' font-weight='700'%3ESKS%3C/text%3E%3C/svg%3E"/>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
      </head>
      <body >
        {<LoaderWrapper />}
        {<HeaderWrapper />}

        {children}

        { <FooterWrapper />}
      </body>

    </html>
  );
}
