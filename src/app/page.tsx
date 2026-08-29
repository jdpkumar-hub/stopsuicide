import { Hero } from "@/components/home/Hero";
import { HomeSections } from "@/components/home/HomeSections";
import { resources as resourceItems } from "@/lib/data/seed";
import { selectHomepageStories } from "@/lib/home/stories";
import {
  getArticles,
  getCategories,
  getDailyQuote,
  getQuotes,
  getStories,
  getTestimonials,
  getVideos,
} from "@/lib/data/queries";
import { JsonLd } from "@/lib/schema-org";
import { createMetadata } from "@/lib/seo";
import { SITE_NAME } from "@/lib/constants";
import { siteUrl } from "@/lib/utils";

export const metadata = createMetadata({
  title: "You Are Not Alone",
  description:
    "Real stories. Real people. Real hope. A calm space for connection, recovery, and a better tomorrow.",
  path: "/",
  localeAware: true,
});

export default async function HomePage() {
  const [videos, stories, articles, quote, quotes, testimonials, categories] = await Promise.all([
    getVideos(),
    getStories(),
    getArticles(),
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
      <Hero stories={selectHomepageStories(stories, 5)} categories={categories} />
      <HomeSections
        videos={videos}
        stories={stories}
        articles={articles}
        quote={quote}
        quotes={quotes.filter((item) => item.active)}
        testimonials={testimonials}
        categories={categories}
        resources={resourceItems}
      />
    </>
  );
}
