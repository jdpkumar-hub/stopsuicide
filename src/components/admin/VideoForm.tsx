"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/primitives";
import { useI18n } from "@/lib/i18n/context";
import { useLocalized } from "@/lib/i18n/use-localized";
import type { Category, Video } from "@/types";

export function VideoForm({
  categories,
  video,
}: {
  categories: Category[];
  video?: Video;
}) {
  const { t } = useI18n();
  const loc = useLocalized();
  const router = useRouter();
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState(video?.title ?? "");
  const [description, setDescription] = useState(video?.description ?? "");
  const [titleTe, setTitleTe] = useState(video?.titles?.te ?? "");
  const [descriptionTe, setDescriptionTe] = useState(video?.descriptions?.te ?? "");
  const [translating, setTranslating] = useState(false);

  async function translate() {
    setTranslating(true);
    const response = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        target: "te",
      }),
    });
    const json = await response.json();
    if (json.title) setTitleTe(json.title);
    if (json.description) setDescriptionTe(json.description);
    setStatus(json.note || t("admin.translateHint"));
    setTranslating(false);
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    const form = event.currentTarget;
    const data = new FormData(form);
    data.set("title", title);
    data.set("description", description);
    data.set("titleTe", titleTe);
    data.set("descriptionTe", descriptionTe);
    const endpoint = video ? `/api/videos/${video.id}` : "/api/videos";
    const response = await fetch(endpoint, {
      method: video ? "PUT" : "POST",
      body: data,
    });
    const json = await response.json();
    setSaving(false);
    if (!response.ok) {
      setStatus(json.error || t("admin.saveFail"));
      return;
    }
    setStatus(t("admin.saved"));
    router.push("/admin/videos");
    router.refresh();
  }

  async function onDelete() {
    if (!video) return;
    if (!confirm(t("admin.deleteConfirm"))) return;
    await fetch(`/api/videos/${video.id}`, { method: "DELETE" });
    router.push("/admin/videos");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="glass space-y-4 rounded-3xl p-6">
      <label className="block text-sm font-medium">
        {t("admin.titleEn")}
        <input
          name="title"
          required
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="mt-1 w-full rounded-2xl border border-border bg-transparent px-4 py-3"
        />
      </label>
      <label className="block text-sm font-medium">
        {t("admin.descEn")}
        <textarea
          name="description"
          required
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          rows={5}
          className="mt-1 w-full rounded-2xl border border-border bg-transparent px-4 py-3"
        />
      </label>
      <div className="rounded-3xl border border-dashed border-border p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-sm font-semibold">{t("admin.titleTe")}</p>
          <Button type="button" variant="outline" onClick={translate} disabled={translating}>
            {t("admin.translate")}
          </Button>
        </div>
        <p className="mb-3 text-xs text-muted">{t("admin.translateHint")}</p>
        <input
          name="titleTe"
          lang="te"
          value={titleTe}
          onChange={(event) => setTitleTe(event.target.value)}
          className="mb-3 w-full rounded-2xl border border-border bg-transparent px-4 py-3"
        />
        <textarea
          name="descriptionTe"
          lang="te"
          value={descriptionTe}
          onChange={(event) => setDescriptionTe(event.target.value)}
          rows={5}
          className="w-full rounded-2xl border border-border bg-transparent px-4 py-3"
          placeholder={t("admin.descTe")}
        />
      </div>
      <Field name="tags" label={t("admin.tags")} defaultValue={video?.tags.join(", ")} />
      <Field
        name="tagsTe"
        label={t("admin.tagsTe")}
        lang="te"
        defaultValue={video?.tagsByLocale?.te?.join(", ")}
      />
      <Field name="slug" label={t("admin.slug")} defaultValue={video?.slug} />
      <Field name="seoTitle" label={t("admin.seoTitle")} lang="te" defaultValue={video?.seoTitle?.te || video?.titles?.te} />
      <Field
        name="seoDescription"
        label={t("admin.seoDesc")}
        lang="te"
        defaultValue={video?.seoDescription?.te || video?.descriptions?.te}
      />
      <label className="block text-sm font-medium">
        {t("admin.category")}
        <select
          name="categoryId"
          defaultValue={video?.categoryId}
          className="mt-1 w-full rounded-2xl border border-border bg-transparent px-4 py-3"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {loc.category(category)}
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
        {t("admin.featured")}
      </label>
      <Field name="youtubeLink" label={t("admin.youtube")} defaultValue={video?.youtubeId ? `https://www.youtube.com/watch?v=${video.youtubeId}` : ""} />
      <Field name="vimeoLink" label={t("admin.vimeo")} defaultValue={video?.vimeoId ? `https://vimeo.com/${video.vimeoId}` : ""} />
      <label className="block text-sm font-medium">
        {t("admin.thumbnail")}
        <input type="file" name="thumbnail" accept="image/*" className="mt-1 w-full text-sm" />
      </label>
      <label className="block text-sm font-medium">
        {t("admin.mp4")}
        <input type="file" name="videoFile" accept="video/mp4,video/*" className="mt-1 w-full text-sm" />
      </label>
      <p className="text-xs text-muted">{t("admin.cloudinaryHint")}</p>
      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={saving}>
          {saving ? t("admin.saving") : video ? t("admin.save") : t("admin.upload")}
        </Button>
        {video ? (
          <Button type="button" variant="outline" onClick={onDelete}>
            {t("admin.delete")}
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
  lang,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  required?: boolean;
  lang?: string;
}) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <input
        name={name}
        defaultValue={defaultValue}
        required={required}
        lang={lang}
        className="mt-1 w-full rounded-2xl border border-border bg-transparent px-4 py-3"
      />
    </label>
  );
}
