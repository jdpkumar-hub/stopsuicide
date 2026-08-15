"use client";

import {
  useCallback,
  type ComponentProps,
  type MouseEvent,
  type ReactNode,
} from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const variants = {
  primary: "btn-premium-blue",
  green: "btn-premium-green",
  ghost: "btn-premium-ghost",
  outline: "btn-premium-outline",
  help: "btn-premium-help",
};

function attachRipple(event: MouseEvent<HTMLElement>) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const host = event.currentTarget;
  const rect = host.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 1.2;
  const ripple = document.createElement("span");
  ripple.className = "btn-ripple";
  ripple.style.width = `${size}px`;
  ripple.style.height = `${size}px`;
  ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
  ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
  host.appendChild(ripple);
  window.setTimeout(() => ripple.remove(), 650);
}

export function Button({
  href,
  children,
  className,
  variant = "primary",
  type = "button",
  loading,
  onClick,
  ...props
}: ComponentProps<"button"> & {
  href?: string;
  variant?: keyof typeof variants;
  loading?: boolean;
  children?: ReactNode;
}) {
  const classes = cn("btn-base", variants[variant], className);

  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      attachRipple(event);
      onClick?.(event as MouseEvent<HTMLButtonElement>);
    },
    [onClick],
  );

  const inner = (
    <>
      {loading ? <span className="btn-spinner" aria-hidden="true" /> : null}
      {children}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes} onClick={handleClick}>
        {inner}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      aria-busy={loading || undefined}
      disabled={loading || props.disabled}
      onClick={handleClick}
      {...props}
    >
      {inner}
    </button>
  );
}
