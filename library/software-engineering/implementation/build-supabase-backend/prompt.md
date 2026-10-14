---
schema: 1
id: build-supabase-backend
kind: prompt
title: Build an app backend on Supabase
description: Sets up a Supabase backend for an app with migrations, row-level security on every table, auth-linked profiles, storage policies and typed client queries, tested locally.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [fullstack-engineer, backend-engineer, founder]
stack: [supabase, typescript]
requires: [repo-read, file-write, shell]
inputs: [spec, repo]
output: [code, tests, config]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [row-level-security, baas, postgres-policies, auth, migrations]
args:
  - name: app_data
    description: The app's main data and who may do what with it, for example "users create projects, invite members; members read and comment, owners edit and delete".
    type: text
    required: true
  - name: client
    description: Where the app calls Supabase from, for example "Next.js with server and client components" or "Expo mobile app".
    type: string
output_contract:
  format: markdown
  sections: [Data model, Changes, Access matrix, Tests, Verification, Setup steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
With Supabase the browser talks to Postgres through the Data API using the public key (`anon`, or the newer publishable key), so row-level security is the only thing between any visitor and your data. The frequent failures: a table created without `enable row level security`, so it is world-readable; a policy that checks `auth.uid()` on SELECT but not `WITH CHECK` on INSERT and UPDATE, so users can write rows as someone else; the `service_role` (or newer secret) key shipped to the client; a view that bypasses RLS because it lacks `security_invoker`; a `security definer` function without a fixed `search_path`; and policies that join through membership tables without indexes, so every query gets slow.
</context>

<task>
Build the Supabase backend for this app:

{{app_data}}

{{#client}}
Client: {{client}}
{{/client}}

1. Read the repo: `supabase/` folder, existing migrations, generated types, how the client is created (`@supabase/ssr`, `supabase-js`), and any server code. Follow what exists.
2. Design the tables with primary keys, foreign keys, `not null`, check constraints, `created_at` defaults and an `owner` or `user_id` column referencing `auth.users(id)` where rows belong to a user. Add a `profiles` table filled by a trigger on `auth.users` insert, using a `security definer` function with `set search_path = ''`.
3. Write everything as migrations (`supabase migration new <name>`), never as dashboard clicks.
4. Enable RLS on every table in exposed schemas. For each table write separate policies per command (select, insert, update, delete) and role (`authenticated`, `anon`), with `USING` and `WITH CHECK` as needed. Put membership checks in a `security definer` helper function where they repeat, and index every column the policies filter on. Write `(select auth.uid())` rather than bare `auth.uid()` in policies so Postgres evaluates it once per query, not per row.
5. Create storage buckets with policies keyed on the object path (for example the first folder is the user id) and mark buckets public only for truly public files.
6. Generate TypeScript types (`supabase gen types typescript --local`) and write typed query helpers for the app's main reads and writes, using the user's session client, not `service_role`.
7. Keep `service_role` or secret keys for trusted server code only (cron, admin tasks, webhooks), read from server environment variables.
8. Test policies against the local stack (`supabase start`, `supabase db reset`): SQL tests with pgTAP if the project uses it, or integration tests that sign in as two users and prove each can only see and change their own or their team's rows, and that `anon` sees only what it should.
9. Run the tests and list remaining manual setup (auth providers, email templates, redirect URLs) for the user.
</task>

<constraints>
- Do not run migrations or `db push` against a remote project, and do not reset any non-local database, without the user's confirmation.
- Never put the `service_role` key or database password in client code, the repo or logs.
- No `using (true)` policies on tables holding user data unless the data is meant to be public, and say so.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Data model
Tables with key columns and relations, in a short list.

## Changes
One line per file: `path`, what changed.

## Access matrix
Table: Table | anon | authenticated owner | team member | other user.

## Tests
One line per test.

## Verification
Commands run and their real results.

## Setup steps
Dashboard or CLI steps the user must do, numbered.
</output_format>
