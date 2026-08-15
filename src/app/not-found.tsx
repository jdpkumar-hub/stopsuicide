"use client";

import { Button, Section } from "@/components/ui/primitives";
import { useI18n } from "@/lib/i18n/context";

export default function NotFound() {
  const { t } = useI18n();
  return (
    <Section className="py-24 text-center">
      <h1 className="font-serif text-5xl">{t("notfound.title")}</h1>
      <p className="mx-auto mt-4 max-w-lg text-muted">{t("notfound.body")}</p>
      <div className="mt-8 flex justify-center gap-3">
        <Button href="/">{t("nav.home")}</Button>
        <Button href="#get-help" variant="green">
          {t("nav.getHelp")}
        </Button>
      </div>
    </Section>
  );
}
