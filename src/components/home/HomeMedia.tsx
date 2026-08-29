"use client";

import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/content/Cards";
import { useI18n } from "@/lib/i18n/context";
import { useLocalized } from "@/lib/i18n/use-localized";
import type { Story, Video } from "@/types";

export function HomeVideoCard({ video, delay = 0 }: { video: Video; delay?: number }) {
  const { t } = useI18n();
  const loc = useLocalized();
  const copy = loc.video(video);

  return (
    <FadeIn delay={delay} className="h-full">
      <article className="home-media-card h-full">
        <Link href={`/videos/${video.slug}`} className="group flex h-full flex-col">
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={video.thumbnailUrl}
              alt={copy.title}
              fill
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <h3 className="font-serif text-xl leading-snug">{copy.title}</h3>
            <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted">{copy.description}</p>
            <span className="home-media-action mt-4">{t("home.watchNow")}</span>
          </div>
        </Link>
      </article>
    </FadeIn>
  );
}

export function HomeStoryCard({ story, delay = 0 }: { story: Story; delay?: number }) {
  const { t } = useI18n();
  const loc = useLocalized();
  const copy = loc.story(story);
  const personName = story.anonymous ? copy.title : story.authorName;

  return (
    <FadeIn delay={delay} className="h-full">
      <article className="home-media-card h-full">
        <Link href={`/stories/${story.slug}`} className="group flex h-full flex-col">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={story.thumbnailUrl}
              alt={`${personName} — ${copy.title}`}
              fill
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <h3 className="font-serif text-xl leading-snug">{copy.title}</h3>
            <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted">{copy.excerpt}</p>
            <span className="home-media-link mt-4">
              {t("home.readStory")} →
            </span>
          </div>
        </Link>
      </article>
    </FadeIn>
  );
}
