"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge, Card } from "@/components/ui/primitives";
import { useI18n } from "@/lib/i18n/context";
import { useLocalized } from "@/lib/i18n/use-localized";
import { formatDuration } from "@/lib/utils";
import type { Category, Video } from "@/types";

export function VideoCard({
  video,
  category,
  featured = false,
  priority = false,
}: {
  video: Video;
  category?: Category;
  featured?: boolean;
  priority?: boolean;
}) {
  const loc = useLocalized();
  const copy = loc.video(video);
  return (
    <Link href={`/videos/${video.slug}`} className="group block h-full">
      <Card className="glass-premium h-full transition duration-500 group-hover:-translate-y-1.5">
        <div className={`relative overflow-hidden ${featured ? "aspect-[16/9] lg:aspect-[21/10]" : "aspect-video"}`}>
          <Image
            src={video.thumbnailUrl}
            alt={copy.title}
            fill
            priority={priority}
            className="object-cover transition duration-700 group-hover:scale-105"
            sizes={featured ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
          />
          <span className="absolute bottom-3 right-3 rounded-full bg-black/70 px-2 py-0.5 text-xs text-white">
            {formatDuration(video.durationSeconds)}
          </span>
        </div>
        <div className={`space-y-2 ${featured ? "p-6 sm:p-8" : "p-5"}`}>
          {category ? <Badge>{loc.category(category)}</Badge> : null}
          <h3 className={`font-serif leading-snug ${featured ? "text-2xl sm:text-3xl" : "text-xl"}`}>
            {copy.title}
          </h3>
          <p className="line-clamp-2 text-sm text-muted">{copy.description}</p>
        </div>
      </Card>
    </Link>
  );
}

export function VideoPlayer({ video }: { video: Video }) {
  const { t } = useI18n();
  const loc = useLocalized();
  const title = loc.video(video).title;

  if (video.source === "youtube" && video.youtubeId) {
    return (
      <div className="aspect-video overflow-hidden rounded-3xl bg-black">
        <iframe
          title={title}
          src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}`}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  if (video.source === "vimeo" && video.vimeoId) {
    return (
      <div className="aspect-video overflow-hidden rounded-3xl bg-black">
        <iframe
          title={title}
          src={`https://player.vimeo.com/video/${video.vimeoId}`}
          className="h-full w-full"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl bg-black">
      <video
        className="aspect-video w-full"
        controls
        poster={video.thumbnailUrl}
        preload="metadata"
        playsInline
      >
        <source src={video.mp4Url} type="video/mp4" />
        {t("video.unsupported")}
      </video>
    </div>
  );
}
