import { BlogExplorer } from "@/components/blog/BlogExplorer";
import { Section } from "@/components/ui/primitives";
import { getArticles, getCategories } from "@/lib/data/queries";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Mental wellness blog",
  description:
    "Articles on mental wellness, coping, family support, and AI-assisted inspirational writing.",
  path: "/blog",
});

export default async function BlogPage() {
  const [articles, categories] = await Promise.all([getArticles(), getCategories()]);
  const blogCategories = categories.filter((item) =>
    articles.some((article) => article.categoryId === item.id),
  );

  return (
    <Section className="pt-10">
      <h1 className="font-serif text-5xl">Blog</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Mental wellness articles and carefully reviewed AI-assisted inspirational pieces. Search by topic or mood.
      </p>
      <div className="mt-10">
        <BlogExplorer articles={articles} categories={blogCategories} />
      </div>
    </Section>
  );
}
