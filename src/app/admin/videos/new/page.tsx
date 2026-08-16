import { VideoForm } from "@/components/admin/VideoForm";
import { requireAdmin } from "@/lib/admin";
import { canDeleteContent, canPublishContent } from "@/lib/cms/roles";
import { getCategories } from "@/lib/data/queries";

export default async function NewVideoPage() {
  const [categories, auth] = await Promise.all([getCategories(), requireAdmin()]);
  return (
    <div>
      <h1 className="mb-6 font-serif text-4xl">Upload video</h1>
      <VideoForm
        categories={categories}
        canDelete={canDeleteContent(auth.role)}
        canPublish={canPublishContent(auth.role)}
      />
    </div>
  );
}
