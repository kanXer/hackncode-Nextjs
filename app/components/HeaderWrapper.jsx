"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import { useEffect, useState } from "react";

export default function HeaderWrapper() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  // Wait for client mount → Prevent hydration crash
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render until mounted (prevents mobile crash)
  if (!mounted) return null;

  // Hide header only after mount
  if (pathname?.startsWith("/instagram")) return null;

  return <Header />;
}
