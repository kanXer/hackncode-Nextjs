import { NextResponse } from "next/server";

export function middleware(req) {
  const path = req.nextUrl.pathname;
  const session = req.cookies.get("admin_session")?.value;

  const isLoginPage = path === "/admin/login";
  const isAuthApi =
    path.startsWith("/api/admin/login") ||
    path.startsWith("/api/admin/logout");

  // 🔓 Allow Login page and Auth APIs
  if (isLoginPage || isAuthApi) {
    return NextResponse.next();
  }

  // 🔒 All ADMIN routes protected
  if (path.startsWith("/admin")) {
    if (session !== "verified") {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // Protect entire admin section + its subpaths
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
