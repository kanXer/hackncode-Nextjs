import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import { News } from "@/lib/models/News";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const category = body.category;

    if (!category) {
      return NextResponse.json({ success: false, error: "Category missing" });
    }

    // Delete category from all news (optional)
    await News.updateMany(
      { category },
      { $set: { category: "general" } } // fallback category
    );

    // Remove from category collection if you have a model OR just allow frontend to handle
    // Example if you stored categories in DB:
    // await Categories.deleteOne({ name: category });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.log("CATEGORY DELETE ERROR:", err);
    return NextResponse.json({ success: false, error: err.message });
  }
}
