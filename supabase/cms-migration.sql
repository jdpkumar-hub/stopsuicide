-- Additive CMS migration for existing stopsuicide.in databases.
-- Safe to re-run. New installs should use schema.sql instead.

alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles
  add constraint profiles_role_check check (role in ('admin', 'editor', 'author', 'viewer'));

alter table public.videos drop constraint if exists videos_status_check;
alter table public.videos
  add constraint videos_status_check check (status in ('draft', 'published', 'archived'));
alter table public.videos add column if not exists created_by uuid references public.profiles(id);

alter table public.stories add column if not exists status text not null default 'approved';
alter table public.stories drop constraint if exists stories_status_check;
alter table public.stories
  add constraint stories_status_check check (status in ('pending', 'approved', 'rejected'));
alter table public.stories add column if not exists anonymous boolean not null default false;
alter table public.stories add column if not exists video_url text;
alter table public.stories add column if not exists attachments jsonb not null default '[]'::jsonb;
alter table public.stories add column if not exists created_by uuid references public.profiles(id);

alter table public.articles add column if not exists status text not null default 'published';
alter table public.articles drop constraint if exists articles_status_check;
alter table public.articles
  add constraint articles_status_check check (status in ('draft', 'published', 'archived'));
alter table public.articles add column if not exists scheduled_at timestamptz;
alter table public.articles add column if not exists created_by uuid references public.profiles(id);

alter table public.quotes add column if not exists mood text not null default 'hope';
alter table public.quotes add column if not exists featured boolean not null default false;
alter table public.quotes add column if not exists scheduled_for date;
alter table public.quotes add column if not exists locale text not null default 'en';
alter table public.quotes add column if not exists created_by uuid references public.profiles(id);

create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  url text not null,
  public_id text,
  kind text not null default 'image' check (kind in ('image', 'video', 'file')),
  folder text not null default 'images',
  alt text not null default '',
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

alter table public.media_assets enable row level security;

create or replace function public.is_staff()
returns boolean language sql stable as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('admin', 'editor', 'author')
  );
$$;

create or replace function public.is_admin()
returns boolean language sql stable as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

drop policy if exists "public read stories" on public.stories;
create policy "public read stories" on public.stories
  for select using (status = 'approved');

drop policy if exists "public read articles" on public.articles;
create policy "public read articles" on public.articles
  for select using (
    status = 'published' and (scheduled_at is null or scheduled_at <= now())
  );

drop policy if exists "staff write media" on public.media_assets;
drop policy if exists "staff read media" on public.media_assets;
drop policy if exists "staff manage profiles" on public.profiles;
drop policy if exists "read own profile" on public.profiles;
create policy "staff write media" on public.media_assets for all using (public.is_staff());
create policy "read own profile" on public.profiles for select using (auth.uid() = id);
create policy "staff manage profiles" on public.profiles for all using (public.is_admin());
