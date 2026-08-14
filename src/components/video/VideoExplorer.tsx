"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { VideoCard } from "@/components/video/VideoCard";
import { useI18n } from "@/lib/i18n/context";
import type { Category, Video } from "@/types";

export function VideoExplorer({
  videos,
  categories,
}: {
  videos: Video[];
  categories: Category[];
}) {
  const { t } = useI18n();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [visible, setVisible] = useState(6);

  const filtered = useMemo(() => {
    return videos.filter((video) => {
      const matchesCategory = category === "all" || video.categoryId === category;
      const haystack = `${video.title} ${video.description} ${video.tags.join(" ")}`.toLowerCase();
      return matchesCategory && haystack.includes(query.toLowerCase());
    });
  }, [videos, category, query]);

  const shown = filtered.slice(0, visible);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) {
        setVisible((value) => value + 6);
      }
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [filtered.length, query, category]);

  return (
    <div>
      <div className="glass mb-8 grid gap-3 rounded-3xl p-4 md:grid-cols-[1fr_auto]">
        <label className="sr-only" htmlFor="video-search">
          {t("common.search")}
        </label>
        <input
          id="video-search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setVisible(6);
          }}
          placeholder={t("common.search")}
          className="h-12 rounded-2xl border border-border bg-transparent px-4 outline-none focus:ring-2 focus:ring-hope-blue"
        />
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCategory("all")}
            className={`rounded-full px-4 py-2 text-sm ${
              category === "all" ? "bg-hope-blue text-white" : "border border-border"
            }`}
          >
            All
          </button>
          {categories.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setCategory(item.id);
                setVisible(6);
              }}
              className={`rounded-full px-4 py-2 text-sm ${
                category === item.id ? "bg-hope-blue text-white" : "border border-border"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            category={categories.find((item) => item.id === video.categoryId)}
          />
        ))}
      </div>

      {visible < filtered.length ? (
        <div ref={sentinelRef} className="mt-10 text-center text-sm text-muted">
          Loading more videos…
        </div>
      ) : null}

      {!filtered.length ? (
        <p className="py-16 text-center text-muted">No videos match that search yet.</p>
      ) : null}
    </div>
  );
}
