import { PageHeader } from "@/components/i18n/PageHeader";
import { StoryExplorer } from "@/components/stories/StoryExplorer";
import { Section } from "@/components/ui/primitives";
import { getCategories, getStories } from "@/lib/data/queries";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Recovery stories",
  description:
    "Inspirational journeys of people who asked for help, stayed connected, and rebuilt hope.",
  path: "/stories",
  localeAware: true,
});

export default async function StoriesPage() {
  const [stories, categories] = await Promise.all([getStories(), getCategories()]);
  const storyCategories = categories.filter((item) =>
    stories.some((story) => story.categoryId === item.id),
  );

  return (
    <Section className="pt-10">
      <PageHeader titleKey="stories.title" subKey="stories.sub" />
      <div className="mt-10">
        <StoryExplorer stories={stories} categories={storyCategories} />
      </div>
    </Section>
  );
}
