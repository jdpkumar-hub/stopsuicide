"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { DataTable } from "@/components/admin/DataTable";
import type { Quote } from "@/types";

export function QuoteManager({ quotes }: { quotes: Quote[] }) {
  const [query, setQuery] = useState("");
  const [mood, setMood] = useState("all");

  const rows = useMemo(() => {
    return quotes.filter((quote) => {
      const haystack = `${quote.text} ${quote.author}`.toLowerCase();
      return (
        (!query || haystack.includes(query.toLowerCase())) &&
        (mood === "all" || (quote.mood ?? "hope") === mood)
      );
    });
  }, [quotes, query, mood]);

  return (
    <DataTable
      rows={rows}
      searchValue={query}
      onSearch={setQuery}
      searchPlaceholder="Search quotes…"
      filters={
        <select
          value={mood}
          onChange={(event) => setMood(event.target.value)}
          className="rounded-2xl border border-border bg-transparent px-3 py-2.5 text-sm"
        >
          <option value="all">All moods</option>
          <option value="hope">Hope</option>
          <option value="calm">Calm</option>
          <option value="courage">Courage</option>
          <option value="gratitude">Gratitude</option>
          <option value="belonging">Belonging</option>
        </select>
      }
      columns={[
        {
          key: "text",
          header: "Quote",
          render: (row) => <span className="line-clamp-2 font-serif text-base">“{row.text}”</span>,
        },
        { key: "author", header: "Author", render: (row) => row.author },
        { key: "mood", header: "Mood", render: (row) => row.mood || "hope" },
        { key: "featured", header: "Homepage", render: (row) => (row.featured ? "Featured" : row.scheduledFor || "—") },
        { key: "active", header: "Active", render: (row) => (row.active ? "Yes" : "No") },
        {
          key: "actions",
          header: "",
          render: (row) => (
            <Link href={`/admin/quotes/${row.id}`} className="text-hope-blue">
              Edit
            </Link>
          ),
        },
      ]}
    />
  );
}
