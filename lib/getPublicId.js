export function extractPublicId(url) {
  try {
    const parts = url.split("/upload/");
    if (parts.length < 2) return null;

    const path = parts[1]; // v12345/folder/file.jpg

    // remove version (v12345)
    const withoutVersion = path.replace(/^v[0-9]+\//, "");

    // remove extension
    return withoutVersion.replace(/\.[^/.]+$/, "");
  } catch {
    return null;
  }
}
