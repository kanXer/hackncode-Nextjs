import "./assets/styles.css";
export const metadata = {
  title: "OSINT Lookup Tool | KanXer OSINT",
  description: "Phone, Email & ID OSINT Lookup Tool (KanXer Theme)",

  applicationName: "KanXer OSINT",
  keywords: ["OSINT", "Phone Lookup", "Email Lookup", "ID Lookup", "KanXer"],

  alternates: {
    canonical: "https://hackncode.live/phone_info/",
  },

  openGraph: {
    title: "OSINT Lookup Tool | KanXer OSINT",
    description: "Phone, Email & ID OSINT Lookup Tool (KanXer Theme)",
    url: "https://hackncode.live/phone_info/",
    siteName: "KanXer OSINT",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://hackncode.live/preview.jpg",
        width: 1200,
        height: 630,
        alt: "KanXer OSINT — OSINT Lookup Tool",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "OSINT Lookup Tool | KanXer OSINT",
    description: "Phone, Email & ID OSINT Lookup Tool (KanXer Theme)",
    images: ["https://hackncode.live/preview.jpg"],
    creator: "@YourTwitterHandle",
  },
};
export default function PhoneInfoLayout({ children }) {
  return <>{children}</>;
}
