"use client";

import { useMemo, useState } from "react";
import { ArticleCard } from "@/components/content/Cards";
import type { Article, Category } from "@/types";

export function BlogExplorer({
  articles,
  categories,
}: {
  articles: Article[];
  categories: Category[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const filtered = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory = category === "all" || article.categoryId === category;
      const haystack = `${article.title} ${article.excerpt} ${article.tags.join(" ")}`.toLowerCase();
      return matchesCategory && haystack.includes(query.toLowerCase());
    });
  }, [articles, category, query]);

  return (
    <div>
      <div className="glass mb-8 grid gap-3 rounded-3xl p-4 md:grid-cols-[1fr_auto]">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search articles"
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
              onClick={() => setCategory(item.id)}
              className={`rounded-full px-4 py-2 text-sm ${
                category === item.id ? "bg-hope-blue text-white" : "border border-border"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
