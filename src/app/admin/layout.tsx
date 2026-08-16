import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { requireAdmin } from "@/lib/admin";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = await requireAdmin({ minRole: "author" });

  if (auth.error) {
    if (auth.status === 401) {
      redirect("/login?next=/admin");
    }
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <h1 className="font-serif text-3xl">Access limited</h1>
        <p className="mt-3 text-muted">
          This area is for Super Admins, Editors, and Authors. Ask a Super Admin to update your role.
        </p>
      </div>
    );
  }

  if (!auth.role) {
    redirect("/login?next=/admin");
  }

  return <AdminShell role={auth.role}>{children}</AdminShell>;
}
