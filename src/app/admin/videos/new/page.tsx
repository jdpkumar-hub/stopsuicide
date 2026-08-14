import { VideoForm } from "@/components/admin/VideoForm";
import { getCategories } from "@/lib/data/queries";

export default async function NewVideoPage() {
  const categories = await getCategories();
  return (
    <div>
      <h1 className="mb-6 font-serif text-4xl">Upload video</h1>
      <VideoForm categories={categories} />
    </div>
  );
}
