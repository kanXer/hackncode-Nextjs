import "./assets/styles.css";
export const metadata = {
  title: "Sahil Srivastava — Resume",
  description: "Full-Stack Developer | Sahil Srivastava | KanXer OSINT Creator",

  applicationName: "KanXer OSINT",
  keywords: ["OSINT", "Phone Lookup", "Email Lookup", "ID Lookup", "KanXer"],

  alternates: {
    canonical: "https://hackncode.live/resume-preview/",
  },

  openGraph: {
    title: "Sahil Srivastava — Resume",
    description: "Full-Stack Developer | Cybersecurity Enthusiast | KanXer OSINT Creator",
    url: "https://hackncode.live/resume-preview/",
    siteName: "KanXer OSINT",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://hackncode.live/resume-preview.jpg",
        width: 1200,
        height: 630,
        alt: "KanXer OSINT — OSINT Lookup Tool",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Sahil Srivastava — Resume",
    description: "Full-Stack Developer | Cybersecurity Enthusiast | KanXer OSINT Creator",
    images: ["https://hackncode.live/resume-preview.jpg"],
    creator: "@YourTwitterHandle",
  },
};
export default function ResumePreviewLayout({ children }) {
  return <>{children}</>;
}
