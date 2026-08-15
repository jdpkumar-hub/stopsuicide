"use client";

import { ListenButton } from "@/components/a11y/ListenButton";
import { Section } from "@/components/ui/primitives";
import { useI18n } from "@/lib/i18n/context";
import type { MessageKey } from "@/lib/i18n/messages/en";

export function LegalContent({
  titleKey,
  leadKey,
  bodyKey,
}: {
  titleKey: MessageKey;
  leadKey: MessageKey;
  bodyKey: MessageKey;
}) {
  const { t } = useI18n();
  const body = t(bodyKey);
  return (
    <Section className="max-w-3xl pt-10">
      <h1 className="font-serif text-5xl">{t(titleKey)}</h1>
      <p className="mt-4 text-lg text-muted">{t(leadKey)}</p>
      <div className="mt-6">
        <ListenButton text={`${t(titleKey)}. ${t(leadKey)}. ${body}`} />
      </div>
      <p className="mt-8 leading-8">{body}</p>
    </Section>
  );
}
