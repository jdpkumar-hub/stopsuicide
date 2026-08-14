import { handleContact } from "@/lib/api-handlers";

export async function POST(request: Request) {
  return handleContact(request);
}
