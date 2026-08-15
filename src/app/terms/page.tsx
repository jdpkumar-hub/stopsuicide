import { LegalContent } from "@/components/legal/LegalContent";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Terms of Use",
  description: "stopsuicide.in is a hope and education platform, not a medical or crisis service.",
  path: "/terms",
  localeAware: true,
});

export default function TermsPage() {
  return <LegalContent titleKey="terms.title" leadKey="terms.lead" bodyKey="terms.body" />;
}
