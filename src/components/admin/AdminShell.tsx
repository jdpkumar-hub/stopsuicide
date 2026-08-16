"use client";

import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { ToastProvider } from "@/components/admin/Toast";
import type { AdminRole } from "@/types";

export function AdminShell({
  role,
  children,
}: {
  role: AdminRole;
  children: React.ReactNode;
}) {
  return (
    <ToastProvider>
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-8">
        <AdminSidebar role={role} />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </ToastProvider>
  );
}
