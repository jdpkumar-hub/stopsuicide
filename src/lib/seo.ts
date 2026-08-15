import type { Metadata } from "next";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";
import { LOCALES, LOCALE_META } from "@/lib/i18n/locales";
import { absoluteUrl, siteUrl } from "@/lib/utils";

export function languageAlternates(path = "/") {
  const languages: Record<string, string> = {
    "x-default": absoluteUrl(path),
  };
  for (const locale of LOCALES) {
    const suffix = path.includes("?") ? `&lang=${locale}` : `?lang=${locale}`;
    languages[LOCALE_META[locale].hreflang] = `${absoluteUrl(path)}${path === "/" ? `?lang=${locale}` : suffix}`;
  }
  return languages;
}

export function createMetadata({
  title,
  description,
  path = "/",
  image = "/og.png",
  type = "website",
  localeAware = false,
  locale = "en",
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  localeAware?: boolean;
  locale?: keyof typeof LOCALE_META;
}): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = title.includes(SITE_NAME)
    ? title
    : `${title} | ${SITE_NAME}`;
  const ogLocale = LOCALE_META[locale]?.ogLocale ?? "en_IN";

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(siteUrl()),
    alternates: {
      canonical: url,
      languages: localeAware ? languageAlternates(path) : undefined,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: ogLocale,
      alternateLocale: LOCALES.filter((code) => code !== locale).map(
        (code) => LOCALE_META[code].ogLocale,
      ),
      type,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
    robots: { index: true, follow: true },
    other: localeAware
      ? {
          "content-language": LOCALE_META[locale].htmlLang,
        }
      : undefined,
  };
}

export const defaultMetadata = createMetadata({
  title: `${SITE_NAME} — ${SITE_TAGLINE}`,
  description:
    "A calm space for hope, resilience, recovery, and mental wellness. Watch inspirational videos, read survivor stories, and find support.",
  localeAware: true,
});
