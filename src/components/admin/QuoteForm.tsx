"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/primitives";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { LocaleFields } from "@/components/admin/LocaleFields";
import { useToast } from "@/components/admin/Toast";
import { CONTENT_LOCALES, QUOTE_MOODS } from "@/lib/cms/fields";
import { LOCALE_META } from "@/lib/i18n/locales";
import type { Quote } from "@/types";

export function QuoteForm({
  quote,
  canDelete = true,
}: {
  quote?: Quote;
  canDelete?: boolean;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    const response = await fetch(quote ? `/api/quotes/${quote.id}` : "/api/quotes", {
      method: quote ? "PUT" : "POST",
      body: new FormData(event.currentTarget),
    });
    const json = await response.json();
    setSaving(false);
    if (!response.ok) {
      toast(json.error || "Could not save the quote.", "error");
      return;
    }
    toast("Quote saved. Featured and scheduled quotes can appear on the homepage.");
    router.push("/admin/quotes");
    router.refresh();
  }

  async function onDelete() {
    if (!quote) return;
    const response = await fetch(`/api/quotes/${quote.id}`, { method: "DELETE" });
    setConfirmOpen(false);
    if (!response.ok) {
      toast("Could not delete this quote.", "error");
      return;
    }
    toast("Quote deleted.");
    router.push("/admin/quotes");
    router.refresh();
  }

  return (
    <>
      <form onSubmit={onSubmit} className="glass space-y-4 rounded-3xl p-6">
        <label className="block text-sm font-medium">
          Quote (English)
          <textarea
            name="text"
            required
            defaultValue={quote?.text}
            rows={4}
            className="mt-1 w-full rounded-2xl border border-border bg-transparent px-4 py-3"
          />
        </label>
        <LocaleFields prefix="text" label="Translations" values={quote?.translations} textarea />
        <label className="block text-sm font-medium">
          Author
          <input
            name="author"
            required
            defaultValue={quote?.author}
            className="mt-1 w-full rounded-2xl border border-border bg-transparent px-4 py-3"
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium">
            Mood
            <select
              name="mood"
              defaultValue={quote?.mood || "hope"}
              className="mt-1 w-full rounded-2xl border border-border bg-transparent px-4 py-3"
            >
              {QUOTE_MOODS.map((mood) => (
                <option key={mood} value={mood}>
                  {mood}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-medium">
            Primary language
            <select
              name="locale"
              defaultValue={quote?.locale || "en"}
              className="mt-1 w-full rounded-2xl border border-border bg-transparent px-4 py-3"
            >
              {CONTENT_LOCALES.map((locale) => (
                <option key={locale} value={locale}>
                  {LOCALE_META[locale].englishName}
                </option>
              ))}
            </select>
          </label>
        </div>
        <label className="block text-sm font-medium">
          Schedule for date
          <input
            type="date"
            name="scheduledFor"
            defaultValue={quote?.scheduledFor}
            className="mt-1 w-full rounded-2xl border border-border bg-transparent px-4 py-3"
          />
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="featured" defaultChecked={quote?.featured} className="h-4 w-4" />
          Featured homepage quote
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="active" defaultChecked={quote?.active ?? true} className="h-4 w-4" />
          Active
        </label>
        <div className="flex flex-wrap gap-3">
          <Button type="submit" disabled={saving}>
            {saving ? "Saving…" : quote ? "Save quote" : "Add quote"}
          </Button>
          {quote && canDelete ? (
            <Button type="button" variant="outline" onClick={() => setConfirmOpen(true)}>
              Delete
            </Button>
          ) : null}
        </div>
      </form>
      <ConfirmDialog
        open={confirmOpen}
        title="Delete quote"
        message="This quote will leave the library and will no longer rotate on the homepage."
        confirmLabel="Delete"
        onClose={() => setConfirmOpen(false)}
        onConfirm={onDelete}
      />
    </>
  );
}
