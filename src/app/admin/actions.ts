"use server";

import { revalidatePath } from "next/cache";
import { denyIfCannotDelete, requireAdmin } from "@/lib/admin";
import { parseContentStatus, parseStoryStatus } from "@/lib/cms/fields";

const TABLES = ["videos", "articles", "quotes", "stories", "media_assets"] as const;
type CmsTable = (typeof TABLES)[number];

function isTable(value: string): value is CmsTable {
  return TABLES.includes(value as CmsTable);
}

export async function updateContentStatus(table: string, id: string, status: string) {
  const auth = await requireAdmin();
  if (auth.error) return { error: auth.error };
  if (!isTable(table) || table === "media_assets") return { error: "Unsupported table." };
  if (!auth.supabase) return { ok: true, preview: true };
  const value = table === "stories" ? parseStoryStatus(status) : parseContentStatus(status);
  const { error } = await auth.supabase.from(table).update({ status: value }).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin");
  return { ok: true };
}

export async function deleteContent(table: string, id: string) {
  const auth = await requireAdmin({ minRole: "editor" });
  if (auth.error) return { error: auth.error };
  const denied = denyIfCannotDelete(auth.role);
  if (denied) return { error: denied.error };
  if (!isTable(table)) return { error: "Unsupported table." };
  if (!auth.supabase) return { ok: true, preview: true };
  const { error } = await auth.supabase.from(table).delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin");
  return { ok: true };
}
