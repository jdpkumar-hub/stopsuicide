"use client";

import { Contrast } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

export function ContrastToggle() {
  const { highContrast, setHighContrast, t } = useI18n();
  return (
    <button
      type="button"
      onClick={() => setHighContrast(!highContrast)}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white/40 text-foreground dark:bg-white/5"
      aria-pressed={highContrast}
      aria-label={t("theme.contrast")}
    >
      <Contrast className="h-4 w-4" />
    </button>
  );
}
