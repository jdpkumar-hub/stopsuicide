import Link from "next/link";
import { Card } from "@/components/ui/primitives";
import { analyticsSnapshot } from "@/lib/data/seed";
import { getAllVideosAdmin, getArticles, getQuotes, getStories } from "@/lib/data/queries";

export default async function AdminHomePage() {
  const [videos, stories, articles, quotes] = await Promise.all([
    getAllVideosAdmin(),
    getStories(),
    getArticles(),
    getQuotes(),
  ]);

  const stats = [
    { label: "Videos", value: videos.length, href: "/admin/videos" },
    { label: "Stories", value: stories.length, href: "/stories" },
    { label: "Articles", value: articles.length, href: "/admin/blog" },
    { label: "Quotes", value: quotes.length, href: "/admin/quotes" },
    { label: "Visitors", value: analyticsSnapshot.visitors.toLocaleString("en-IN") },
    { label: "Help clicks", value: analyticsSnapshot.helpClicks.toLocaleString("en-IN") },
  ];

  return (
    <div>
      <h1 className="font-serif text-4xl">Dashboard</h1>
      <p className="mt-2 text-muted">
        Manage hopeful content with care. Avoid graphic material. Keep Get Help visible.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-5">
            <p className="text-sm text-muted">{stat.label}</p>
            <p className="mt-2 font-serif text-4xl">{stat.value}</p>
            {"href" in stat && stat.href ? (
              <Link href={stat.href} className="mt-3 inline-block text-sm text-hope-blue">
                Open
              </Link>
            ) : null}
          </Card>
        ))}
      </div>
    </div>
  );
}
