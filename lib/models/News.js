import mongoose, { Schema } from "mongoose";

const NewsSchema = new Schema(
  {
    title: String,
    slug: { type: String, unique: true },
    content: String,

    category: {
      type: String,
      required: true,
      default: "general"
    },

    images: { type: [String], default: [] },
    youtube_url: String,
    feature_image: String,

    author_name: String,
    author_image: String,
  },
  { timestamps: { createdAt: "created_at" } }
);

export const News =
  mongoose.models.News || mongoose.model("News", NewsSchema);
