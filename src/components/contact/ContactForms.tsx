"use client";

import { useState } from "react";
import { Button, Card } from "@/components/ui/primitives";

export function ContactForms() {
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
    setStatus(response.ok ? "Thank you. We will reply with care." : "Please check the form and try again.");
    if (response.ok) form.reset();
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6 sm:p-8">
        <h2 className="font-serif text-3xl">Contact us</h2>
        <p className="mt-2 text-sm text-muted">
          Questions, partnerships, or a story you would like us to consider.
        </p>
        <form
          className="mt-6 space-y-4"
          onSubmit={(event) => submit(event, "/api/contact", setContactStatus)}
        >
          <Field name="name" label="Name" required />
          <Field name="email" label="Email" type="email" required />
          <Field name="subject" label="Subject" required />
          <Field name="message" label="Message" textarea required />
          <Button type="submit">Send message</Button>
          {contactStatus ? <p className="text-sm text-hope-green">{contactStatus}</p> : null}
        </form>
      </Card>

      <Card className="p-6 sm:p-8">
        <h2 className="font-serif text-3xl">Volunteer</h2>
        <p className="mt-2 text-sm text-muted">
          Help moderate hope-focused content, translate, or support community programmes.
        </p>
        <form
          className="mt-6 space-y-4"
          onSubmit={(event) => submit(event, "/api/volunteer", setVolunteerStatus)}
        >
          <Field name="name" label="Name" required />
          <Field name="email" label="Email" type="email" required />
          <Field name="city" label="City" required />
          <Field name="interest" label="How would you like to help?" required />
          <Field name="message" label="Tell us a little more" textarea required />
          <Button type="submit" variant="green">
            Offer to help
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
