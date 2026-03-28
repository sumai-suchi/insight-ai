// ─────────────────────────────────────────────────────────────────────────────
// 4. uploadToCloudinary — standalone async function (not a hook)
//
//    ⚠️  Set these two env vars in .env.local:
//        NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
//        NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
// ─────────────────────────────────────────────────────────────────────────────
 
export async function useuploadToCloudinary(file: File): Promise<string> {
  const cloudName    = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
 
  if (!cloudName || !uploadPreset) {
    throw new Error(
      "Cloudinary is not configured. Set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET in .env.local"
    );
  }
 
  if (!file) {
    throw new Error("No file provided for upload.");
  }
  if (file.size === 0) {
    throw new Error("Selected file is empty.");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
 
  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: formData,
  });
 
  // Cloudinary usually returns JSON, but on errors it might return plain text.
  const contentType = res.headers.get("content-type") || "";
  const data: any =
    contentType.includes("application/json") ? await res.json() : { error: await res.text() };
 
  if (!res.ok) {
    const msg =
      data?.error?.message ||
      data?.error ||
      `Cloudinary upload failed with status ${res.status}`;
    throw new Error(String(msg));
  }

  if (!data?.secure_url) {
    throw new Error(data?.error?.message ?? "Cloudinary upload failed (missing secure_url).");
  }
 
  return data.secure_url as string;
}