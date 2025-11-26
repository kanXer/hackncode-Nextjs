import { NextResponse } from "next/server";

export function middleware(req) {
  const path = req.nextUrl.pathname;
  const session = req.cookies.get("admin_session")?.value;

  // Allowed routes
  const isLoginPage = path === "/admin/login";
  const isLogoutApi = path === "/api/admin/logout";
  const isLoginApi = path === "/api/admin/login";
  const isCheckApi = path === "/api/admin/check";

  // Allow login page & auth APIs
  if (isLoginPage || isLogoutApi || isLoginApi || isCheckApi) {
    return NextResponse.next();
  }

  // Protect admin pages only
  if (path.startsWith("/admin")) {
    if (session !== "verified") {
      return NextResponse.redirect("/admin/login");
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],   // ✅ Only admin UI protected
};
