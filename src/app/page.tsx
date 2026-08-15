import { Hero } from "@/components/home/Hero";
import { HomeSections } from "@/components/home/HomeSections";
import { resources as resourceItems } from "@/lib/data/seed";
import {
  getCategories,
  getDailyQuote,
  getFeaturedVideos,
  getQuotes,
  getStories,
  getTestimonials,
} from "@/lib/data/queries";
import { JsonLd } from "@/lib/schema-org";
import { createMetadata } from "@/lib/seo";
import { SITE_NAME } from "@/lib/constants";
import { siteUrl } from "@/lib/utils";

export const metadata = createMetadata({
  title: "You Are Not Alone",
  description:
    "A calm sunrise space for hope, resilience, recovery, and mental wellness. Watch inspirational videos, read survivor stories, and find support in India and beyond.",
  path: "/",
  localeAware: true,
});

export default async function HomePage() {
  const [videos, stories, quote, quotes, testimonials, categories] = await Promise.all([
    getFeaturedVideos(),
    getStories(),
    getDailyQuote(),
    getQuotes(),
    getTestimonials(),
    getCategories(),
  ]);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: `${SITE_NAME} — You Are Not Alone`,
          url: siteUrl(),
          description:
            "Hope, resilience, recovery, and mental wellness through inspirational videos, stories, and daily affirmations.",
          speakable: {
            "@type": "SpeakableSpecification",
            cssSelector: ["h1", "blockquote"],
          },
          isPartOf: { "@type": "WebSite", name: SITE_NAME, url: siteUrl() },
        }}
      />
      <Hero />
      <HomeSections
        videos={videos}
        stories={stories}
        quote={quote}
        quotes={quotes.filter((item) => item.active)}
        testimonials={testimonials}
        categories={categories}
        resources={resourceItems}
      />
    </>
  );
}
