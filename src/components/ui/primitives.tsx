import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export { Button };

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("section-pad mx-auto w-full max-w-6xl px-4 sm:px-6", className)}>
      {children}
    </section>
  );
}

export function Badge({
  children,
  className,
}: {
  children: ReactNode;
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
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div id={id} className={cn("glass overflow-hidden rounded-3xl", className)}>
      {children}
    </div>
  );
}
