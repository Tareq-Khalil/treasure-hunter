create extension if not exists "uuid-ossp";
create table public.profiles(
    id uuid references auth.users(id) on delete cascade primary key,
    username text unique not null,
    avatar_url text,
    created_at timestamptz default now() not null
);
create table public.expedition_progress(
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references public.profiles(id) on delete cascade unique not null,
    unlocked_locations text[] default array['abandoned_dock']::text[],
    unlocked_clues text[] default array[]::text[],
    solved_puzzles text[] default array[]::text[],
    current_node text default 'prologue_start',
    completion_percentage int default 0,
    created_at timestamptz default now() not null,
    updated_at timestamptz default now() not null
);
alter table public.profiles enable row level security;
alter table public.expedition_progress enable row level security;
create policy "Users can read own profile" on public.profiles
    for select using (auth.uid()=id);
create policy "Users can update own profile" on public.profiles
    for update using (auth.uid()=id);
create policy "Users can read own progress" on public.expedition_progress
    for select using (auth.uid()=user_id);
create policy "Users can insert own progress" on public.expedition_progress
    for insert with check (auth.uid()=user_id);
create policy "Users can update own progress" on public.expedition_progress
    for update using (auth.uid()=user_id);
create or replace function public.handle_new_user()
returns trigger as $$
begin
    insert into public.profiles(id,username,avatar_url)
    values(
        new.id,
        coalesce(new.raw_user_meta_data->>'username',split_part(new.email,'@',1)),
        new.raw_user_meta_data->>'avatar_url'
    );
    insert into public.expedition_progress(user_id)
    values(new.id);
    return new;
end;
$$ language plpgsql security definer;
create or replace trigger on_auth_user_created
    after insert on auth.users
    for each row execute function public.handle_new_user();