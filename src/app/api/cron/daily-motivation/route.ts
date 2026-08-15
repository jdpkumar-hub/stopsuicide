import { generateMotivation, getTodayStamp } from "@/lib/motivation/store";

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  const header = request.headers.get("authorization");
  const unauthorized =
    process.env.NODE_ENV === "production" && (!secret || header !== `Bearer ${secret}`);
  if (unauthorized) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await generateMotivation(getTodayStamp(), false);
    return Response.json({
      ok: true,
      forDate: result.motivation.forDate,
      created: result.created,
      status: result.motivation.status,
    });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Generation failed" },
      { status: 500 },
    );
  }
}

export const POST = GET;
