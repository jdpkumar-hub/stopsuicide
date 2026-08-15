"use client";

import Image from "next/image";
import { ListenButton } from "@/components/a11y/ListenButton";
import { FadeIn, StoryCard } from "@/components/content/Cards";
import { NewsletterForm } from "@/components/home/NewsletterForm";
import { Badge, Button, Card, Section } from "@/components/ui/primitives";
import { VideoCard } from "@/components/video/VideoCard";
import { useI18n } from "@/lib/i18n/context";
import { useLocalized } from "@/lib/i18n/use-localized";
import type { Category, Quote, ResourceItem, Story, Testimonial, Video } from "@/types";

export function HomeSections({
  videos,
  stories,
  quote,
  testimonials,
  categories,
  resources,
}: {
  videos: Video[];
  stories: Story[];
  quote: Quote;
  testimonials: Testimonial[];
  categories: Category[];
  resources: ResourceItem[];
}) {
  const { t } = useI18n();
  const loc = useLocalized();
  const quoteText = loc.quote(quote);

  return (
    <>
      <Section>
        <FadeIn>
          <Card className="bg-gradient-to-r from-blue-500/10 to-emerald-500/10 p-8 text-center sm:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-hope-blue">
              {t("quote.title")}
            </p>
            <blockquote className="mx-auto mt-4 max-w-3xl whitespace-pre-line font-serif text-3xl leading-snug sm:text-4xl">
              “{quoteText}”
            </blockquote>
            <p className="mt-4 text-muted">— {quote.author}</p>
            <div className="mt-6 flex justify-center">
              <ListenButton text={quoteText} />
            </div>
          </Card>
        </FadeIn>
      </Section>

      <Section>
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-4xl">{t("home.featuredVideos")}</h2>
            <p className="mt-2 text-muted">{t("home.featuredVideosSub")}</p>
          </div>
          <Button href="/videos" variant="outline">
            {t("home.allVideos")}
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
            <h2 className="font-serif text-4xl">{t("home.stories")}</h2>
            <p className="mt-2 text-muted">{t("home.storiesSub")}</p>
          </div>
          <Button href="/stories" variant="outline">
            {t("home.allStories")}
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {stories.slice(0, 3).map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </Section>

      <Section>
        <h2 className="font-serif text-4xl">{t("home.resources")}</h2>
        <p className="mt-2 max-w-2xl text-muted">{t("home.resourcesSub")}</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {resources.map((item) => {
            const copy = loc.resource(item);
            return (
              <Card key={item.id} className="p-6">
                <h3 className="font-serif text-2xl">{copy.title}</h3>
                <p className="mt-2 text-sm text-muted">{copy.summary}</p>
                <Button href="/resources" variant="outline" className="mt-5">
                  {t("home.explore")}
                </Button>
              </Card>
            );
          })}
        </div>
      </Section>

      <Section>
        <h2 className="font-serif text-4xl">{t("home.testimonials")}</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => {
            const copy = loc.testimonial(item);
            return (
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
                    <p className="text-xs text-muted">{copy.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted">“{copy.quote}”</p>
              </Card>
            );
          })}
        </div>
      </Section>

      <Section>
        <Card className="p-8 sm:p-12">
          <Badge>{t("home.newsletterBadge")}</Badge>
          <h2 className="mt-4 font-serif text-4xl">{t("newsletter.title")}</h2>
          <p className="mt-2 max-w-xl text-muted">{t("newsletter.sub")}</p>
          <NewsletterForm />
        </Card>
      </Section>
    </>
  );
}
