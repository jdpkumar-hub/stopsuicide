import { denyIfCannotDelete, jsonError, requireAdmin } from "@/lib/admin";
import { articlePayloadFromForm } from "@/lib/cms/payloads";
import { articleSchema } from "@/lib/validations";

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: Request, { params }: Params) {
  const { id } = await params;
  const auth = await requireAdmin();
  if (auth.error) return jsonError(auth.error, auth.status);
  const form = await request.formData();
  const parsed = articleSchema.safeParse({
    title: form.get("title"),
    excerpt: form.get("excerpt"),
    body: form.get("body"),
    tags: form.get("tags") || "",
    slug: String(form.get("slug") || ""),
    categoryId: String(form.get("categoryId") || ""),
    thumbnailUrl: String(form.get("thumbnailUrl") || ""),
    seoTitle: String(form.get("seoTitle") || ""),
    seoDescription: String(form.get("seoDescription") || ""),
    status: form.get("status") || "draft",
    scheduledAt: String(form.get("scheduledAt") || ""),
  });
  if (!parsed.success) return jsonError("Please check the article details.");

  try {
    const updates = await articlePayloadFromForm(form);
    if (!auth.supabase) return Response.json({ ok: true, preview: updates, id });
    const { error } = await auth.supabase.from("articles").update(updates).eq("id", id);
    if (error) return jsonError(error.message, 500);
    return Response.json({ ok: true });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Could not save article.", 500);
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params;
  const auth = await requireAdmin({ minRole: "editor" });
  if (auth.error) return jsonError(auth.error, auth.status);
  const denied = denyIfCannotDelete(auth.role);
  if (denied) return jsonError(denied.error, denied.status);
  if (!auth.supabase) return Response.json({ ok: true, id, preview: true });
  const { error } = await auth.supabase.from("articles").delete().eq("id", id);
  if (error) return jsonError(error.message, 500);
  return Response.json({ ok: true });
}
