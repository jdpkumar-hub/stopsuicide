"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Bookmark, Quote, Share2, SkipForward } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ListenButton } from "@/components/a11y/ListenButton";
import { FadeIn } from "@/components/content/Cards";
import { Button, Card } from "@/components/ui/primitives";
import { useI18n } from "@/lib/i18n/context";
import { useLocalized } from "@/lib/i18n/use-localized";
import type { Quote as QuoteItem } from "@/types";

const SAVE_KEY = "stopsuicide-quote-saves";

function readSaves() {
  try {
    return JSON.parse(window.localStorage.getItem(SAVE_KEY) || "[]") as string[];
  } catch {
    return [];
  }
}

export function DailyInspiration({
  quote,
  quotes,
}: {
  quote: QuoteItem;
  quotes: QuoteItem[];
}) {
  const { t } = useI18n();
  const loc = useLocalized();
  const reduce = useReducedMotion();
  const deck = useMemo(() => {
    const rest = quotes.filter((item) => item.id !== quote.id);
    return [quote, ...rest];
  }, [quote, quotes]);
  const [index, setIndex] = useState(0);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const current = deck[index] ?? quote;
  const text = loc.quote(current);

  useEffect(() => {
    setSaved(readSaves().includes(current.id));
  }, [current.id]);

  function save() {
    const list = new Set(readSaves());
    if (list.has(current.id)) list.delete(current.id);
    else list.add(current.id);
    window.localStorage.setItem(SAVE_KEY, JSON.stringify([...list]));
    setSaved(list.has(current.id));
  }

  async function share() {
    const payload = `${text} — ${current.author}`;
    if (navigator.share) {
      await navigator.share({ title: t("quote.title"), text: payload });
      return;
    }
    await navigator.clipboard.writeText(payload);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <FadeIn>
      <Card className="quote-aura glass-premium relative overflow-hidden bg-gradient-to-br from-blue-500/12 via-amber-200/10 to-emerald-500/12 p-7 text-center sm:p-12">
        <Quote className="mx-auto h-8 w-8 text-hope-blue/70" aria-hidden="true" />
        <p className="kicker mt-4 text-hope-blue">
          {current.aiGenerated ? t("quote.aiBadge") : t("quote.title")}
        </p>
        <p className="mt-2 text-xs font-semibold text-hope-green">
          {current.aiGenerated ? t("quote.categoryAi") : t("quote.categoryHope")}
        </p>
        {current.aiGenerated ? (
          <p className="mt-2 text-sm text-muted">{t("quote.aiNote")}</p>
        ) : null}
        <div className="relative mx-auto mt-5 min-h-[6.5rem] max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={current.id}
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="whitespace-pre-line font-serif text-2xl leading-snug sm:text-4xl"
            >
              “{text}”
            </motion.blockquote>
          </AnimatePresence>
        </div>
        <p className="mt-5 text-muted">— {current.author}</p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
          <ListenButton text={text} />
          <Button
            variant="outline"
            onClick={save}
            aria-pressed={saved}
            className="min-h-11"
          >
            <Bookmark className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
            {saved ? t("common.saved") : t("common.save")}
          </Button>
          <Button variant="outline" onClick={share} className="min-h-11">
            <Share2 className="h-4 w-4" />
            {copied ? t("common.copied") : t("common.share")}
          </Button>
          <Button
            variant="outline"
            onClick={() => setIndex((value) => (value + 1) % deck.length)}
            className="min-h-11"
          >
            <SkipForward className="h-4 w-4" />
            {t("quote.next")}
          </Button>
        </div>
      </Card>
    </FadeIn>
  );
}
