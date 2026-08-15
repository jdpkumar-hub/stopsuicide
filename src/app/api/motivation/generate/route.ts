import { jsonError, requireAdmin } from "@/lib/admin";
import { generateMotivation, getTodayStamp } from "@/lib/motivation/store";

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (auth.error) return jsonError(auth.error, auth.status);

  const body = await request.json().catch(() => ({}));
  const forDate = String(body.forDate || getTodayStamp());
  const force = Boolean(body.force);

  try {
    const result = await generateMotivation(forDate, force);
    return Response.json({
      ok: true,
      created: result.created,
      motivation: result.motivation,
      note: result.created
        ? "Draft created. Review and approve before it appears on the homepage."
        : "A draft already exists for this date.",
    });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Could not generate motivation.", 500);
  }
}
