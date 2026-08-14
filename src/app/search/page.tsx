import { ArticleCard, StoryCard } from "@/components/content/Cards";
import { Section } from "@/components/ui/primitives";
import { VideoCard } from "@/components/video/VideoCard";
import { searchAll } from "@/lib/data/queries";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Search",
  description: "Search inspirational videos, recovery stories, and mental wellness articles.",
  path: "/search",
});

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const results = await searchAll(q);

  return (
    <Section className="pt-10">
      <h1 className="font-serif text-5xl">Search</h1>
      <form className="mt-6">
        <label htmlFor="q" className="sr-only">
          Search
        </label>
        <input
          id="q"
          name="q"
          defaultValue={q}
          placeholder="Search hope, stories, videos, articles…"
          className="h-14 w-full rounded-full border border-border bg-white/70 px-6 outline-none focus:ring-2 focus:ring-hope-blue dark:bg-white/5"
        />
      </form>

      {q ? (
        <p className="mt-6 text-sm text-muted">
          Results for “{q}”
        </p>
      ) : (
        <p className="mt-6 text-sm text-muted">Try “hope”, “family”, or “breathing”.</p>
      )}

      <div className="mt-10 space-y-12">
        <section>
          <h2 className="font-serif text-3xl">Videos</h2>
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </section>
        <section>
          <h2 className="font-serif text-3xl">Stories</h2>
          <div className="mt-4 grid gap-6 md:grid-cols-2">
            {results.stories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        </section>
        <section>
          <h2 className="font-serif text-3xl">Articles</h2>
          <div className="mt-4 grid gap-6 md:grid-cols-3">
            {results.articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      </div>
    </Section>
  );
}
