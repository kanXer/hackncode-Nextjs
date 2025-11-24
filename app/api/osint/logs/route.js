import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import { Osint } from "@/lib/models/Osint";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();

    const logs = await Osint.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(logs);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to load logs", details: err.message },
      { status: 500 }
    );
  }
}
