"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useI18n } from "@/lib/i18n/context";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1400&q=75";

const SPECKS = [
  { left: "12%", top: "22%", size: 6, duration: 9 },
  { left: "78%", top: "18%", size: 4, duration: 12 },
  { left: "24%", top: "68%", size: 5, duration: 11 },
  { left: "86%", top: "62%", size: 7, duration: 14 },
  { left: "48%", top: "12%", size: 3, duration: 10 },
  { left: "62%", top: "78%", size: 4, duration: 13 },
];

export function HeroVisual() {
  const { t } = useI18n();
  const reduce = useReducedMotion();

  return (
    <motion.figure
      initial={reduce ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: reduce ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative isolate mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] shadow-[0_30px_80px_rgba(15,23,42,0.28)] lg:max-w-none lg:min-h-[32rem]"
    >
      <motion.div
        className="absolute inset-0"
        animate={reduce ? undefined : { scale: [1, 1.04, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src={HERO_IMAGE}
          alt={t("hero.imageAlt")}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 90vw, 42vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-amber-950/35 via-sky-900/10 to-sky-300/15" />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/25" />
      {!reduce
        ? SPECKS.map((speck, index) => (
            <motion.span
              key={index}
              className="absolute rounded-full bg-white/70 shadow-[0_0_12px_rgba(255,236,179,0.8)]"
              style={{
                left: speck.left,
                top: speck.top,
                width: speck.size,
                height: speck.size,
              }}
              animate={{ y: [0, -14, 0], opacity: [0.35, 0.9, 0.35] }}
              transition={{ duration: speck.duration, repeat: Infinity, ease: "easeInOut" }}
            />
          ))
        : null}
    </motion.figure>
  );
}
