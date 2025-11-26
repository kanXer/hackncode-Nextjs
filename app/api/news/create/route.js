import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import { News } from "@/lib/models/News";
import { uploadToCloudinary } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

// Function to auto-generate slug
function generateSlug(title) {
  const base = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const unique = Date.now().toString(36);
  return `${base}-${unique}`;
}

export async function POST(req) {
  try {
    await connectDB();
    const form = await req.formData();

    /* ===== BASIC FIELDS ===== */
    const title = form.get("title");
    const content = form.get("content");
    const youtube_url = form.get("youtube_url") || "";

    if (!title || !content) {
      return NextResponse.json({
        success: false,
        error: "Title and content required",
      });
    }

    /* ===== AUTO SLUG ===== */
    const slug = generateSlug(title);

    /* ===== CATEGORY ===== */
    let category = form.get("category")?.toLowerCase()?.trim();
    if (!category) category = "general";

    category = category.replace(/[^a-z0-9_-]/g, "");
    if (category.length === 0) category = "general";

    /* ===== DEFAULT AUTHOR ===== */
    const author_name = "Sahil Srivastava (KanXer)";
    let author_image = "/logo.jpeg";

    /* ===== AUTHOR IMAGE OPTIONAL ===== */
    const authorFile = form.get("user_image");
    if (authorFile && authorFile.size > 0) {
      author_image = await uploadToCloudinary(authorFile, "hackncode/authors");
    }

    /* ===== FEATURE IMAGE REQUIRED ===== */
    const featureFile = form.get("feature_image");
    if (!featureFile || featureFile.size === 0) {
      return NextResponse.json({
        success: false,
        error: "Feature image missing",
      });
    }

    const feature_image = await uploadToCloudinary(
      featureFile,
      "hackncode/feature"
    );

    /* ===== GALLERY OPTIONAL ===== */
    const galleryFiles = form.getAll("images");
    const images = [];

    for (const file of galleryFiles) {
      if (!file || file.size === 0) continue;

      const url = await uploadToCloudinary(file, "hackncode/gallery");
      images.push(url);
    }

    /* ===== SAVE TO DB ===== */
    await News.create({
      title,
      slug,
      content,
      youtube_url,
      category,
      author_name, // always auto
      author_image, // always auto
      feature_image,
      images,
    });

    return NextResponse.json({ success: true, slug });

  } catch (err) {
    console.log("UPLOAD ERROR:", err);
    return NextResponse.json({ success: false, error: err.message });
  }
}
