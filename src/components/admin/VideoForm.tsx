"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/primitives";
import type { Category, Video } from "@/types";

export function VideoForm({
  categories,
  video,
}: {
  categories: Category[];
  video?: Video;
}) {
  const router = useRouter();
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    const form = event.currentTarget;
    const data = new FormData(form);
    const endpoint = video ? `/api/videos/${video.id}` : "/api/videos";
    const response = await fetch(endpoint, {
      method: video ? "PUT" : "POST",
      body: data,
    });
    const json = await response.json();
    setSaving(false);
    if (!response.ok) {
      setStatus(json.error || "Could not save video.");
      return;
    }
    setStatus("Saved.");
    router.push("/admin/videos");
    router.refresh();
  }

  async function onDelete() {
    if (!video) return;
    if (!confirm("Delete this video?")) return;
    await fetch(`/api/videos/${video.id}`, { method: "DELETE" });
    router.push("/admin/videos");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="glass space-y-4 rounded-3xl p-6">
      <Field name="title" label="Title" defaultValue={video?.title} required />
      <label className="block text-sm font-medium">
        Description
        <textarea
          name="description"
          required
          defaultValue={video?.description}
          rows={5}
          className="mt-1 w-full rounded-2xl border border-border bg-transparent px-4 py-3"
        />
      </label>
      <Field name="tags" label="Tags (comma separated)" defaultValue={video?.tags.join(", ")} />
      <label className="block text-sm font-medium">
        Category
        <select
          name="categoryId"
          defaultValue={video?.categoryId}
          className="mt-1 w-full rounded-2xl border border-border bg-transparent px-4 py-3"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="featured"
          defaultChecked={video?.featured}
          className="h-4 w-4"
        />
        Featured
      </label>
      <Field name="youtubeLink" label="YouTube link" defaultValue={video?.youtubeId ? `https://www.youtube.com/watch?v=${video.youtubeId}` : ""} />
      <Field name="vimeoLink" label="Vimeo link" defaultValue={video?.vimeoId ? `https://vimeo.com/${video.vimeoId}` : ""} />
      <label className="block text-sm font-medium">
        Thumbnail
        <input type="file" name="thumbnail" accept="image/*" className="mt-1 w-full text-sm" />
      </label>
      <label className="block text-sm font-medium">
        MP4 video
        <input type="file" name="videoFile" accept="video/mp4,video/*" className="mt-1 w-full text-sm" />
      </label>
      <p className="text-xs text-muted">
        Files are stored in Cloudinary. Metadata is saved to PostgreSQL via Supabase.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={saving}>
          {saving ? "Saving…" : video ? "Update video" : "Upload video"}
        </Button>
        {video ? (
          <Button type="button" variant="outline" onClick={onDelete}>
            Delete
          </Button>
        ) : null}
      </div>
      {status ? <p className="text-sm text-muted">{status}</p> : null}
    </form>
  );
}

function Field({
  name,
  label,
  defaultValue,
  required,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <input
        name={name}
        defaultValue={defaultValue}
        required={required}
        className="mt-1 w-full rounded-2xl border border-border bg-transparent px-4 py-3"
      />
    </label>
  );
}
