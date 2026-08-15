import { Hero } from "@/components/home/Hero";
import { HomeSections } from "@/components/home/HomeSections";
import { resources as resourceItems } from "@/lib/data/seed";
import {
  getCategories,
  getDailyQuote,
  getFeaturedVideos,
  getStories,
  getTestimonials,
} from "@/lib/data/queries";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "You Are Not Alone",
  description:
    "Hope, resilience, recovery, and mental wellness. Watch inspirational videos, read survivor stories, and find support in India and beyond.",
  path: "/",
  localeAware: true,
});

export default async function HomePage() {
  const [videos, stories, quote, testimonials, categories] = await Promise.all([
    getFeaturedVideos(),
    getStories(),
    getDailyQuote(),
    getTestimonials(),
    getCategories(),
  ]);

  return (
    <>
      <Hero />
      <HomeSections
        videos={videos}
        stories={stories}
        quote={quote}
        testimonials={testimonials}
        categories={categories}
        resources={resourceItems}
      />
    </>
  );
}
