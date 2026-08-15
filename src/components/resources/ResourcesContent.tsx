"use client";

import { Heart, HelpCircle, Sun, Users } from "lucide-react";
import { Card, Section } from "@/components/ui/primitives";
import { faqs, resources } from "@/lib/data/seed";
import { useI18n } from "@/lib/i18n/context";
import { useLocalized } from "@/lib/i18n/use-localized";

const icons = {
  sun: Sun,
  heart: Heart,
  users: Users,
  help: HelpCircle,
};

export function ResourcesContent() {
  const { t } = useI18n();
  const loc = useLocalized();

  return (
    <Section className="pt-10">
      <h1 className="font-serif text-5xl">{t("resources.title")}</h1>
      <p className="mt-3 max-w-2xl text-muted">{t("resources.sub")}</p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {resources.map((item) => {
          const Icon = icons[item.icon];
          const copy = loc.resource(item);
          return (
            <Card key={item.id} id={item.slug} className="p-6 sm:p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-hope-blue dark:bg-blue-500/15">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="font-serif text-3xl">{copy.title}</h2>
              <p className="mt-2 text-sm text-muted">{copy.summary}</p>
              <p className="mt-4 leading-7">{copy.body}</p>
            </Card>
          );
        })}
      </div>
      <div className="mt-12">
        <h2 className="font-serif text-4xl">{t("resources.faq")}</h2>
        <div className="mt-6 space-y-4">
          {faqs.map((faq) => {
            const question = loc.text(faq.questions, faq.question);
            const answer = loc.text(faq.answers, faq.answer);
            return (
            <Card key={faq.id} className="p-6">
              <h3 className="font-semibold">{question}</h3>
              <p className="mt-2 text-muted">{answer}</p>
            </Card>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
