import { BlogManager } from "@/components/admin/BlogManager";
import { Button } from "@/components/ui/primitives";
import { getAllArticlesAdmin } from "@/lib/data/queries";

export default async function AdminBlogPage() {
  const articles = await getAllArticlesAdmin();
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-4xl">Blog</h1>
          <p className="mt-2 text-sm text-muted">
            Rich-text articles with SEO, scheduling, drafts, and multilingual fields.
          </p>
        </div>
        <Button href="/admin/blog/new">New article</Button>
      </div>
      <div className="mt-6">
        <BlogManager articles={articles} />
      </div>
    </div>
  );
}
