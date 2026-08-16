import { getSessionUser } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/admin";
import { canDeleteContent, hasMinRole } from "@/lib/cms/roles";
import type { AdminRole } from "@/types";

export async function requireAdmin(options?: { minRole?: AdminRole }) {
  const minRole = options?.minRole ?? "author";
  const user = await getSessionUser();
  const supabase = createServiceClient();
  const allowDevPreview =
    process.env.NODE_ENV !== "production" &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!user && !allowDevPreview) {
    return {
      error: "Unauthorized",
      status: 401 as const,
      user: null,
      supabase: null,
      role: null as AdminRole | null,
    };
  }

  if (allowDevPreview && !user) {
    return {
      error: null,
      status: 200 as const,
      user: null,
      supabase,
      role: "admin" as AdminRole,
    };
  }

  let role: AdminRole = "viewer";
  if (supabase && user) {
    const { data } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();
    role = ((data?.role as AdminRole) || "viewer") as AdminRole;
    if (role === "viewer") {
      const { count } = await supabase
        .from("profiles")
        .select("id", { count: "exact", head: true })
        .eq("role", "admin");
      if (!count) {
        await supabase.from("profiles").update({ role: "admin" }).eq("id", user.id);
        role = "admin";
      }
    }
  } else if (user) {
    role = "editor";
  }

  if (!hasMinRole(role, minRole)) {
    return {
      error: "Forbidden",
      status: 403 as const,
      user,
      supabase: null,
      role,
    };
  }

  return { error: null, status: 200 as const, user, supabase, role };
}

export function denyIfCannotDelete(role: AdminRole | null) {
  if (!canDeleteContent(role)) {
    return { error: "Editors and Super Admins can delete content.", status: 403 as const };
  }
  return null;
}

export function jsonError(message: string, status = 400) {
  return Response.json({ error: message }, { status });
}

export function extractYouTubeId(url?: string | null) {
  if (!url) return undefined;
  const match = url.match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/);
  return match?.[1];
}

export function extractVimeoId(url?: string | null) {
  if (!url) return undefined;
  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return match?.[1];
}
