import Link from "next/link";
import { VideoManager } from "@/components/admin/VideoManager";
import { Button } from "@/components/ui/primitives";
import { getAllVideosAdmin } from "@/lib/data/queries";

export default async function AdminVideosPage() {
  const videos = await getAllVideosAdmin();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-4xl">Videos</h1>
          <p className="mt-2 text-sm text-muted">
            Upload MP4s, attach YouTube links, and store files on Cloudinary.
          </p>
        </div>
        <Button href="/admin/videos/new">Upload video</Button>
      </div>
      <div className="mt-6">
        <VideoManager videos={videos} />
      </div>
      <p className="mt-4 text-sm">
        <Link href="/admin/media" className="text-hope-blue">
          Open media library
        </Link>
      </p>
    </div>
  );
}
