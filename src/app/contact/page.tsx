import { ContactContent } from "@/components/contact/ContactContent";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Contact",
  description: "Contact stopsuicide.in, share your story, or volunteer with our hope-focused community.",
  path: "/contact",
  localeAware: true,
});

export default function ContactPage() {
  return <ContactContent />;
}
