"use client";

import { useState } from "react";
import { Button, Card } from "@/components/ui/primitives";
import { useI18n } from "@/lib/i18n/context";

export function ContactForms() {
  const { t } = useI18n();
  const [contactStatus, setContactStatus] = useState("");
  const [volunteerStatus, setVolunteerStatus] = useState("");

  async function submit(
    event: React.FormEvent<HTMLFormElement>,
    endpoint: string,
    setStatus: (value: string) => void,
  ) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setStatus(response.ok ? t("form.success") : t("form.error"));
    if (response.ok) form.reset();
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6 sm:p-8">
        <h2 className="font-serif text-3xl">{t("contact.formTitle")}</h2>
        <p className="mt-2 text-sm text-muted">{t("contact.formLead")}</p>
        <form
          className="mt-6 space-y-4"
          onSubmit={(event) => submit(event, "/api/contact", setContactStatus)}
        >
          <Field name="name" label={t("form.name")} required />
          <Field name="email" label={t("form.email")} type="email" required />
          <Field name="subject" label={t("form.subject")} required />
          <Field name="message" label={t("form.message")} textarea required />
          <Button type="submit">{t("contact.send")}</Button>
          {contactStatus ? <p className="text-sm text-hope-green">{contactStatus}</p> : null}
        </form>
      </Card>

      <Card className="p-6 sm:p-8">
        <h2 className="font-serif text-3xl">{t("contact.volunteerTitle")}</h2>
        <p className="mt-2 text-sm text-muted">{t("contact.volunteerLead")}</p>
        <form
          className="mt-6 space-y-4"
          onSubmit={(event) => submit(event, "/api/volunteer", setVolunteerStatus)}
        >
          <Field name="name" label={t("form.name")} required />
          <Field name="email" label={t("form.email")} type="email" required />
          <Field name="city" label={t("form.city")} required />
          <Field name="interest" label={t("form.interest")} required />
          <Field name="message" label={t("form.more")} textarea required />
          <Button type="submit" variant="green">
            {t("contact.offer")}
          </Button>
          {volunteerStatus ? <p className="text-sm text-hope-green">{volunteerStatus}</p> : null}
        </form>
      </Card>
    </div>
  );
}

function Field({
  name,
  label,
  type = "text",
  textarea,
  required,
}: {
  name: string;
  label: string;
  type?: string;
  textarea?: boolean;
  required?: boolean;
}) {
  const classes =
    "mt-1 w-full rounded-2xl border border-border bg-transparent px-4 py-3 outline-none focus:ring-2 focus:ring-hope-blue";
  return (
    <label className="block text-sm font-medium">
      {label}
      {textarea ? (
        <textarea name={name} required={required} rows={5} className={classes} />
      ) : (
        <input name={name} type={type} required={required} className={classes} />
      )}
    </label>
  );
}
