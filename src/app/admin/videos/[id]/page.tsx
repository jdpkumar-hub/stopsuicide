import { notFound } from "next/navigation";
import { VideoForm } from "@/components/admin/VideoForm";
import { requireAdmin } from "@/lib/admin";
import { canDeleteContent } from "@/lib/cms/roles";
import { getAllVideosAdmin, getCategories } from "@/lib/data/queries";

export default async function EditVideoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [videos, categories, auth] = await Promise.all([
    getAllVideosAdmin(),
    getCategories(),
    requireAdmin(),
  ]);
  const video = videos.find((item) => item.id === id);
  if (!video) notFound();

  return (
    <div>
      <h1 className="mb-6 font-serif text-4xl">Edit video</h1>
      <VideoForm categories={categories} video={video} canDelete={canDeleteContent(auth.role)} />
    </div>
  );
}
