"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import type { Video } from "@/types";

export function VideoManager({ videos }: { videos: Video[] }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [source, setSource] = useState("all");

  const rows = useMemo(() => {
    return videos.filter((video) => {
      const haystack = `${video.title} ${video.tags.join(" ")} ${video.source}`.toLowerCase();
      const matchesQuery = !query || haystack.includes(query.toLowerCase());
      const matchesStatus = status === "all" || video.status === status;
      const matchesSource = source === "all" || video.source === source;
      return matchesQuery && matchesStatus && matchesSource;
    });
  }, [videos, query, status, source]);

  return (
    <DataTable
      rows={rows}
      searchValue={query}
      onSearch={setQuery}
      searchPlaceholder="Search videos…"
      filters={
        <div className="flex flex-wrap gap-2">
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
          <select
            value={source}
            onChange={(event) => setSource(event.target.value)}
            className="rounded-2xl border border-border bg-transparent px-3 py-2.5 text-sm"
          >
            <option value="all">All sources</option>
            <option value="youtube">YouTube</option>
            <option value="cloudinary">Cloudinary</option>
            <option value="mp4">MP4</option>
            <option value="vimeo">Vimeo</option>
          </select>
        </div>
      }
      columns={[
        { key: "title", header: "Title", render: (row) => <span className="font-medium">{row.title}</span> },
        { key: "source", header: "Source", render: (row) => row.source },
        { key: "status", header: "Status", render: (row) => <StatusBadge status={row.status} /> },
        { key: "featured", header: "Featured", render: (row) => (row.featured ? "Yes" : "—") },
        {
          key: "languages",
          header: "Languages",
          render: (row) => 1 + Object.values(row.titles ?? {}).filter(Boolean).length,
        },
        {
          key: "actions",
          header: "",
          render: (row) => (
            <Link href={`/admin/videos/${row.id}`} className="text-hope-blue">
              Edit
            </Link>
          ),
        },
      ]}
    />
  );
}
