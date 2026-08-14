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
import type {
  Article,
  Category,
  Quote,
  Story,
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
    status: str(row, "status") === "draft" ? "draft" : "published",
    publishedAt: str(row, "publishedAt", "published_at") || new Date().toISOString(),
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
  };
}

function mapCategory(row: Row): Category {
  return {
    id: str(row, "id"),
    slug: str(row, "slug"),
    name: str(row, "name"),
    nameHi: str(row, "nameHi", "name_hi"),
    description: str(row, "description"),
    type: (str(row, "type") as Category["type"]) || "video",
  };
}

function mapQuote(row: Row): Quote {
  return {
    id: str(row, "id"),
    text: str(row, "text"),
    textHi: str(row, "textHi", "text_hi"),
    author: str(row, "author"),
    active: row.active === undefined ? true : bool(row, "active"),
  };
}

function mapTestimonial(row: Row): Testimonial {
  return {
    id: str(row, "id"),
    name: str(row, "name"),
    role: str(row, "role"),
    quote: str(row, "quote"),
    avatarUrl: str(row, "avatarUrl", "avatar_url"),
  };
}

async function fromTable(table: string): Promise<Row[] | null> {
  const supabase = await createServerSupabase();
  if (!supabase) return null;
  const { data, error } = await supabase.from(table).select("*");
  if (error || !data?.length) return null;
  return data as Row[];
}

export async function getCategories(): Promise<Category[]> {
  const rows = await fromTable("categories");
  return rows ? rows.map(mapCategory) : seedCategories;
}

export async function getVideos(): Promise<Video[]> {
  const rows = await fromTable("videos");
  const list = rows ? rows.map(mapVideo) : seedVideos;
  return list
    .filter((video) => video.status !== "draft")
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

export async function getAllVideosAdmin(): Promise<Video[]> {
  const rows = await fromTable("videos");
  return rows ? rows.map(mapVideo) : seedVideos;
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
  return rows ? rows.map(mapStory) : seedStories;
}

export async function getStory(slug: string) {
  const stories = await getStories();
  return stories.find((story) => story.slug === slug);
}

export async function getArticles(): Promise<Article[]> {
  const rows = await fromTable("articles");
  return rows ? rows.map(mapArticle) : seedArticles;
}

export async function getArticle(slug: string) {
  const articles = await getArticles();
  return articles.find((article) => article.slug === slug);
}

export async function getQuotes(): Promise<Quote[]> {
  const rows = await fromTable("quotes");
  return rows ? rows.map(mapQuote) : seedQuotes;
}

export async function getDailyQuote() {
  const quotes = (await getQuotes()).filter((quote) => quote.active);
  if (!quotes.length) return seedQuotes[0];
  const index = Math.floor(Date.now() / 86_400_000) % quotes.length;
  return quotes[index];
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const rows = await fromTable("testimonials");
  return rows ? rows.map(mapTestimonial) : seedTestimonials;
}

export function getResources() {
  return seedResources;
}

export async function searchAll(query: string) {
  const q = query.trim().toLowerCase();
  const [videos, stories, articles] = await Promise.all([
    getVideos(),
    getStories(),
    getArticles(),
  ]);

  if (!q) {
    return { videos, stories, articles };
  }

  const match = (text: string) => text.toLowerCase().includes(q);

  return {
    videos: videos.filter(
      (item) =>
        match(item.title) ||
        match(item.description) ||
        item.tags.some(match),
    ),
    stories: stories.filter(
      (item) => match(item.title) || match(item.excerpt) || match(item.body),
    ),
    articles: articles.filter(
      (item) =>
        match(item.title) ||
        match(item.excerpt) ||
        item.tags.some(match),
    ),
  };
}

export function categoryById(id: string, list: Category[]) {
  return list.find((category) => category.id === id);
}
