import { MediaLibrary } from "@/components/admin/MediaLibrary";
import { requireAdmin } from "@/lib/admin";
import { canDeleteContent } from "@/lib/cms/roles";
import { getMediaAssets } from "@/lib/data/queries";

export default async function MediaPage() {
  const [assets, auth] = await Promise.all([getMediaAssets(), requireAdmin()]);
  return (
    <div>
      <h1 className="font-serif text-4xl">Media library</h1>
      <p className="mt-2 text-sm text-muted">
        Reusable Cloudinary assets for videos, blogs, and survivor stories.
      </p>
      <div className="mt-6">
        <MediaLibrary assets={assets} canDelete={canDeleteContent(auth.role)} />
      </div>
    </div>
  );
}
