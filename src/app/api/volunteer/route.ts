import { handleVolunteer } from "@/lib/api-handlers";

export async function POST(request: Request) {
  return handleVolunteer(request);
}
