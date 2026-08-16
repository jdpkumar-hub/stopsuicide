import { notFound } from "next/navigation";
import { BlogForm } from "@/components/admin/BlogForm";
import { requireAdmin } from "@/lib/admin";
import { canDeleteContent, canPublishContent } from "@/lib/cms/roles";
import { getAllArticlesAdmin, getCategories } from "@/lib/data/queries";

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [articles, categories, auth] = await Promise.all([
    getAllArticlesAdmin(),
    getCategories(),
    requireAdmin(),
  ]);
  const article = articles.find((item) => item.id === id);
  if (!article) notFound();

  return (
    <div>
      <h1 className="mb-6 font-serif text-4xl">Edit article</h1>
      <BlogForm
        article={article}
        categories={categories}
        canDelete={canDeleteContent(auth.role)}
        canPublish={canPublishContent(auth.role)}
      />
    </div>
  );
}
