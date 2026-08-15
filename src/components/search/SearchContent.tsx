"use client";

import { ArticleCard, StoryCard } from "@/components/content/Cards";
import { Section } from "@/components/ui/primitives";
import { VideoCard } from "@/components/video/VideoCard";
import { useI18n } from "@/lib/i18n/context";
import type { Article, Story, Video } from "@/types";

export function SearchContent({
  q,
  results,
}: {
  q: string;
  results: { videos: Video[]; stories: Story[]; articles: Article[] };
}) {
  const { t, locale } = useI18n();
  return (
    <Section className="pt-10">
      <h1 className="font-serif text-5xl">{t("search.title")}</h1>
      <form className="mt-6">
        <label htmlFor="q" className="sr-only">
          {t("search.title")}
        </label>
        <input
          id="q"
          name="q"
          defaultValue={q}
          placeholder={t("search.placeholder")}
          lang={locale}
          className="h-14 w-full rounded-full border border-border bg-white/70 px-6 outline-none focus:ring-2 focus:ring-hope-blue dark:bg-white/5"
        />
      </form>
      {q ? (
        <p className="mt-6 text-sm text-muted">
          {t("search.results")} “{q}”
        </p>
      ) : (
        <p className="mt-6 text-sm text-muted">{t("search.hint")}</p>
      )}
      <div className="mt-10 space-y-12">
        <section>
          <h2 className="font-serif text-3xl">{t("search.videos")}</h2>
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </section>
        <section>
          <h2 className="font-serif text-3xl">{t("search.stories")}</h2>
          <div className="mt-4 grid gap-6 md:grid-cols-2">
            {results.stories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        </section>
        <section>
          <h2 className="font-serif text-3xl">{t("search.articles")}</h2>
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
