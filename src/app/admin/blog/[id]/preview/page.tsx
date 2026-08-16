import { notFound } from "next/navigation";
import Link from "next/link";
import { formatKolkataDateTime } from "@/lib/cms/time";
import { getAllArticlesAdmin } from "@/lib/data/queries";

export default async function BlogPreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const articles = await getAllArticlesAdmin();
  const article = articles.find((item) => item.id === id);
  if (!article) notFound();

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted">
          Preview · {article.status ?? "published"}
          {article.scheduledAt ? ` · scheduled ${formatKolkataDateTime(article.scheduledAt)}` : ""}
        </p>
        <Link href={`/admin/blog/${article.id}`} className="text-sm text-hope-blue">
          Back to editor
        </Link>
      </div>
      <article className="glass rounded-3xl p-6 sm:p-10">
        <h1 className="font-serif text-4xl">{article.title}</h1>
        <p className="mt-4 text-lg text-muted">{article.excerpt}</p>
        <div className="mt-8 space-y-4" dangerouslySetInnerHTML={{ __html: article.body }} />
      </article>
    </div>
  );
}
