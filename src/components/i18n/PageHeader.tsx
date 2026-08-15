"use client";

import { useI18n } from "@/lib/i18n/context";
import type { MessageKey } from "@/lib/i18n/messages/en";
import { Section } from "@/components/ui/primitives";

export function PageHeader({
  titleKey,
  subKey,
}: {
  titleKey: MessageKey;
  subKey: MessageKey;
}) {
  const { t } = useI18n();
  return (
    <>
      <h1 className="page-title font-serif">{t(titleKey)}</h1>
      <p className="mt-3 max-w-2xl whitespace-pre-line text-muted">{t(subKey)}</p>
    </>
  );
}

export function TranslatedSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <Section className={className}>{children}</Section>;
}
