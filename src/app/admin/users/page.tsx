import { redirect } from "next/navigation";
import { UsersManager } from "@/components/admin/UsersManager";
import { requireAdmin } from "@/lib/admin";
import { canManageUsers } from "@/lib/cms/roles";
import { adminUsers } from "@/lib/data/seed";
import type { AdminRole, AdminUser } from "@/types";

export default async function UsersPage() {
  const auth = await requireAdmin({ minRole: "admin" });
  if (auth.error || !canManageUsers(auth.role)) redirect("/admin");

  let users: AdminUser[] = [];
  if (auth.supabase) {
    const { data, error } = await auth.supabase
      .from("profiles")
      .select("id, email, full_name, role, created_at")
      .order("created_at", { ascending: false });
    if (!error) {
      users = (data ?? []).map((row) => ({
        id: row.id,
        email: row.email || "",
        fullName: row.full_name || "",
        role: (row.role as AdminRole) || "viewer",
        createdAt: row.created_at,
      }));
    }
  } else {
    users = adminUsers;
  }

  return (
    <div>
      <h1 className="font-serif text-4xl">User management</h1>
      <p className="mt-2 text-sm text-muted">
        Super Admin, Editor, and Author roles are stored on `profiles`. Viewers cannot open the CMS.
      </p>
      <div className="mt-6">
        <UsersManager users={users} />
      </div>
    </div>
  );
}
