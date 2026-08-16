import { notFound } from "next/navigation";
import { StoryForm } from "@/components/admin/StoryForm";
import { requireAdmin } from "@/lib/admin";
import { canDeleteContent, canModerateStories } from "@/lib/cms/roles";
import { getAllStoriesAdmin, getCategories } from "@/lib/data/queries";

export default async function EditStoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [stories, categories, auth] = await Promise.all([
    getAllStoriesAdmin(),
    getCategories(),
    requireAdmin(),
  ]);
  const story = stories.find((item) => item.id === id);
  if (!story) notFound();

  return (
    <div>
      <h1 className="mb-6 font-serif text-4xl">Review story</h1>
      <StoryForm
        story={story}
        categories={categories}
        canDelete={canDeleteContent(auth.role)}
        canModerate={canModerateStories(auth.role)}
      />
    </div>
  );
}
