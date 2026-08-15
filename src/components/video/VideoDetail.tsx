"use client";

import { ListenButton } from "@/components/a11y/ListenButton";
import { Section } from "@/components/ui/primitives";
import { VideoActions } from "@/components/video/VideoActions";
import { VideoCard, VideoPlayer } from "@/components/video/VideoCard";
import { useI18n } from "@/lib/i18n/context";
import { useLocalized } from "@/lib/i18n/use-localized";
import type { Category, Video } from "@/types";

export function VideoDetail({
  video,
  related,
  categories,
}: {
  video: Video;
  related: Video[];
  categories: Category[];
}) {
  const { t } = useI18n();
  const loc = useLocalized();
  const copy = loc.video(video);
  const category = categories.find((item) => item.id === video.categoryId);

  return (
    <Section className="pt-10">
      <VideoPlayer video={video} />
      <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-hope-blue">
            {loc.category(category)}
          </p>
          <h1 className="mt-2 font-serif text-4xl sm:text-5xl">{copy.title}</h1>
          <p className="mt-4 whitespace-pre-line text-muted">{copy.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {copy.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-white/60 px-3 py-1 text-xs dark:bg-white/5">
                #{tag}
              </span>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <ListenButton text={`${copy.title}. ${copy.description}`} />
            <VideoActions video={video} />
          </div>
        </div>
        <aside>
          <h2 className="font-serif text-2xl">{t("videos.related")}</h2>
          <div className="mt-4 space-y-4">
            {related.map((item) => (
              <VideoCard key={item.id} video={item} />
            ))}
          </div>
        </aside>
      </div>
    </Section>
  );
}
