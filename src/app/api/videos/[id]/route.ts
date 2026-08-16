import { denyIfCannotDelete, jsonError, requireAdmin } from "@/lib/admin";
import { parseContentStatus } from "@/lib/cms/fields";
import { videoPayloadFromForm } from "@/lib/cms/payloads";
import { canPublishContent } from "@/lib/cms/roles";
import { videoSchema } from "@/lib/validations";

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: Request, { params }: Params) {
  const { id } = await params;
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
    status: form.get("status") || "published",
  });
  if (!parsed.success) return jsonError("Please check the video details.");

  try {
    let existing: Record<string, unknown> | undefined;
    if (auth.supabase) {
      const { data } = await auth.supabase.from("videos").select("*").eq("id", id).maybeSingle();
      existing = (data as Record<string, unknown>) || undefined;
    }
    const updates = await videoPayloadFromForm(form, existing);
    if (!canPublishContent(auth.role)) {
      updates.status = existing?.status != null ? parseContentStatus(existing.status) : existing ? "published" : "draft";
    }
    if (!auth.supabase) return Response.json({ ok: true, preview: updates, id });
    const { error } = await auth.supabase.from("videos").update(updates).eq("id", id);
    if (error) return jsonError(error.message, 500);
    return Response.json({ ok: true });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Upload failed", 500);
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params;
  const auth = await requireAdmin({ minRole: "editor" });
  if (auth.error) return jsonError(auth.error, auth.status);
  const denied = denyIfCannotDelete(auth.role);
  if (denied) return jsonError(denied.error, denied.status);
  if (!auth.supabase) return Response.json({ ok: true, id, preview: true });
  const { error } = await auth.supabase.from("videos").delete().eq("id", id);
  if (error) return jsonError(error.message, 500);
  return Response.json({ ok: true });
}
