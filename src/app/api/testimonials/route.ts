import { handleTestimonial } from "@/lib/api-handlers";

export async function POST(request: Request) {
  return handleTestimonial(request);
}
