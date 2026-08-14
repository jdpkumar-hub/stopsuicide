import { searchAll } from "@/lib/data/queries";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";
  const results = await searchAll(q);
  return Response.json(results);
}
