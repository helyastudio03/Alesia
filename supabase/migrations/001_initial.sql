-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Children table
create table public.children (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  first_name text not null,
  last_name text not null,
  birth_date date not null,
  grade_level text not null,
  learning_style text,
  interests text[],
  subjects text[],
  notes text,
  avatar_url text
);

alter table public.children enable row level security;

create policy "Users can manage their own children"
  on public.children for all
  using (auth.uid() = user_id);

-- Lessons table
create table public.lessons (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  child_id uuid references public.children(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  subject text not null,
  grade_level text not null,
  duration_minutes integer not null default 45,
  objectives text[] not null default '{}',
  content text not null,
  activities text[] not null default '{}',
  materials text[] not null default '{}',
  assessment text not null default '',
  status text not null default 'draft' check (status in ('draft', 'active', 'completed'))
);

alter table public.lessons enable row level security;

create policy "Users can manage their own lessons"
  on public.lessons for all
  using (auth.uid() = user_id);
