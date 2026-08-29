"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/primitives";
import { useI18n } from "@/lib/i18n/context";
import { useLocalized } from "@/lib/i18n/use-localized";
import type { FeaturedHeroStory } from "@/lib/data/featured-stories";

const AUTO_MS = 6000;
const ease = [0.22, 1, 0.36, 1] as const;

export function StoriesCarousel({ stories }: { stories: FeaturedHeroStory[] }) {
  const { t } = useI18n();
  const loc = useLocalized();
  const reduce = useReducedMotion();
  const labelId = useId();
  const pointerX = useRef<number | null>(null);
  const interacted = useRef(false);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = stories.length;
  const story = stories[index];

  const go = useCallback(
    (delta: number, fromUser = false) => {
      if (count < 2) return;
      if (fromUser) {
        interacted.current = true;
        setPaused(true);
      }
      setIndex((current) => (current + delta + count) % count);
    },
    [count],
  );

  const goTo = useCallback((next: number) => {
    interacted.current = true;
    setPaused(true);
    setIndex(next);
  }, []);

  useEffect(() => {
    if (paused || reduce || count < 2 || interacted.current) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [paused, reduce, count]);

  if (!story) return null;

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(-1, true);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(1, true);
    }
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    pointerX.current = event.clientX;
  }

  function onPointerUp(event: PointerEvent<HTMLDivElement>) {
    if (pointerX.current == null) return;
    const dx = event.clientX - pointerX.current;
    pointerX.current = null;
    if (dx > 48) go(-1, true);
    else if (dx < -48) go(1, true);
  }

  const title = loc.text(story.titles, story.title);
  const intro = loc.text(story.shortDescriptions, story.shortDescription);
  const category = loc.text(story.categories, story.category);

  return (
    <div
      className="featured-hero"
      role="region"
      aria-roledescription="carousel"
      aria-labelledby={labelId}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        if (!interacted.current) setPaused(false);
      }}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node) && !interacted.current) {
          setPaused(false);
        }
      }}
    >
      <p id={labelId} className="sr-only">
        {t("hero.carouselLabel")}
      </p>

      <div className="featured-hero-copy">
        <p className="featured-hero-kicker">{t("hero.featuredLabel")}</p>
        <motion.div
          key={story.id}
          initial={reduce ? false : { opacity: 0.35 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, ease }}
          aria-live="polite"
        >
          {category ? <p className="featured-hero-tag">{category}</p> : null}
          <h1 className="featured-hero-title">{title}</h1>
          <p className="featured-hero-intro">{intro}</p>
          <div className="featured-hero-cta">
            <Button href={story.href} variant="green" className="featured-hero-button">
              {t("hero.readStory")}
            </Button>
          </div>
        </motion.div>
      </div>

      <div
        className="featured-hero-media"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          pointerX.current = null;
        }}
      >
        <div className="featured-hero-photo" aria-hidden="true">
          {stories.map((item, itemIndex) => {
            const active = itemIndex === index;
            return (
              <div key={item.id} className="featured-hero-slide" data-active={active}>
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(max-width: 767px) 92vw, (max-width: 1280px) 46vw, 800px"
                  priority={itemIndex === 0}
                  className="object-cover"
                  draggable={false}
                />
              </div>
            );
          })}
        </div>
      </div>

      {count > 1 ? (
        <div className="featured-hero-controls">
          <button
            type="button"
            className="featured-nav"
            onClick={() => go(-1, true)}
            aria-label={t("hero.prevStory")}
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <div className="featured-dots">
            {stories.map((item, itemIndex) => (
              <button
                key={item.id}
                type="button"
                className="featured-dot"
                aria-current={itemIndex === index ? "true" : undefined}
                aria-label={`${t("hero.carouselLabel")} ${itemIndex + 1}`}
                onClick={() => goTo(itemIndex)}
              />
            ))}
          </div>
          <button
            type="button"
            className="featured-nav"
            onClick={() => go(1, true)}
            aria-label={t("hero.nextStory")}
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      ) : null}
    </div>
  );
}
