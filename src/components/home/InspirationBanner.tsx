"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BANNER_MESSAGES } from "@/lib/i18n/content";
import { useI18n } from "@/lib/i18n/context";

export function InspirationBanner() {
  const { locale } = useI18n();
  const messages = BANNER_MESSAGES[locale];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((value) => (value + 1) % messages.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, [messages.length]);

  return (
    <div className="border-b border-border bg-gradient-to-r from-blue-600/15 via-emerald-500/15 to-blue-600/15">
      <div className="mx-auto flex min-h-[3rem] max-w-6xl items-center justify-center px-4 py-2 text-center text-sm font-medium sm:text-base">
        <AnimatePresence mode="wait">
          <motion.p
            key={`${locale}-${index}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="whitespace-pre-line"
          >
            {messages[index]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
