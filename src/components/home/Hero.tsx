"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/primitives";
import { HERO_VIDEO } from "@/lib/constants";
import { useI18n } from "@/lib/i18n/context";

export function Hero() {
  const { t } = useI18n();

  return (
    <section className="relative isolate min-h-[88vh] overflow-hidden rounded-b-[2.5rem]">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80"
        aria-hidden="true"
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/45 to-background" />
      <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-end px-4 pb-20 pt-32 sm:px-6">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200"
        >
          {t("hero.kicker")}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-4xl font-serif text-5xl leading-tight text-white sm:text-7xl whitespace-pre-line"
        >
          {t("hero.headline")}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-5 max-w-2xl text-lg text-slate-100 whitespace-pre-line"
        >
          {t("hero.sub")}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <Button href="/videos">{t("hero.watch")}</Button>
          <Button href="#get-help" variant="green">
            {t("hero.support")}
          </Button>
          <Button href="/contact" variant="ghost">
            {t("hero.share")}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
