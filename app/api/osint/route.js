import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import { Osint } from "@/lib/models/Osint";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectDB();

    const { query, mode } = await req.json();

    if (!query || !mode) {
      return NextResponse.json(
        { error: "Missing parameters" },
        { status: 400 }
      );
    }

    // ===============================
    // PREPARE PAYLOAD FOR LEAKOSINT
    // ===============================
    const payload = {
      token: process.env.LEAK_OSINT_TOKEN,
      request: query,
      limit: 600,
      lang: "ru",
    };

    if (!payload.token) {
      return NextResponse.json(
        { error: "Server configuration error: API token missing" },
        { status: 500 }
      );
    }

    // ===============================
    // CALL LEAK OSINT API
    // ===============================
    const apiRes = await fetch("https://leakosintapi.com/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const rawText = await apiRes.text(); // raw text (sometimes not JSON)

    if (!apiRes.ok) {
      // still save this error response
      await Osint.create({
        query,
        mode,
        result: rawText,
        ip: req.headers.get("x-forwarded-for") || "local",
        userAgent: req.headers.get("user-agent") || "",
      });

      return NextResponse.json(
        { error: `HTTP ${apiRes.status}`, raw: rawText },
        { status: 500 }
      );
    }

    // ===============================
    // TRY PARSE JSON
    // ===============================
    let data;
    try {
      data = JSON.parse(rawText);
    } catch {
      // invalid JSON — STILL SAVE IT
      await Osint.create({
        query,
        mode,
        result: rawText,
        ip: req.headers.get("x-forwarded-for") || "local",
        userAgent: req.headers.get("user-agent") || "",
      });

      return NextResponse.json(
        { error: "Invalid JSON", raw: rawText },
        { status: 500 }
      );
    }

    // ===============================
    // SUCCESS — SAVE FULL RESPONSE
    // ===============================
    await Osint.create({
      query,
      mode,
      result: data, // full JSON response saved
      ip: req.headers.get("x-forwarded-for") || "local",
      userAgent: req.headers.get("user-agent") || "",
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Server error", details: error.message },
      { status: 500 }
    );
  }
}
