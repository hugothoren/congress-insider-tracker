# Congress Insider Tracker

A fullstack Next.js 16 app for tracking, analyzing and monitoring congressional stock trades under the STOCK Act.

## Features

- App Router with React 19 and Tailwind CSS
- Supabase-ready PostgreSQL setup
- Weighted dashboard for trades, alerts and market signals
- Server actions to mark notifications as read
- Responsive UI for monitoring congressional activity

## Tech stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Lucide Icons
- Supabase client

## Database schema

Use the SQL definitions from the prompt in your Supabase project:

```sql
create type chamber_type as enum ('house', 'senate');
create type party_type as enum ('democrat', 'republican', 'independent');
create type trade_type as enum ('buy', 'sell', 'exchange');

create table public.politicians (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  chamber chamber_type not null,
  party party_type not null,
  state text not null,
  district text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.congress_transactions (
  id uuid primary key default gen_random_uuid(),
  politician_id uuid references public.politicians(id) on delete cascade not null,
  ticker text not null,
  company_name text not null,
  asset_description text,
  type trade_type not null,
  amount_range text not null,
  min_amount numeric,
  max_amount numeric,
  transaction_date date not null,
  disclosure_date date not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  politician_id uuid references public.politicians(id) on delete cascade,
  title text not null,
  body text not null,
  read boolean default false not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Then add your Supabase URL and anon key to `.env.local`.

## Production build

```bash
npm run build
npm run start
```
