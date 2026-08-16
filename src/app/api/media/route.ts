import { uploadToCloudinary } from "@/lib/cloudinary";
import { jsonError, requireAdmin } from "@/lib/admin";
import { mediaKindFromFile } from "@/lib/cms/payloads";
import { getMediaAssets } from "@/lib/data/queries";

export async function GET() {
  const auth = await requireAdmin();
  if (auth.error) return jsonError(auth.error, auth.status);
  return Response.json({ assets: await getMediaAssets() });
}

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (auth.error) return jsonError(auth.error, auth.status);

  const form = await request.formData();
  const file = form.get("file");
  const alt = String(form.get("alt") || "");
  if (!(file instanceof File) || file.size === 0) {
    return jsonError("Choose a file to upload.");
  }

  try {
    const kind = mediaKindFromFile(file);
    const uploaded = await uploadToCloudinary(
      file,
      "media",
      kind === "video" ? "video" : kind === "image" ? "image" : "auto",
    );
    const record = {
      url: uploaded.secure_url,
      public_id: uploaded.public_id,
      kind,
      folder: "media",
      alt,
      created_by: auth.user?.id ?? null,
    };
    if (!auth.supabase) return Response.json({ ok: true, preview: record, url: record.url });
    const { data, error } = await auth.supabase.from("media_assets").insert(record).select("*").single();
    if (error) return jsonError(error.message, 500);
    return Response.json({ ok: true, asset: data, url: record.url, publicId: record.public_id });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Upload failed", 500);
  }
}
