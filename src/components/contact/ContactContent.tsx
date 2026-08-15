"use client";

import { ContactForms } from "@/components/contact/ContactForms";
import { TestimonialForm } from "@/components/contact/TestimonialForm";
import { Card, Section } from "@/components/ui/primitives";
import { DEFAULT_SETTINGS } from "@/lib/constants";
import { useI18n } from "@/lib/i18n/context";

export function ContactContent() {
  const { t } = useI18n();
  return (
    <Section className="pt-10">
      <h1 className="font-serif text-5xl">{t("contact.title")}</h1>
      <p className="mt-3 max-w-2xl text-muted">{t("contact.lead")}</p>
      <div className="mt-8 flex flex-wrap gap-3 text-sm">
        <a className="rounded-full border border-border px-4 py-2" href={`mailto:${DEFAULT_SETTINGS.contactEmail}`}>
          {DEFAULT_SETTINGS.contactEmail}
        </a>
        <a className="rounded-full border border-border px-4 py-2" href={DEFAULT_SETTINGS.social.instagram}>
          Instagram
        </a>
        <a className="rounded-full border border-border px-4 py-2" href={DEFAULT_SETTINGS.social.youtube}>
          YouTube
        </a>
        <a className="rounded-full border border-border px-4 py-2" href={DEFAULT_SETTINGS.social.twitter}>
          X
        </a>
      </div>
      <div className="mt-10">
        <ContactForms />
      </div>
      <Card className="mt-8 p-6 sm:p-8">
        <h2 className="font-serif text-3xl">{t("testimonial.submit")}</h2>
        <TestimonialForm />
      </Card>
      <Card className="mt-8 p-6 text-sm text-muted">{t("contact.storyNote")}</Card>
    </Section>
  );
}
