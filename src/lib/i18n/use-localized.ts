"use client";

import { pickLocalized } from "@/lib/i18n/locales";
import { useI18n } from "@/lib/i18n/context";
import type { Article, Category, Quote, ResourceItem, Story, Testimonial, Video } from "@/types";

export function useLocalized() {
  const { locale } = useI18n();
  return {
    locale,
    text: (map: Parameters<typeof pickLocalized>[1], fallback: string) =>
      pickLocalized(locale, map, fallback),
    video: (item: Video) => ({
      title: pickLocalized(locale, item.titles, item.title),
      description: pickLocalized(locale, item.descriptions, item.description),
      tags: item.tagsByLocale?.[locale] ?? item.tags,
    }),
    story: (item: Story) => ({
      title: pickLocalized(locale, item.titles, item.title),
      excerpt: pickLocalized(locale, item.excerpts, item.excerpt),
      body: pickLocalized(locale, item.bodies, item.body),
    }),
    article: (item: Article) => ({
      title: pickLocalized(locale, item.titles, item.title),
      excerpt: pickLocalized(locale, item.excerpts, item.excerpt),
      body: pickLocalized(locale, item.bodies, item.body),
    }),
    category: (item?: Category) =>
      item ? pickLocalized(locale, item.names, item.name) : "",
    quote: (item: Quote) => pickLocalized(locale, item.translations, item.text),
    resource: (item: ResourceItem) => ({
      title: pickLocalized(locale, item.titles, item.title),
      summary: pickLocalized(locale, item.summaries, item.summary),
      body: pickLocalized(locale, item.bodies, item.body),
    }),
    testimonial: (item: Testimonial) => ({
      quote: pickLocalized(locale, item.quotes, item.quote),
      role: pickLocalized(locale, item.roles, item.role),
    }),
    team: (item: { role: string; bio: string; roles?: Parameters<typeof pickLocalized>[1]; bios?: Parameters<typeof pickLocalized>[1] }) => ({
      role: pickLocalized(locale, item.roles, item.role),
      bio: pickLocalized(locale, item.bios, item.bio),
    }),
  };
}
