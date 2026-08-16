import { jsonError, requireAdmin } from "@/lib/admin";
import { parseContentStatus } from "@/lib/cms/fields";
import { videoPayloadFromForm } from "@/lib/cms/payloads";
import { canPublishContent } from "@/lib/cms/roles";
import { getAllVideosAdmin, getVideos } from "@/lib/data/queries";
import { videoSchema } from "@/lib/validations";

export async function GET(request: Request) {
  const admin = new URL(request.url).searchParams.get("scope") === "admin";
  if (admin) {
    const auth = await requireAdmin();
    if (auth.error) return jsonError(auth.error, auth.status);
    return Response.json({ videos: await getAllVideosAdmin() });
  }
  return Response.json({ videos: await getVideos() });
}

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (auth.error) return jsonError(auth.error, auth.status);

  const form = await request.formData();
  const parsed = videoSchema.safeParse({
    title: form.get("title"),
    description: form.get("description"),
    tags: form.get("tags") || "",
    titleTe: String(form.get("titleTe") || form.get("title.te") || ""),
    descriptionTe: String(form.get("descriptionTe") || form.get("description.te") || ""),
    tagsTe: String(form.get("tagsTe") || ""),
    slug: String(form.get("slug") || ""),
    seoTitle: String(form.get("seoTitle") || ""),
    seoDescription: String(form.get("seoDescription") || ""),
    categoryId: form.get("categoryId") || "uncategorized",
    featured: form.get("featured"),
    youtubeLink: String(form.get("youtubeLink") || ""),
    vimeoLink: String(form.get("vimeoLink") || ""),
    status: form.get("status") || "draft",
  });
  if (!parsed.success) return jsonError("Please check the video details.");

  try {
    const record = {
      ...(await videoPayloadFromForm(form)),
      duration_seconds: 0,
      likes: 0,
      views: 0,
      published_at: new Date().toISOString(),
      created_by: auth.user?.id ?? null,
    };
    if (!canPublishContent(auth.role)) {
      record.status = "draft";
    } else {
      record.status = parseContentStatus(record.status);
    }

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
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Upload failed. Check Cloudinary keys.", 500);
  }
}
