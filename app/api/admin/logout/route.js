import { NextResponse } from "next/server";

export async function GET() {
  const res = NextResponse.redirect(new URL("/admin/login", process.env.NEXT_PUBLIC_BASE_URL || "https://hackncode-nextjs.vercel.app/"));

  res.cookies.set("admin_session", "", {
    maxAge: 0,
    path: "/",
  });

  return res;
}

