"use client";

import { Button, Section } from "@/components/ui/primitives";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Section className="py-24 text-center">
      <h1 className="font-serif text-5xl">Something went quiet</h1>
      <p className="mx-auto mt-4 max-w-lg text-muted">
        We could not load this page. You can try again, or use Get Help if you need support right now.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Button onClick={reset}>Try again</Button>
        <Button href="#get-help" variant="green">
          Get Help
        </Button>
      </div>
    </Section>
  );
}
