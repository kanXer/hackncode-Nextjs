import crypto from "crypto";
import { generateFileName } from "./filename";

// Generate signature (ONLY required params)
export function generateSignature({ folder, public_id, timestamp }) {
  const str = `folder=${folder}&public_id=${public_id}&timestamp=${timestamp}`;
  return crypto
    .createHash("sha1")
    .update(str + process.env.CLOUDINARY_API_SECRET)
    .digest("hex");
}

export async function uploadToCloudinary(file, folder) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const timestamp = Math.floor(Date.now() / 1000);

  const public_id = generateFileName(file); // final file name

  // Final signature params
  const signature = generateSignature({
    folder,
    public_id,
    timestamp
  });

  // Cloudinary REST form data
  const formData = new FormData();
  formData.append("file", new Blob([buffer]));
  formData.append("timestamp", timestamp);
  formData.append("api_key", process.env.CLOUDINARY_API_KEY);
  formData.append("signature", signature);
  formData.append("folder", folder);
  formData.append("public_id", public_id);

  const uploadURL = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`;

  const res = await fetch(uploadURL, { method: "POST", body: formData });
  const data = await res.json();

  if (!data.secure_url) {
    console.log("CLOUDINARY ERROR:", data);
    throw new Error(data.error?.message || "Upload failed");
  }

  return data.secure_url; // final URL with filename
}
