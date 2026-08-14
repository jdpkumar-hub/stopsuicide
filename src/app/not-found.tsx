import { Button, Section } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <Section className="py-24 text-center">
      <h1 className="font-serif text-5xl">This page is still being written</h1>
      <p className="mx-auto mt-4 max-w-lg text-muted">
        The path you followed does not exist. Take a breath, then return home — or reach Get Help if you need support.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Button href="/">Home</Button>
        <Button href="#get-help" variant="green">
          Get Help
        </Button>
      </div>
    </Section>
  );
}
