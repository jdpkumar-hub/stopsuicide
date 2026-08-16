import { jsonError, requireAdmin } from "@/lib/admin";
import { adminUsers } from "@/lib/data/seed";
import type { AdminRole } from "@/types";

export async function GET() {
  const auth = await requireAdmin({ minRole: "admin" });
  if (auth.error) return jsonError(auth.error, auth.status);
  if (!auth.supabase) return Response.json({ users: adminUsers });
  const { data, error } = await auth.supabase
    .from("profiles")
    .select("id, email, full_name, role, created_at")
    .order("created_at", { ascending: false });
  if (error) return jsonError(error.message, 500);
  return Response.json({
    users: (data || []).map((row) => ({
      id: row.id,
      email: row.email || "",
      fullName: row.full_name || "",
      role: (row.role as AdminRole) || "viewer",
      createdAt: row.created_at,
    })),
  });
}
