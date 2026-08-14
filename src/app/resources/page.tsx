import { Heart, HelpCircle, Sun, Users } from "lucide-react";
import { Card, Section } from "@/components/ui/primitives";
import { faqs, resources } from "@/lib/data/seed";
import { faqSchema, JsonLd } from "@/lib/schema-org";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Resources",
  description:
    "Mental wellness tips, coping strategies, family guidance, and frequently asked questions.",
  path: "/resources",
});

const icons = {
  sun: Sun,
  heart: Heart,
  users: Users,
  help: HelpCircle,
};

export default function ResourcesPage() {
  return (
    <Section className="pt-10">
      <JsonLd data={faqSchema(faqs)} />
      <h1 className="font-serif text-5xl">Resources</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Practical, non-graphic guidance. If you are in distress, use Get Help on this page and contact a trained professional.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {resources.map((item) => {
          const Icon = icons[item.icon];
          return (
            <Card key={item.id} id={item.slug} className="p-6 sm:p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-hope-blue dark:bg-blue-500/15">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="font-serif text-3xl">{item.title}</h2>
              <p className="mt-2 text-sm text-muted">{item.summary}</p>
              <p className="mt-4 leading-7">{item.body}</p>
            </Card>
          );
        })}
      </div>
      <div className="mt-12">
        <h2 className="font-serif text-4xl">Frequently asked questions</h2>
        <div className="mt-6 space-y-4">
          {faqs.map((faq) => (
            <Card key={faq.question} className="p-6">
              <h3 className="font-semibold">{faq.question}</h3>
              <p className="mt-2 text-muted">{faq.answer}</p>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
