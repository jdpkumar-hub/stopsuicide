"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { LOCALE_META } from "@/lib/i18n/locales";

export function ListenButton({ text }: { text: string }) {
  const { locale, t } = useI18n();
  const [speaking, setSpeaking] = useState(false);

  function speak() {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      return;
    }
    window.speechSynthesis.cancel();
    if (speaking) {
      setSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = LOCALE_META[locale].tts;
    utterance.rate = locale === "te" ? 0.92 : 1;
    const voices = window.speechSynthesis.getVoices();
    const match = voices.find((voice) => voice.lang.toLowerCase().startsWith(LOCALE_META[locale].tts.toLowerCase().slice(0, 2)));
    if (match) utterance.voice = match;
    utterance.onend = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  }

  return (
    <button
      type="button"
      onClick={speak}
      className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm"
      aria-label={speaking ? t("common.stop") : t("common.listen")}
    >
      {speaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      {speaking ? t("common.stop") : t("common.listen")}
    </button>
  );
}
