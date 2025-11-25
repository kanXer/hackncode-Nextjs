import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import { News } from "@/lib/models/News";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectDB();

    const { slug } = await req.json();

    if (!slug) {
      return NextResponse.json({ success: false, error: "Slug missing" });
    }

    const deleted = await News.findOneAndDelete({ slug });

    return NextResponse.json({
      success: !!deleted,
      message: deleted ? "Deleted" : "Not found",
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message });
  }
}
