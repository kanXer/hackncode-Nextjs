import { NextResponse } from "next/server";

export async function GET() {

  new URL("/admin/login", process.env.NEXT_PUBLIC_BASE_URL || "https://hackncode.live")
  response.cookies.set("admin_session", "", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    expires: new Date(0)
  });

  return response;
}

