"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

export function HeroVisual() {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  const uid = useId();
  const skyId = `${uid}-sky`;
  const sunId = `${uid}-sun`;
  const glowId = `${uid}-glow`;

  return (
    <motion.figure
      initial={reduce ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: reduce ? 0 : 0.14, ease: [0.22, 1, 0.36, 1] }}
      className="hope-card"
      aria-label={t("hero.imageAlt")}
    >
      <svg className="hope-card-scene" viewBox="0 0 420 360" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id={skyId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#9ec5ea" />
            <stop offset="38%" stopColor="#f3c39a" />
            <stop offset="68%" stopColor="#ffe7c4" />
            <stop offset="100%" stopColor="#eef6ec" />
          </linearGradient>
          <radialGradient id={sunId} cx="42%" cy="38%" r="50%">
            <stop offset="0%" stopColor="#fff8e8" />
            <stop offset="42%" stopColor="#ffd27a" />
            <stop offset="100%" stopColor="#f4a24c" />
          </radialGradient>
          <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255, 232, 176, 0.7)" />
            <stop offset="100%" stopColor="rgba(255, 232, 176, 0)" />
          </radialGradient>
        </defs>
        <rect width="420" height="360" fill={`url(#${skyId})`} />
        <circle className="hope-orb hope-orb-a" cx="86" cy="72" r="54" fill="rgba(255,255,255,0.28)" />
        <circle className="hope-orb hope-orb-b" cx="348" cy="54" r="70" fill="rgba(186, 230, 253, 0.32)" />
        <circle className="hope-orb hope-orb-c" cx="40" cy="210" r="36" fill="rgba(167, 243, 208, 0.28)" />
        <circle cx="268" cy="148" r="92" fill={`url(#${glowId})`} />
        <circle cx="268" cy="156" r="38" fill={`url(#${sunId})`} />
        <circle cx="118" cy="96" r="3.2" fill="rgba(255,255,255,0.85)" />
        <circle cx="176" cy="48" r="2.2" fill="rgba(255,255,255,0.7)" />
        <circle cx="352" cy="128" r="2.6" fill="rgba(255,255,255,0.75)" />
        <path
          d="M0 228 C 72 198, 128 214, 186 188 C 252 160, 304 196, 420 168 L 420 360 L 0 360 Z"
          fill="rgba(94, 160, 132, 0.28)"
        />
        <path
          d="M0 262 C 90 228, 168 254, 246 236 C 318 220, 368 246, 420 228 L 420 360 L 0 360 Z"
          fill="rgba(214, 232, 214, 0.92)"
        />
      </svg>

      <div className="hope-chip hope-chip-a" aria-hidden="true">
        <Heart className="h-3.5 w-3.5 text-rose-500" fill="currentColor" />
      </div>
      <div className="hope-chip hope-chip-b" aria-hidden="true">
        <Sparkles className="h-3.5 w-3.5 text-amber-500" />
        <span>{t("quote.categoryHope")}</span>
      </div>
      <div className="hope-chip hope-chip-c" aria-hidden="true">
        <span className="hope-chip-dot" />
      </div>

      <figcaption className="hope-card-caption">
        <p className="hope-card-label">{t("hero.reminderLabel")}</p>
        <p className="hope-card-quote">{t("hero.reminder")}</p>
      </figcaption>
    </motion.figure>
  );
}
