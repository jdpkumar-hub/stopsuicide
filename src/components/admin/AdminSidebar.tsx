"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  FolderOpen,
  LayoutDashboard,
  LogOut,
  MessageSquareQuote,
  Newspaper,
  Quote,
  Settings,
  Upload,
  Users,
  Video,
} from "lucide-react";
import { createBrowserSupabase } from "@/lib/supabase/client";
import { useI18n } from "@/lib/i18n/context";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/videos", label: "Videos", icon: Video },
  { href: "/admin/videos/new", label: "Upload video", icon: Upload },
  { href: "/admin/categories", label: "Categories", icon: FolderOpen },
  { href: "/admin/quotes", label: "Quotes", icon: Quote },
  { href: "/admin/blog", label: "Blog", icon: Newspaper },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useI18n();

  async function signOut() {
    const supabase = createBrowserSupabase();
    await supabase?.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <aside className="glass h-fit rounded-3xl p-4 lg:sticky lg:top-24">
      <p className="px-3 pb-3 text-xs font-semibold uppercase tracking-wide text-muted">
        {t("footer.admin")}
      </p>
      <nav className="space-y-1" aria-label="Admin">
        {links.map((link) => {
          const Icon = link.icon;
          const active =
            link.href === "/admin"
              ? pathname === "/admin"
              : pathname === link.href ||
                (link.href === "/admin/videos" &&
                  pathname.startsWith("/admin/videos") &&
                  pathname !== "/admin/videos/new");
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-2xl px-3 py-2 text-sm ${
                active ? "bg-hope-blue text-white" : "hover:bg-white/50 dark:hover:bg-white/5"
              }`}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>
      <button
        type="button"
        onClick={signOut}
        className="mt-4 flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-sm text-muted hover:bg-white/50"
      >
        <LogOut className="h-4 w-4" />
        {t("admin.signout")}
      </button>
    </aside>
  );
}
