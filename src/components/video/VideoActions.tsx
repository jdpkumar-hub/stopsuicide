"use client";

import { Bookmark, Heart, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import type { Video } from "@/types";

function storageKey(kind: "likes" | "saves") {
  return `stopsuicide-${kind}`;
}

function readList(kind: "likes" | "saves") {
  try {
    return JSON.parse(window.localStorage.getItem(storageKey(kind)) || "[]") as string[];
  } catch {
    return [];
  }
}

export function VideoActions({ video }: { video: Video }) {
  const { t } = useI18n();
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likes, setLikes] = useState(video.likes);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setLiked(readList("likes").includes(video.id));
    setSaved(readList("saves").includes(video.id));
  }, [video.id]);

  function toggle(kind: "likes" | "saves") {
    const list = new Set(readList(kind));
    if (list.has(video.id)) list.delete(video.id);
    else list.add(video.id);
    window.localStorage.setItem(storageKey(kind), JSON.stringify([...list]));
    if (kind === "likes") {
      setLiked(list.has(video.id));
      setLikes((value) => value + (list.has(video.id) ? 1 : -1));
    } else {
      setSaved(list.has(video.id));
    }
  }

  async function share() {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: video.title, url });
      return;
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => toggle("likes")}
        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm ${
          liked ? "border-rose-300 bg-rose-50 text-rose-600" : "border-border"
        }`}
        aria-pressed={liked}
      >
        <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
        {t("common.like")} · {likes}
      </button>
      <button
        type="button"
        onClick={share}
        className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm"
      >
        <Share2 className="h-4 w-4" />
        {copied ? "Copied" : t("common.share")}
      </button>
      <button
        type="button"
        onClick={() => toggle("saves")}
        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm ${
          saved ? "border-emerald-300 bg-emerald-50 text-emerald-700" : "border-border"
        }`}
        aria-pressed={saved}
      >
        <Bookmark className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
        {saved ? t("common.saved") : t("common.save")}
      </button>
    </div>
  );
}

export function ShareButtons({ title }: { title: string }) {
  const encoded = encodeURIComponent(title);

  return (
    <div className="flex flex-wrap gap-2 text-sm">
      <a
        className="rounded-full border border-border px-3 py-1.5"
        href={`https://twitter.com/intent/tweet?text=${encoded}`}
        target="_blank"
        rel="noreferrer"
      >
        X / Twitter
      </a>
      <a
        className="rounded-full border border-border px-3 py-1.5"
        href={`https://www.facebook.com/sharer/sharer.php?u=${encoded}`}
        target="_blank"
        rel="noreferrer"
      >
        Facebook
      </a>
      <a
        className="rounded-full border border-border px-3 py-1.5"
        href={`https://wa.me/?text=${encoded}`}
        target="_blank"
        rel="noreferrer"
      >
        WhatsApp
      </a>
    </div>
  );
}
