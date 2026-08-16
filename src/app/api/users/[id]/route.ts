import { jsonError, requireAdmin } from "@/lib/admin";
import type { AdminRole } from "@/types";

const ROLES: AdminRole[] = ["admin", "editor", "author", "viewer"];

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  const { id } = await params;
  const auth = await requireAdmin({ minRole: "admin" });
  if (auth.error) return jsonError(auth.error, auth.status);
  const body = await request.json();
  const role = body.role as AdminRole;
  if (!ROLES.includes(role)) return jsonError("Choose a valid role.");
  if (!auth.supabase) return Response.json({ ok: true, preview: { id, role } });
  const { error } = await auth.supabase.from("profiles").update({ role }).eq("id", id);
  if (error) return jsonError(error.message, 500);
  return Response.json({ ok: true });
}
