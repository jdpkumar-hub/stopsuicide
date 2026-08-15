import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticle } from "@/components/content/ArticleView";
import { articleSchema, JsonLd } from "@/lib/schema-org";
import { createMetadata } from "@/lib/seo";
import { pickLocalized } from "@/lib/i18n/locales";
import { getRequestLocale } from "@/lib/i18n/request-locale";
import { getArticle, getArticles } from "@/lib/data/queries";

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return createMetadata({ title: "Article", description: "Article not found." });
  const locale = await getRequestLocale();
  return createMetadata({
    title: pickLocalized(locale, article.seoTitle ?? article.titles, article.title),
    description: pickLocalized(locale, article.seoDescription ?? article.excerpts, article.excerpt),
    path: `/blog/${article.slug}`,
    image: article.thumbnailUrl,
    type: "article",
    localeAware: true,
    locale,
  });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  return (
    <>
      <JsonLd data={articleSchema(article)} />
      <BlogArticle article={article} />
    </>
  );
}
