"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const ALT = "Stop Suicide official logo";

const ASSETS = {
  full: {
    light: "/images/logo/logo.png",
    dark: "/images/logo/logo-dark.png",
    width: 629,
    height: 876,
  },
  mark: {
    light: "/images/logo/icon.png",
    dark: "/images/logo/icon-dark.png",
    width: 512,
    height: 443,
  },
} as const;

const HEIGHTS = {
  header: "h-9 w-auto sm:h-[42px] lg:h-12 xl:h-14",
  footer: "h-28 w-auto sm:h-36",
  loading: "h-32 w-auto sm:h-40",
  mark: "h-9 w-auto sm:h-11 lg:h-12",
} as const;

type LogoVariant = keyof typeof HEIGHTS;

export function Logo({
  variant = "header",
  href = "/",
  linked = true,
  animate = false,
  className,
  priority = false,
}: {
  variant?: LogoVariant;
  href?: string;
  linked?: boolean;
  animate?: boolean;
  className?: string;
  priority?: boolean;
}) {
  const reduce = useReducedMotion();
  const asset = variant === "mark" ? ASSETS.mark : ASSETS.full;
  const eager = priority || variant === "header" || variant === "loading";

  const mark = (
    <span className={cn("relative inline-flex items-center", HEIGHTS[variant])}>
      <Image
        src={asset.light}
        alt={ALT}
        width={asset.width}
        height={asset.height}
        sizes={variant === "footer" || variant === "loading" ? "160px" : "56px"}
        priority={eager}
        className="h-full w-auto max-w-none object-contain object-left dark:hidden"
      />
      <Image
        src={asset.dark}
        alt=""
        width={asset.width}
        height={asset.height}
        sizes={variant === "footer" || variant === "loading" ? "160px" : "56px"}
        priority={eager}
        aria-hidden="true"
        className="hidden h-full w-auto max-w-none object-contain object-left dark:block"
      />
    </span>
  );

  const motionWrap = animate && !reduce ? (
    <motion.span
      className="inline-flex origin-center"
      initial={{ opacity: 0, scale: 1 }}
      animate={{ opacity: 1, scale: [1, 1.05, 1] }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {mark}
    </motion.span>
  ) : (
    mark
  );

  if (!linked) {
    return <span className={cn("inline-flex items-center", className)}>{motionWrap}</span>;
  }

  return (
    <Link href={href} className={cn("inline-flex items-center", className)}>
      {motionWrap}
    </Link>
  );
}
