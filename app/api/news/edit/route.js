import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import { News } from "@/lib/models/News";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { deleteFromCloudinary } from "@/lib/cloudinaryDelete";
import { extractPublicId } from "@/lib/getPublicId";

export async function POST(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");  // ⭐ FIXED SLUG LOCATION

    const form = await req.formData();

    const title = form.get("title");
    const content = form.get("content");
    const youtube_url = form.get("youtube_url");

    const removeImages = JSON.parse(form.get("remove_images") || "[]");

    const news = await News.findOne({ slug });
    if (!news) {
      return NextResponse.json({
        success: false,
        error: "Post not found",
      });
    }

    /* =============================
       DELETE SELECTED GALLERY
    ============================== */
    let updatedGallery = [...news.images];

    for (const img of removeImages) {
      const publicId = extractPublicId(img);
      if (publicId) await deleteFromCloudinary(publicId);

      updatedGallery = updatedGallery.filter((i) => i !== img);
    }

    /* =============================
       FEATURE IMAGE UPDATE
    ============================== */
    const newFeature = form.get("feature_image");
    if (newFeature && newFeature.size > 0) {
      if (news.feature_image) {
        const oldId = extractPublicId(news.feature_image);
        if (oldId) await deleteFromCloudinary(oldId);
      }

      const uploadedFeature = await uploadToCloudinary(
        newFeature,
        "hackncode/feature"
      );
      news.feature_image = uploadedFeature;
    }

    /* =============================
       ADD NEW GALLERY IMAGES
    ============================== */
    const galleryFiles = form.getAll("images");

    for (const file of galleryFiles) {
      if (file.size > 0) {
        const url = await uploadToCloudinary(file, "hackncode/gallery");
        updatedGallery.push(url);
      }
    }

    /* =============================
       UPDATE ONLY SAFE FIELDS
    ============================== */
    news.title = title;
    news.content = content;
    news.youtube_url = youtube_url;
    news.images = updatedGallery;

    await news.save();

    return NextResponse.json({ success: true });

  } catch (err) {
    console.log("EDIT ERROR:", err);
    return NextResponse.json({
      success: false,
      error: err.message,
    });
  }
}
