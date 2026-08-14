"use client";

import { Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Button } from "@/components/ui/primitives";
import { NAV_LINKS } from "@/lib/constants";
import { useI18n } from "@/lib/i18n/context";

export function Header() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3">
      <div className="glass mx-auto flex max-w-6xl items-center justify-between rounded-full px-3 py-2 sm:px-4">
        <Link href="/" className="flex items-center gap-2 px-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-hope-blue to-hope-green text-sm font-bold text-white">
            SS
          </span>
          <span className="font-serif text-lg">stopsuicide.in</span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted transition hover:text-foreground"
            >
              {t(link.labelKey)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="/search"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border"
            aria-label={t("nav.search")}
          >
            <Search className="h-4 w-4" />
          </Link>
          <LanguageSwitcher />
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
          aria-label="Open menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="glass mx-auto mt-2 max-w-6xl rounded-3xl p-4 lg:hidden">
          <nav className="flex flex-col gap-3" aria-label="Mobile">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-3 py-2 text-sm font-medium hover:bg-white/50 dark:hover:bg-white/5"
              >
                {t(link.labelKey)}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex items-center justify-between gap-2">
            <LanguageSwitcher />
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
