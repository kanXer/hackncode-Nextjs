export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

import { Analytics } from "@vercel/analytics/next"

// ALL CSS IMPORTS → Only keep required global CSS
import "./globals.css";
import LoaderWrapper from "./components/LoaderWrapper";
import HeaderWrapper from "./components/HeaderWrapper";
import FooterWrapper from "./components/FooterWrapper";

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
    "Investigation Tools",
  ],

  alternates: {
    canonical: "https://hackncode.live/",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* FontAwesome for icons */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          integrity="sha512-ymN3zFkF64ZtDfnHV5YwIGlEyg5AJ9Ibz1C1q5T65eQG4EuhHj7i0DlRLHtbXYmFZV8oPZxW++R0YhZ14R/2Jw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        
        {/* Website Favicon */}
        <link
          rel="icon"
          href="/logo.jpeg"
        />
      </head>
      <body>
        <LoaderWrapper />
        <HeaderWrapper />
        {children}
        <Analytics />
        <FooterWrapper />
      </body>
    </html>
  );
}



