"use client";

import Link from "next/link";
import { ArrowUpRight, Compass, PlayCircle, Quote, type LucideIcon } from "lucide-react";
import { FadeIn } from "@/components/content/Cards";
import { Section } from "@/components/ui/primitives";
import { useI18n } from "@/lib/i18n/context";
import type { MessageKey } from "@/lib/i18n/messages/en";

const STEPS: { href: string; icon: LucideIcon; title: MessageKey; sub: MessageKey; tone: string }[] = [
  { href: "/videos", icon: PlayCircle, title: "home.stepVideos", sub: "home.stepVideosSub", tone: "blue" },
  { href: "/stories", icon: Quote, title: "home.stepStories", sub: "home.stepStoriesSub", tone: "teal" },
  { href: "/resources", icon: Compass, title: "home.stepResources", sub: "home.stepResourcesSub", tone: "amber" },
];

export function HopeSteps() {
  const { t } = useI18n();

  return (
    <Section className="hope-steps">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-serif text-3xl sm:text-4xl">{t("home.stepsTitle")}</h2>
        <p className="hope-steps-sub mx-auto mt-3 text-muted">{t("home.stepsSub")}</p>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {STEPS.map((step, index) => {
          const Icon = step.icon;
          return (
            <FadeIn key={step.href} delay={index * 0.07}>
              <Link href={step.href} className="hope-step-card group">
                <span className={`hope-step-icon hope-step-icon-${step.tone}`} aria-hidden="true">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-serif text-xl leading-snug">{t(step.title)}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{t(step.sub)}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-hope-blue">
                  {t("home.explore")}
                  <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </FadeIn>
          );
        })}
      </div>
    </Section>
  );
}
