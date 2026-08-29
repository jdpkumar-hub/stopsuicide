"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { DailyInspiration } from "@/components/home/DailyInspiration";
import { AffirmationGrid } from "@/components/home/AffirmationGrid";
import { ArticleCard, FadeIn, StoryCard } from "@/components/content/Cards";
import { NewsletterForm } from "@/components/home/NewsletterForm";
import { Badge, Button, Card, Section } from "@/components/ui/primitives";
import { VideoCard } from "@/components/video/VideoCard";
import { CRISIS_RESOURCES } from "@/lib/constants";
import { useI18n } from "@/lib/i18n/context";
import { useLocalized } from "@/lib/i18n/use-localized";
import type { MessageKey } from "@/lib/i18n/messages/en";
import { telHref } from "@/lib/utils";
import type { Article, Category, Quote, ResourceItem, Story, Testimonial, Video } from "@/types";

const HELP_COPY: Record<string, MessageKey> = {
  "tele-manas": "help.telemanas",
  kiran: "help.kiran",
  icall: "help.icall",
  aasra: "help.aasra",
  vandrevala: "help.vandrevala",
};

const MEDITATION_IMAGE =
  "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1400&q=75";
const VOLUNTEER_IMAGE =
  "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1400&q=75";

export function HomeSections({
  videos,
  stories,
  articles,
  quote,
  quotes,
  testimonials,
  categories,
  resources,
}: {
  videos: Video[];
  stories: Story[];
  articles: Article[];
  quote: Quote;
  quotes: Quote[];
  testimonials: Testimonial[];
  categories: Category[];
  resources: ResourceItem[];
}) {
  const { t } = useI18n();
  const loc = useLocalized();
  const reduce = useReducedMotion();
  const featuredVideos = videos.filter((item) => item.featured).slice(0, 6);
  const featured = featuredVideos[0];
  const rest = featuredVideos.slice(1);
  const shownVideoIds = new Set(featuredVideos.map((item) => item.id));
  const topics = categories.filter((item) => item.type === "video").slice(0, 8);
  const meditationVideos = videos.filter((item) => item.categoryId === "cat-meditation");
  const successStories = stories.filter((item) => item.categoryId === "cat-success");
  const recoveryStories = stories
    .filter((item) => item.categoryId !== "cat-success")
    .slice(0, 3);
  const successVideos = videos
    .filter((item) => item.categoryId === "cat-success" && !shownVideoIds.has(item.id))
    .slice(0, Math.max(0, 3 - successStories.length));
  const orgs = CRISIS_RESOURCES.filter((item) => item.region === "india").slice(0, 4);

  return (
    <>
      <Section id="todays-inspiration">
        <DailyInspiration quote={quote} quotes={quotes} />
      </Section>

      <AffirmationGrid quotes={quotes} />

      <Section>
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="kicker text-hope-blue">{t("home.videosKicker")}</p>
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
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="kicker text-hope-blue">{t("home.storiesKicker")}</p>
            <h2 className="mt-2 font-serif text-4xl sm:text-5xl">{t("home.stories")}</h2>
            <p className="mt-2 max-w-xl text-muted">{t("home.storiesSub")}</p>
          </div>
          <Button href="/stories" variant="outline">
            {t("home.allStories")}
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {recoveryStories.map((story, index) => (
            <FadeIn key={story.id} delay={index * 0.07}>
              <StoryCard story={story} />
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section>
        <p className="kicker text-hope-blue">{t("home.explore")}</p>
        <h2 className="mt-2 font-serif text-4xl sm:text-5xl">{t("home.topics")}</h2>
        <p className="mt-2 max-w-2xl text-muted">{t("home.topicsSub")}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          {topics.map((topic) => (
            <Link
              key={topic.id}
              href={`/videos?topic=${topic.slug}`}
              className="glass-premium rounded-full px-5 py-2.5 text-sm font-medium transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              {loc.category(topic)}
            </Link>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <FadeIn>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
              <Image
                src={meditationVideos[0]?.thumbnailUrl ?? MEDITATION_IMAGE}
                alt={t("home.meditation")}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <p className="kicker text-hope-blue">{t("home.meditation")}</p>
            <h2 className="mt-2 font-serif text-4xl sm:text-5xl">{t("home.meditation")}</h2>
            <p className="mt-3 max-w-xl text-muted">{t("home.meditationSub")}</p>
            <Button href="/videos?topic=meditation" className="mt-6">
              {t("home.meditationCta")}
            </Button>
          </FadeIn>
        </div>
      </Section>

      {successStories.length || successVideos.length ? (
      <Section>
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="kicker text-hope-blue">{t("home.success")}</p>
            <h2 className="mt-2 font-serif text-4xl sm:text-5xl">{t("home.success")}</h2>
            <p className="mt-2 max-w-xl text-muted">{t("home.successSub")}</p>
          </div>
          <Button href="/stories" variant="outline">
            {t("home.allStories")}
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {successStories.slice(0, 3).map((story, index) => (
            <FadeIn key={story.id} delay={index * 0.07}>
              <StoryCard story={story} />
            </FadeIn>
          ))}
          {successVideos.map((video, index) => (
            <FadeIn key={video.id} delay={(successStories.length + index) * 0.07}>
              <VideoCard
                video={video}
                category={categories.find((item) => item.id === video.categoryId)}
              />
            </FadeIn>
          ))}
        </div>
      </Section>
      ) : null}

      <Section>
        <p className="kicker text-hope-blue">{t("home.resourcesKicker")}</p>
        <h2 className="mt-2 font-serif text-4xl sm:text-5xl">{t("home.tips")}</h2>
        <p className="mt-2 max-w-2xl text-muted">{t("home.tipsSub")}</p>
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
        <Card className="glass-premium grid overflow-hidden lg:grid-cols-2">
          <div className="relative min-h-[16rem]">
            <Image
              src={VOLUNTEER_IMAGE}
              alt={t("home.volunteer")}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="flex flex-col justify-center p-8 sm:p-12">
            <Badge>{t("contact.volunteerTitle")}</Badge>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl">{t("home.volunteer")}</h2>
            <p className="mt-3 max-w-xl text-muted">{t("home.volunteerSub")}</p>
            <Button href="/contact" className="mt-6 w-fit">
              {t("home.volunteerCta")}
            </Button>
          </div>
        </Card>
      </Section>

      <Section>
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="kicker text-hope-blue">{t("help.india")}</p>
            <h2 className="mt-2 font-serif text-4xl sm:text-5xl">{t("home.orgs")}</h2>
            <p className="mt-2 max-w-xl text-muted">{t("home.orgsSub")}</p>
          </div>
          <Button href="#get-help" variant="outline">
            {t("home.orgsCta")}
          </Button>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {orgs.map((org, index) => (
            <FadeIn key={org.id} delay={index * 0.05}>
              <Card className="glass-premium h-full p-5">
                <h3 className="font-serif text-xl">{org.name}</h3>
                <p className="mt-2 text-sm text-muted">
                  {HELP_COPY[org.id] ? t(HELP_COPY[org.id]) : org.description}
                </p>
                {org.phone ? (
                  <a className="mt-4 inline-block text-sm font-semibold text-hope-blue" href={telHref(org.phone)}>
                    {org.phone}
                  </a>
                ) : null}
              </Card>
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
