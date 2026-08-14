"use client";

import { useState } from "react";
import { Button, Card } from "@/components/ui/primitives";

export function ManagerForm({
  endpoint,
  fields,
  submitLabel,
}: {
  endpoint: string;
  fields: { name: string; label: string; textarea?: boolean }[];
  submitLabel: string;
}) {
  const [status, setStatus] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setStatus(response.ok ? "Saved. Connect Supabase to persist in production." : "Could not save.");
    if (response.ok) form.reset();
  }

  return (
    <Card className="p-6">
      <form onSubmit={onSubmit} className="space-y-3">
        {fields.map((field) => (
          <label key={field.name} className="block text-sm font-medium">
            {field.label}
            {field.textarea ? (
              <textarea
                name={field.name}
                required
                rows={4}
                className="mt-1 w-full rounded-2xl border border-border bg-transparent px-4 py-3"
              />
            ) : (
              <input
                name={field.name}
                required
                className="mt-1 w-full rounded-2xl border border-border bg-transparent px-4 py-3"
              />
            )}
          </label>
        ))}
        <Button type="submit">{submitLabel}</Button>
        {status ? <p className="text-sm text-muted">{status}</p> : null}
      </form>
    </Card>
  );
}
