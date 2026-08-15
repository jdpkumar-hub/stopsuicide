"use client";

import Link from "next/link";
import { Logo } from "@/components/common/Logo";
import { DEFAULT_SETTINGS, NAV_LINKS } from "@/lib/constants";
import { useI18n } from "@/lib/i18n/context";

export function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo variant="footer" />
          <p className="mt-4 font-serif text-xl">stopsuicide.in</p>
          <p className="mt-2 text-sm font-medium tracking-wide text-muted">{t("hero.kicker")}</p>
          <p className="mt-3 max-w-md text-sm text-muted">{t("footer.mission")}</p>
          <p className="mt-4 text-sm text-muted">{t("footer.rights")}</p>
        </div>
        <div>
          <p className="text-sm font-semibold">{t("footer.explore")}</p>
          <ul className="mt-3 space-y-2 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-muted hover:text-foreground">
                  {t(link.labelKey)}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/privacy" className="text-muted hover:text-foreground">
                {t("nav.privacy")}
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-muted hover:text-foreground">
                {t("nav.terms")}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold">{t("footer.connect")}</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>
              <a href={`mailto:${DEFAULT_SETTINGS.contactEmail}`}>
                {DEFAULT_SETTINGS.contactEmail}
              </a>
            </li>
            <li>
              <a href={DEFAULT_SETTINGS.social.instagram} target="_blank" rel="noreferrer">
                Instagram
              </a>
            </li>
            <li>
              <a href={DEFAULT_SETTINGS.social.youtube} target="_blank" rel="noreferrer">
                YouTube
              </a>
            </li>
            <li>
              <Link href="/login">{t("footer.admin")}</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted">
        © {year} stopsuicide.in
      </div>
    </footer>
  );
}
