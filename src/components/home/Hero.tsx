"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { HeroVisual } from "@/components/home/HeroVisual";
import { TrustStrip } from "@/components/home/TrustStrip";
import { Button } from "@/components/ui/primitives";
import { useI18n } from "@/lib/i18n/context";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const { t } = useI18n();
  const reduce = useReducedMotion();

  return (
    <section className="home-hero">
      <div className="home-hero-glow" aria-hidden="true" />
      <div className="home-hero-inner mx-auto grid max-w-6xl items-center gap-8 px-4 sm:px-6 md:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] md:gap-10 lg:gap-12 xl:gap-16">
        <div className="hero-copy min-w-0">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease }}
            className="hero-eyebrow"
          >
            {t("hero.eyebrow")}
          </motion.p>
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: reduce ? 0 : 0.06, ease }}
            className="hero-title mt-4 font-serif text-foreground"
          >
            {t("hero.headline")}
          </motion.h1>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: reduce ? 0 : 0.12, ease }}
            className="hero-sub mt-4 text-muted"
          >
            {t("hero.sub")}
          </motion.p>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: reduce ? 0 : 0.2, ease }}
            className="hero-actions mt-7"
          >
            <Button href="#get-help" variant="help" className="h-10 px-5 text-sm">
              {t("hero.support")}
            </Button>
            <Button href="/videos" variant="outline" className="h-10 px-5 text-sm">
              {t("hero.watch")}
            </Button>
            <Link href="/contact" className="hero-text-link">
              {t("hero.share")}
            </Link>
          </motion.div>
        </div>
        <HeroVisual />
      </div>
      <TrustStrip />
    </section>
  );
}
