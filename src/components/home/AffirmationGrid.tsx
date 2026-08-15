"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ListenButton } from "@/components/a11y/ListenButton";
import { useI18n } from "@/lib/i18n/context";
import { useLocalized } from "@/lib/i18n/use-localized";
import type { Quote } from "@/types";

export function AffirmationGrid({ quotes }: { quotes: Quote[] }) {
  const { t } = useI18n();
  const loc = useLocalized();
  const reduce = useReducedMotion();

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6" aria-labelledby="affirmations-heading">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-10 max-w-2xl"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-hope-blue">
          {t("quote.title")}
        </p>
        <h2 id="affirmations-heading" className="mt-3 font-serif text-4xl sm:text-5xl">
          {t("home.affirmations")}
        </h2>
        <p className="mt-3 text-muted">{t("home.affirmationsSub")}</p>
      </motion.div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {quotes.map((quote, index) => {
          const text = loc.quote(quote);
          return (
            <motion.article
              key={quote.id}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: reduce ? 0 : index * 0.06, ease: [0.22, 1, 0.36, 1] }}
              whileHover={reduce ? undefined : { y: -6 }}
              className="glass-premium flex flex-col rounded-[1.75rem] p-6 sm:p-7"
            >
              <blockquote className="flex-1 whitespace-pre-line font-serif text-2xl leading-snug">
                “{text}”
              </blockquote>
              <p className="mt-5 text-sm text-muted">— {quote.author}</p>
              <div className="mt-5">
                <ListenButton text={text} />
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
