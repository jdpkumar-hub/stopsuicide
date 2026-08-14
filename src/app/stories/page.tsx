import { Section } from "@/components/ui/primitives";
import { StoryExplorer } from "@/components/stories/StoryExplorer";
import { getCategories, getStories } from "@/lib/data/queries";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Recovery stories",
  description:
    "Inspirational journeys of people who asked for help, stayed connected, and rebuilt hope.",
  path: "/stories",
});

export default async function StoriesPage() {
  const [stories, categories] = await Promise.all([getStories(), getCategories()]);
  const storyCategories = categories.filter((item) =>
    stories.some((story) => story.categoryId === item.id),
  );

  return (
    <Section className="pt-10">
      <h1 className="font-serif text-5xl">Stories</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Recovery stories and inspirational journeys, shared with dignity. Filter by theme and read at your own pace.
      </p>
      <div className="mt-10">
        <StoryExplorer stories={stories} categories={storyCategories} />
      </div>
    </Section>
  );
}
