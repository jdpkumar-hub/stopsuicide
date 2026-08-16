import { StoryForm } from "@/components/admin/StoryForm";
import { requireAdmin } from "@/lib/admin";
import { canDeleteContent, canModerateStories } from "@/lib/cms/roles";
import { getCategories } from "@/lib/data/queries";

export default async function NewStoryPage() {
  const [categories, auth] = await Promise.all([getCategories(), requireAdmin()]);
  return (
    <div>
      <h1 className="mb-6 font-serif text-4xl">New survivor story</h1>
      <StoryForm
        categories={categories}
        canDelete={canDeleteContent(auth.role)}
        canModerate={canModerateStories(auth.role)}
      />
    </div>
  );
}
