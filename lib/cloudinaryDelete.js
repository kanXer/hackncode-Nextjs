import crypto from "crypto";

export async function deleteFromCloudinary(publicId) {
  const timestamp = Math.floor(Date.now() / 1000);

  const str = `public_id=${publicId}&timestamp=${timestamp}`;
  const signature = crypto
    .createHash("sha1")
    .update(str + process.env.CLOUDINARY_API_SECRET)
    .digest("hex");

  const formData = new FormData();
  formData.append("public_id", publicId);
  formData.append("timestamp", timestamp);
  formData.append("api_key", process.env.CLOUDINARY_API_KEY);
  formData.append("signature", signature);

  const url = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/destroy`;

  const res = await fetch(url, { method: "POST", body: formData });
  const json = await res.json();

  return json;
}
