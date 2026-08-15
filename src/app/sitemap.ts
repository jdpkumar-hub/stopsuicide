import type { MetadataRoute } from "next";
import { getArticles, getStories, getVideos } from "@/lib/data/queries";
import { LOCALES, LOCALE_META } from "@/lib/i18n/locales";
import { siteUrl } from "@/lib/utils";

function localized(path: string) {
  const base = siteUrl();
  const languages: Record<string, string> = {};
  for (const locale of LOCALES) {
    languages[LOCALE_META[locale].hreflang] = `${base}${path}?lang=${locale}`;
  }
  return languages;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl();
  const [videos, stories, articles] = await Promise.all([
    getVideos(),
    getStories(),
    getArticles(),
  ]);

  const staticRoutes = [
    "",
    "/videos",
    "/stories",
    "/blog",
    "/resources",
    "/about",
    "/contact",
    "/search",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
    alternates: { languages: localized(path || "/") },
  }));

  return [
    ...staticRoutes,
    ...videos.map((item) => ({
      url: `${base}/videos/${item.slug}`,
      lastModified: new Date(item.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: { languages: localized(`/videos/${item.slug}`) },
    })),
    ...stories.map((item) => ({
      url: `${base}/stories/${item.slug}`,
      lastModified: new Date(item.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: { languages: localized(`/stories/${item.slug}`) },
    })),
    ...articles.map((item) => ({
      url: `${base}/blog/${item.slug}`,
      lastModified: new Date(item.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: { languages: localized(`/blog/${item.slug}`) },
    })),
  ];
}
