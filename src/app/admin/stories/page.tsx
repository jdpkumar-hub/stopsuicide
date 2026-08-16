import { StoryManager } from "@/components/admin/StoryManager";
import { Button } from "@/components/ui/primitives";
import { getAllStoriesAdmin } from "@/lib/data/queries";

export default async function AdminStoriesPage() {
  const stories = await getAllStoriesAdmin();
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-4xl">Survivor stories</h1>
          <p className="mt-2 text-sm text-muted">
            Moderate with dignity. Approve only hopeful, non-graphic stories. Anonymous publishing is supported.
          </p>
        </div>
        <Button href="/admin/stories/new">New story</Button>
      </div>
      <div className="mt-6">
        <StoryManager stories={stories} />
      </div>
    </div>
  );
}
