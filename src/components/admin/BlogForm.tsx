"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/primitives";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { LocaleFields } from "@/components/admin/LocaleFields";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { useToast } from "@/components/admin/Toast";
import { CONTENT_STATUSES } from "@/lib/cms/fields";
import { isoToKolkataDateTimeLocal } from "@/lib/cms/time";
import { useLocalized } from "@/lib/i18n/use-localized";
import type { Article, Category, ContentStatus } from "@/types";

export function BlogForm({
  article,
  categories,
  canDelete = true,
  canPublish = false,
}: {
  article?: Article;
  categories: Category[];
  canDelete?: boolean;
  canPublish?: boolean;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const loc = useLocalized();
  const [title, setTitle] = useState(article?.title ?? "");
  const [excerpt, setExcerpt] = useState(article?.excerpt ?? "");
  const [body, setBody] = useState(article?.body ?? "");
  const [status, setStatus] = useState<ContentStatus>(article?.status ?? "draft");
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const blogCategories = useMemo(
    () => categories.filter((category) => category.type === "blog" || category.type === "resource"),
    [categories],
  );

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    const data = new FormData(event.currentTarget);
    data.set("title", title);
    data.set("excerpt", excerpt);
    data.set("body", body);
    data.set("status", canPublish ? status : article?.status ?? "draft");
    const endpoint = article ? `/api/blog/${article.id}` : "/api/blog";
    const response = await fetch(endpoint, {
      method: article ? "PUT" : "POST",
      body: data,
    });
    const json = await response.json();
    setSaving(false);
    if (!response.ok) {
      toast(json.error || "Could not save the article.", "error");
      return;
    }
    toast("Article saved.");
    router.push("/admin/blog");
    router.refresh();
  }

  async function onDelete() {
    if (!article) return;
    const response = await fetch(`/api/blog/${article.id}`, { method: "DELETE" });
    setConfirmOpen(false);
    if (!response.ok) {
      toast("Could not delete this article.", "error");
      return;
    }
    toast("Article deleted.");
    router.push("/admin/blog");
    router.refresh();
  }

  return (
    <>
      <form onSubmit={onSubmit} className="glass space-y-4 rounded-3xl p-6">
        <label className="block text-sm font-medium">
          Title (English)
          <input
            required
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="mt-1 w-full rounded-2xl border border-border bg-transparent px-4 py-3"
          />
        </label>
        <label className="block text-sm font-medium">
          Excerpt (English)
          <textarea
            required
            value={excerpt}
            onChange={(event) => setExcerpt(event.target.value)}
            rows={3}
            className="mt-1 w-full rounded-2xl border border-border bg-transparent px-4 py-3"
          />
        </label>
        <div>
          <p className="mb-2 text-sm font-medium">Body</p>
          <RichTextEditor value={body} onChange={setBody} />
        </div>
        <LocaleFields prefix="title" label="Titles" values={article?.titles} />
        <LocaleFields prefix="excerpt" label="Excerpts" values={article?.excerpts} textarea rows={3} />
        <LocaleFields prefix="body" label="Body translations" values={article?.bodies} textarea rows={6} />
        <label className="block text-sm font-medium">
          Category
          <select
            name="categoryId"
            defaultValue={article?.categoryId}
            className="mt-1 w-full rounded-2xl border border-border bg-transparent px-4 py-3"
          >
            {(blogCategories.length ? blogCategories : categories).map((category) => (
              <option key={category.id} value={category.id}>
                {loc.category(category)}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-medium">
          Tags
          <input
            name="tags"
            defaultValue={article?.tags.join(", ")}
            className="mt-1 w-full rounded-2xl border border-border bg-transparent px-4 py-3"
          />
        </label>
        <label className="block text-sm font-medium">
          Slug
          <input
            name="slug"
            defaultValue={article?.slug}
            className="mt-1 w-full rounded-2xl border border-border bg-transparent px-4 py-3"
          />
        </label>
        <label className="block text-sm font-medium">
          Cover image URL
          <input
            name="thumbnailUrl"
            defaultValue={article?.thumbnailUrl}
            className="mt-1 w-full rounded-2xl border border-border bg-transparent px-4 py-3"
          />
        </label>
        <label className="block text-sm font-medium">
          Cover image upload
          <input type="file" name="cover" accept="image/*" className="mt-1 w-full text-sm" />
        </label>
        <label className="block text-sm font-medium">
          SEO title
          <input
            name="seoTitle"
            defaultValue={article?.seoTitle?.en || article?.title}
            className="mt-1 w-full rounded-2xl border border-border bg-transparent px-4 py-3"
          />
        </label>
        <label className="block text-sm font-medium">
          SEO description
          <textarea
            name="seoDescription"
            defaultValue={article?.seoDescription?.en || article?.excerpt}
            rows={3}
            className="mt-1 w-full rounded-2xl border border-border bg-transparent px-4 py-3"
          />
        </label>
        <LocaleFields prefix="seoTitle" label="SEO titles" values={article?.seoTitle} />
        <LocaleFields prefix="seoDescription" label="SEO descriptions" values={article?.seoDescription} textarea rows={2} />
        <div className="grid gap-4 sm:grid-cols-2">
          {canPublish ? (
            <label className="block text-sm font-medium">
              Status
              <select
                value={status}
                onChange={(event) => setStatus(event.target.value as ContentStatus)}
                className="mt-1 w-full rounded-2xl border border-border bg-transparent px-4 py-3"
              >
                {CONTENT_STATUSES.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          ) : (
            <p className="text-sm text-muted">
              Status: {article?.status ?? "draft"}. Editors publish articles to the public site.
            </p>
          )}
          <label className="block text-sm font-medium">
            Schedule publish
            <input
              type="datetime-local"
              name="scheduledAt"
              defaultValue={isoToKolkataDateTimeLocal(article?.scheduledAt)}
              className="mt-1 w-full rounded-2xl border border-border bg-transparent px-4 py-3"
            />
          </label>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button type="submit" disabled={saving}>
            {saving ? "Saving…" : article ? "Save article" : "Create article"}
          </Button>
          <Button type="button" variant="outline" onClick={() => setPreview((value) => !value)}>
            {preview ? "Hide preview" : "Preview"}
          </Button>
          {article ? (
            <Link href={`/admin/blog/${article.id}/preview`} className="btn-base btn-premium-outline">
              Open preview page
            </Link>
          ) : null}
          {article && canDelete ? (
            <Button type="button" variant="outline" onClick={() => setConfirmOpen(true)}>
              Delete
            </Button>
          ) : null}
        </div>
      </form>
      {preview ? (
        <article className="glass mt-6 rounded-3xl p-6">
          <p className="text-xs uppercase tracking-wide text-muted">Preview</p>
          <h2 className="mt-2 font-serif text-3xl">{title || "Untitled"}</h2>
          <p className="mt-3 text-muted">{excerpt}</p>
          <div className="mt-6 space-y-3" dangerouslySetInnerHTML={{ __html: body }} />
        </article>
      ) : null}
      <ConfirmDialog
        open={confirmOpen}
        title="Delete article"
        message="This removes the article from the CMS. Scheduled and published copies will disappear from the public site."
        confirmLabel="Delete"
        onClose={() => setConfirmOpen(false)}
        onConfirm={onDelete}
      />
    </>
  );
}
