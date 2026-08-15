"use client";

import { Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ContrastToggle } from "@/components/a11y/ContrastToggle";
import { Logo } from "@/components/common/Logo";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Button } from "@/components/ui/primitives";
import { NAV_LINKS } from "@/lib/constants";
import { useI18n } from "@/lib/i18n/context";

export function Header() {
  const { t } = useI18n();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="site-header" data-scrolled={scrolled}>
      <div className="site-header-bar mx-auto flex max-w-6xl items-center justify-between rounded-full px-3 py-1.5 sm:px-5 sm:py-2">
        <Logo animate priority className="shrink-0 px-1" />

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link"
              data-active={pathname === link.href}
            >
              {t(link.labelKey)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/search"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border transition hover:bg-white/50 dark:hover:bg-white/5"
            aria-label={t("nav.search")}
          >
            <Search className="h-4 w-4" />
          </Link>
          <LanguageSwitcher />
          <ContrastToggle />
          <ThemeToggle />
          <Button href="#get-help" variant="help">
            {t("nav.getHelp")}
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={t("nav.menu")}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="site-header-bar mx-auto mt-2 max-w-6xl rounded-3xl p-4 lg:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-3 py-2.5 text-sm font-medium hover:bg-white/50 dark:hover:bg-white/5"
                data-active={pathname === link.href}
              >
                {t(link.labelKey)}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <LanguageSwitcher />
            <ContrastToggle />
            <ThemeToggle />
            <Button href="#get-help" variant="help" className="ml-auto">
              {t("nav.getHelp")}
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
