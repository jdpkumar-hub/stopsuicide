"use client";

import Image from "next/image";
import { Button, Card, Section } from "@/components/ui/primitives";
import { useI18n } from "@/lib/i18n/context";
import { useLocalized } from "@/lib/i18n/use-localized";
import { team } from "@/lib/data/seed";

export function AboutContent() {
  const { t } = useI18n();
  const loc = useLocalized();
  return (
    <Section className="pt-10">
      <h1 className="font-serif text-5xl">{t("about.title")}</h1>
      <p className="mt-4 max-w-3xl text-lg text-muted">{t("about.lead")}</p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Card className="p-8">
          <h2 className="font-serif text-3xl">{t("about.mission")}</h2>
          <p className="mt-3 text-muted">{t("about.missionBody")}</p>
        </Card>
        <Card className="p-8">
          <h2 className="font-serif text-3xl">{t("about.vision")}</h2>
          <p className="mt-3 text-muted">{t("about.visionBody")}</p>
        </Card>
      </div>
      <h2 className="mt-14 font-serif text-4xl">{t("about.team")}</h2>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {team.map((member) => {
          const copy = loc.team(member);
          return (
          <Card key={member.id} className="overflow-hidden">
            <div className="relative h-56">
              <Image src={member.imageUrl} alt={member.name} fill className="object-cover" />
            </div>
            <div className="p-6">
              <h3 className="font-serif text-2xl">{member.name}</h3>
              <p className="text-sm text-hope-blue">{copy.role}</p>
              <p className="mt-3 text-sm text-muted">{copy.bio}</p>
            </div>
          </Card>
          );
        })}
      </div>
      <Card className="mt-12 p-8">
        <h2 className="font-serif text-3xl">{t("about.contact")}</h2>
        <p className="mt-3 text-muted">{t("about.contactBody")}</p>
        <Button href="/contact" className="mt-5">
          {t("about.write")}
        </Button>
      </Card>
    </Section>
  );
}
