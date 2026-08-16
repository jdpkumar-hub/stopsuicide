"use client";

import { useEffect, useState } from "react";
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
      const json = await response.json().catch(() => ({}));
      toast(json.error || "Could not update role.", "error");
      return false;
    }
    toast("Role updated.");
    router.refresh();
    return true;
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
          render: (row) => <RoleSelect user={row} onChange={changeRole} />,
        },
      ]}
    />
  );
}

function RoleSelect({
  user,
  onChange,
}: {
  user: AdminUser;
  onChange: (id: string, role: AdminRole) => Promise<boolean>;
}) {
  const [role, setRole] = useState(user.role);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setRole(user.role);
  }, [user.role]);

  async function handleChange(next: AdminRole) {
    const previous = role;
    setRole(next);
    setBusy(true);
    const ok = await onChange(user.id, next);
    setBusy(false);
    if (!ok) setRole(previous);
  }

  return (
    <select
      value={role}
      disabled={busy}
      onChange={(event) => handleChange(event.target.value as AdminRole)}
      className="rounded-xl border border-border bg-transparent px-2 py-1 text-sm"
    >
      {ROLES.map((item) => (
        <option key={item} value={item}>
          {item === "admin" ? "Super Admin" : item}
        </option>
      ))}
    </select>
  );
}
