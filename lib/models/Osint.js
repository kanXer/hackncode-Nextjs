import mongoose from "mongoose";

const OsintSchema = new mongoose.Schema(
  {
    query: { type: String, required: true },
    mode: { type: String, enum: ["phone", "email", "id"], required: true },
    result: { type: Object },   // FULL API RESPONSE
    ip: { type: String },
    userAgent: { type: String },
  },
  { timestamps: true, collection: "Osint" }
);

export const Osint =
  mongoose.models.Osint || mongoose.model("Osint", OsintSchema);
