import { BlogForm } from "@/components/admin/BlogForm";
import { requireAdmin } from "@/lib/admin";
import { canDeleteContent } from "@/lib/cms/roles";
import { getCategories } from "@/lib/data/queries";

export default async function NewBlogPage() {
  const [categories, auth] = await Promise.all([getCategories(), requireAdmin()]);
  return (
    <div>
      <h1 className="mb-6 font-serif text-4xl">New article</h1>
      <BlogForm categories={categories} canDelete={canDeleteContent(auth.role)} />
    </div>
  );
}
