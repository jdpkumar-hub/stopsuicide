import type { Locale } from "@/lib/i18n/locales";
import { en, type Messages } from "@/lib/i18n/messages/en";

const loaders: Record<Exclude<Locale, "en">, () => Promise<{ default: Messages }>> = {
  te: () => import("@/lib/i18n/messages/te"),
  hi: () => import("@/lib/i18n/messages/hi"),
  ta: () => import("@/lib/i18n/messages/ta"),
  kn: () => import("@/lib/i18n/messages/kn"),
  ml: () => import("@/lib/i18n/messages/ml"),
};

const cache = new Map<Locale, Messages>([["en", en]]);

export async function loadMessages(locale: Locale): Promise<Messages> {
  const hit = cache.get(locale);
  if (hit) return hit;
  if (locale === "en") return en;
  const mod = await loaders[locale]();
  cache.set(locale, mod.default);
  return mod.default;
}

export function getCachedMessages(locale: Locale): Messages {
  return cache.get(locale) ?? en;
}
