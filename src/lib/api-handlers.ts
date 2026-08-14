import { jsonError, requireAdmin } from "@/lib/admin";
import { slugify } from "@/lib/utils";
import { newsletterSchema, contactSchema, volunteerSchema, quoteSchema } from "@/lib/validations";

async function insert(table: string, payload: Record<string, unknown>, authRequired = false) {
  if (authRequired) {
    const auth = await requireAdmin();
    if (auth.error) return jsonError(auth.error, auth.status);
    if (!auth.supabase) return Response.json({ ok: true, preview: payload });
    const { error } = await auth.supabase.from(table).insert(payload);
    if (error) return jsonError(error.message, 500);
    return Response.json({ ok: true });
  }

  const { createServiceClient } = await import("@/lib/supabase/admin");
  const supabase = createServiceClient();
  if (!supabase) return Response.json({ ok: true, preview: true });
  const { error } = await supabase.from(table).insert(payload);
  if (error) return jsonError(error.message, 500);
  return Response.json({ ok: true });
}

export async function handleNewsletter(request: Request) {
  const body = await request.json();
  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) return jsonError("Enter a valid email.");
  return insert("newsletter_subscribers", {
    email: parsed.data.email,
    created_at: new Date().toISOString(),
  });
}

export async function handleContact(request: Request) {
  const body = await request.json();
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) return jsonError("Please complete the contact form.");
  return insert("contact_messages", { ...parsed.data, created_at: new Date().toISOString() });
}

export async function handleVolunteer(request: Request) {
  const body = await request.json();
  const parsed = volunteerSchema.safeParse(body);
  if (!parsed.success) return jsonError("Please complete the volunteer form.");
  return insert("volunteer_applications", { ...parsed.data, created_at: new Date().toISOString() });
}

export async function handleQuote(request: Request) {
  const body = await request.json();
  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) return jsonError("Please check the quote.");
  return insert(
    "quotes",
    { ...parsed.data, active: true },
    true,
  );
}

export async function handleCategory(request: Request) {
  const body = await request.json();
  return insert(
    "categories",
    {
      slug: slugify(String(body.name || "")),
      name: body.name,
      name_hi: body.nameHi,
      description: body.description,
      type: body.type,
    },
    true,
  );
}

export async function handleBlog(request: Request) {
  const body = await request.json();
  return insert(
    "articles",
    {
      slug: slugify(String(body.title || "")),
      title: body.title,
      excerpt: body.excerpt,
      body: body.body,
      tags: String(body.tags || "")
        .split(",")
        .map((tag: string) => tag.trim())
        .filter(Boolean),
      ai_generated: true,
      reading_minutes: 3,
      published_at: new Date().toISOString(),
      thumbnail_url:
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80",
    },
    true,
  );
}

export async function handleTestimonial(request: Request) {
  const body = await request.json();
  return insert(
    "testimonials",
    {
      name: body.name,
      role: body.role,
      quote: body.quote,
      avatar_url:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
    },
    true,
  );
}
