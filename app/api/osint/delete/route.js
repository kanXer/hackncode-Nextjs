import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import { Osint } from "@/lib/models/Osint";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectDB();

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({
        success: false,
        error: "Missing ID",
      });
    }

    await Osint.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err.message,
    });
  }
}
