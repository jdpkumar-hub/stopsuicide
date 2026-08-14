import type { MetadataRoute } from "next";
import { getArticles, getStories, getVideos } from "@/lib/data/queries";
import { siteUrl } from "@/lib/utils";

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
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  return [
    ...staticRoutes,
    ...videos.map((item) => ({
      url: `${base}/videos/${item.slug}`,
      lastModified: new Date(item.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...stories.map((item) => ({
      url: `${base}/stories/${item.slug}`,
      lastModified: new Date(item.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...articles.map((item) => ({
      url: `${base}/blog/${item.slug}`,
      lastModified: new Date(item.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
