import { denyIfCannotDelete, jsonError, requireAdmin } from "@/lib/admin";
import { quotePayloadFromForm } from "@/lib/cms/payloads";
import { canPublishContent } from "@/lib/cms/roles";
import { quoteSchema } from "@/lib/validations";

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: Request, { params }: Params) {
  const { id } = await params;
  const auth = await requireAdmin();
  if (auth.error) return jsonError(auth.error, auth.status);
  const form = await request.formData();
  const parsed = quoteSchema.safeParse({
    text: form.get("text"),
    textTe: String(form.get("textTe") || form.get("text.te") || ""),
    textHi: String(form.get("textHi") || form.get("text.hi") || ""),
    author: form.get("author"),
    active: form.get("active"),
    mood: form.get("mood") || "hope",
    featured: form.get("featured"),
    scheduledFor: String(form.get("scheduledFor") || ""),
    locale: form.get("locale") || "en",
  });
  if (!parsed.success) return jsonError("Please check the quote.");

  let existing: Record<string, unknown> | undefined;
  if (auth.supabase) {
    const { data } = await auth.supabase.from("quotes").select("*").eq("id", id).maybeSingle();
    existing = (data as Record<string, unknown>) || undefined;
  }
  const updates = quotePayloadFromForm(form);
  if (!canPublishContent(auth.role)) {
    updates.featured = Boolean(existing?.featured);
    updates.active = existing?.active == null ? false : Boolean(existing.active);
  }
  if (!auth.supabase) return Response.json({ ok: true, preview: updates, id });
  const { error } = await auth.supabase.from("quotes").update(updates).eq("id", id);
  if (error) return jsonError(error.message, 500);
  if (updates.featured) {
    const { error: featuredError } = await auth.supabase
      .from("quotes")
      .update({ featured: false })
      .neq("id", id);
    if (featuredError) {
      return Response.json({
        ok: true,
        warning: "Saved, but other featured quotes could not be cleared.",
      });
    }
  }
  return Response.json({ ok: true });
}

export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params;
  const auth = await requireAdmin({ minRole: "editor" });
  if (auth.error) return jsonError(auth.error, auth.status);
  const denied = denyIfCannotDelete(auth.role);
  if (denied) return jsonError(denied.error, denied.status);
  if (!auth.supabase) return Response.json({ ok: true, id, preview: true });
  const { error } = await auth.supabase.from("quotes").delete().eq("id", id);
  if (error) return jsonError(error.message, 500);
  return Response.json({ ok: true });
}
