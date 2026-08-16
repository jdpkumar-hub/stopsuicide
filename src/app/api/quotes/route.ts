import { jsonError, requireAdmin } from "@/lib/admin";
import { quotePayloadFromForm } from "@/lib/cms/payloads";
import { canPublishContent } from "@/lib/cms/roles";
import { getAllQuotesAdmin, getQuotes } from "@/lib/data/queries";
import { quoteSchema } from "@/lib/validations";

export async function GET(request: Request) {
  const admin = new URL(request.url).searchParams.get("scope") === "admin";
  if (admin) {
    const auth = await requireAdmin();
    if (auth.error) return jsonError(auth.error, auth.status);
    return Response.json({ quotes: await getAllQuotesAdmin() });
  }
  return Response.json({ quotes: await getQuotes() });
}

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (auth.error) return jsonError(auth.error, auth.status);

  const form = await readQuoteInput(request);
  const parsed = quoteSchema.safeParse({
    text: form.get("text"),
    textTe: String(form.get("textTe") || form.get("text.te") || ""),
    textHi: String(form.get("textHi") || form.get("text.hi") || ""),
    author: form.get("author"),
    active: form.get("active"),
    mood: form.get("mood") || "hope",
    featured: form.get("featured"),
    scheduledFor: String(form.get("scheduledFor") || ""),
    locale: form.get("locale") || "en",
  });
  if (!parsed.success) return jsonError("Please check the quote.");

  const record = { ...quotePayloadFromForm(form), created_by: auth.user?.id ?? null };
  if (!canPublishContent(auth.role)) {
    record.featured = false;
    record.active = false;
  }
  if (!auth.supabase) return Response.json({ ok: true, preview: record });
  const { data, error } = await auth.supabase.from("quotes").insert(record).select("*").single();
  if (error) return jsonError(error.message, 500);
  if (record.featured && data?.id) {
    const { error: featuredError } = await auth.supabase
      .from("quotes")
      .update({ featured: false })
      .neq("id", data.id);
    if (featuredError) {
      return Response.json({
        ok: true,
        quote: data,
        warning: "Saved, but other featured quotes could not be cleared.",
      });
    }
  }
  return Response.json({ ok: true, quote: data });
}

async function readQuoteInput(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    const body = (await request.json()) as Record<string, string>;
    const form = new FormData();
    Object.entries(body).forEach(([key, value]) => form.set(key, String(value ?? "")));
    return form;
  }
  return request.formData();
}
