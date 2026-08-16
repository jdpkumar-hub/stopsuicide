"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import type { Story } from "@/types";

export function StoryManager({ stories }: { stories: Story[] }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");

  const rows = useMemo(() => {
    return stories.filter((story) => {
      const haystack = `${story.title} ${story.authorName}`.toLowerCase();
      return (
        (!query || haystack.includes(query.toLowerCase())) &&
        (status === "all" || (story.status ?? "approved") === status)
      );
    });
  }, [stories, query, status]);

  return (
    <DataTable
      rows={rows}
      searchValue={query}
      onSearch={setQuery}
      searchPlaceholder="Search stories…"
      filters={
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="rounded-2xl border border-border bg-transparent px-3 py-2.5 text-sm"
        >
          <option value="all">All moderation</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      }
      columns={[
        { key: "title", header: "Title", render: (row) => <span className="font-medium">{row.title}</span> },
        {
          key: "author",
          header: "Author",
          render: (row) => (row.anonymous ? "Anonymous" : row.authorName || "—"),
        },
        { key: "status", header: "Moderation", render: (row) => <StatusBadge status={row.status ?? "approved"} /> },
        { key: "featured", header: "Featured", render: (row) => (row.featured ? "Yes" : "—") },
        {
          key: "actions",
          header: "",
          render: (row) => (
            <Link href={`/admin/stories/${row.id}`} className="text-hope-blue">
              Review
            </Link>
          ),
        },
      ]}
    />
  );
}
