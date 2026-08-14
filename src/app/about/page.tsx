import Image from "next/image";
import { Button, Card, Section } from "@/components/ui/primitives";
import { team } from "@/lib/data/seed";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "About",
  description:
    "Our mission is to spread hope, resilience, recovery, and mental wellness through stories and education.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <Section className="pt-10">
      <h1 className="font-serif text-5xl">About stopsuicide.in</h1>
      <p className="mt-4 max-w-3xl text-lg text-muted">
        We exist so that people in pain can find light, language, and a path toward help — without graphic content or sensational storytelling.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Card className="p-8">
          <h2 className="font-serif text-3xl">Mission</h2>
          <p className="mt-3 text-muted">
            To spread hope, resilience, recovery, and mental wellness through inspirational videos, survivor stories, educational content, and motivational messages.
          </p>
        </Card>
        <Card className="p-8">
          <h2 className="font-serif text-3xl">Vision</h2>
          <p className="mt-3 text-muted">
            A world where asking for help is ordinary, recovery is visible, and no one has to face a dark hour without a calm, trustworthy place to turn.
          </p>
        </Card>
      </div>

      <h2 className="mt-14 font-serif text-4xl">Team</h2>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {team.map((member) => (
          <Card key={member.id} className="overflow-hidden">
            <div className="relative h-56">
              <Image src={member.imageUrl} alt={member.name} fill className="object-cover" />
            </div>
            <div className="p-6">
              <h3 className="font-serif text-2xl">{member.name}</h3>
              <p className="text-sm text-hope-blue">{member.role}</p>
              <p className="mt-3 text-sm text-muted">{member.bio}</p>
            </div>
          </Card>
        ))}
      </div>

      <Card className="mt-12 p-8">
        <h2 className="font-serif text-3xl">Contact</h2>
        <p className="mt-3 text-muted">
          We welcome partnerships with clinicians, schools, and community groups. This platform is not a crisis service.
        </p>
        <Button href="/contact" className="mt-5">
          Write to us
        </Button>
      </Card>
    </Section>
  );
}
