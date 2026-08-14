import { getSessionUser } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/admin";

export async function requireAdmin() {
  const user = await getSessionUser();
  const supabase = createServiceClient();
  const allowDevPreview =
    process.env.NODE_ENV !== "production" &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!user && !allowDevPreview) {
    return { error: "Unauthorized", status: 401 as const, user: null, supabase: null };
  }
  return { error: null, status: 200 as const, user, supabase };
}

export function jsonError(message: string, status = 400) {
  return Response.json({ error: message }, { status });
}

export function extractYouTubeId(url?: string | null) {
  if (!url) return undefined;
  const match = url.match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/);
  return match?.[1];
}

export function extractVimeoId(url?: string | null) {
  if (!url) return undefined;
  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return match?.[1];
}
