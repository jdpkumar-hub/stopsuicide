import { handleBlog } from "@/lib/api-handlers";

export async function POST(request: Request) {
  return handleBlog(request);
}
