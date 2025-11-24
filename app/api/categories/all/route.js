import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import { Category } from "@/lib/models/Category";

export async function GET() {
  await connectDB();
  const cats = await Category.find().sort({ name: 1 }).lean();
  return NextResponse.json(cats);
}
