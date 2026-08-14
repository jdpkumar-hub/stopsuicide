import { handleQuote } from "@/lib/api-handlers";

export async function POST(request: Request) {
  return handleQuote(request);
}
