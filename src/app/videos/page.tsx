import { Section } from "@/components/ui/primitives";
import { VideoExplorer } from "@/components/video/VideoExplorer";
import { getCategories, getVideos } from "@/lib/data/queries";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Videos",
  description:
    "Watch inspirational videos about hope, recovery, wellness, and supporting the people you love.",
  path: "/videos",
});

export default async function VideosPage() {
  const [videos, categories] = await Promise.all([getVideos(), getCategories()]);
  const videoCategories = categories.filter((item) =>
    videos.some((video) => video.categoryId === item.id),
  );

  return (
    <Section className="pt-10">
      <h1 className="font-serif text-5xl">Videos</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Search, filter, and watch hopeful films. Like, share, or save the ones that help you stay.
      </p>
      <div className="mt-10">
        <VideoExplorer videos={videos} categories={videoCategories} />
      </div>
    </Section>
  );
}
