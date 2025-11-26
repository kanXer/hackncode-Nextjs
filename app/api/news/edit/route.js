import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import { News } from "@/lib/models/News";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { deleteFromCloudinary } from "@/lib/cloudinaryDelete";
import { extractPublicId } from "@/lib/getPublicId";

export async function POST(req) {
  try {
    await connectDB();

    const form = await req.formData();

    // ❌ SLUG now read only, not editable
    const slug = form.get("slug");

    const title = form.get("title");
    const content = form.get("content");
    const youtube_url = form.get("youtube_url");

    // ❌ Force protected fields (never update)
    const removeImages = JSON.parse(form.get("remove_images") || "[]");

    // Fetch existing post
    const news = await News.findOne({ slug });
    if (!news) {
      return NextResponse.json({ success: false, error: "Post not found" });
    }

    /* =============================
       DELETE SELECTED GALLERY
    ============================== */
    let updatedGallery = [...news.images];

    for (const imgUrl of removeImages) {
      const publicId = extractPublicId(imgUrl);
      if (publicId) {
        await deleteFromCloudinary(publicId);
      }
      updatedGallery = updatedGallery.filter((i) => i !== imgUrl);
    }

    /* =============================
       UPDATE FEATURE IMAGE
    ============================== */
    if (form.get("feature_image")?.size > 0) {
      if (news.feature_image) {
        const publicId = extractPublicId(news.feature_image);
        if (publicId) await deleteFromCloudinary(publicId);
      }

      const newFeature = await uploadToCloudinary(
        form.get("feature_image"),
        "hackncode/feature"
      );

      news.feature_image = newFeature;
    }

    /* =============================
       ADD NEW GALLERY IMAGES
    ============================== */
    const galleryFiles = form.getAll("images");

    for (const file of galleryFiles) {
      if (file && file.size > 0) {
        const uploaded = await uploadToCloudinary(file, "hackncode/gallery");
        updatedGallery.push(uploaded);
      }
    }

    /* =============================
       UPDATE ONLY ALLOWED FIELDS
    ============================== */

    news.title = title;
    news.content = content;
    news.youtube_url = youtube_url;

    // ❌ PROTECTED — DO NOT UPDATE
    // news.short_description = short_description;
    // news.author_name = user_name;

    news.images = updatedGallery;

    await news.save();

    return NextResponse.json({ success: true });

  } catch (err) {
    console.log("EDIT ERROR:", err);
    return NextResponse.json({ success: false, error: err.message });
  }
}
