"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card } from "@/components/ui/primitives";
import type { DailyMotivation } from "@/types";

export function DailyMotivationPanel({
  items,
  today,
}: {
  items: DailyMotivation[];
  today: string;
}) {
  const router = useRouter();
  const todays = useMemo(
    () => items.find((item) => item.forDate === today),
    [items, today],
  );
  const [text, setText] = useState(todays?.text ?? "");
  const [textTe, setTextTe] = useState(todays?.translations.te ?? "");
  const [textHi, setTextHi] = useState(todays?.translations.hi ?? "");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!todays) return;
    setText(todays.text);
    setTextTe(todays.translations.te ?? "");
    setTextHi(todays.translations.hi ?? "");
  }, [todays]);

  async function generate(force = false) {
    setBusy(true);
    const response = await fetch("/api/motivation/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ forDate: today, force }),
    });
    const json = await response.json();
    setBusy(false);
    setStatus(json.note || json.error || "Done.");
    if (json.motivation) {
      setText(json.motivation.text);
      setTextTe(json.motivation.translations?.te ?? "");
      setTextHi(json.motivation.translations?.hi ?? "");
    }
    router.refresh();
  }

  async function act(action: "approve" | "reject" | "save") {
    if (!todays) return;
    setBusy(true);
    const response = await fetch(`/api/motivation/${todays.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, text, textTe, textHi }),
    });
    const json = await response.json();
    setBusy(false);
    setStatus(
      json.ok
        ? action === "approve"
          ? "Approved. It is now on the homepage."
          : action === "reject"
            ? "Rejected. Generate a new draft when you are ready."
            : "Draft saved."
        : json.error || "Could not update.",
    );
    router.refresh();
  }

  return (
    <Card className="mb-8 p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-hope-blue">
            AI Daily Motivation
          </p>
          <h2 className="mt-2 font-serif text-3xl">Today · {today}</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            A new inspirational quote is generated each day. It stays hidden until you approve it.
            Homepage visitors only see approved lines.
          </p>
        </div>
        <Button type="button" onClick={() => generate(!todays)} disabled={busy}>
          {busy ? "Working…" : todays ? "Regenerate draft" : "Generate today’s quote"}
        </Button>
      </div>

      {todays ? (
        <div className="mt-6 space-y-3">
          <p className="text-sm">
            Status:{" "}
            <strong className="capitalize">{todays.status}</strong>
            {todays.source === "ai" ? " · OpenAI" : " · curated catalog"}
          </p>
          <label className="block text-sm font-medium">
            English
            <textarea
              value={text}
              onChange={(event) => setText(event.target.value)}
              rows={3}
              className="mt-1 w-full rounded-2xl border border-border bg-transparent px-4 py-3"
            />
          </label>
          <label className="block text-sm font-medium">
            Telugu
            <textarea
              lang="te"
              value={textTe}
              onChange={(event) => setTextTe(event.target.value)}
              rows={3}
              className="mt-1 w-full rounded-2xl border border-border bg-transparent px-4 py-3"
            />
          </label>
          <label className="block text-sm font-medium">
            Hindi
            <textarea
              lang="hi"
              value={textHi}
              onChange={(event) => setTextHi(event.target.value)}
              rows={2}
              className="mt-1 w-full rounded-2xl border border-border bg-transparent px-4 py-3"
            />
          </label>
          <div className="flex flex-wrap gap-3">
            <Button type="button" onClick={() => act("approve")} disabled={busy || !text.trim()}>
              Approve & publish
            </Button>
            <Button type="button" variant="outline" onClick={() => act("save")} disabled={busy}>
              Save draft
            </Button>
            <Button type="button" variant="outline" onClick={() => act("reject")} disabled={busy}>
              Reject
            </Button>
          </div>
        </div>
      ) : (
        <p className="mt-6 text-sm text-muted">
          No draft for today yet. Generate one, edit if needed, then approve.
        </p>
      )}
      {status ? <p className="mt-4 text-sm text-hope-green">{status}</p> : null}

      {items.length ? (
        <div className="mt-8">
          <h3 className="font-semibold">Recent days</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {items.slice(0, 10).map((item) => (
              <li key={item.id} className="rounded-2xl bg-white/50 px-4 py-3 dark:bg-white/5">
                <span className="font-medium">{item.forDate}</span>
                <span className="mx-2 capitalize text-muted">{item.status}</span>
                <span className="text-muted">“{item.text}”</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </Card>
  );
}
