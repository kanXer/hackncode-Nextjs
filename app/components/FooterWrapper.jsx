"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function FooterWrapper() {
  const pathname = usePathname();

  // ❌ /instagram routes mein footer hide
  if (pathname.startsWith("/instagram")) return null;

  return <Footer />;
}
