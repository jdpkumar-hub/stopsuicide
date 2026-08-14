"use client";

import { LOCALES } from "@/lib/constants";
import { useI18n } from "@/lib/i18n/context";

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();

  return (
    <div className="flex rounded-full border border-border bg-white/40 p-1 text-xs font-semibold dark:bg-white/5">
      {LOCALES.map((item) => (
        <button
          key={item.code}
          type="button"
          onClick={() => setLocale(item.code)}
          className={`rounded-full px-2.5 py-1 transition ${
            locale === item.code
              ? "bg-hope-blue text-white"
              : "text-muted hover:text-foreground"
          }`}
          aria-pressed={locale === item.code}
        >
          {item.code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
