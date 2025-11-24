import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import { News } from "@/lib/models/News";

export async function GET() {
  await connectDB();
  const news = await News.find().sort({ _id: -1 }).lean();
  return NextResponse.json(news);
}
