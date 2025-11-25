import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import Category from "@/lib/models/Category";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectDB();

    const { category } = await req.json();

    if (!category) {
      return NextResponse.json({ success: false, error: "Category missing" });
    }

    const del = await Category.deleteOne({ name: category });

    return NextResponse.json({
      success: del.deletedCount > 0,
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err.message,
    });
  }
}
