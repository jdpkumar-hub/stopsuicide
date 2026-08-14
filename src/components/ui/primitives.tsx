import type { ComponentProps } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-hope-blue text-white hover:bg-blue-600 shadow-lg shadow-blue-600/20",
  green:
    "bg-hope-green text-white hover:bg-emerald-600 shadow-lg shadow-emerald-600/20",
  ghost:
    "bg-white/10 text-white ring-1 ring-white/30 hover:bg-white/20 backdrop-blur",
  outline:
    "border border-border bg-transparent text-foreground hover:bg-white/50 dark:hover:bg-white/5",
  help: "bg-emerald-600 text-white hover:bg-emerald-500",
};

export function Button({
  href,
  children,
  className,
  variant = "primary",
  type = "button",
  ...props
}: ComponentProps<"button"> & {
  href?: string;
  variant?: keyof typeof variants;
}) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hope-blue focus-visible:ring-offset-2 disabled:opacity-60",
    variants[variant],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}

export function Section({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("mx-auto w-full max-w-6xl px-4 py-16 sm:px-6", className)}>
      {children}
    </section>
  );
}

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-hope-blue dark:bg-blue-500/15 dark:text-blue-200",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Card({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div id={id} className={cn("glass overflow-hidden rounded-3xl", className)}>
      {children}
    </div>
  );
}
