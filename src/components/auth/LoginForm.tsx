"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Card } from "@/components/ui/primitives";
import { createBrowserSupabase } from "@/lib/supabase/client";

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/admin";
  const setup = params.get("mode") === "setup";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(
    setup
      ? "Add Supabase keys in .env.local to enable secure admin login."
      : "",
  );

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const supabase = createBrowserSupabase();
    if (!supabase) {
      setMessage("Supabase is not configured. Copy .env.example to .env.local.");
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setMessage(error.message);
      return;
    }
    router.push(next);
    router.refresh();
  }

  return (
    <Card className="mx-auto max-w-md p-8">
      <h1 className="font-serif text-4xl">Admin login</h1>
      <p className="mt-2 text-sm text-muted">
        Secure access for editors and administrators.
      </p>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <label className="block text-sm font-medium">
          Email
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-1 w-full rounded-2xl border border-border bg-transparent px-4 py-3 outline-none focus:ring-2 focus:ring-hope-blue"
          />
        </label>
        <label className="block text-sm font-medium">
          Password
          <input
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-1 w-full rounded-2xl border border-border bg-transparent px-4 py-3 outline-none focus:ring-2 focus:ring-hope-blue"
          />
        </label>
        <Button type="submit" className="w-full">
          Sign in
        </Button>
        {message ? <p className="text-sm text-muted">{message}</p> : null}
      </form>
    </Card>
  );
}
