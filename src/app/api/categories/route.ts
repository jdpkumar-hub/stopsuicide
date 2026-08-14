import { handleCategory } from "@/lib/api-handlers";

export async function POST(request: Request) {
  return handleCategory(request);
}
