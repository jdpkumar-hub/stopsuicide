import { denyIfCannotDelete, jsonError, requireAdmin } from "@/lib/admin";

type Params = { params: Promise<{ id: string }> };

export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params;
  const auth = await requireAdmin({ minRole: "editor" });
  if (auth.error) return jsonError(auth.error, auth.status);
  const denied = denyIfCannotDelete(auth.role);
  if (denied) return jsonError(denied.error, denied.status);
  if (!auth.supabase) return Response.json({ ok: true, id, preview: true });
  const { error } = await auth.supabase.from("media_assets").delete().eq("id", id);
  if (error) return jsonError(error.message, 500);
  return Response.json({ ok: true });
}
