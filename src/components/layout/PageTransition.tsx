"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const HIDDEN = { opacity: 0, y: 10 };
const SHOWN = { opacity: 1, y: 0 };
const ENTER = { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const };
const INSTANT = { duration: 0 };

export function PageTransition({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(media.matches);
    setHydrated(true);
  }, []);

  return (
    <motion.div
      initial={false}
      animate={hydrated ? SHOWN : HIDDEN}
      transition={hydrated && !reduceMotion ? ENTER : INSTANT}
    >
      {children}
    </motion.div>
  );
}
