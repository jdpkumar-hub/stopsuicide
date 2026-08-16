"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import type { Article } from "@/types";

export function BlogManager({ articles }: { articles: Article[] }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");

  const rows = useMemo(() => {
    return articles.filter((article) => {
      const haystack = `${article.title} ${article.tags.join(" ")}`.toLowerCase();
      return (
        (!query || haystack.includes(query.toLowerCase())) &&
        (status === "all" || (article.status ?? "published") === status)
      );
    });
  }, [articles, query, status]);

  return (
    <DataTable
      rows={rows}
      searchValue={query}
      onSearch={setQuery}
      searchPlaceholder="Search articles…"
      filters={
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="rounded-2xl border border-border bg-transparent px-3 py-2.5 text-sm"
        >
          <option value="all">All statuses</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>
      }
      columns={[
        { key: "title", header: "Title", render: (row) => <span className="font-medium">{row.title}</span> },
        { key: "status", header: "Status", render: (row) => <StatusBadge status={row.status ?? "published"} /> },
        { key: "schedule", header: "Schedule", render: (row) => row.scheduledAt?.slice(0, 16) || "—" },
        { key: "minutes", header: "Read", render: (row) => `${row.readingMinutes} min` },
        {
          key: "actions",
          header: "",
          render: (row) => (
            <div className="flex gap-3">
              <Link href={`/admin/blog/${row.id}`} className="text-hope-blue">
                Edit
              </Link>
              <Link href={`/admin/blog/${row.id}/preview`} className="text-muted">
                Preview
              </Link>
            </div>
          ),
        },
      ]}
    />
  );
}
