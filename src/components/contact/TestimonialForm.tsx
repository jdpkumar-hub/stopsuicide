"use client";

import { useState } from "react";
import { Button } from "@/components/ui/primitives";
import { useI18n } from "@/lib/i18n/context";

export function TestimonialForm() {
  const { t, locale } = useI18n();
  const [status, setStatus] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    const response = await fetch("/api/testimonials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, locale }),
    });
    setStatus(response.ok ? t("testimonial.ok") : t("form.error"));
    if (response.ok) form.reset();
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      <label className="block text-sm font-medium">
        {t("form.name")}
        <input name="name" required className="mt-1 w-full rounded-2xl border border-border bg-transparent px-4 py-3" />
      </label>
      <label className="block text-sm font-medium">
        {t("form.city")}
        <input name="role" required className="mt-1 w-full rounded-2xl border border-border bg-transparent px-4 py-3" />
      </label>
      <label className="block text-sm font-medium">
        {t("testimonial.quote")}
        <textarea
          name="quote"
          required
          rows={4}
          lang={locale}
          className="mt-1 w-full rounded-2xl border border-border bg-transparent px-4 py-3"
        />
      </label>
      <Button type="submit">{t("testimonial.submit")}</Button>
      {status ? <p className="text-sm text-hope-green">{status}</p> : null}
    </form>
  );
}
