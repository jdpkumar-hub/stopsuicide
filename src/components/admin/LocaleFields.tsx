"use client";

import { LOCALES, LOCALE_META } from "@/lib/i18n/locales";
import type { TranslationMap } from "@/types";

export function LocaleFields({
  prefix,
  label,
  values,
  textarea,
  rows = 4,
}: {
  prefix: string;
  label: string;
  values?: TranslationMap;
  textarea?: boolean;
  rows?: number;
}) {
  return (
    <fieldset className="rounded-3xl border border-dashed border-border p-4">
      <legend className="px-2 text-sm font-semibold">{label}</legend>
      <div className="grid gap-3 md:grid-cols-2">
        {LOCALES.filter((locale) => locale !== "en").map((locale) => {
          const meta = LOCALE_META[locale];
          const shared = {
            name: `${prefix}.${locale}`,
            lang: locale,
            defaultValue: values?.[locale] || "",
            className:
              "mt-1 w-full rounded-2xl border border-border bg-transparent px-4 py-3",
          };
          return (
            <label key={locale} className="block text-sm font-medium">
              {meta.englishName} ({meta.nativeName})
              {textarea ? (
                <textarea {...shared} rows={rows} />
              ) : (
                <input {...shared} />
              )}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
