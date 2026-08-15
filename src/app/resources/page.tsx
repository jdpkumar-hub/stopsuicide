import { ResourcesContent } from "@/components/resources/ResourcesContent";
import { faqs } from "@/lib/data/seed";
import { faqSchema, JsonLd } from "@/lib/schema-org";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Resources",
  description:
    "Mental wellness tips, coping strategies, family guidance, and frequently asked questions.",
  path: "/resources",
  localeAware: true,
});

export default function ResourcesPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <ResourcesContent />
    </>
  );
}
