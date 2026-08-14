import Link from "next/link";
import { Button, Card } from "@/components/ui/primitives";
import { getAllVideosAdmin } from "@/lib/data/queries";

export default async function AdminVideosPage() {
  const videos = await getAllVideosAdmin();

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-serif text-4xl">Videos</h1>
        <Button href="/admin/videos/new">Upload video</Button>
      </div>
      <div className="mt-6 space-y-3">
        {videos.map((video) => (
          <Card key={video.id} className="flex items-center justify-between gap-4 p-4">
            <div>
              <p className="font-semibold">{video.title}</p>
              <p className="text-sm text-muted">
                {video.source} · {video.featured ? "Featured" : "Standard"} · {video.status}
              </p>
            </div>
            <Link href={`/admin/videos/${video.id}`} className="text-sm text-hope-blue">
              Edit
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
