"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Heart, Play } from "lucide-react";
import { HeroVisual } from "@/components/home/HeroVisual";
import { StoriesCarousel } from "@/components/home/StoriesCarousel";
import { TrustStrip } from "@/components/home/TrustStrip";
import { Button } from "@/components/ui/primitives";
import { useI18n } from "@/lib/i18n/context";
import type { Category, Story } from "@/types";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero({ stories, categories }: { stories: Story[]; categories: Category[] }) {
  const { t } = useI18n();
  const reduce = useReducedMotion();

  return (
    <section className="home-hero">
      <div className="home-hero-glow" aria-hidden="true" />
      <div className="home-hero-orb home-hero-orb-a" aria-hidden="true" />
      <div className="home-hero-orb home-hero-orb-b" aria-hidden="true" />
      <div className="home-hero-orb home-hero-orb-c" aria-hidden="true" />
      <div className="home-hero-inner mx-auto grid max-w-6xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] lg:gap-10 xl:gap-12">
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
            className="hero-title mt-4 font-serif"
          >
            <span className="hero-title-lead">{t("hero.headlineLead")}</span>{" "}
            <span className="hero-title-accent">{t("hero.headlineAccent")}</span>
          </motion.h1>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: reduce ? 0 : 0.12, ease }}
            className="hero-sub mt-4"
          >
            {t("hero.sub")}
          </motion.p>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: reduce ? 0 : 0.2, ease }}
            className="hero-actions mt-7"
          >
            <Button href="#get-help" variant="help" className="h-11 px-5 text-sm">
              <Heart className="h-4 w-4" aria-hidden="true" />
              {t("hero.support")}
            </Button>
            <Button href="/videos" variant="ghost" className="h-11 px-5 text-sm">
              <Play className="h-4 w-4" aria-hidden="true" />
              {t("hero.watch")}
            </Button>
            <Link href="/contact" className="hero-text-link">
              {t("hero.share")} →
            </Link>
          </motion.div>
        </div>
        <div className="hero-visual min-w-0">
          {stories.length ? (
            <StoriesCarousel stories={stories} categories={categories} />
          ) : (
            <HeroVisual />
          )}
        </div>
      </div>
      <TrustStrip />
    </section>
  );
}
