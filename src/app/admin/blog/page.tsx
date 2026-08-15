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
            { name: "title", label: "Title (English)" },
            { name: "titleTe", label: "Title (Telugu)", required: false, lang: "te" },
            { name: "excerpt", label: "Excerpt (English)", textarea: true },
            { name: "excerptTe", label: "Excerpt (Telugu)", textarea: true, required: false, lang: "te" },
            { name: "body", label: "Body (English)", textarea: true },
            { name: "bodyTe", label: "Body (Telugu)", textarea: true, required: false, lang: "te" },
            { name: "tags", label: "Tags" },
            { name: "slug", label: "Slug", required: false },
            { name: "thumbnailUrl", label: "Featured image URL", required: false },
            { name: "seoTitle", label: "SEO title (Telugu)", required: false, lang: "te" },
            { name: "seoDescription", label: "SEO description (Telugu)", textarea: true, required: false, lang: "te" },
          ]}
        />
      </div>
    </div>
  );
}
