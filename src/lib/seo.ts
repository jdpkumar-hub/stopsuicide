import type { Metadata } from "next";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";
import { absoluteUrl, siteUrl } from "@/lib/utils";

export function createMetadata({
  title,
  description,
  path = "/",
  image = "/og.png",
  type = "website",
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
}): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = title.includes(SITE_NAME)
    ? title
    : `${title} | ${SITE_NAME}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(siteUrl()),
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_IN",
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
  };
}

export const defaultMetadata = createMetadata({
  title: `${SITE_NAME} — ${SITE_TAGLINE}`,
  description:
    "A calm space for hope, resilience, recovery, and mental wellness. Watch inspirational videos, read survivor stories, and find support.",
});
