import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import { Osint } from "@/lib/models/Osint";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await connectDB();

    const id = req.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Missing ID" },
        { status: 400 }
      );
    }

    await Osint.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete", details: error.message },
      { status: 500 }
    );
  }
}
