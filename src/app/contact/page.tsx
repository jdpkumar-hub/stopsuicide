import { ContactForms } from "@/components/contact/ContactForms";
import { Card, Section } from "@/components/ui/primitives";
import { DEFAULT_SETTINGS } from "@/lib/constants";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Contact",
  description: "Contact stopsuicide.in, share your story, or volunteer with our hope-focused community.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Section className="pt-10">
      <h1 className="font-serif text-5xl">Contact</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Share a recovery story, volunteer, or partner with us. If you need urgent support, please use Get Help below.
      </p>
      <div className="mt-8 flex flex-wrap gap-3 text-sm">
        <a className="rounded-full border border-border px-4 py-2" href={`mailto:${DEFAULT_SETTINGS.contactEmail}`}>
          {DEFAULT_SETTINGS.contactEmail}
        </a>
        <a className="rounded-full border border-border px-4 py-2" href={DEFAULT_SETTINGS.social.instagram}>
          Instagram
        </a>
        <a className="rounded-full border border-border px-4 py-2" href={DEFAULT_SETTINGS.social.youtube}>
          YouTube
        </a>
        <a className="rounded-full border border-border px-4 py-2" href={DEFAULT_SETTINGS.social.twitter}>
          X
        </a>
      </div>
      <div className="mt-10">
        <ContactForms />
      </div>
      <Card className="mt-8 p-6 text-sm text-muted">
        Sharing a story? We edit for safety and dignity. Please avoid graphic details. You may request anonymity.
      </Card>
    </Section>
  );
}
