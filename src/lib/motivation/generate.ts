import { MOTIVATION_CATALOG } from "@/lib/motivation/catalog";
import type { DailyMotivation, TranslationMap } from "@/types";

const UNSAFE = /\b(kill|suicide method|how to die|hang yourself|overdose)\b/i;

export function todayStamp(timeZone = "Asia/Kolkata") {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function hashDate(date: string) {
  let hash = 0;
  for (const char of date) hash = (hash * 33 + char.charCodeAt(0)) >>> 0;
  return hash;
}

function isSafe(text: string) {
  const trimmed = text.trim();
  return trimmed.length >= 12 && trimmed.length <= 220 && !UNSAFE.test(trimmed);
}

function fromCatalog(forDate: string, used: string[]): { text: string; translations: TranslationMap; source: "catalog" } {
  const unused = MOTIVATION_CATALOG.filter(
    (item) => !used.some((text) => text.toLowerCase() === item.text.toLowerCase()),
  );
  const pool = unused.length ? unused : MOTIVATION_CATALOG;
  const item = pool[hashDate(forDate) % pool.length];
  return { text: item.text, translations: item.translations, source: "catalog" };
}

async function fromOpenAi(used: string[]) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return null;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      temperature: 0.9,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You write original, compassionate daily motivation for a mental-wellness site in India. Recovery-focused, hopeful, never graphic or sensational. No methods of self-harm. One or two short sentences. JSON keys: en, te, hi, ta, kn, ml.",
        },
        {
          role: "user",
          content: `Create today's unique quote. Avoid repeating: ${used.slice(-12).join(" | ") || "none"}. Keep each translation natural, not literal.`,
        },
      ],
    }),
  });

  if (!response.ok) return null;
  const json = await response.json();
  const raw = json.choices?.[0]?.message?.content;
  if (!raw) return null;
  const cleaned = String(raw).replace(/```json|```/g, "").trim();
  const parsed = JSON.parse(cleaned) as TranslationMap & { text?: string };
  const text = (parsed.en || parsed.text || "").trim();
  if (!text || !isSafe(text)) return null;
  return {
    text,
    translations: parsed,
    source: "ai" as const,
  };
}

export async function composeMotivation(forDate: string, usedTexts: string[]) {
  try {
    const generated = await fromOpenAi(usedTexts);
    if (generated) return generated;
  } catch {
    // Catalog is the safe fallback.
  }
  return fromCatalog(forDate, usedTexts);
}

export function toQuoteShape(item: DailyMotivation) {
  return {
    id: item.id,
    text: item.text,
    translations: item.translations,
    author: item.author,
    active: item.status === "approved",
    aiGenerated: true,
    forDate: item.forDate,
  };
}
