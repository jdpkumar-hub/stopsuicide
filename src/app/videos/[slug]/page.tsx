import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VideoDetail } from "@/components/video/VideoDetail";
import { JsonLd, videoSchema } from "@/lib/schema-org";
import { createMetadata } from "@/lib/seo";
import { pickLocalized } from "@/lib/i18n/locales";
import { getRequestLocale } from "@/lib/i18n/request-locale";
import { getCategories, getRelatedVideos, getVideo, getVideos } from "@/lib/data/queries";

export async function generateStaticParams() {
  const videos = await getVideos();
  return videos.map((video) => ({ slug: video.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const video = await getVideo(slug);
  if (!video) return createMetadata({ title: "Video", description: "Video not found." });
  const locale = await getRequestLocale();
  return createMetadata({
    title: pickLocalized(locale, video.seoTitle ?? video.titles, video.title),
    description: pickLocalized(locale, video.seoDescription ?? video.descriptions, video.description),
    path: `/videos/${video.slug}`,
    image: video.thumbnailUrl,
    localeAware: true,
    locale,
  });
}

export default async function VideoDetailPage({ params }: Props) {
  const { slug } = await params;
  const video = await getVideo(slug);
  if (!video) notFound();

  const [related, categories] = await Promise.all([
    getRelatedVideos(video),
    getCategories(),
  ]);

  return (
    <>
      <JsonLd data={videoSchema(video)} />
      <VideoDetail video={video} related={related} categories={categories} />
    </>
  );
}
