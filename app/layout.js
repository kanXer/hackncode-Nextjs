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
  metadataBase: new URL("https://hackncode.live"),

  title: {
    default: "KanXer OSINT — Cyber Intelligence & Investigation Toolkit",
    template: "%s | KanXer OSINT"
  },

  description:
    "KanXer OSINT is an advanced cyber intelligence toolkit offering phone lookup, email OSINT, ID search, breach data scans, and digital investigation tools.",

  keywords: [
    "OSINT Tools",
    "KanXer OSINT",
    "Cyber Intelligence",
    "Phone Lookup OSINT",
    "Email Lookup",
    "Data Breach Check",
    "Cybersecurity Tools",
    "Digital Investigation",
    "Hackncode"
  ],

  applicationName: "KanXer OSINT",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "KanXer OSINT — Cyber Intelligence Toolkit",
    description:
      "Powerful OSINT tools for cyber investigations, phone lookups, email checks, breach scans and identity tracing.",
    url: "https://hackncode.live",
    siteName: "KanXer OSINT",
    images: [
      {
        url: "/preview.jpg",
        width: 1200,
        height: 630,
        alt: "KanXer OSINT Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "KanXer OSINT — Cyber Investigation Tools",
    description:
      "Phone lookup, email OSINT, identity scans, breach checks and more.",
    images: ["/preview.jpg"],
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* FontAwesome (FAB + Solid) */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/fontawesome.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/brands.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/solid.min.css"
        />

        <link rel="icon" href="/logo.jpeg" />
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





