"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import GlobalLoader from "./GlobalLoader";

export default function LoaderWrapper() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  // Hide loader after first load
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Show loader on route change
  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [pathname]);

  // Routes where loader should NOT appear
  const noLoaderRoutes = ["/instagram"];
  const hideLoader = noLoaderRoutes.some(r => pathname.startsWith(r));

  if (hideLoader) return null;

  return <>{loading && <GlobalLoader />}</>;
}
