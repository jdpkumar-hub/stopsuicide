import { AboutContent } from "@/components/about/AboutContent";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "About",
  description:
    "Our mission is to spread hope, resilience, recovery, and mental wellness through stories and education.",
  path: "/about",
  localeAware: true,
});

export default function AboutPage() {
  return <AboutContent />;
}
