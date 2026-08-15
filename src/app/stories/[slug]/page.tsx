import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StoryArticle } from "@/components/content/ArticleView";
import { articleSchema, JsonLd } from "@/lib/schema-org";
import { createMetadata } from "@/lib/seo";
import { pickLocalized } from "@/lib/i18n/locales";
import { getRequestLocale } from "@/lib/i18n/request-locale";
import { getStories, getStory } from "@/lib/data/queries";

export async function generateStaticParams() {
  const stories = await getStories();
  return stories.map((story) => ({ slug: story.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const story = await getStory(slug);
  if (!story) return createMetadata({ title: "Story", description: "Story not found." });
  const locale = await getRequestLocale();
  return createMetadata({
    title: pickLocalized(locale, story.titles, story.title),
    description: pickLocalized(locale, story.excerpts, story.excerpt),
    path: `/stories/${story.slug}`,
    image: story.thumbnailUrl,
    type: "article",
    localeAware: true,
    locale,
  });
}

export default async function StoryPage({ params }: Props) {
  const { slug } = await params;
  const story = await getStory(slug);
  if (!story) notFound();

  return (
    <>
      <JsonLd data={articleSchema(story)} />
      <StoryArticle story={story} />
    </>
  );
}
