create table if not exists public.users (
  id bigint generated always as identity primary key,
  telegram_user_id bigint not null unique,
  chat_id bigint not null unique,
  username text,
  first_name text,
  last_name text,
  current_product_name text,
  current_product_price text,
  current_game_id text,
  awaiting_game_id boolean not null default false,
  awaiting_payment_screenshot boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id bigint generated always as identity primary key,
  user_id bigint references public.users(id) on delete set null,
  telegram_user_id bigint not null,
  telegram_chat_id bigint not null,
  username text,
  first_name text,
  last_name text,
  product_name text not null,
  price text not null,
  game_id text not null,
  payment_file_id text,
  status text not null check (status in ('pending', 'confirmed', 'cancelled')),
  admin_chat_id bigint,
  admin_message_id bigint,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
