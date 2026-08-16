import { uploadToCloudinary } from "@/lib/cloudinary";
import { jsonError, requireAdmin } from "@/lib/admin";

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (auth.error) return jsonError(auth.error, auth.status);

  const form = await request.formData();
  const file = form.get("file");
  const folder = String(form.get("folder") || "images") as
    | "videos"
    | "thumbnails"
    | "images"
    | "media";
  const resourceType = String(form.get("resourceType") || "auto") as
    | "image"
    | "video"
    | "auto";

  if (!(file instanceof File) || file.size === 0) {
    return jsonError("Choose a file to upload.");
  }

  try {
    const uploaded = await uploadToCloudinary(file, folder, resourceType);
    return Response.json({
      url: uploaded.secure_url,
      publicId: uploaded.public_id,
    });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Upload failed", 500);
  }
}
