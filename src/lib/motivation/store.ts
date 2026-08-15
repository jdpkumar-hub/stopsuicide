import { createServiceClient } from "@/lib/supabase/admin";
import { createServerSupabase } from "@/lib/supabase/server";
import { composeMotivation, todayStamp } from "@/lib/motivation/generate";
import type { DailyMotivation, MotivationStatus } from "@/types";

const preview: DailyMotivation[] = [];

function mapRow(row: Record<string, unknown>): DailyMotivation {
  return {
    id: String(row.id),
    forDate: String(row.for_date ?? row.forDate).slice(0, 10),
    text: String(row.text),
    translations: (row.translations as DailyMotivation["translations"]) || {},
    author: String(row.author || "stopsuicide.in"),
    status: (row.status as MotivationStatus) || "pending",
    source: row.source === "catalog" ? "catalog" : "ai",
    createdAt: String(row.created_at ?? row.createdAt ?? new Date().toISOString()),
    approvedAt: row.approved_at ? String(row.approved_at) : undefined,
  };
}

export function getTodayStamp() {
  return todayStamp();
}

export async function listMotivations(): Promise<DailyMotivation[]> {
  const supabase = createServiceClient();
  if (!supabase) {
    return [...preview].sort((a, b) => b.forDate.localeCompare(a.forDate));
  }
  const { data, error } = await supabase
    .from("daily_motivations")
    .select("*")
    .order("for_date", { ascending: false })
    .limit(60);
  if (error || !data) return [...preview];
  return data.map(mapRow);
}

export async function getMotivationForDate(forDate: string) {
  const list = await listMotivations();
  return list.find((item) => item.forDate === forDate);
}

export async function getApprovedMotivation(forDate = todayStamp()) {
  const supabase = createServiceClient() ?? (await createServerSupabase());
  if (!supabase) {
    return preview.find((item) => item.forDate === forDate && item.status === "approved");
  }
  const { data } = await supabase
    .from("daily_motivations")
    .select("*")
    .eq("for_date", forDate)
    .eq("status", "approved")
    .maybeSingle();
  return data ? mapRow(data) : undefined;
}

export async function generateMotivation(forDate = todayStamp(), force = false) {
  const existing = await getMotivationForDate(forDate);
  if (existing && !force && existing.status !== "rejected") {
    return { motivation: existing, created: false };
  }

  const used = (await listMotivations()).map((item) => item.text);
  const composed = await composeMotivation(forDate, used);
  const record: DailyMotivation = {
    id: existing?.id || crypto.randomUUID(),
    forDate,
    text: composed.text,
    translations: composed.translations,
    author: "AI Daily Motivation",
    status: "pending",
    source: composed.source,
    createdAt: new Date().toISOString(),
  };

  const supabase = createServiceClient();
  if (!supabase) {
    const index = preview.findIndex((item) => item.forDate === forDate);
    if (index >= 0) preview[index] = record;
    else preview.unshift(record);
    return { motivation: record, created: true };
  }

  const payload = {
    id: record.id,
    for_date: record.forDate,
    text: record.text,
    translations: record.translations,
    author: record.author,
    status: record.status,
    source: record.source,
    created_at: record.createdAt,
    approved_at: null,
  };

  const query = existing
    ? supabase.from("daily_motivations").update(payload).eq("id", existing.id)
    : supabase.from("daily_motivations").insert(payload);

  const { error } = await query;
  if (error) throw new Error(error.message);
  return { motivation: record, created: true };
}

export async function updateMotivation(
  id: string,
  patch: Partial<Pick<DailyMotivation, "text" | "translations" | "status" | "approvedAt">>,
) {
  const supabase = createServiceClient();
  if (!supabase) {
    const item = preview.find((row) => row.id === id);
    if (!item) return null;
    if (patch.text) item.text = patch.text;
    if (patch.translations) item.translations = { ...item.translations, ...patch.translations };
    if (patch.status) item.status = patch.status;
    if (patch.status === "approved") item.approvedAt = new Date().toISOString();
    if (patch.status === "rejected" || patch.status === "pending") item.approvedAt = undefined;
    return item;
  }

  const current = (await listMotivations()).find((item) => item.id === id);
  const updates: Record<string, unknown> = {};
  if (patch.text) updates.text = patch.text;
  if (patch.translations) {
    updates.translations = { ...(current?.translations ?? {}), ...patch.translations };
  }
  if (patch.status) updates.status = patch.status;
  if (patch.status === "approved") updates.approved_at = new Date().toISOString();
  if (patch.status === "rejected" || patch.status === "pending") updates.approved_at = null;

  const { data, error } = await supabase
    .from("daily_motivations")
    .update(updates)
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw new Error(error.message);
  return data ? mapRow(data) : null;
}
