import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/primitives";
import { VideoActions } from "@/components/video/VideoActions";
import { VideoCard, VideoPlayer } from "@/components/video/VideoCard";
import { JsonLd, videoSchema } from "@/lib/schema-org";
import { createMetadata } from "@/lib/seo";
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
  return createMetadata({
    title: video.title,
    description: video.description,
    path: `/videos/${video.slug}`,
    image: video.thumbnailUrl,
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
    <Section className="pt-10">
      <JsonLd data={videoSchema(video)} />
      <VideoPlayer video={video} />
      <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-hope-blue">
            {categories.find((item) => item.id === video.categoryId)?.name}
          </p>
          <h1 className="mt-2 font-serif text-4xl sm:text-5xl">{video.title}</h1>
          <p className="mt-4 text-muted">{video.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {video.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-white/60 px-3 py-1 text-xs dark:bg-white/5">
                #{tag}
              </span>
            ))}
          </div>
          <div className="mt-6">
            <VideoActions video={video} />
          </div>
        </div>
        <aside>
          <h2 className="font-serif text-2xl">Related videos</h2>
          <div className="mt-4 space-y-4">
            {related.map((item) => (
              <VideoCard key={item.id} video={item} />
            ))}
          </div>
        </aside>
      </div>
    </Section>
  );
}
