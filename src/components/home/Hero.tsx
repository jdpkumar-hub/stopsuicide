"use client";

import { StoriesCarousel } from "@/components/home/StoriesCarousel";
import { TrustStrip } from "@/components/home/TrustStrip";
import type { FeaturedHeroStory } from "@/lib/data/featured-stories";

export function Hero({ stories }: { stories: FeaturedHeroStory[] }) {
  return (
    <section className="home-hero">
      <div className="home-hero-inner mx-auto max-w-7xl px-4 sm:px-6">
        <StoriesCarousel stories={stories} />
      </div>
      <TrustStrip />
    </section>
  );
}
