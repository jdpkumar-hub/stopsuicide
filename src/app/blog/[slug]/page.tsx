import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge, Section } from "@/components/ui/primitives";
import { ShareButtons } from "@/components/video/VideoActions";
import { articleSchema, JsonLd } from "@/lib/schema-org";
import { createMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
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
  return createMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/blog/${article.slug}`,
    image: article.thumbnailUrl,
    type: "article",
  });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  return (
    <Section className="max-w-3xl pt-10">
      <JsonLd data={articleSchema(article)} />
      {article.aiGenerated ? <Badge>AI-assisted inspirational article</Badge> : null}
      <h1 className="mt-4 font-serif text-5xl">{article.title}</h1>
      <p className="mt-3 text-muted">
        {formatDate(article.publishedAt)} · {article.readingMinutes} min read
      </p>
      <div className="mt-6">
        <ShareButtons title={article.title} />
      </div>
      <article className="mt-10 space-y-5 text-lg leading-8">
        {article.body.split("\n\n").map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </article>
    </Section>
  );
}
