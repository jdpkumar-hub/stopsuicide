"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/primitives";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { LocaleFields } from "@/components/admin/LocaleFields";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { useToast } from "@/components/admin/Toast";
import { STORY_STATUSES } from "@/lib/cms/fields";
import { useLocalized } from "@/lib/i18n/use-localized";
import type { Category, Story, StoryModeration } from "@/types";

export function StoryForm({
  story,
  categories,
  canDelete = true,
}: {
  story?: Story;
  categories: Category[];
  canDelete?: boolean;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const loc = useLocalized();
  const [body, setBody] = useState(story?.body ?? "");
  const [status, setStatus] = useState<StoryModeration>(story?.status ?? "pending");
  const [saving, setSaving] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const storyCategories = useMemo(
    () => categories.filter((category) => category.type === "story" || category.type === "video"),
    [categories],
  );

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    const data = new FormData(event.currentTarget);
    data.set("body", body);
    data.set("status", status);
    const endpoint = story ? `/api/stories/${story.id}` : "/api/stories";
    const response = await fetch(endpoint, {
      method: story ? "PUT" : "POST",
      body: data,
    });
    const json = await response.json();
    setSaving(false);
    if (!response.ok) {
      toast(json.error || "Could not save the story.", "error");
      return;
    }
    toast("Story saved.");
    router.push("/admin/stories");
    router.refresh();
  }

  async function onDelete() {
    if (!story) return;
    const response = await fetch(`/api/stories/${story.id}`, { method: "DELETE" });
    setConfirmOpen(false);
    if (!response.ok) {
      toast("Could not delete this story.", "error");
      return;
    }
    toast("Story deleted.");
    router.push("/admin/stories");
    router.refresh();
  }

  return (
    <>
      <form onSubmit={onSubmit} className="glass space-y-4 rounded-3xl p-6">
        <label className="block text-sm font-medium">
          Title (English)
          <input
            name="title"
            required
            defaultValue={story?.title}
            className="mt-1 w-full rounded-2xl border border-border bg-transparent px-4 py-3"
          />
        </label>
        <label className="block text-sm font-medium">
          Excerpt (English)
          <textarea
            name="excerpt"
            required
            defaultValue={story?.excerpt}
            rows={3}
            className="mt-1 w-full rounded-2xl border border-border bg-transparent px-4 py-3"
          />
        </label>
        <div>
          <p className="mb-2 text-sm font-medium">Story</p>
          <RichTextEditor
            value={body}
            onChange={setBody}
            placeholder="Share recovery with dignity. Do not include graphic methods or sensational detail."
          />
        </div>
        <LocaleFields prefix="title" label="Titles" values={story?.titles} />
        <LocaleFields prefix="excerpt" label="Excerpts" values={story?.excerpts} textarea rows={3} />
        <LocaleFields prefix="body" label="Story translations" values={story?.bodies} textarea rows={6} />
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium">
            Display name
            <input
              name="authorName"
              defaultValue={story?.authorName}
              className="mt-1 w-full rounded-2xl border border-border bg-transparent px-4 py-3"
            />
          </label>
          <label className="block text-sm font-medium">
            Role / context
            <input
              name="authorRole"
              defaultValue={story?.authorRole}
              className="mt-1 w-full rounded-2xl border border-border bg-transparent px-4 py-3"
            />
          </label>
        </div>
        <label className="block text-sm font-medium">
          Category
          <select
            name="categoryId"
            defaultValue={story?.categoryId}
            className="mt-1 w-full rounded-2xl border border-border bg-transparent px-4 py-3"
          >
            {(storyCategories.length ? storyCategories : categories).map((category) => (
              <option key={category.id} value={category.id}>
                {loc.category(category)}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-medium">
          Slug
          <input
            name="slug"
            defaultValue={story?.slug}
            className="mt-1 w-full rounded-2xl border border-border bg-transparent px-4 py-3"
          />
        </label>
        <label className="block text-sm font-medium">
          Image URL
          <input
            name="thumbnailUrl"
            defaultValue={story?.thumbnailUrl}
            className="mt-1 w-full rounded-2xl border border-border bg-transparent px-4 py-3"
          />
        </label>
        <label className="block text-sm font-medium">
          Image upload
          <input type="file" name="image" accept="image/*" className="mt-1 w-full text-sm" />
        </label>
        <label className="block text-sm font-medium">
          Video URL
          <input
            name="videoUrl"
            defaultValue={story?.videoUrl}
            className="mt-1 w-full rounded-2xl border border-border bg-transparent px-4 py-3"
          />
        </label>
        <label className="block text-sm font-medium">
          Video upload
          <input type="file" name="video" accept="video/mp4,video/*" className="mt-1 w-full text-sm" />
        </label>
        <label className="block text-sm font-medium">
          Moderation
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value as StoryModeration)}
            className="mt-1 w-full rounded-2xl border border-border bg-transparent px-4 py-3"
          >
            {STORY_STATUSES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="anonymous" defaultChecked={story?.anonymous} className="h-4 w-4" />
          Publish anonymously
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="featured" defaultChecked={story?.featured} className="h-4 w-4" />
          Featured
        </label>
        <div className="flex flex-wrap gap-3">
          <Button type="submit" disabled={saving}>
            {saving ? "Saving…" : story ? "Save story" : "Create story"}
          </Button>
          {story && canDelete ? (
            <Button type="button" variant="outline" onClick={() => setConfirmOpen(true)}>
              Delete
            </Button>
          ) : null}
        </div>
      </form>
      <ConfirmDialog
        open={confirmOpen}
        title="Delete story"
        message="This removes the survivor story from the CMS and the public site."
        confirmLabel="Delete"
        onClose={() => setConfirmOpen(false)}
        onConfirm={onDelete}
      />
    </>
  );
}
