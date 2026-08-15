import { LegalContent } from "@/components/legal/LegalContent";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description: "How stopsuicide.in treats stories, messages, and personal information with dignity.",
  path: "/privacy",
  localeAware: true,
});

export default function PrivacyPage() {
  return (
    <LegalContent titleKey="privacy.title" leadKey="privacy.lead" bodyKey="privacy.body" />
  );
}
