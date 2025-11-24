export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import { Admin } from "@/lib/models/Admin";
import bcrypt from "bcryptjs";

export async function POST(req) {
  await connectDB();

  const { username, password } = await req.json();

  console.log("Attempting login for:", username);

  const admin = await Admin.findOne({ username });

  if (!admin) {
    console.log("❌ Admin not found:", username);
    return NextResponse.json({ success: false, error: "Invalid credentials" });
  }

  const match = bcrypt.compareSync(password, admin.password);

  if (!match) {
    console.log("❌ Password incorrect");
    return NextResponse.json({ success: false, error: "Invalid credentials" });
  }

  console.log("✅ Login success:", username);

  const res = NextResponse.json({ success: true });

  res.cookies.set("admin_session", "verified", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });

  return res;
}
