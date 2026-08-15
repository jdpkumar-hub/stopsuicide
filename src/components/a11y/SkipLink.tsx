"use client";

import { useI18n } from "@/lib/i18n/context";

export function SkipLink() {
  const { t } = useI18n();
  return (
    <a href="#main" className="skip-link">
      {t("a11y.skip")}
    </a>
  );
}

export function FloatingHelp() {
  const { t } = useI18n();
  return (
    <a
      href="#get-help"
      className="fixed bottom-4 right-4 z-40 rounded-full bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-lg md:hidden"
    >
      {t("a11y.getHelp")}
    </a>
  );
}
