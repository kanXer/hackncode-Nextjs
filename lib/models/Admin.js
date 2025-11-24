import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true }, // hashed
});

export const Admin =
  mongoose.models.Admin || mongoose.model("Admin", AdminSchema);
