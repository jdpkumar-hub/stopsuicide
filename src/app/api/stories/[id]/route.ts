import { denyIfCannotDelete, jsonError, requireAdmin } from "@/lib/admin";
import { storyPayloadFromForm } from "@/lib/cms/payloads";
import { storySchema } from "@/lib/validations";

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: Request, { params }: Params) {
  const { id } = await params;
  const auth = await requireAdmin();
  if (auth.error) return jsonError(auth.error, auth.status);
  const form = await request.formData();
  const parsed = storySchema.safeParse({
    title: form.get("title"),
    excerpt: form.get("excerpt"),
    body: form.get("body"),
    authorName: String(form.get("authorName") || ""),
    authorRole: String(form.get("authorRole") || ""),
    slug: String(form.get("slug") || ""),
    categoryId: String(form.get("categoryId") || ""),
    thumbnailUrl: String(form.get("thumbnailUrl") || ""),
    videoUrl: String(form.get("videoUrl") || ""),
    status: form.get("status") || "pending",
    featured: form.get("featured"),
    anonymous: form.get("anonymous"),
  });
  if (!parsed.success) return jsonError("Please check the story details.");

  try {
    let existing: Record<string, unknown> | undefined;
    if (auth.supabase) {
      const { data } = await auth.supabase.from("stories").select("*").eq("id", id).maybeSingle();
      existing = (data as Record<string, unknown>) || undefined;
    }
    const updates = await storyPayloadFromForm(form, existing);
    if (!auth.supabase) return Response.json({ ok: true, preview: updates, id });
    const { error } = await auth.supabase.from("stories").update(updates).eq("id", id);
    if (error) return jsonError(error.message, 500);
    return Response.json({ ok: true });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Could not save story.", 500);
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params;
  const auth = await requireAdmin({ minRole: "editor" });
  if (auth.error) return jsonError(auth.error, auth.status);
  const denied = denyIfCannotDelete(auth.role);
  if (denied) return jsonError(denied.error, denied.status);
  if (!auth.supabase) return Response.json({ ok: true, id, preview: true });
  const { error } = await auth.supabase.from("stories").delete().eq("id", id);
  if (error) return jsonError(error.message, 500);
  return Response.json({ ok: true });
}
