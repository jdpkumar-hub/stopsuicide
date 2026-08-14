import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ShareButtons } from "@/components/video/VideoActions";
import { Section } from "@/components/ui/primitives";
import { articleSchema, JsonLd } from "@/lib/schema-org";
import { createMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
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
  return createMetadata({
    title: story.title,
    description: story.excerpt,
    path: `/stories/${story.slug}`,
    image: story.thumbnailUrl,
    type: "article",
  });
}

export default async function StoryPage({ params }: Props) {
  const { slug } = await params;
  const story = await getStory(slug);
  if (!story) notFound();

  return (
    <Section className="max-w-3xl pt-10">
      <JsonLd data={articleSchema(story)} />
      <p className="text-sm text-muted">
        {story.authorName} · {formatDate(story.publishedAt)} · {story.readingMinutes} min read
      </p>
      <h1 className="mt-3 font-serif text-5xl">{story.title}</h1>
      <p className="mt-4 text-lg text-muted">{story.excerpt}</p>
      <div className="mt-6">
        <ShareButtons title={story.title} />
      </div>
      <article className="prose-hope mt-10 space-y-5 text-lg leading-8">
        {story.body.split("\n\n").map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </article>
    </Section>
  );
}
