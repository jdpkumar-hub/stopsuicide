"use client";

import Image from "next/image";
import { HeartHandshake } from "lucide-react";
import { DailyInspiration } from "@/components/home/DailyInspiration";
import { HopeSteps } from "@/components/home/HopeSteps";
import { HomeStoryCard, HomeVideoCard } from "@/components/home/HomeMedia";
import { NewsletterForm } from "@/components/home/NewsletterForm";
import { ArticleCard, FadeIn } from "@/components/content/Cards";
import { Badge, Button, Card, Section } from "@/components/ui/primitives";
import { useI18n } from "@/lib/i18n/context";
import { useLocalized } from "@/lib/i18n/use-localized";
import { selectHomepageStories } from "@/lib/home/stories";
import type { Article, Category, Quote, Story, Testimonial, Video } from "@/types";

export function HomeSections({
  videos,
  stories,
  articles,
  quote,
  quotes,
  testimonials,
}: {
  videos: Video[];
  stories: Story[];
  articles: Article[];
  quote: Quote;
  quotes: Quote[];
  testimonials: Testimonial[];
  categories?: Category[];
  resources?: unknown;
}) {
  const { t } = useI18n();
  const loc = useLocalized();
  const previewVideos = [...videos.filter((item) => item.featured), ...videos.filter((item) => !item.featured)].slice(
    0,
    3,
  );
  const previewStories = selectHomepageStories(stories, 3);

  return (
    <>
      <HopeSteps />

      <Section id="todays-inspiration">
        <DailyInspiration quote={quote} quotes={quotes} />
      </Section>

      <Section>
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="kicker text-hope-blue">{t("home.videosKicker")}</p>
            <h2 className="mt-2 font-serif text-4xl sm:text-5xl">{t("home.featuredVideos")}</h2>
            <p className="mt-2 max-w-xl text-muted">{t("home.featuredVideosSub")}</p>
          </div>
          <Button href="/videos" variant="outline">
            {t("home.allVideos")} →
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {previewVideos.map((video, index) => (
            <HomeVideoCard key={video.id} video={video} delay={index * 0.07} />
          ))}
        </div>
      </Section>

      <Section>
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="kicker text-hope-blue">{t("home.storiesKicker")}</p>
            <h2 className="mt-2 font-serif text-4xl sm:text-5xl">{t("home.stories")}</h2>
            <p className="mt-2 max-w-xl text-muted">{t("home.storiesSub")}</p>
          </div>
          <Button href="/stories" variant="outline">
            {t("home.allStories")} →
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {previewStories.map((story, index) => (
            <HomeStoryCard key={story.id} story={story} delay={index * 0.07} />
          ))}
        </div>
      </Section>

      <Section>
        <div className="home-help-cta">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-hope-green text-white">
            <HeartHandshake className="h-6 w-6" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h2 className="font-serif text-3xl sm:text-4xl">{t("home.helpCta")}</h2>
            <p className="mt-2 max-w-xl text-muted">{t("home.helpCtaSub")}</p>
          </div>
          <Button href="#get-help" variant="help" className="sm:ml-auto">
            {t("hero.support")}
          </Button>
        </div>
      </Section>

      <Section>
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="kicker text-hope-blue">{t("home.articlesKicker")}</p>
            <h2 className="mt-2 font-serif text-4xl sm:text-5xl">{t("home.articles")}</h2>
            <p className="mt-2 max-w-xl text-muted">{t("home.articlesSub")}</p>
          </div>
          <Button href="/blog" variant="outline">
            {t("home.allArticles")}
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {articles.slice(0, 3).map((article, index) => (
            <FadeIn key={article.id} delay={index * 0.07}>
              <ArticleCard article={article} />
            </FadeIn>
          ))}
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
