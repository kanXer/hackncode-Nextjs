import { NextResponse } from "next/server";

export async function GET() {

  const response = NextResponse.redirect("/admin/login");

  response.cookies.set("admin_session", "", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    expires: new Date(0)
  });

  return response;
}
