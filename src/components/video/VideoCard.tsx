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
}: {
  video: Video;
  category?: Category;
}) {
  const loc = useLocalized();
  const copy = loc.video(video);
  return (
    <Link href={`/videos/${video.slug}`} className="group block">
      <Card className="h-full transition duration-300 group-hover:-translate-y-1">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={video.thumbnailUrl}
            alt={copy.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <span className="absolute bottom-3 right-3 rounded-full bg-black/70 px-2 py-0.5 text-xs text-white">
            {formatDuration(video.durationSeconds)}
          </span>
        </div>
        <div className="space-y-2 p-5">
          {category ? <Badge>{loc.category(category)}</Badge> : null}
          <h3 className="font-serif text-xl leading-snug">{copy.title}</h3>
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
