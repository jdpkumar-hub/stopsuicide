"use client";

import { HeartHandshake, Phone } from "lucide-react";
import { CRISIS_RESOURCES } from "@/lib/constants";
import { useI18n } from "@/lib/i18n/context";
import { Section } from "@/components/ui/primitives";
import { telHref } from "@/lib/utils";
import type { MessageKey } from "@/lib/i18n/messages/en";

const HELP_DESC: Record<string, MessageKey> = {
  "tele-manas": "help.telemanas",
  kiran: "help.kiran",
  icall: "help.icall",
  aasra: "help.aasra",
  vandrevala: "help.vandrevala",
  iasp: "help.iasp",
  "988": "help.988",
};

export function GetHelp() {
  const { t } = useI18n();
  const india = CRISIS_RESOURCES.filter((item) => item.region === "india");
  const world = CRISIS_RESOURCES.filter((item) => item.region === "international");

  return (
    <section
      id="get-help"
      aria-labelledby="get-help-heading"
      className="border-y border-border bg-gradient-to-r from-blue-600/10 via-emerald-500/10 to-blue-600/10"
    >
      <Section className="py-12">
        <div className="glass rounded-3xl p-6 sm:p-10">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-hope-green text-white">
              <HeartHandshake className="h-6 w-6" />
            </div>
            <div>
              <h2 id="get-help-heading" className="font-serif text-3xl text-foreground">
                {t("help.title")}
              </h2>
              <p className="mt-2 max-w-3xl text-muted">{t("help.body")}</p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-hope-blue">
                {t("help.india")}
              </h3>
              <ul className="space-y-3">
                {india.map((item) => (
                  <li key={item.id} className="rounded-2xl bg-white/50 p-4 dark:bg-white/5">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-muted">
                      {HELP_DESC[item.id] ? t(HELP_DESC[item.id]) : item.description}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
                      {item.phone ? (
                        <a
                          href={telHref(item.phone)}
                          className="inline-flex items-center gap-1 font-semibold text-hope-blue"
                        >
                          <Phone className="h-4 w-4" />
                          {item.phone}
                        </a>
                      ) : null}
                      {item.hours ? <span className="text-muted">{item.hours}</span> : null}
                      {item.url ? (
                        <a
                          href={item.url}
                          className="underline-offset-2 hover:underline"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {t("help.website")}
                        </a>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-hope-green">
                {t("help.world")}
              </h3>
              <ul className="space-y-3">
                {world.map((item) => (
                  <li key={item.id} className="rounded-2xl bg-white/50 p-4 dark:bg-white/5">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-muted">
                      {HELP_DESC[item.id] ? t(HELP_DESC[item.id]) : item.description}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
                      {item.phone ? (
                        <a
                          href={telHref(item.phone)}
                          className="inline-flex items-center gap-1 font-semibold text-hope-green"
                        >
                          <Phone className="h-4 w-4" />
                          {item.phone}
                        </a>
                      ) : null}
                      {item.url ? (
                        <a
                          href={item.url}
                          className="underline-offset-2 hover:underline"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {t("help.website")}
                        </a>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-muted">{t("help.emergency")}</p>
            </div>
          </div>
        </div>
      </Section>
    </section>
  );
}
