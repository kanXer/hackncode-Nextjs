import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import { Category } from "@/lib/models/Category";

export async function POST(req) {
  try {
    await connectDB();
    const { category } = await req.json();

    if (!category?.trim()) {
      return NextResponse.json({
        success: false,
        error: "Category name required",
      });
    }

    await Category.create({ name: category.trim() });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message });
  }
}
