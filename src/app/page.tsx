import Image from "next/image";
import { Hero } from "@/components/home/Hero";
import { NewsletterForm } from "@/components/home/NewsletterForm";
import { FadeIn, StoryCard } from "@/components/content/Cards";
import { Badge, Button, Card, Section } from "@/components/ui/primitives";
import { VideoCard } from "@/components/video/VideoCard";
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

      <Section>
        <FadeIn>
          <Card className="bg-gradient-to-r from-blue-500/10 to-emerald-500/10 p-8 text-center sm:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-hope-blue">
              Today’s reminder
            </p>
            <blockquote className="mx-auto mt-4 max-w-3xl font-serif text-3xl leading-snug sm:text-4xl">
              “{quote.text}”
            </blockquote>
            <p className="mt-4 text-muted">— {quote.author}</p>
          </Card>
        </FadeIn>
      </Section>

      <Section>
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-4xl">Featured motivational videos</h2>
            <p className="mt-2 text-muted">Calm films to remind you that staying is possible.</p>
          </div>
          <Button href="/videos" variant="outline">
            All videos
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.slice(0, 6).map((video, index) => (
            <FadeIn key={video.id} delay={index * 0.05}>
              <VideoCard
                video={video}
                category={categories.find((item) => item.id === video.categoryId)}
              />
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section>
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-4xl">Survivor stories</h2>
            <p className="mt-2 text-muted">People who chose connection, care, and another morning.</p>
          </div>
          <Button href="/stories" variant="outline">
            All stories
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {stories.slice(0, 3).map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </Section>

      <Section>
        <h2 className="font-serif text-4xl">Educational resources</h2>
        <p className="mt-2 max-w-2xl text-muted">
          Practical guidance for mental wellness, coping, and supporting someone you love.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {resourceItems.map((item) => (
            <Card key={item.id} className="p-6">
              <h3 className="font-serif text-2xl">{item.title}</h3>
              <p className="mt-2 text-sm text-muted">{item.summary}</p>
              <Button href="/resources" variant="outline" className="mt-5">
                Explore
              </Button>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <h2 className="font-serif text-4xl">Testimonials</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <Card key={item.id} className="p-6">
              <div className="flex items-center gap-3">
                <Image
                  src={item.avatarUrl}
                  alt=""
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-xs text-muted">{item.role}</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted">“{item.quote}”</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <Card className="p-8 sm:p-12">
          <Badge>Newsletter</Badge>
          <h2 className="mt-4 font-serif text-4xl">A little light, weekly</h2>
          <p className="mt-2 max-w-xl text-muted">
            Hopeful notes, new stories, and wellness reminders. No noise.
          </p>
          <NewsletterForm />
        </Card>
      </Section>
    </>
  );
}
