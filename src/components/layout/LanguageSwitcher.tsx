"use client";

import { Check, ChevronDown, Languages } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { LOCALES, LOCALE_META, type Locale } from "@/lib/i18n/locales";

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-10 items-center gap-1.5 rounded-full border border-border bg-white/40 px-3 text-sm font-semibold dark:bg-white/5"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("nav.language")}
      >
        <Languages className="h-4 w-4" />
        <span className="max-w-[7.5rem] truncate">{LOCALE_META[locale].nativeName}</span>
        <ChevronDown className="h-3.5 w-3.5" />
      </button>
      {open ? (
        <ul
          role="listbox"
          className="glass absolute right-0 z-50 mt-2 min-w-[12rem] rounded-2xl p-1"
        >
          {LOCALES.map((code: Locale) => (
            <li key={code}>
              <button
                type="button"
                role="option"
                aria-selected={locale === code}
                onClick={() => {
                  setLocale(code);
                  setOpen(false);
                }}
                className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm hover:bg-white/60 dark:hover:bg-white/10"
              >
                <span>{LOCALE_META[code].nativeName}</span>
                {locale === code ? <Check className="h-4 w-4 text-hope-blue" /> : null}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
