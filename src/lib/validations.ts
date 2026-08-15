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
});

export const quoteSchema = z.object({
  text: z.string().min(8).max(280),
  textTe: z.string().min(4).max(280).optional().or(z.literal("")),
  textHi: z.string().min(4).max(280).optional().or(z.literal("")),
  author: z.string().min(2).max(80),
  active: z.union([z.boolean(), z.string()]).optional(),
});
