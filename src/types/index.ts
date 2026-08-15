export type Locale = "en" | "te" | "hi" | "ta" | "kn" | "ml";

export type TranslationMap = Partial<Record<Locale, string>>;

export type ContentStatus = "draft" | "published";

export type VideoSource = "cloudinary" | "youtube" | "vimeo" | "mp4";

export type CategoryType = "video" | "story" | "blog" | "resource";

export interface Category {
  id: string;
  slug: string;
  name: string;
  names: TranslationMap;
  description: string;
  descriptions?: TranslationMap;
  type: CategoryType;
}

export interface Video {
  id: string;
  slug: string;
  title: string;
  description: string;
  tags: string[];
  categoryId: string;
  featured: boolean;
  thumbnailUrl: string;
  source: VideoSource;
  cloudinaryPublicId?: string;
  mp4Url?: string;
  youtubeId?: string;
  vimeoId?: string;
  durationSeconds: number;
  likes: number;
  views: number;
  status: ContentStatus;
  publishedAt: string;
  titles?: TranslationMap;
  descriptions?: TranslationMap;
  tagsByLocale?: Partial<Record<Locale, string[]>>;
  seoTitle?: TranslationMap;
  seoDescription?: TranslationMap;
  searchTerms?: string[];
}

export interface Story {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  authorName: string;
  authorRole: string;
  categoryId: string;
  thumbnailUrl: string;
  readingMinutes: number;
  featured: boolean;
  publishedAt: string;
  titles?: TranslationMap;
  excerpts?: TranslationMap;
  bodies?: TranslationMap;
  searchTerms?: string[];
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  categoryId: string;
  thumbnailUrl: string;
  tags: string[];
  aiGenerated: boolean;
  readingMinutes: number;
  publishedAt: string;
  titles?: TranslationMap;
  excerpts?: TranslationMap;
  bodies?: TranslationMap;
  seoTitle?: TranslationMap;
  seoDescription?: TranslationMap;
  searchTerms?: string[];
}

export interface Quote {
  id: string;
  text: string;
  translations: TranslationMap;
  author: string;
  active: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  quotes?: TranslationMap;
  roles?: TranslationMap;
  avatarUrl: string;
  locale?: Locale;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  questions: TranslationMap;
  answers: TranslationMap;
}

export interface ResourceItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  body: string;
  category:
    | "tips"
    | "coping"
    | "family"
    | "faq";
  icon: "sun" | "heart" | "users" | "help";
  titles?: TranslationMap;
  summaries?: TranslationMap;
  bodies?: TranslationMap;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  roles?: TranslationMap;
  bios?: TranslationMap;
}

export interface CrisisResource {
  id: string;
  name: string;
  description: string;
  phone?: string;
  hours?: string;
  url?: string;
  region: "india" | "international";
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  contactEmail: string;
  social: {
    instagram?: string;
    youtube?: string;
    twitter?: string;
    facebook?: string;
  };
}

export interface AdminUser {
  id: string;
  email: string;
  fullName: string;
  role: "admin" | "editor" | "viewer";
  createdAt: string;
}

export interface AnalyticsSnapshot {
  visitors: number;
  videoViews: number;
  storiesRead: number;
  newsletterSignups: number;
  helpClicks: number;
  weekly: { label: string; views: number; visitors: number }[];
}
