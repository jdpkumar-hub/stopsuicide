import { jsonError, requireAdmin } from "@/lib/admin";
import { parseContentStatus } from "@/lib/cms/fields";
import { articlePayloadFromForm } from "@/lib/cms/payloads";
import { canPublishContent } from "@/lib/cms/roles";
import { getAllArticlesAdmin, getArticles } from "@/lib/data/queries";
import { articleSchema } from "@/lib/validations";

export async function GET(request: Request) {
  const admin = new URL(request.url).searchParams.get("scope") === "admin";
  if (admin) {
    const auth = await requireAdmin();
    if (auth.error) return jsonError(auth.error, auth.status);
    return Response.json({ articles: await getAllArticlesAdmin() });
  }
  return Response.json({ articles: await getArticles() });
}

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (auth.error) return jsonError(auth.error, auth.status);

  const form = await request.formData();
  const parsed = articleSchema.safeParse({
    title: form.get("title"),
    excerpt: form.get("excerpt"),
    body: form.get("body"),
    tags: form.get("tags") || "",
    slug: String(form.get("slug") || ""),
    categoryId: String(form.get("categoryId") || ""),
    thumbnailUrl: String(form.get("thumbnailUrl") || ""),
    seoTitle: String(form.get("seoTitle") || ""),
    seoDescription: String(form.get("seoDescription") || ""),
    status: form.get("status") || "draft",
    scheduledAt: String(form.get("scheduledAt") || ""),
  });
  if (!parsed.success) return jsonError("Please check the article details.");

  try {
    const record = {
      ...(await articlePayloadFromForm(form)),
      created_by: auth.user?.id ?? null,
    };
    if (!canPublishContent(auth.role)) {
      record.status = "draft";
    } else {
      record.status = parseContentStatus(record.status);
    }
    if (!auth.supabase) return Response.json({ ok: true, preview: record });
    const { data, error } = await auth.supabase.from("articles").insert(record).select("*").single();
    if (error) return jsonError(error.message, 500);
    return Response.json({ ok: true, article: data });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Could not save article.", 500);
  }
}
