import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import { News } from "@/lib/models/News";
import { uploadToCloudinary } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectDB();
    const form = await req.formData();

    const title = form.get("title");
    const slug = form.get("slug");
    const content = form.get("content");
    const youtube_url = form.get("youtube_url") || "";

    /* ===== CATEGORY ===== */
    let category = form.get("category")?.toLowerCase()?.trim();
    if (!category) category = "general";
    category = category.replace(/[^a-z0-9_-]/g, "");
    if (category.length === 0) category = "general";

    /* ===== AUTHOR NAME ===== */
    let author_name = form.get("user_name")?.trim();
    if (!author_name) author_name = "Sahil Srivastava(KanXer)";

    /* ===== FEATURE IMAGE ===== */
    const featureFile = form.get("feature_image");
    if (!featureFile || featureFile.size === 0) {
      return NextResponse.json({ success: false, error: "Feature image missing" });
    }

    const feature_image = await uploadToCloudinary(featureFile, "hackncode/feature");

    /* ===== GALLERY IMAGES ===== */
    const galleryFiles = form.getAll("images");
    const images = [];

    for (const file of galleryFiles) {
      if (!file || file.size === 0) continue;
      const url = await uploadToCloudinary(file, "hackncode/gallery");
      images.push(url);
    }

    /* ===== AUTHOR IMAGE ===== */
    let author_image;
    const authorFile = form.get("user_image");
    if (authorFile && authorFile.size > 0) {
      author_image = await uploadToCloudinary(authorFile, "hackncode/authors");
    } else {
      author_image = "/logo.jpeg";
    }

    /* ===== SAVE TO DB ===== */
    await News.create({
      title,
      slug,
      content,
      youtube_url,
      category,
      author_name,
      author_image,
      feature_image,
      images,
    });

    return NextResponse.json({ success: true });

  } catch (err) {
    console.log("UPLOAD ERROR:", err);
    return NextResponse.json({ success: false, error: err.message });
  }
}
