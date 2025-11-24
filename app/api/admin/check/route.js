import { NextResponse } from "next/server";

export async function GET(req) {
  const session = req.cookies.get("admin_session");

  return NextResponse.json({
    loggedIn: !!session
  });
}
