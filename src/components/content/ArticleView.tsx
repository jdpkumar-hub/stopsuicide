"use client";

import { ListenButton } from "@/components/a11y/ListenButton";
import { ShareButtons } from "@/components/video/VideoActions";
import { Section } from "@/components/ui/primitives";
import { useI18n } from "@/lib/i18n/context";
import { useLocalized } from "@/lib/i18n/use-localized";
import { formatDate } from "@/lib/utils";
import type { Article, Story } from "@/types";

export function StoryArticle({ story }: { story: Story }) {
  const { t } = useI18n();
  const loc = useLocalized();
  const copy = loc.story(story);
  return (
    <Section className="max-w-3xl pt-10">
      <p className="text-sm text-muted">
        {story.authorName} · {formatDate(story.publishedAt)} · {story.readingMinutes} {t("common.min")}
      </p>
      <h1 className="mt-3 font-serif text-5xl">{copy.title}</h1>
      <p className="mt-4 text-lg text-muted">{copy.excerpt}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <ListenButton text={`${copy.title}. ${copy.body}`} />
        <ShareButtons title={copy.title} />
      </div>
      <article className="mt-10 space-y-5 text-lg leading-8">
        {copy.body.split("\n\n").map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </article>
    </Section>
  );
}

export function BlogArticle({ article }: { article: Article }) {
  const { t } = useI18n();
  const loc = useLocalized();
  const copy = loc.article(article);
  return (
    <Section className="max-w-3xl pt-10">
      {article.aiGenerated ? (
        <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-hope-blue dark:bg-blue-500/15">
          {t("blog.ai")}
        </span>
      ) : null}
      <h1 className="mt-4 font-serif text-5xl">{copy.title}</h1>
      <p className="mt-3 text-muted">
        {formatDate(article.publishedAt)} · {article.readingMinutes} {t("common.min")}
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <ListenButton text={`${copy.title}. ${copy.body}`} />
        <ShareButtons title={copy.title} />
      </div>
      <article className="mt-10 space-y-5 text-lg leading-8">
        {copy.body.split("\n\n").map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </article>
    </Section>
  );
}
