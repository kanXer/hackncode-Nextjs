import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.nextUrl;
  const path = url.pathname;
  const session = req.cookies.get("admin_session")?.value;

  const isLoginPage = path === "/admin/login";
  const isAuthApi =
    path.startsWith("/api/admin/login") ||
    path.startsWith("/api/admin/logout");

  // Allow login page & login/logout APIs
  if (isLoginPage || isAuthApi) {
    return NextResponse.next();
  }

  // Protect admin UI pages
  if (path.startsWith("/admin")) {
    if (session !== "verified") {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  // ❗ API/admin routes must not be protected except login/logout
  if (path.startsWith("/api/admin") && !isAuthApi) {
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
  matcher: [
    "/admin/:path*",     // Protect admin dashboard pages
    "/api/admin/:path*", // Protect admin APIs
  ],
};
