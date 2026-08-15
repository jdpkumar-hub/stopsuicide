-- stopsuicide.in PostgreSQL schema for Supabase
-- Run this in the SQL editor after creating a project.

create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  role text not null default 'viewer' check (role in ('admin', 'editor', 'viewer')),
  created_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  name_hi text,
  names jsonb not null default '{}'::jsonb,
  description text,
  type text not null check (type in ('video', 'story', 'blog', 'resource'))
);

create table if not exists public.videos (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text not null,
  tags text[] not null default '{}',
  titles jsonb not null default '{}'::jsonb,
  descriptions jsonb not null default '{}'::jsonb,
  seo_title jsonb not null default '{}'::jsonb,
  seo_description jsonb not null default '{}'::jsonb,
  tags_te text[] not null default '{}',
  search_terms text[] not null default '{}',
  category_id uuid references public.categories(id),
  featured boolean not null default false,
  thumbnail_url text,
  source text not null check (source in ('cloudinary', 'youtube', 'vimeo', 'mp4')),
  cloudinary_public_id text,
  mp4_url text,
  youtube_id text,
  vimeo_id text,
  duration_seconds integer not null default 0,
  likes integer not null default 0,
  views integer not null default 0,
  status text not null default 'published' check (status in ('draft', 'published')),
  published_at timestamptz not null default now()
);

create table if not exists public.stories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text not null,
  body text not null,
  titles jsonb not null default '{}'::jsonb,
  excerpts jsonb not null default '{}'::jsonb,
  bodies jsonb not null default '{}'::jsonb,
  search_terms text[] not null default '{}',
  author_name text,
  author_role text,
  category_id uuid references public.categories(id),
  thumbnail_url text,
  reading_minutes integer not null default 4,
  featured boolean not null default false,
  published_at timestamptz not null default now()
);

create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text not null,
  body text not null,
  titles jsonb not null default '{}'::jsonb,
  excerpts jsonb not null default '{}'::jsonb,
  bodies jsonb not null default '{}'::jsonb,
  seo_title jsonb not null default '{}'::jsonb,
  seo_description jsonb not null default '{}'::jsonb,
  search_terms text[] not null default '{}',
  category_id uuid references public.categories(id),
  thumbnail_url text,
  tags text[] not null default '{}',
  ai_generated boolean not null default false,
  reading_minutes integer not null default 3,
  published_at timestamptz not null default now()
);

create table if not exists public.quotes (
  id uuid primary key default gen_random_uuid(),
  text text not null,
  text_hi text,
  translations jsonb not null default '{}'::jsonb,
  author text,
  active boolean not null default true
);

create table if not exists public.daily_motivations (
  id uuid primary key default gen_random_uuid(),
  for_date date unique not null,
  text text not null,
  translations jsonb not null default '{}'::jsonb,
  author text not null default 'AI Daily Motivation',
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  source text not null default 'ai' check (source in ('ai', 'catalog')),
  created_at timestamptz not null default now(),
  approved_at timestamptz
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  quote text not null,
  quotes jsonb not null default '{}'::jsonb,
  roles jsonb not null default '{}'::jsonb,
  locale text default 'en',
  avatar_url text
);

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.volunteer_applications (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  city text,
  interest text,
  message text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  id int primary key default 1,
  site_name text not null default 'stopsuicide.in',
  tagline text not null default 'You Are Not Alone',
  contact_email text,
  social jsonb not null default '{}'::jsonb
);

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.videos enable row level security;
alter table public.stories enable row level security;
alter table public.articles enable row level security;
alter table public.quotes enable row level security;
alter table public.daily_motivations enable row level security;
alter table public.testimonials enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.contact_messages enable row level security;
alter table public.volunteer_applications enable row level security;
alter table public.site_settings enable row level security;

create policy "public read categories" on public.categories for select using (true);
create policy "public read videos" on public.videos for select using (status = 'published');
create policy "public read stories" on public.stories for select using (true);
create policy "public read articles" on public.articles for select using (true);
create policy "public read quotes" on public.quotes for select using (active = true);
create policy "public read approved daily motivations" on public.daily_motivations for select using (status = 'approved');
create policy "public read testimonials" on public.testimonials for select using (true);
create policy "public read settings" on public.site_settings for select using (true);

create policy "anyone can subscribe" on public.newsletter_subscribers for insert with check (true);
create policy "anyone can contact" on public.contact_messages for insert with check (true);
create policy "anyone can volunteer" on public.volunteer_applications for insert with check (true);
create policy "anyone can submit testimonial" on public.testimonials for insert with check (true);

create or replace function public.is_staff()
returns boolean language sql stable as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('admin', 'editor')
  );
$$;

create policy "staff write videos" on public.videos for all using (public.is_staff());
create policy "staff write stories" on public.stories for all using (public.is_staff());
create policy "staff write articles" on public.articles for all using (public.is_staff());
create policy "staff write quotes" on public.quotes for all using (public.is_staff());
create policy "staff write daily motivations" on public.daily_motivations for all using (public.is_staff());
create policy "staff write categories" on public.categories for all using (public.is_staff());
create policy "staff write testimonials" on public.testimonials for all using (public.is_staff());
create policy "staff read contacts" on public.contact_messages for select using (public.is_staff());
create policy "staff read volunteers" on public.volunteer_applications for select using (public.is_staff());
create policy "staff read subscribers" on public.newsletter_subscribers for select using (public.is_staff());
create policy "staff manage profiles" on public.profiles for all using (public.is_staff());

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
