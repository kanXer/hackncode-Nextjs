"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

export default function HeaderWrapper() {
  const pathname = usePathname();

  // ❌ /instagram routes mein header hide
  if (pathname.startsWith("/instagram")) return null;

  return <Header />;
}
