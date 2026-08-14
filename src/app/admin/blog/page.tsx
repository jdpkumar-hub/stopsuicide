import { ManagerForm } from "@/components/admin/ManagerForm";
import { Card } from "@/components/ui/primitives";
import { getArticles } from "@/lib/data/queries";

export default async function AdminBlogPage() {
  const articles = await getArticles();
  return (
    <div>
      <h1 className="font-serif text-4xl">Blog manager</h1>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="space-y-3">
          {articles.map((article) => (
            <Card key={article.id} className="p-4">
              <p className="font-semibold">{article.title}</p>
              <p className="text-sm text-muted">
                {article.aiGenerated ? "AI-assisted" : "Editorial"} · {article.readingMinutes} min
              </p>
            </Card>
          ))}
        </div>
        <ManagerForm
          endpoint="/api/blog"
          submitLabel="Publish article"
          fields={[
            { name: "title", label: "Title" },
            { name: "excerpt", label: "Excerpt", textarea: true },
            { name: "body", label: "Body", textarea: true },
            { name: "tags", label: "Tags" },
          ]}
        />
      </div>
    </div>
  );
}
