# stopsuicide.in

A calm, hope-focused platform for resilience, recovery, and mental wellness.

This site is **not a crisis service**. Every page includes a visible **Get Help** section with India-first helplines and international resources. Content is written to emphasise connection and recovery, never graphic or sensational detail.

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS v4
- Framer Motion
- Supabase Auth + PostgreSQL
- Cloudinary for video and thumbnail storage

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Seed content is used until Supabase is connected, so the public site works immediately.

## Environment

See `.env.example`:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- Cloudinary cloud name, API key, and API secret

## Supabase

1. Create a project.
2. Run `supabase/schema.sql` in the SQL editor.
3. Create an Auth user and set `profiles.role` to `admin`.
4. Add the keys to `.env.local`.

Admin routes at `/admin` require a signed-in staff user once Supabase is configured.

## Cloudinary

Admin video upload accepts:

- Thumbnail image
- MP4 file (stored on Cloudinary)
- YouTube link
- Vimeo link
- Title, description, tags, category, featured toggle

Metadata is saved in PostgreSQL.

## Safety notes

- Keep **Get Help** on every page.
- Do not publish methods, graphic imagery, or sensational headlines.
- Encourage people to contact trusted people and professional support.
- India: Tele-MANAS 14416, KIRAN 1800-599-0019, iCall 9152987821, AASRA, Vandrevala.
- Emergency: 112 in India.

If you are in crisis, call a local helpline or emergency number. In the United States, call or text 988.
