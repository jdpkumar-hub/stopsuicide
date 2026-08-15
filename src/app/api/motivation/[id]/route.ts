import { jsonError, requireAdmin } from "@/lib/admin";
import { updateMotivation } from "@/lib/motivation/store";

type Params = { params: Promise<{ id: string }> };

export async function POST(request: Request, { params }: Params) {
  const { id } = await params;
  const auth = await requireAdmin();
  if (auth.error) return jsonError(auth.error, auth.status);

  const body = await request.json().catch(() => ({}));
  const action = String(body.action || "");
  const text = typeof body.text === "string" ? body.text.trim() : undefined;
  const textTe = typeof body.textTe === "string" ? body.textTe.trim() : undefined;
  const textHi = typeof body.textHi === "string" ? body.textHi.trim() : undefined;

  try {
    if (action === "approve") {
      const motivation = await updateMotivation(id, {
        status: "approved",
        text,
        translations: {
          en: text,
          te: textTe,
          hi: textHi,
        },
      });
      return Response.json({ ok: true, motivation });
    }
    if (action === "reject") {
      const motivation = await updateMotivation(id, { status: "rejected" });
      return Response.json({ ok: true, motivation });
    }
    if (action === "save") {
      const motivation = await updateMotivation(id, {
        status: "pending",
        text,
        translations: { en: text, te: textTe, hi: textHi },
      });
      return Response.json({ ok: true, motivation });
    }
    return jsonError("Unknown action.");
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Could not update motivation.", 500);
  }
}
