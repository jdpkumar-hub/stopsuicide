import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  subject: z.string().min(3).max(120),
  message: z.string().min(10).max(4000),
});

export const volunteerSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  city: z.string().min(2).max(80),
  interest: z.string().min(2).max(120),
  message: z.string().min(10).max(4000),
});

export const newsletterSchema = z.object({
  email: z.string().email(),
});

export const videoSchema = z.object({
  title: z.string().min(3).max(140),
  description: z.string().min(10).max(4000),
  titleTe: z.string().max(140).optional().or(z.literal("")),
  descriptionTe: z.string().max(4000).optional().or(z.literal("")),
  tags: z.string().optional(),
  tagsTe: z.string().optional(),
  slug: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  categoryId: z.string().min(1),
  featured: z.union([z.boolean(), z.string()]).optional(),
  youtubeLink: z.string().url().optional().or(z.literal("")),
  vimeoLink: z.string().url().optional().or(z.literal("")),
  status: z.enum(["draft", "published", "archived"]).optional(),
});

export const quoteSchema = z.object({
  text: z.string().min(8).max(400),
  textTe: z.string().max(400).optional().or(z.literal("")),
  textHi: z.string().max(400).optional().or(z.literal("")),
  author: z.string().min(2).max(80),
  active: z.union([z.boolean(), z.string()]).optional(),
  mood: z.enum(["hope", "calm", "courage", "gratitude", "belonging"]).optional(),
  featured: z.union([z.boolean(), z.string()]).optional(),
  scheduledFor: z.string().optional().or(z.literal("")),
  locale: z.enum(["en", "te", "hi", "ta", "kn", "ml"]).optional(),
});

export const articleSchema = z.object({
  title: z.string().min(3).max(180),
  excerpt: z.string().min(8).max(600),
  body: z.string().min(20),
  tags: z.string().optional(),
  slug: z.string().optional(),
  categoryId: z.string().optional(),
  thumbnailUrl: z.string().optional().or(z.literal("")),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  status: z.enum(["draft", "published", "archived"]).optional(),
  scheduledAt: z.string().optional().or(z.literal("")),
});

export const storySchema = z.object({
  title: z.string().min(3).max(180),
  excerpt: z.string().min(8).max(600),
  body: z.string().min(20),
  authorName: z.string().max(80).optional().or(z.literal("")),
  authorRole: z.string().max(80).optional().or(z.literal("")),
  slug: z.string().optional(),
  categoryId: z.string().optional(),
  thumbnailUrl: z.string().optional().or(z.literal("")),
  videoUrl: z.string().optional().or(z.literal("")),
  status: z.enum(["pending", "approved", "rejected"]).optional(),
  featured: z.union([z.boolean(), z.string()]).optional(),
  anonymous: z.union([z.boolean(), z.string()]).optional(),
});

export const mediaSchema = z.object({
  alt: z.string().max(160).optional().or(z.literal("")),
  folder: z.enum(["videos", "thumbnails", "images", "media"]).optional(),
});
