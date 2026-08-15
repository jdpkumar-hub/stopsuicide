"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Badge, Card } from "@/components/ui/primitives";
import { useI18n } from "@/lib/i18n/context";
import { useLocalized } from "@/lib/i18n/use-localized";
import type { Article, Story } from "@/types";

export function StoryCard({ story }: { story: Story }) {
  const { t } = useI18n();
  const loc = useLocalized();
  const copy = loc.story(story);
  return (
    <Link href={`/stories/${story.slug}`} className="group block h-full">
      <Card className="h-full transition duration-300 group-hover:-translate-y-1">
        <div className="relative h-52">
          <Image src={story.thumbnailUrl} alt={copy.title} fill className="object-cover" />
        </div>
        <div className="space-y-3 p-6">
          {story.featured ? <Badge>{t("common.featured")}</Badge> : null}
          <h3 className="font-serif text-2xl">{copy.title}</h3>
          <p className="text-sm text-muted">{copy.excerpt}</p>
          <p className="text-xs text-muted">
            {story.authorName} · {story.readingMinutes} {t("common.min")}
          </p>
        </div>
      </Card>
    </Link>
  );
}

export function ArticleCard({ article }: { article: Article }) {
  const { t } = useI18n();
  const loc = useLocalized();
  const copy = loc.article(article);
  return (
    <Link href={`/blog/${article.slug}`} className="group block h-full">
      <Card className="h-full transition duration-300 group-hover:-translate-y-1">
        <div className="relative h-48">
          <Image src={article.thumbnailUrl} alt={copy.title} fill className="object-cover" />
        </div>
        <div className="space-y-3 p-6">
          {article.aiGenerated ? <Badge>{t("common.ai")}</Badge> : null}
          <h3 className="font-serif text-2xl">{copy.title}</h3>
          <p className="text-sm text-muted">{copy.excerpt}</p>
        </div>
      </Card>
    </Link>
  );
}

export function FadeIn({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}
