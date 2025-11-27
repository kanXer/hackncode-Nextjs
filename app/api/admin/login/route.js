import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import { Admin } from "@/lib/models/Admin";
import bcrypt from "bcryptjs";

export async function POST(req) {
  await connectDB();

  const { username, password } = await req.json();

  const admin = await Admin.findOne({ username });
  if (!admin) return NextResponse.json({ success: false });

  const match = bcrypt.compareSync(password, admin.password);
  if (!match) return NextResponse.json({ success: false });

  const res = NextResponse.json({ success: true });

  res.cookies.set("admin_session", "verified", {
    httpOnly: false,     // <-- temporary fix for localhost
    sameSite: "lax",
    secure: false,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return res;
}
