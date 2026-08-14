"use client";

import { useMemo, useState } from "react";
import { StoryCard } from "@/components/content/Cards";
import type { Category, Story } from "@/types";

export function StoryExplorer({
  stories,
  categories,
}: {
  stories: Story[];
  categories: Category[];
}) {
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
          All journeys
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
            {item.name}
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
