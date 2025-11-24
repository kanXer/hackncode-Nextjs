export function generateFileName(file) {
  const original = file.name || "file";
  const clean = original.replace(/\s+/g, "_").replace(/[^\w.-]/g, "");
  const timestamp = Date.now();
  return `${timestamp}_${clean}`;
}
