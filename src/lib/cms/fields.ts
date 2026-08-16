import { LOCALES, type Locale, type TranslationMap } from "@/lib/i18n/locales";
import type { ContentStatus, MediaKind, QuoteMood, StoryModeration } from "@/types";

export const CONTENT_STATUSES: ContentStatus[] = ["draft", "published", "archived"];
export const STORY_STATUSES: StoryModeration[] = ["pending", "approved", "rejected"];
export const QUOTE_MOODS: QuoteMood[] = ["hope", "calm", "courage", "gratitude", "belonging"];
export const CONTENT_LOCALES = LOCALES;

export function collectTranslations(
  source: FormData | Record<string, unknown>,
  prefix: string,
): TranslationMap {
  const read = (key: string) => {
    if (source instanceof FormData) return String(source.get(key) || "");
    return String(source[key] ?? "");
  };
  const map: TranslationMap = {};
  for (const locale of LOCALES) {
    if (locale === "en") continue;
    const value = read(`${prefix}.${locale}`).trim();
    if (value) map[locale] = value;
  }
  return map;
}

export function parseTags(value: unknown) {
  return String(value || "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export function parseContentStatus(value: unknown): ContentStatus {
  if (value === "draft" || value === "archived" || value === "published") return value;
  return "published";
}

export function parseStoryStatus(value: unknown): StoryModeration {
  if (value === "pending" || value === "rejected" || value === "approved") return value;
  return "pending";
}

export function parseMood(value: unknown): QuoteMood {
  if (QUOTE_MOODS.includes(value as QuoteMood)) return value as QuoteMood;
  return "hope";
}

export function parseLocale(value: unknown): Locale {
  if (LOCALES.includes(value as Locale)) return value as Locale;
  return "en";
}

export function parseMediaKind(value: unknown): MediaKind {
  if (value === "video" || value === "file" || value === "image") return value;
  return "image";
}

export function isTruthyFlag(value: unknown) {
  return value === true || value === "on" || value === "true" || value === "1";
}

export function readingMinutesFromHtml(html: string) {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return Math.max(1, Math.round(text.split(" ").filter(Boolean).length / 180));
}
