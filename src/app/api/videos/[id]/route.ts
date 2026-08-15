import { uploadToCloudinary } from "@/lib/cloudinary";
import {
  extractVimeoId,
  extractYouTubeId,
  jsonError,
  requireAdmin,
} from "@/lib/admin";
import { slugify } from "@/lib/utils";
import { videoSchema } from "@/lib/validations";

type Params = { params: Promise<{ id: string }> };

function parseVideoForm(form: FormData) {
  return videoSchema.safeParse({
    title: form.get("title"),
    description: form.get("description"),
    tags: form.get("tags") || "",
    titleTe: String(form.get("titleTe") || ""),
    descriptionTe: String(form.get("descriptionTe") || ""),
    tagsTe: String(form.get("tagsTe") || ""),
    slug: String(form.get("slug") || ""),
    seoTitle: String(form.get("seoTitle") || ""),
    seoDescription: String(form.get("seoDescription") || ""),
    categoryId: form.get("categoryId"),
    featured: form.get("featured"),
    youtubeLink: String(form.get("youtubeLink") || ""),
    vimeoLink: String(form.get("vimeoLink") || ""),
  });
}

export async function PUT(request: Request, { params }: Params) {
  const { id } = await params;
  const auth = await requireAdmin();
  if (auth.error) return jsonError(auth.error, auth.status);

  const form = await request.formData();
  const parsed = parseVideoForm(form);
  if (!parsed.success) return jsonError("Please check the video details.");

  const tags = parsed.data.tags
    ? parsed.data.tags.split(",").map((tag) => tag.trim()).filter(Boolean)
    : [];
  const tagsTe = parsed.data.tagsTe
    ? parsed.data.tagsTe.split(",").map((tag) => tag.trim()).filter(Boolean)
    : [];

  const updates: Record<string, unknown> = {
    title: parsed.data.title,
    description: parsed.data.description,
    tags,
    slug: parsed.data.slug || slugify(parsed.data.title),
    titles: { te: parsed.data.titleTe || undefined },
    descriptions: { te: parsed.data.descriptionTe || undefined },
    seo_title: {
      te: parsed.data.seoTitle || parsed.data.titleTe,
      en: parsed.data.title,
    },
    seo_description: {
      te: parsed.data.seoDescription || parsed.data.descriptionTe,
      en: parsed.data.description,
    },
    tags_te: tagsTe,
    category_id: parsed.data.categoryId,
    featured: parsed.data.featured === true || parsed.data.featured === "on",
    youtube_id: extractYouTubeId(parsed.data.youtubeLink),
    vimeo_id: extractVimeoId(parsed.data.vimeoLink),
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
