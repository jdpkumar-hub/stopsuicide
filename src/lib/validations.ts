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
  tags: z.string().optional(),
  categoryId: z.string().min(1),
  featured: z.union([z.boolean(), z.string()]).optional(),
  youtubeLink: z.string().url().optional().or(z.literal("")),
  vimeoLink: z.string().url().optional().or(z.literal("")),
});

export const quoteSchema = z.object({
  text: z.string().min(8).max(280),
  textHi: z.string().min(8).max(280),
  author: z.string().min(2).max(80),
  active: z.union([z.boolean(), z.string()]).optional(),
});
