import {
  articles as seedArticles,
  categories as seedCategories,
  quotes as seedQuotes,
  resources as seedResources,
  stories as seedStories,
  testimonials as seedTestimonials,
  videos as seedVideos,
} from "@/lib/data/seed";
import { createServerSupabase } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/admin";
import { expandSearchQuery, videoCopy } from "@/lib/i18n/content";
import { toKolkataDateStamp } from "@/lib/cms/time";
import { getApprovedMotivation, getTodayStamp } from "@/lib/motivation/store";
import { toQuoteShape } from "@/lib/motivation/generate";
import { unicodeNormalize } from "@/lib/i18n/locales";
import type {
  Article,
  Category,
  ContentStatus,
  MediaAsset,
  MediaKind,
  Quote,
  QuoteMood,
  Story,
  StoryModeration,
  Testimonial,
  Video,
  VideoSource,
} from "@/types";

type Row = Record<string, unknown>;

function str(row: Row, ...keys: string[]) {
  for (const key of keys) {
    const value = row[key];
    if (typeof value === "string") return value;
  }
  return "";
}

function num(row: Row, ...keys: string[]) {
  for (const key of keys) {
    const value = row[key];
    if (typeof value === "number") return value;
  }
  return 0;
}

function bool(row: Row, ...keys: string[]) {
  for (const key of keys) {
    const value = row[key];
    if (typeof value === "boolean") return value;
  }
  return false;
}

function mapVideo(row: Row): Video {
  return {
    id: str(row, "id"),
    slug: str(row, "slug"),
    title: str(row, "title"),
    description: str(row, "description"),
    tags: Array.isArray(row.tags) ? (row.tags as string[]) : [],
    categoryId: str(row, "categoryId", "category_id"),
    featured: bool(row, "featured"),
    thumbnailUrl: str(row, "thumbnailUrl", "thumbnail_url"),
    source: (str(row, "source") as VideoSource) || "mp4",
    cloudinaryPublicId: str(row, "cloudinaryPublicId", "cloudinary_public_id") || undefined,
    mp4Url: str(row, "mp4Url", "mp4_url") || undefined,
    youtubeId: str(row, "youtubeId", "youtube_id") || undefined,
    vimeoId: str(row, "vimeoId", "vimeo_id") || undefined,
    durationSeconds: num(row, "durationSeconds", "duration_seconds"),
    likes: num(row, "likes"),
    views: num(row, "views"),
    status: parseContentStatus(str(row, "status")),
    publishedAt: str(row, "publishedAt", "published_at") || new Date().toISOString(),
    titles: parseMap(row.titles || row.title_i18n),
    descriptions: parseMap(row.descriptions || row.description_i18n),
    tagsByLocale: Array.isArray(row.tags_te) ? { te: row.tags_te as string[] } : undefined,
    seoTitle: parseMap(row.seo_title),
    seoDescription: parseMap(row.seo_description),
    searchTerms: Array.isArray(row.search_terms) ? (row.search_terms as string[]) : undefined,
  };
}

function parseMap(value: unknown): Video["titles"] {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as Video["titles"];
  }
  return undefined;
}

function hydrateVideo(video: Video): Video {
  const copy = videoCopy[video.id];
  if (!copy) return video;
  return {
    ...video,
    titles: copy.titles,
    descriptions: copy.descriptions,
    tagsByLocale: { te: copy.tagsTe },
    searchTerms: copy.searchTerms,
  };
}

function mapStory(row: Row): Story {
  return {
    id: str(row, "id"),
    slug: str(row, "slug"),
    title: str(row, "title"),
    excerpt: str(row, "excerpt"),
    body: str(row, "body"),
    authorName: str(row, "authorName", "author_name"),
    authorRole: str(row, "authorRole", "author_role"),
    categoryId: str(row, "categoryId", "category_id"),
    thumbnailUrl: str(row, "thumbnailUrl", "thumbnail_url"),
    readingMinutes: num(row, "readingMinutes", "reading_minutes") || 4,
    featured: bool(row, "featured"),
    publishedAt: str(row, "publishedAt", "published_at"),
    titles: parseMap(row.titles),
    excerpts: parseMap(row.excerpts),
    bodies: parseMap(row.bodies),
    searchTerms: Array.isArray(row.search_terms) ? (row.search_terms as string[]) : undefined,
    status: parseStoryStatus(str(row, "status")),
    anonymous: bool(row, "anonymous"),
    videoUrl: str(row, "videoUrl", "video_url") || undefined,
    attachments: Array.isArray(row.attachments)
      ? (row.attachments as Story["attachments"])
      : undefined,
  };
}

function mapArticle(row: Row): Article {
  return {
    id: str(row, "id"),
    slug: str(row, "slug"),
    title: str(row, "title"),
    excerpt: str(row, "excerpt"),
    body: str(row, "body"),
    categoryId: str(row, "categoryId", "category_id"),
    thumbnailUrl: str(row, "thumbnailUrl", "thumbnail_url"),
    tags: Array.isArray(row.tags) ? (row.tags as string[]) : [],
    aiGenerated: bool(row, "aiGenerated", "ai_generated"),
    readingMinutes: num(row, "readingMinutes", "reading_minutes") || 3,
    publishedAt: str(row, "publishedAt", "published_at"),
    status: parseContentStatus(str(row, "status") || "published"),
    scheduledAt: str(row, "scheduledAt", "scheduled_at") || undefined,
    titles: parseMap(row.titles),
    excerpts: parseMap(row.excerpts),
    bodies: parseMap(row.bodies),
    seoTitle: parseMap(row.seo_title),
    seoDescription: parseMap(row.seo_description),
    searchTerms: Array.isArray(row.search_terms) ? (row.search_terms as string[]) : undefined,
  };
}

function mapCategory(row: Row): Category {
  return {
    id: str(row, "id"),
    slug: str(row, "slug"),
    name: str(row, "name"),
    names: parseMap(row.names) ?? { en: str(row, "name"), te: str(row, "name_te"), hi: str(row, "nameHi", "name_hi") },
    description: str(row, "description"),
    type: (str(row, "type") as Category["type"]) || "video",
  };
}

function mapQuote(row: Row): Quote {
  return {
    id: str(row, "id"),
    text: str(row, "text"),
    translations: parseMap(row.translations) ?? { hi: str(row, "textHi", "text_hi"), te: str(row, "text_te") },
    author: str(row, "author"),
    active: row.active === undefined ? true : bool(row, "active"),
    mood: (str(row, "mood") as QuoteMood) || "hope",
    featured: bool(row, "featured"),
    scheduledFor: str(row, "scheduledFor", "scheduled_for") || undefined,
    locale: (str(row, "locale") as Quote["locale"]) || "en",
  };
}

function mapMedia(row: Row): MediaAsset {
  return {
    id: str(row, "id"),
    url: str(row, "url"),
    publicId: str(row, "publicId", "public_id") || undefined,
    kind: (str(row, "kind") as MediaKind) || "image",
    folder: str(row, "folder") || "images",
    alt: str(row, "alt"),
    createdAt: str(row, "createdAt", "created_at") || new Date().toISOString(),
  };
}

function parseContentStatus(value: string): ContentStatus {
  if (value === "draft" || value === "archived") return value;
  return "published";
}

function parseStoryStatus(value: string): StoryModeration {
  if (value === "pending" || value === "rejected") return value;
  return "approved";
}

function mapTestimonial(row: Row): Testimonial {
  return {
    id: str(row, "id"),
    name: str(row, "name"),
    role: str(row, "role"),
    quote: str(row, "quote"),
    quotes: parseMap(row.quotes),
    roles: parseMap(row.roles),
    avatarUrl: str(row, "avatarUrl", "avatar_url"),
    locale: (str(row, "locale") as Testimonial["locale"]) || undefined,
  };
}

async function fromTable(table: string): Promise<Row[] | null> {
  const supabase = await createServerSupabase();
  if (!supabase) return null;
  const { data, error } = await supabase.from(table).select("*");
  if (error || !data?.length) return null;
  return data as Row[];
}

async function fromTableAdmin(table: string): Promise<Row[] | null> {
  const service = createServiceClient();
  if (service) {
    const { data, error } = await service.from(table).select("*");
    if (!error && data) return data as Row[];
  }
  return fromTable(table);
}

export async function getCategories(): Promise<Category[]> {
  const rows = await fromTable("categories");
  return rows ? rows.map(mapCategory) : seedCategories;
}

export async function getVideos(): Promise<Video[]> {
  const rows = await fromTable("videos");
  const list = (rows ? rows.map(mapVideo) : seedVideos).map(hydrateVideo);
  return list
    .filter((video) => video.status === "published")
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

export async function getAllVideosAdmin(): Promise<Video[]> {
  const rows = await fromTableAdmin("videos");
  return (rows ? rows.map(mapVideo) : seedVideos).map(hydrateVideo);
}

export async function getVideo(slug: string) {
  const videos = await getVideos();
  return videos.find((video) => video.slug === slug || video.id === slug);
}

export async function getFeaturedVideos() {
  const videos = await getVideos();
  return videos.filter((video) => video.featured).slice(0, 6);
}

export async function getRelatedVideos(video: Video, limit = 4) {
  const videos = await getVideos();
  return videos
    .filter(
      (item) =>
        item.id !== video.id &&
        (item.categoryId === video.categoryId ||
          item.tags.some((tag) => video.tags.includes(tag))),
    )
    .slice(0, limit);
}

export async function getStories(): Promise<Story[]> {
  const rows = await fromTable("stories");
  const list = rows ? rows.map(mapStory) : seedStories;
  return list.filter((story) => (story.status ?? "approved") === "approved");
}

export async function getAllStoriesAdmin(): Promise<Story[]> {
  const rows = await fromTableAdmin("stories");
  return rows ? rows.map(mapStory) : seedStories;
}

export async function getStory(slug: string) {
  const stories = await getStories();
  return stories.find((story) => story.slug === slug);
}

export async function getArticles(): Promise<Article[]> {
  const rows = await fromTable("articles");
  const list = rows ? rows.map(mapArticle) : seedArticles;
  const now = Date.now();
  return list.filter((article) => {
    if ((article.status ?? "published") !== "published") return false;
    if (article.scheduledAt && new Date(article.scheduledAt).getTime() > now) return false;
    return true;
  });
}

export async function getAllArticlesAdmin(): Promise<Article[]> {
  const rows = await fromTableAdmin("articles");
  return rows ? rows.map(mapArticle) : seedArticles;
}

export async function getArticle(slug: string) {
  const articles = await getArticles();
  return articles.find((article) => article.slug === slug);
}

export async function getQuotes(): Promise<Quote[]> {
  const rows = await fromTable("quotes");
  return (rows ? rows.map(mapQuote) : seedQuotes).filter((quote) => quote.active);
}

export async function getAllQuotesAdmin(): Promise<Quote[]> {
  const rows = await fromTableAdmin("quotes");
  return rows ? rows.map(mapQuote) : seedQuotes;
}

export async function getDailyQuote() {
  const approved = await getApprovedMotivation();
  if (approved) return toQuoteShape(approved);

  const quotes = await getAllQuotesAdmin();
  const active = quotes.filter((quote) => quote.active);
  const today = getTodayStamp();
  const scheduled = active.find((quote) => toKolkataDateStamp(quote.scheduledFor) === today);
  if (scheduled) return scheduled;
  const featured = active.find((quote) => quote.featured);
  if (featured) return featured;
  if (!active.length) return seedQuotes[0];
  const index = Math.floor(Date.now() / 86_400_000) % active.length;
  return active[index];
}

export async function getMediaAssets(): Promise<MediaAsset[]> {
  const rows = await fromTableAdmin("media_assets");
  return rows ? rows.map(mapMedia) : [];
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const rows = await fromTable("testimonials");
  return rows ? rows.map(mapTestimonial) : seedTestimonials;
}

export function getResources() {
  return seedResources;
}

export async function searchAll(query: string) {
  const q = unicodeNormalize(query.trim());
  const expanded = expandSearchQuery(query);

  const [videos, stories, articles] = await Promise.all([
    getVideos(),
    getStories(),
    getArticles(),
  ]);

  if (!q) {
    return { videos, stories, articles };
  }

  const match = (...parts: Array<string | string[] | undefined>) => {
    const blob = unicodeNormalize(parts.flat().filter(Boolean).join(" "));
    return expanded.some((term) => term && blob.includes(term));
  };

  return {
    videos: videos.filter((item) =>
      match(
        item.title,
        item.description,
        item.tags,
        item.searchTerms,
        Object.values(item.titles ?? {}),
        Object.values(item.descriptions ?? {}),
        Object.values(item.tagsByLocale ?? {}).flat(),
      ),
    ),
    stories: stories.filter((item) =>
      match(
        item.title,
        item.excerpt,
        item.body,
        item.searchTerms,
        Object.values(item.titles ?? {}),
        Object.values(item.excerpts ?? {}),
        Object.values(item.bodies ?? {}),
      ),
    ),
    articles: articles.filter((item) =>
      match(
        item.title,
        item.excerpt,
        item.body,
        item.tags,
        item.searchTerms,
        Object.values(item.titles ?? {}),
        Object.values(item.excerpts ?? {}),
        Object.values(item.bodies ?? {}),
      ),
    ),
  };
}

export function categoryById(id: string, list: Category[]) {
  return list.find((category) => category.id === id);
}
