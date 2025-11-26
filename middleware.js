import { NextResponse } from "next/server";

export function middleware(req) {
  const path = req.nextUrl.pathname;
  const session = req.cookies.get("admin_session")?.value;

  const isLoginPage = path === "/admin/login";

  // ALLOW THESE APIs (NO REDIRECT)
  const isAuthApi =
    path.startsWith("/api/admin/login") ||
    path.startsWith("/api/admin/logout") ||
    path.startsWith("/api/admin/check");

  // 1️⃣ Allow login page and auth APIs
  if (isLoginPage || isAuthApi) {
    return NextResponse.next();
  }

  // 2️⃣ Protect admin UI pages
  if (path.startsWith("/admin")) {
    if (session !== "verified") {
      return NextResponse.redirect("/admin/login");
    }
  }

  // 3️⃣ Protect admin APIs EXCEPT login/logout/check
  if (path.startsWith("/api/admin")) {
    if (session !== "verified") {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
