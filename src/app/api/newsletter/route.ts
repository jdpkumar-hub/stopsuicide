import { handleNewsletter } from "@/lib/api-handlers";

export async function POST(request: Request) {
  return handleNewsletter(request);
}
