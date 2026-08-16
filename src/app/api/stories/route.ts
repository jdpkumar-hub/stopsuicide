import { jsonError, requireAdmin } from "@/lib/admin";
import { parseStoryStatus } from "@/lib/cms/fields";
import { storyPayloadFromForm } from "@/lib/cms/payloads";
import { canModerateStories } from "@/lib/cms/roles";
import { getAllStoriesAdmin, getStories } from "@/lib/data/queries";
import { storySchema } from "@/lib/validations";

export async function GET(request: Request) {
  const admin = new URL(request.url).searchParams.get("scope") === "admin";
  if (admin) {
    const auth = await requireAdmin();
    if (auth.error) return jsonError(auth.error, auth.status);
    return Response.json({ stories: await getAllStoriesAdmin() });
  }
  return Response.json({ stories: await getStories() });
}

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (auth.error) return jsonError(auth.error, auth.status);
  const form = await request.formData();
  const parsed = storySchema.safeParse({
    title: form.get("title"),
    excerpt: form.get("excerpt"),
    body: form.get("body"),
    authorName: String(form.get("authorName") || ""),
    authorRole: String(form.get("authorRole") || ""),
    slug: String(form.get("slug") || ""),
    categoryId: String(form.get("categoryId") || ""),
    thumbnailUrl: String(form.get("thumbnailUrl") || ""),
    videoUrl: String(form.get("videoUrl") || ""),
    status: form.get("status") || "pending",
    featured: form.get("featured"),
    anonymous: form.get("anonymous"),
  });
  if (!parsed.success) return jsonError("Please check the story details.");

  try {
    const record = {
      ...(await storyPayloadFromForm(form)),
      created_by: auth.user?.id ?? null,
    };
    if (!canModerateStories(auth.role)) {
      record.status = "pending";
    } else {
      record.status = parseStoryStatus(record.status);
    }
    if (!auth.supabase) return Response.json({ ok: true, preview: record });
    const { data, error } = await auth.supabase.from("stories").insert(record).select("*").single();
    if (error) return jsonError(error.message, 500);
    return Response.json({ ok: true, story: data });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Could not save story.", 500);
  }
}
