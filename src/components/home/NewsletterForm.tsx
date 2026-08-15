"use client";

import { useState } from "react";
import { Button } from "@/components/ui/primitives";
import { useI18n } from "@/lib/i18n/context";

export function NewsletterForm() {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(response.ok ? "ok" : "error");
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
      <label htmlFor="newsletter-email" className="sr-only">
        {t("newsletter.placeholder")}
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder={t("newsletter.placeholder")}
        className="h-12 flex-1 rounded-full border border-border bg-white/70 px-5 outline-none focus:ring-2 focus:ring-hope-blue dark:bg-white/5"
      />
      <Button type="submit" loading={loading}>
        {t("newsletter.cta")}
      </Button>
      {status === "ok" ? (
        <p className="self-center text-sm text-hope-green">{t("newsletter.ok")}</p>
      ) : null}
      {status === "error" ? (
        <p className="self-center text-sm text-rose-500">{t("newsletter.error")}</p>
      ) : null}
    </form>
  );
}
