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

  if (role !== "admin") {
    const { data: target } = await auth.supabase
      .from("profiles")
      .select("role")
      .eq("id", id)
      .maybeSingle();
    if (target?.role === "admin") {
      const { count } = await auth.supabase
        .from("profiles")
        .select("id", { count: "exact", head: true })
        .eq("role", "admin");
      if ((count ?? 0) <= 1) {
        return jsonError("At least one Super Admin is required.");
      }
    }
  }

  const { error } = await auth.supabase.from("profiles").update({ role }).eq("id", id);
  if (error) return jsonError(error.message, 500);
  return Response.json({ ok: true });
}
