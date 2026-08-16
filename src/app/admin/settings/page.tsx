import { redirect } from "next/navigation";
import { Card } from "@/components/ui/primitives";
import { requireAdmin } from "@/lib/admin";
import { canManageSettings } from "@/lib/cms/roles";
import { DEFAULT_SETTINGS } from "@/lib/constants";
import { isCloudinaryConfigured, isSupabaseConfigured } from "@/lib/utils";

export default async function SettingsPage() {
  const auth = await requireAdmin({ minRole: "admin" });
  if (auth.error || !canManageSettings(auth.role)) redirect("/admin");

  return (
    <div>
      <h1 className="font-serif text-4xl">Settings</h1>
      <div className="mt-6 grid gap-4">
        <Card className="p-6">
          <h2 className="font-semibold">Site</h2>
          <p className="mt-2 text-sm text-muted">{DEFAULT_SETTINGS.siteName}</p>
          <p className="text-sm text-muted">{DEFAULT_SETTINGS.tagline}</p>
          <p className="text-sm text-muted">{DEFAULT_SETTINGS.contactEmail}</p>
        </Card>
        <Card className="p-6">
          <h2 className="font-semibold">Integrations</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>Supabase: {isSupabaseConfigured() ? "connected" : "not configured (using seed content)"}</li>
            <li>Cloudinary: {isCloudinaryConfigured() ? "connected" : "not configured"}</li>
          </ul>
        </Card>
        <Card className="p-6">
          <h2 className="font-semibold">CMS roles</h2>
          <p className="mt-2 text-sm text-muted">
            Super Admin manages users and settings. Editors can publish and delete. Authors can create and edit. The first signed-in user is promoted to Super Admin if none exists.
          </p>
          <p className="mt-2 text-sm text-muted">
            Apply `supabase/cms-migration.sql` on existing databases, or `supabase/schema.sql` on new ones.
          </p>
        </Card>
        <Card className="p-6">
          <h2 className="font-semibold">Safety</h2>
          <p className="mt-2 text-sm text-muted">
            Keep Get Help visible on every page. Do not publish graphic or sensational content. This site is not a crisis service.
          </p>
        </Card>
      </div>
    </div>
  );
}
