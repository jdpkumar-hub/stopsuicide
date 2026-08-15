"use client";

import { useMemo, useState } from "react";
import { ArticleCard } from "@/components/content/Cards";
import { useI18n } from "@/lib/i18n/context";
import { expandSearchQuery } from "@/lib/i18n/content";
import { unicodeNormalize } from "@/lib/i18n/locales";
import { useLocalized } from "@/lib/i18n/use-localized";
import type { Article, Category } from "@/types";

export function BlogExplorer({
  articles,
  categories,
}: {
  articles: Article[];
  categories: Category[];
}) {
  const { t, locale } = useI18n();
  const loc = useLocalized();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const filtered = useMemo(() => {
    const terms = expandSearchQuery(query);
    return articles.filter((article) => {
      const matchesCategory = category === "all" || article.categoryId === category;
      const copy = loc.article(article);
      const haystack = unicodeNormalize(
        `${copy.title} ${copy.excerpt} ${copy.body} ${article.tags.join(" ")} ${article.searchTerms?.join(" ") ?? ""} ${Object.values(article.titles ?? {}).join(" ")}`,
      );
      return matchesCategory && (!query.trim() || terms.some((term) => haystack.includes(term)));
    });
  }, [articles, category, query, loc]);

  return (
    <div>
      <div className="glass mb-8 grid gap-3 rounded-3xl p-4 md:grid-cols-[1fr_auto]">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t("blog.search")}
          lang={locale}
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
            {t("common.all")}
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
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
