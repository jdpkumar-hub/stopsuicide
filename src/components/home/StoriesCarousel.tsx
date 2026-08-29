"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useId, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { useLocalized } from "@/lib/i18n/use-localized";
import type { Category, Story } from "@/types";

export function StoriesCarousel({
  stories,
  categories,
}: {
  stories: Story[];
  categories: Category[];
}) {
  const { t } = useI18n();
  const loc = useLocalized();
  const labelId = useId();
  const pointerX = useRef<number | null>(null);
  const [index, setIndex] = useState(0);
  const count = stories.length;

  const go = useCallback(
    (delta: number) => {
      if (count < 2) return;
      setIndex((current) => (current + delta + count) % count);
    },
    [count],
  );

  if (!count) return null;

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(-1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(1);
    }
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    pointerX.current = event.clientX;
  }

  function onPointerUp(event: PointerEvent<HTMLDivElement>) {
    if (pointerX.current == null) return;
    const dx = event.clientX - pointerX.current;
    pointerX.current = null;
    if (dx > 40) go(-1);
    else if (dx < -40) go(1);
  }

  return (
    <div
      className="stories-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-labelledby={labelId}
      onKeyDown={onKeyDown}
    >
      <p id={labelId} className="sr-only">
        {t("hero.carouselLabel")}
      </p>

      <div className="stories-carousel-frame">
        {count > 1 ? (
          <button
            type="button"
            className="carousel-nav carousel-nav-prev"
            onClick={() => go(-1)}
            aria-label={t("hero.prevStory")}
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
        ) : null}

        <div
          className="stories-stage"
          aria-live="polite"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => {
            pointerX.current = null;
          }}
        >
          {stories.map((story, storyIndex) => {
            const offset = (storyIndex - index + count) % count;
            const pos = offset <= 3 ? String(offset) : "behind";
            const copy = loc.story(story);
            const category = categories.find((item) => item.id === story.categoryId);
            const roleLabel = story.authorRole || loc.category(category);
            const personName = story.anonymous ? copy.title : story.authorName;
            return (
              <article
                key={story.id}
                className="story-profile-card"
                data-pos={pos}
                data-active={offset === 0}
                aria-hidden={offset !== 0}
                aria-label={`${personName}. ${copy.title}`}
              >
                <div className="story-profile-photo">
                  <Image
                    src={story.thumbnailUrl}
                    alt={`${personName} — ${copy.title}`}
                    fill
                    sizes="(max-width: 768px) 88vw, 320px"
                    className="object-cover"
                    priority={storyIndex === 0}
                  />
                </div>
                <div className="story-profile-body">
                  {roleLabel ? <p className="story-profile-role">{roleLabel}</p> : null}
                  <h3 className="story-profile-name">{personName}</h3>
                  <p className="story-profile-excerpt">{copy.excerpt}</p>
                  <Link
                    href={`/stories/${story.slug}`}
                    className="story-profile-link"
                    tabIndex={offset === 0 ? 0 : -1}
                  >
                    {t("hero.readStory")} →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {count > 1 ? (
          <button
            type="button"
            className="carousel-nav carousel-nav-next"
            onClick={() => go(1)}
            aria-label={t("hero.nextStory")}
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        ) : null}
      </div>

      {count > 1 ? (
        <div className="carousel-dots">
          {stories.map((story, storyIndex) => (
            <button
              key={story.id}
              type="button"
              className="carousel-dot"
              aria-current={storyIndex === index ? "true" : undefined}
              aria-label={`${t("hero.carouselLabel")} ${storyIndex + 1}`}
              onClick={() => setIndex(storyIndex)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
