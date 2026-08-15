import { BlogExplorer } from "@/components/blog/BlogExplorer";
import { PageHeader } from "@/components/i18n/PageHeader";
import { Section } from "@/components/ui/primitives";
import { getArticles, getCategories } from "@/lib/data/queries";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Mental wellness blog",
  description:
    "Articles on mental wellness, coping, family support, and AI-assisted inspirational writing.",
  path: "/blog",
  localeAware: true,
});

export default async function BlogPage() {
  const [articles, categories] = await Promise.all([getArticles(), getCategories()]);
  const blogCategories = categories.filter((item) =>
    articles.some((article) => article.categoryId === item.id),
  );

  return (
    <Section className="pt-10">
      <PageHeader titleKey="blog.title" subKey="blog.sub" />
      <div className="mt-10">
        <BlogExplorer articles={articles} categories={blogCategories} />
      </div>
    </Section>
  );
}
