import { NextResponse } from "next/server";

export async function GET() {
  // 1. Redirect URL को सही ढंग से बनाएँ
  const redirectUrl = new URL("/admin/login", process.env.NEXT_PUBLIC_BASE_URL || "https://hackncode.live");

  // 2. एक Redirect Response Object बनाएँ
  const response = NextResponse.redirect(redirectUrl);

  // 3. Response Object पर कुकी सेट/हटाएँ
  response.cookies.set("admin_session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Production में ही secure: true रखें
    sameSite: "lax",
    path: "/",
    // कुकी हटाने के लिए, इसे अतीत की तारीख (New Date(0)) पर सेट करें
    expires: new Date(0) 
  });

  return response;
}
