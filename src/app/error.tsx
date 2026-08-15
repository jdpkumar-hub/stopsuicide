"use client";

import { Button, Section } from "@/components/ui/primitives";
import { useI18n } from "@/lib/i18n/context";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useI18n();
  return (
    <Section className="py-24 text-center">
      <h1 className="font-serif text-5xl">{t("error.title")}</h1>
      <p className="mx-auto mt-4 max-w-lg text-muted">{t("error.body")}</p>
      <div className="mt-8 flex justify-center gap-3">
        <Button onClick={reset}>{t("error.retry")}</Button>
        <Button href="#get-help" variant="green">
          {t("nav.getHelp")}
        </Button>
      </div>
    </Section>
  );
}
