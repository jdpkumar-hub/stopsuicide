"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BANNER_MESSAGES } from "@/lib/i18n/content";
import { useI18n } from "@/lib/i18n/context";

export function InspirationBanner() {
  const pathname = usePathname();
  const { locale } = useI18n();
  const messages = BANNER_MESSAGES[locale];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (pathname === "/") return;
    const id = window.setInterval(() => {
      setIndex((value) => (value + 1) % messages.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, [messages.length, pathname]);

  if (pathname === "/") return null;

  return (
    <div className="border-b border-border bg-gradient-to-r from-blue-600/12 via-emerald-500/14 to-amber-300/10">
      <div className="mx-auto flex min-h-[3.25rem] max-w-6xl items-center justify-center px-4 py-2 text-center text-sm font-medium sm:text-base">
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
