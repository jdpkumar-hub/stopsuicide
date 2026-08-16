"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/admin/DataTable";
import { RoleBadge } from "@/components/admin/StatusBadge";
import { useToast } from "@/components/admin/Toast";
import { formatDate } from "@/lib/utils";
import type { AdminRole, AdminUser } from "@/types";

const ROLES: AdminRole[] = ["admin", "editor", "author", "viewer"];

export function UsersManager({ users }: { users: AdminUser[] }) {
  const router = useRouter();
  const { toast } = useToast();
  const [query, setQuery] = useState("");
  const rows = users.filter((user) =>
    `${user.fullName} ${user.email} ${user.role}`.toLowerCase().includes(query.toLowerCase()),
  );

  async function changeRole(id: string, role: AdminRole) {
    const response = await fetch(`/api/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });
    if (!response.ok) {
      toast("Could not update role.", "error");
      return;
    }
    toast("Role updated.");
    router.refresh();
  }

  return (
    <DataTable
      rows={rows}
      searchValue={query}
      onSearch={setQuery}
      searchPlaceholder="Search users…"
      columns={[
        { key: "name", header: "Name", render: (row) => <span className="font-medium">{row.fullName || "—"}</span> },
        { key: "email", header: "Email", render: (row) => row.email },
        { key: "role", header: "Role", render: (row) => <RoleBadge role={row.role} /> },
        { key: "created", header: "Joined", render: (row) => formatDate(row.createdAt) },
        {
          key: "change",
          header: "Change role",
          render: (row) => (
            <select
              defaultValue={row.role}
              onChange={(event) => changeRole(row.id, event.target.value as AdminRole)}
              className="rounded-xl border border-border bg-transparent px-2 py-1 text-sm"
            >
              {ROLES.map((role) => (
                <option key={role} value={role}>
                  {role === "admin" ? "Super Admin" : role}
                </option>
              ))}
            </select>
          ),
        },
      ]}
    />
  );
}
