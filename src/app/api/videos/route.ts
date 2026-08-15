import { uploadToCloudinary } from "@/lib/cloudinary";
import {
  extractVimeoId,
  extractYouTubeId,
  jsonError,
  requireAdmin,
} from "@/lib/admin";
import { slugify } from "@/lib/utils";
import { videoSchema } from "@/lib/validations";
import { getVideos } from "@/lib/data/queries";

export async function GET() {
  const videos = await getVideos();
  return Response.json({ videos });
}

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (auth.error) return jsonError(auth.error, auth.status);

  const form = await request.formData();
  const parsed = videoSchema.safeParse({
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

  if (!parsed.success) {
    return jsonError("Please check the video details.");
  }

  const youtubeId = extractYouTubeId(parsed.data.youtubeLink);
  const vimeoId = extractVimeoId(parsed.data.vimeoLink);
  const thumbnail = form.get("thumbnail");
  const videoFile = form.get("videoFile");

  let thumbnailUrl: string | undefined;
  let mp4Url: string | undefined;
  let cloudinaryPublicId: string | undefined;
  let source: "youtube" | "vimeo" | "mp4" | "cloudinary" = "mp4";

  try {
    if (thumbnail instanceof File && thumbnail.size > 0) {
      const uploaded = await uploadToCloudinary(thumbnail, "thumbnails", "image");
      thumbnailUrl = uploaded.secure_url;
    }
    if (videoFile instanceof File && videoFile.size > 0) {
      const uploaded = await uploadToCloudinary(videoFile, "videos", "video");
      mp4Url = uploaded.secure_url;
      cloudinaryPublicId = uploaded.public_id;
      source = "cloudinary";
    }
  } catch (error) {
    return jsonError(
      error instanceof Error ? error.message : "Upload failed. Check Cloudinary keys.",
      500,
    );
  }

  if (youtubeId) source = "youtube";
  if (vimeoId) source = "vimeo";

  const record = {
    slug: parsed.data.slug || slugify(parsed.data.title),
    title: parsed.data.title,
    description: parsed.data.description,
    tags: parsed.data.tags
      ? parsed.data.tags.split(",").map((tag) => tag.trim()).filter(Boolean)
      : [],
    titles: { te: parsed.data.titleTe || undefined },
    descriptions: { te: parsed.data.descriptionTe || undefined },
    seo_title: { te: parsed.data.seoTitle || parsed.data.titleTe, en: parsed.data.title },
    seo_description: {
      te: parsed.data.seoDescription || parsed.data.descriptionTe,
      en: parsed.data.description,
    },
    tags_te: parsed.data.tagsTe
      ? parsed.data.tagsTe.split(",").map((tag) => tag.trim()).filter(Boolean)
      : [],
    category_id: parsed.data.categoryId,
    featured: parsed.data.featured === true || parsed.data.featured === "on",
    thumbnail_url: thumbnailUrl,
    source,
    cloudinary_public_id: cloudinaryPublicId,
    mp4_url: mp4Url,
    youtube_id: youtubeId,
    vimeo_id: vimeoId,
    duration_seconds: 0,
    likes: 0,
    views: 0,
    status: "published",
    published_at: new Date().toISOString(),
  };

  if (!auth.supabase) {
    return Response.json({
      ok: true,
      preview: record,
      note: "Supabase is not configured. Video metadata was validated but not persisted.",
    });
  }

  const { data, error } = await auth.supabase.from("videos").insert(record).select("*").single();
  if (error) return jsonError(error.message, 500);
  return Response.json({ ok: true, video: data });
}
