import { uploadToCloudinary } from "@/lib/cloudinary";
import {
  extractVimeoId,
  extractYouTubeId,
  jsonError,
  requireAdmin,
} from "@/lib/admin";
import { slugify } from "@/lib/utils";

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: Request, { params }: Params) {
  const { id } = await params;
  const auth = await requireAdmin();
  if (auth.error) return jsonError(auth.error, auth.status);

  const form = await request.formData();
  const title = String(form.get("title") || "");
  const description = String(form.get("description") || "");
  const tags = String(form.get("tags") || "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
  const updates: Record<string, unknown> = {
    title,
    description,
    tags,
    slug: slugify(title),
    category_id: String(form.get("categoryId") || ""),
    featured: form.get("featured") === "on",
    youtube_id: extractYouTubeId(String(form.get("youtubeLink") || "")),
    vimeo_id: extractVimeoId(String(form.get("vimeoLink") || "")),
  };

  try {
    const thumbnail = form.get("thumbnail");
    const videoFile = form.get("videoFile");
    if (thumbnail instanceof File && thumbnail.size > 0) {
      const uploaded = await uploadToCloudinary(thumbnail, "thumbnails", "image");
      updates.thumbnail_url = uploaded.secure_url;
    }
    if (videoFile instanceof File && videoFile.size > 0) {
      const uploaded = await uploadToCloudinary(videoFile, "videos", "video");
      updates.mp4_url = uploaded.secure_url;
      updates.cloudinary_public_id = uploaded.public_id;
      updates.source = "cloudinary";
    }
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Upload failed", 500);
  }

  if (!auth.supabase) {
    return Response.json({ ok: true, preview: updates, id });
  }

  const { error } = await auth.supabase.from("videos").update(updates).eq("id", id);
  if (error) return jsonError(error.message, 500);
  return Response.json({ ok: true });
}

export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params;
  const auth = await requireAdmin();
  if (auth.error) return jsonError(auth.error, auth.status);
  if (!auth.supabase) return Response.json({ ok: true, id, preview: true });
  const { error } = await auth.supabase.from("videos").delete().eq("id", id);
  if (error) return jsonError(error.message, 500);
  return Response.json({ ok: true });
}
