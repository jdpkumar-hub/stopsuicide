"use client";

import { StoryCard } from "@/components/content/Cards";
import { useI18n } from "@/lib/i18n/context";
import { useLocalized } from "@/lib/i18n/use-localized";
import { useMemo, useState } from "react";
import type { Category, Story } from "@/types";

export function StoryExplorer({
  stories,
  categories,
}: {
  stories: Story[];
  categories: Category[];
}) {
  const { t } = useI18n();
  const loc = useLocalized();
  const [category, setCategory] = useState("all");
  const filtered = useMemo(
    () =>
      stories.filter(
        (story) => category === "all" || story.categoryId === category,
      ),
    [stories, category],
  );

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setCategory("all")}
          className={`rounded-full px-4 py-2 text-sm ${
            category === "all" ? "bg-hope-blue text-white" : "border border-border"
          }`}
        >
          {t("stories.all")}
        </button>
        {categories.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setCategory(item.id)}
            className={`rounded-full px-4 py-2 text-sm ${
              category === item.id ? "bg-hope-blue text-white" : "border border-border"
            }`}
          >
            {loc.category(item)}
          </button>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>
    </div>
  );
}
