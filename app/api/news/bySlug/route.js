import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import { News } from "@/lib/models/News";

export async function GET(req) {
  try {
    await connectDB();

    const slug = req.nextUrl.searchParams.get("slug");

    console.log("API RECEIVED SLUG =", slug);

    if (!slug) {
      return NextResponse.json({ error: "Missing slug" }, { status: 400 });
    }

    const news = await News.findOne({ slug }).lean(); // NO LOWERCASE

    if (!news) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({
      ...news,
      images: news.images || [],
      feature_image: news.feature_image || "",
      user_name: news.user_name || "",
      short_description: news.short_description || "",
      content: news.content || "",
    });
  } catch (e) {
    return NextResponse.json(
      { error: "Server error", details: e.message },
      { status: 500 }
    );
  }
}
