"use client";

import { BookHeart, Heart, HeartHandshake, Sparkles, type LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useI18n } from "@/lib/i18n/context";
import type { MessageKey } from "@/lib/i18n/messages/en";

const ITEMS: { icon: LucideIcon; title: MessageKey; sub: MessageKey; tone: string }[] = [
  { icon: HeartHandshake, title: "home.trustListen", sub: "home.trustListenSub", tone: "violet" },
  { icon: BookHeart, title: "home.trustResources", sub: "home.trustResourcesSub", tone: "green" },
  { icon: Sparkles, title: "home.trustStories", sub: "home.trustStoriesSub", tone: "rose" },
  { icon: Heart, title: "home.trustMatter", sub: "home.trustMatterSub", tone: "amber" },
];

export function TrustStrip() {
  const { t } = useI18n();
  const reduce = useReducedMotion();

  return (
    <div className="trust-strip mx-auto max-w-6xl px-4 sm:px-6">
      <div className="trust-panel">
        {ITEMS.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.article
              key={item.title}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: reduce ? 0 : 0.18 + index * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="trust-card"
            >
              <span className={`trust-card-icon trust-card-icon-${item.tone}`} aria-hidden="true">
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="trust-card-title">{t(item.title)}</p>
                <p className="trust-card-sub">{t(item.sub)}</p>
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
