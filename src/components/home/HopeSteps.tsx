"use client";

import { Section } from "@/components/ui/primitives";
import { useI18n } from "@/lib/i18n/context";

export function HopeSteps() {
  const { t } = useI18n();

  return (
    <Section className="hope-steps">
      <div className="hope-leaf hope-leaf-left" aria-hidden="true" />
      <div className="hope-leaf hope-leaf-right" aria-hidden="true" />
      <div className="relative mx-auto max-w-2xl text-center">
        <p className="kicker hope-steps-kicker">{t("home.stepsTitle")}</p>
        <h2 className="mt-3 font-serif text-3xl leading-snug sm:text-4xl">{t("home.stepsHeadline")}</h2>
        <p className="hope-steps-sub mx-auto mt-4 text-muted">{t("home.stepsSub")}</p>
      </div>
    </Section>
  );
}
