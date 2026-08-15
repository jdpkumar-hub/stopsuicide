import { PageHeader } from "@/components/i18n/PageHeader";
import { Section } from "@/components/ui/primitives";
import { VideoExplorer } from "@/components/video/VideoExplorer";
import { getCategories, getVideos } from "@/lib/data/queries";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Videos",
  description:
    "Watch inspirational videos about hope, recovery, wellness, and supporting the people you love.",
  path: "/videos",
  localeAware: true,
});

export default async function VideosPage() {
  const [videos, categories] = await Promise.all([getVideos(), getCategories()]);
  const videoCategories = categories.filter((item) => item.type === "video");

  return (
    <Section className="pt-10">
      <PageHeader titleKey="videos.title" subKey="videos.sub" />
      <div className="mt-10">
        <VideoExplorer videos={videos} categories={videoCategories} />
      </div>
    </Section>
  );
}
