"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  BarChart3,
  BookHeart,
  ChevronLeft,
  ChevronRight,
  FolderOpen,
  Images,
  LayoutDashboard,
  LogOut,
  MessageSquareQuote,
  Newspaper,
  Quote,
  Settings,
  Users,
  Video,
} from "lucide-react";
import { createBrowserSupabase } from "@/lib/supabase/client";
import { Logo } from "@/components/common/Logo";
import { useI18n } from "@/lib/i18n/context";
import { canManageSettings, canManageUsers, ROLE_LABEL } from "@/lib/cms/roles";
import type { AdminRole } from "@/types";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/videos", label: "Videos", icon: Video },
  { href: "/admin/blog", label: "Blog", icon: Newspaper },
  { href: "/admin/quotes", label: "Quotes", icon: Quote },
  { href: "/admin/stories", label: "Survivor stories", icon: BookHeart },
  { href: "/admin/media", label: "Media library", icon: Images },
  { href: "/admin/categories", label: "Categories", icon: FolderOpen },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/users", label: "Users", icon: Users, min: "admin" as const },
  { href: "/admin/settings", label: "Settings", icon: Settings, min: "admin" as const },
];

export function AdminSidebar({ role }: { role: AdminRole }) {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useI18n();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    setCollapsed(window.localStorage.getItem("ss-admin-sidebar") === "1");
  }, []);

  function toggle() {
    const next = !collapsed;
    setCollapsed(next);
    window.localStorage.setItem("ss-admin-sidebar", next ? "1" : "0");
  }

  async function signOut() {
    const supabase = createBrowserSupabase();
    await supabase?.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  const visible = links.filter((link) => {
    if (link.min === "admin") return canManageUsers(role) || canManageSettings(role);
    return true;
  });

  return (
    <aside
      className={`glass h-fit rounded-3xl p-4 lg:sticky lg:top-24 ${collapsed ? "lg:w-[4.75rem]" : "lg:w-60"}`}
    >
      <div className="mb-3 flex items-center justify-between gap-2 px-1">
        {!collapsed ? <Logo variant="mark" className="max-w-[4.5rem]" /> : <Logo variant="mark" className="max-w-[2.4rem]" />}
        <button
          type="button"
          onClick={toggle}
          className="rounded-xl p-2 text-muted hover:bg-white/50 dark:hover:bg-white/5"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>
      {!collapsed ? (
        <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wide text-muted">
          {t("footer.admin")} · {ROLE_LABEL[role]}
        </p>
      ) : null}
      <nav className="space-y-1" aria-label="Admin">
        {visible.map((link) => {
          const Icon = link.icon;
          const active =
            link.href === "/admin"
              ? pathname === "/admin"
              : pathname === link.href || pathname.startsWith(`${link.href}/`);
          return (
            <Link
              key={link.href}
              href={link.href}
              title={link.label}
              className={`flex items-center gap-3 rounded-2xl px-3 py-2 text-sm ${
                active ? "bg-hope-blue text-white" : "hover:bg-white/50 dark:hover:bg-white/5"
              } ${collapsed ? "justify-center px-2" : ""}`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {!collapsed ? link.label : <span className="sr-only">{link.label}</span>}
            </Link>
          );
        })}
      </nav>
      <button
        type="button"
        onClick={signOut}
        title={t("admin.signout")}
        className={`mt-4 flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-sm text-muted hover:bg-white/50 ${collapsed ? "justify-center px-2" : ""}`}
      >
        <LogOut className="h-4 w-4" />
        {!collapsed ? t("admin.signout") : <span className="sr-only">{t("admin.signout")}</span>}
      </button>
    </aside>
  );
}
