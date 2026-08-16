"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card } from "@/components/ui/primitives";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { useToast } from "@/components/admin/Toast";
import type { MediaAsset } from "@/types";

export function MediaLibrary({ assets, canDelete = true }: { assets: MediaAsset[]; canDelete?: boolean }) {
  const router = useRouter();
  const { toast } = useToast();
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState("all");
  const [uploading, setUploading] = useState(false);
  const [pendingId, setPendingId] = useState<string | null>(null);

  const rows = useMemo(() => {
    return assets.filter((asset) => {
      const haystack = `${asset.alt} ${asset.url}`.toLowerCase();
      return (!query || haystack.includes(query.toLowerCase())) && (kind === "all" || asset.kind === kind);
    });
  }, [assets, query, kind]);

  async function onUpload(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setUploading(true);
    const response = await fetch("/api/media", {
      method: "POST",
      body: new FormData(event.currentTarget),
    });
    const json = await response.json();
    setUploading(false);
    if (!response.ok) {
      toast(json.error || "Upload failed.", "error");
      return;
    }
    toast("Asset added to the media library.");
    event.currentTarget.reset();
    router.refresh();
  }

  async function onDelete() {
    if (!pendingId) return;
    const response = await fetch(`/api/media/${pendingId}`, { method: "DELETE" });
    setPendingId(null);
    if (!response.ok) {
      toast("Could not delete this asset.", "error");
      return;
    }
    toast("Asset removed from the catalog.");
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <form onSubmit={onUpload} className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
          <input type="file" name="file" required className="text-sm" />
          <input
            name="alt"
            placeholder="Alt text"
            className="rounded-2xl border border-border bg-transparent px-4 py-3 text-sm"
          />
          <Button type="submit" disabled={uploading}>
            {uploading ? "Uploading…" : "Upload"}
          </Button>
        </form>
      </Card>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search media…"
          className="w-full rounded-2xl border border-border bg-transparent px-4 py-2.5 text-sm sm:max-w-xs"
        />
        <select
          value={kind}
          onChange={(event) => setKind(event.target.value)}
          className="rounded-2xl border border-border bg-transparent px-3 py-2.5 text-sm"
        >
          <option value="all">All types</option>
          <option value="image">Images</option>
          <option value="video">Videos</option>
          <option value="file">Files</option>
        </select>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {rows.map((asset) => (
          <Card key={asset.id} className="p-4">
            {asset.kind === "image" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={asset.url} alt={asset.alt || "Media asset"} className="h-40 w-full rounded-2xl object-cover" />
            ) : (
              <div className="flex h-40 items-center justify-center rounded-2xl bg-black/5 text-sm text-muted">
                {asset.kind}
              </div>
            )}
            <p className="mt-3 truncate text-sm">{asset.alt || asset.url}</p>
            <div className="mt-3 flex items-center justify-between gap-2">
              <button
                type="button"
                className="text-sm text-hope-blue"
                onClick={() => {
                  void navigator.clipboard.writeText(asset.url);
                  toast("URL copied.", "info");
                }}
              >
                Copy URL
              </button>
              {canDelete ? (
                <button type="button" className="text-sm text-muted" onClick={() => setPendingId(asset.id)}>
                  Delete
                </button>
              ) : null}
            </div>
          </Card>
        ))}
      </div>
      {!rows.length ? <p className="text-sm text-muted">No media yet. Upload an image or video to reuse it across the CMS.</p> : null}
      <ConfirmDialog
        open={!!pendingId}
        title="Remove media"
        message="This removes the catalog entry. The Cloudinary file is kept unless you delete it there."
        confirmLabel="Remove"
        onClose={() => setPendingId(null)}
        onConfirm={onDelete}
      />
    </div>
  );
}
