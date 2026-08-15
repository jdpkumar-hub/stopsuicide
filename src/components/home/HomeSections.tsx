"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ListenButton } from "@/components/a11y/ListenButton";
import { AffirmationGrid } from "@/components/home/AffirmationGrid";
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
  quotes,
  testimonials,
  categories,
  resources,
}: {
  videos: Video[];
  stories: Story[];
  quote: Quote;
  quotes: Quote[];
  testimonials: Testimonial[];
  categories: Category[];
  resources: ResourceItem[];
}) {
  const { t } = useI18n();
  const loc = useLocalized();
  const reduce = useReducedMotion();
  const quoteText = loc.quote(quote);
  const featured = videos[0];
  const rest = videos.slice(1, 6);

  return (
    <>
      <Section id="todays-inspiration" className="pt-20">
        <FadeIn>
          <Card className="glass-premium relative overflow-hidden bg-gradient-to-br from-blue-500/15 via-amber-200/10 to-emerald-500/15 p-8 text-center sm:p-14">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-hope-blue">
              {t("quote.title")}
            </p>
            <blockquote className="mx-auto mt-5 max-w-3xl whitespace-pre-line font-serif text-3xl leading-snug sm:text-5xl">
              “{quoteText}”
            </blockquote>
            <p className="mt-5 text-muted">— {quote.author}</p>
            <div className="mt-7 flex justify-center">
              <ListenButton text={quoteText} />
            </div>
          </Card>
        </FadeIn>
      </Section>

      <AffirmationGrid quotes={quotes} />

      <Section>
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-hope-blue">
              {t("home.videosKicker")}
            </p>
            <h2 className="mt-2 font-serif text-4xl sm:text-5xl">{t("home.featuredVideos")}</h2>
            <p className="mt-2 max-w-xl text-muted">{t("home.featuredVideosSub")}</p>
          </div>
          <Button href="/videos" variant="outline">
            {t("home.allVideos")}
          </Button>
        </div>
        {featured ? (
          <div className="grid gap-6 lg:grid-cols-3">
            <FadeIn className="lg:col-span-2">
              <VideoCard
                video={featured}
                category={categories.find((item) => item.id === featured.categoryId)}
                featured
                priority
              />
            </FadeIn>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
              {rest.slice(0, 2).map((video, index) => (
                <FadeIn key={video.id} delay={index * 0.08}>
                  <VideoCard
                    video={video}
                    category={categories.find((item) => item.id === video.categoryId)}
                  />
                </FadeIn>
              ))}
            </div>
          </div>
        ) : null}
        {rest.length > 2 ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.slice(2).map((video, index) => (
              <FadeIn key={video.id} delay={index * 0.06}>
                <VideoCard
                  video={video}
                  category={categories.find((item) => item.id === video.categoryId)}
                />
              </FadeIn>
            ))}
          </div>
        ) : null}
      </Section>

      <Section>
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-hope-blue">
              {t("home.storiesKicker")}
            </p>
            <h2 className="mt-2 font-serif text-4xl sm:text-5xl">{t("home.stories")}</h2>
            <p className="mt-2 max-w-xl text-muted">{t("home.storiesSub")}</p>
          </div>
          <Button href="/stories" variant="outline">
            {t("home.allStories")}
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {stories.slice(0, 3).map((story, index) => (
            <FadeIn key={story.id} delay={index * 0.07}>
              <StoryCard story={story} />
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-hope-blue">
          {t("home.resourcesKicker")}
        </p>
        <h2 className="mt-2 font-serif text-4xl sm:text-5xl">{t("home.resources")}</h2>
        <p className="mt-2 max-w-2xl text-muted">{t("home.resourcesSub")}</p>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {resources.map((item, index) => {
            const copy = loc.resource(item);
            return (
              <FadeIn key={item.id} delay={index * 0.06}>
                <motion.div whileHover={reduce ? undefined : { y: -6 }} className="h-full">
                  <Card className="glass-premium flex h-full flex-col p-6">
                    <h3 className="font-serif text-2xl">{copy.title}</h3>
                    <p className="mt-2 flex-1 text-sm text-muted">{copy.summary}</p>
                    <Button href="/resources" variant="outline" className="mt-6">
                      {t("home.explore")}
                    </Button>
                  </Card>
                </motion.div>
              </FadeIn>
            );
          })}
        </div>
      </Section>

      <Section>
        <h2 className="font-serif text-4xl sm:text-5xl">{t("home.testimonials")}</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((item, index) => {
            const copy = loc.testimonial(item);
            return (
              <FadeIn key={item.id} delay={index * 0.07}>
                <Card className="glass-premium h-full p-6">
                  <div className="flex items-center gap-3">
                    <Image
                      src={item.avatarUrl}
                      alt=""
                      width={52}
                      height={52}
                      className="h-[52px] w-[52px] rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-xs text-muted">{copy.role}</p>
                    </div>
                  </div>
                  <p className="mt-5 text-sm leading-relaxed text-muted">“{copy.quote}”</p>
                </Card>
              </FadeIn>
            );
          })}
        </div>
      </Section>

      <Section className="pb-24">
        <Card className="glass-premium bg-gradient-to-r from-blue-500/10 to-emerald-500/10 p-8 sm:p-14">
          <Badge>{t("home.newsletterBadge")}</Badge>
          <h2 className="mt-4 font-serif text-4xl sm:text-5xl">{t("newsletter.title")}</h2>
          <p className="mt-3 max-w-xl text-muted">{t("newsletter.sub")}</p>
          <NewsletterForm />
        </Card>
      </Section>
    </>
  );
}
