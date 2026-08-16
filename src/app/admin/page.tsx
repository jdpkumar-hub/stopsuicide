import Link from "next/link";
import { Card } from "@/components/ui/primitives";
import { analyticsSnapshot } from "@/lib/data/seed";
import {
  getAllArticlesAdmin,
  getAllQuotesAdmin,
  getAllStoriesAdmin,
  getAllVideosAdmin,
} from "@/lib/data/queries";

export default async function AdminHomePage() {
  const [videos, stories, articles, quotes] = await Promise.all([
    getAllVideosAdmin(),
    getAllStoriesAdmin(),
    getAllArticlesAdmin(),
    getAllQuotesAdmin(),
  ]);

  const drafts =
    videos.filter((item) => item.status === "draft").length +
    articles.filter((item) => (item.status ?? "published") === "draft").length;
  const pendingStories = stories.filter((item) => (item.status ?? "approved") === "pending").length;

  const stats = [
    { label: "Videos", value: videos.length, href: "/admin/videos" },
    { label: "Blogs", value: articles.length, href: "/admin/blog" },
    { label: "Quotes", value: quotes.length, href: "/admin/quotes" },
    { label: "Survivor stories", value: stories.length, href: "/admin/stories" },
    { label: "Drafts", value: drafts + pendingStories, href: "/admin/blog" },
    { label: "Visitors", value: analyticsSnapshot.visitors.toLocaleString("en-IN"), href: "/admin/analytics" },
  ];

  return (
    <div>
      <h1 className="font-serif text-4xl">Dashboard</h1>
      <p className="mt-2 text-muted">
        Manage hopeful content with care. Avoid graphic material. Keep Get Help visible on the public site.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-5">
            <p className="text-sm text-muted">{stat.label}</p>
            <p className="mt-2 font-serif text-4xl">{stat.value}</p>
            <Link href={stat.href} className="mt-3 inline-block text-sm text-hope-blue">
              Open
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
