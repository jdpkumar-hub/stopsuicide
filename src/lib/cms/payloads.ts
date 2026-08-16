import { uploadToCloudinary } from "@/lib/cloudinary";
import {
  collectTranslations,
  isTruthyFlag,
  parseContentStatus,
  parseLocale,
  parseMediaKind,
  parseMood,
  parseStoryStatus,
  parseTags,
  readingMinutesFromHtml,
} from "@/lib/cms/fields";
import { extractVimeoId, extractYouTubeId } from "@/lib/admin";
import { slugify } from "@/lib/utils";
import type { TranslationMap } from "@/types";

function mergeMaps(...maps: Array<TranslationMap | undefined>): TranslationMap {
  return Object.assign({}, ...maps.filter(Boolean));
}

export async function videoPayloadFromForm(form: FormData, existing?: Record<string, unknown>) {
  const title = String(form.get("title") || "");
  const description = String(form.get("description") || "");
  const youtubeId = extractYouTubeId(String(form.get("youtubeLink") || ""));
  const vimeoId = extractVimeoId(String(form.get("vimeoLink") || ""));
  const titles = mergeMaps(collectTranslations(form, "title"), {
    te: String(form.get("titleTe") || form.get("title.te") || "") || undefined,
  });
  const descriptions = mergeMaps(collectTranslations(form, "description"), {
    te: String(form.get("descriptionTe") || form.get("description.te") || "") || undefined,
  });

  let thumbnailUrl = existing?.thumbnail_url as string | undefined;
  let mp4Url = existing?.mp4_url as string | undefined;
  let cloudinaryPublicId = existing?.cloudinary_public_id as string | undefined;
  let source = (existing?.source as string) || "mp4";

  const thumbnail = form.get("thumbnail");
  const videoFile = form.get("videoFile");
  if (thumbnail instanceof File && thumbnail.size > 0) {
    const uploaded = await uploadToCloudinary(thumbnail, "thumbnails", "image");
    thumbnailUrl = uploaded.secure_url;
  }
  if (videoFile instanceof File && videoFile.size > 0) {
    const uploaded = await uploadToCloudinary(videoFile, "videos", "video");
    mp4Url = uploaded.secure_url;
    cloudinaryPublicId = uploaded.public_id;
    source = "cloudinary";
  }
  if (youtubeId) source = "youtube";
  else if (vimeoId) source = "vimeo";
  else if (mp4Url && cloudinaryPublicId) source = "cloudinary";
  else if (mp4Url) source = "mp4";

  return {
    slug: String(form.get("slug") || "") || slugify(title),
    title,
    description,
    tags: parseTags(form.get("tags")),
    titles,
    descriptions,
    seo_title: mergeMaps(collectTranslations(form, "seoTitle"), {
      en: String(form.get("seoTitle") || title),
      te: String(form.get("titleTe") || titles.te || ""),
    }),
    seo_description: mergeMaps(collectTranslations(form, "seoDescription"), {
      en: String(form.get("seoDescription") || description),
      te: String(form.get("descriptionTe") || descriptions.te || ""),
    }),
    tags_te: parseTags(form.get("tagsTe")),
    category_id: String(form.get("categoryId") || "") || null,
    featured: isTruthyFlag(form.get("featured")),
    thumbnail_url: thumbnailUrl,
    source,
    cloudinary_public_id: cloudinaryPublicId,
    mp4_url: mp4Url,
    youtube_id: youtubeId,
    vimeo_id: vimeoId,
    status: parseContentStatus(form.get("status")),
  };
}

export async function articlePayloadFromForm(
  form: FormData,
  existing?: Record<string, unknown>,
) {
  const title = String(form.get("title") || "");
  const excerpt = String(form.get("excerpt") || "");
  const body = String(form.get("body") || "");
  let thumbnailUrl = String(form.get("thumbnailUrl") || existing?.thumbnail_url || "");
  const cover = form.get("cover");
  if (cover instanceof File && cover.size > 0) {
    const uploaded = await uploadToCloudinary(cover, "images", "image");
    thumbnailUrl = uploaded.secure_url;
  }
  const scheduledAt = String(form.get("scheduledAt") || "");
  return {
    slug: String(form.get("slug") || "") || slugify(title),
    title,
    excerpt,
    body,
    titles: collectTranslations(form, "title"),
    excerpts: collectTranslations(form, "excerpt"),
    bodies: collectTranslations(form, "body"),
    seo_title: mergeMaps(collectTranslations(form, "seoTitle"), {
      en: String(form.get("seoTitle") || title),
    }),
    seo_description: mergeMaps(collectTranslations(form, "seoDescription"), {
      en: String(form.get("seoDescription") || excerpt),
    }),
    category_id: String(form.get("categoryId") || "") || null,
    thumbnail_url:
      thumbnailUrl ||
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80",
    tags: parseTags(form.get("tags")),
    ai_generated: existing ? Boolean(existing.ai_generated) : false,
    reading_minutes: readingMinutesFromHtml(body),
    status: parseContentStatus(form.get("status")),
    scheduled_at: scheduledAt ? new Date(scheduledAt).toISOString() : null,
    published_at: existing?.published_at
      ? String(existing.published_at)
      : new Date().toISOString(),
  };
}

export async function storyPayloadFromForm(form: FormData, existing?: Record<string, unknown>) {
  const title = String(form.get("title") || "");
  const excerpt = String(form.get("excerpt") || "");
  const body = String(form.get("body") || "");
  const anonymous = isTruthyFlag(form.get("anonymous"));
  let thumbnailUrl = String(form.get("thumbnailUrl") || existing?.thumbnail_url || "");
  let videoUrl = String(form.get("videoUrl") || existing?.video_url || "");
  const attachments = Array.isArray(existing?.attachments) ? [...(existing.attachments as object[])] : [];

  const image = form.get("image");
  if (image instanceof File && image.size > 0) {
    const uploaded = await uploadToCloudinary(image, "images", "image");
    thumbnailUrl = uploaded.secure_url;
    attachments.push({ url: uploaded.secure_url, kind: "image", alt: title });
  }
  const video = form.get("video");
  if (video instanceof File && video.size > 0) {
    const uploaded = await uploadToCloudinary(video, "videos", "video");
    videoUrl = uploaded.secure_url;
    attachments.push({ url: uploaded.secure_url, kind: "video", alt: title });
  }

  return {
    slug: String(form.get("slug") || "") || slugify(title),
    title,
    excerpt,
    body,
    titles: collectTranslations(form, "title"),
    excerpts: collectTranslations(form, "excerpt"),
    bodies: collectTranslations(form, "body"),
    author_name: anonymous ? "Anonymous" : String(form.get("authorName") || "Community member"),
    author_role: String(form.get("authorRole") || ""),
    category_id: String(form.get("categoryId") || "") || null,
    thumbnail_url: thumbnailUrl,
    video_url: videoUrl || null,
    attachments,
    reading_minutes: readingMinutesFromHtml(body),
    featured: isTruthyFlag(form.get("featured")),
    status: parseStoryStatus(form.get("status")),
    anonymous,
    published_at: existing?.published_at
      ? String(existing.published_at)
      : new Date().toISOString(),
  };
}

export function quotePayloadFromForm(form: FormData) {
  const translations = mergeMaps(collectTranslations(form, "text"), {
    te: String(form.get("textTe") || "") || undefined,
    hi: String(form.get("textHi") || "") || undefined,
  });
  return {
    text: String(form.get("text") || ""),
    translations,
    author: String(form.get("author") || ""),
    active: isTruthyFlag(form.get("active")),
    mood: parseMood(form.get("mood")),
    featured: isTruthyFlag(form.get("featured")),
    scheduled_for: String(form.get("scheduledFor") || "") || null,
    locale: parseLocale(form.get("locale")),
  };
}

export function mediaKindFromFile(file: File) {
  if (file.type.startsWith("video/")) return parseMediaKind("video");
  if (file.type.startsWith("image/")) return parseMediaKind("image");
  return parseMediaKind("file");
}
