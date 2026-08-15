"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { BANNER_MESSAGES } from "@/lib/i18n/content";
import { useI18n } from "@/lib/i18n/context";

export function QuoteReel() {
  const { locale, t } = useI18n();
  const messages = BANNER_MESSAGES[locale];
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setIndex((value) => (value + 1) % messages.length);
    }, 5200);
    return () => window.clearInterval(id);
  }, [messages.length, reduce]);

  return (
    <div
      className="glass-premium relative overflow-hidden rounded-[1.75rem] px-6 py-7 text-center sm:px-8"
      aria-live="polite"
      aria-atomic="true"
      aria-label={t("hero.quoteLive")}
    >
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-hope-blue">
        {t("quote.title")}
      </p>
      <div className="relative mt-4 min-h-[5.5rem] sm:min-h-[6.5rem]">
        <AnimatePresence mode="wait">
          <motion.p
            key={`${locale}-${index}`}
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12, filter: "blur(6px)" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="whitespace-pre-line font-serif text-2xl leading-snug text-foreground sm:text-3xl"
          >
            {messages[index]}
          </motion.p>
        </AnimatePresence>
      </div>
      <div className="mt-5 flex justify-center gap-1.5" aria-hidden="true">
        {messages.map((_, dot) => (
          <span
            key={dot}
            className={`h-1.5 rounded-full transition-all ${
              dot === index ? "w-6 bg-hope-blue" : "w-1.5 bg-hope-blue/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
