"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { HeroVisual } from "@/components/home/HeroVisual";
import { QuoteReel } from "@/components/home/QuoteReel";
import { SunriseScene } from "@/components/home/SunriseScene";
import { Button } from "@/components/ui/primitives";
import { useI18n } from "@/lib/i18n/context";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const { t } = useI18n();
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden">
      <SunriseScene />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-950/55 via-slate-950/18 to-transparent" />
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-4 pb-24 pt-28 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
          <div>
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
              className="kicker mb-5 text-white/85"
            >
              {t("hero.kicker")}
            </motion.p>
            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: reduce ? 0 : 0.08, ease }}
              className="hero-title max-w-3xl whitespace-pre-line font-serif text-white"
            >
              {t("hero.headline")}
            </motion.h1>
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: reduce ? 0 : 0.18, ease }}
              className="mt-6 max-w-xl whitespace-pre-line text-base leading-relaxed text-white/90 sm:text-lg"
            >
              {t("hero.sub")}
            </motion.p>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: reduce ? 0 : 0.28, ease }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Button href="/videos" className="h-12 px-6 text-base">
                {t("hero.watch")}
              </Button>
              <Button href="#get-help" variant="green" className="h-12 px-6 text-base">
                {t("hero.support")}
              </Button>
              <Button href="/contact" variant="ghost" className="h-12 px-6 text-base">
                {t("hero.share")}
              </Button>
            </motion.div>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: reduce ? 0 : 0.38, ease }}
              className="mt-8 max-w-xl"
            >
              <QuoteReel compact />
            </motion.div>
          </div>
          <HeroVisual />
        </div>
      </div>
      <motion.a
        href="#todays-inspiration"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-white/80"
        aria-label={t("hero.scroll")}
      >
        <span className="kicker text-white/80">{t("hero.scroll")}</span>
        <ChevronDown className="sunrise-scroll-icon h-5 w-5" />
      </motion.a>
    </section>
  );
}
