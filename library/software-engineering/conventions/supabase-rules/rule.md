---
schema: 1
id: supabase-rules
kind: rule
title: Supabase rules
description: Standing rules for Supabase apps covering RLS on every table, tested policies, keys kept out of clients, typed generated clients, migrations in the repo, storage policies and edge function secrets.
category: conventions
version: 1.0.0
status: incubating
stage: [build]
role: [fullstack-engineer, backend-engineer]
stack: [supabase]
requires: [none]
output: [code]
risk: read-only
invocation: user
model_tier: mid
level: intermediate
tags: [row-level-security, migrations, edge-functions, auth, typed-client]
applies_to: ["supabase/**", "**/*.sql", "**/*.ts", "**/*.tsx"]
pairs_with:
  rules: [sql-style-rules, database-migration-rules]
  prompts: [build-supabase-backend, secure-supabase-project]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you write or change code in this Supabase project:

**Know the setup first**
- Check for the `supabase/` folder with `config.toml` and `migrations/`, the client libraries in use (supabase-js, SSR helpers, mobile SDKs) and how auth is set up. Work against the local stack (`supabase start`) and never run experiments against the production project.

**Row Level Security**
- Enable RLS on every table in an exposed schema (`public` by default), in the same migration that creates the table. A table without RLS is readable and writable by anyone with the anon key.
- Write explicit policies per operation (`select`, `insert`, `update`, `delete`) and role (`authenticated`, `anon`). Use `(select auth.uid())` rather than `auth.uid()` directly so it is evaluated once per query, and index the columns used in policies (`user_id`).
- `update` policies need both `using` and `with check`, or users can move rows to another owner.
- Do not base authorisation on `user_metadata`; users can change it. Use `app_metadata`, a roles table, or custom claims set server-side.
- Put tables that should never be exposed in a non-exposed schema, and make `security definer` functions set `search_path` and live outside exposed schemas unless intended as RPCs.

**Keys and clients**
- Only the anon (publishable) key goes to browsers and mobile apps. The service role (secret) key bypasses RLS; use it only on the server or in edge functions, never in client code, environment variables prefixed for the client bundle, or the repository.
- In server-rendered apps, create the client per request with the user's session (SSR helpers), not one shared client with a service key.
- Generate TypeScript types from the schema (`supabase gen types`) and use the typed client. Regenerate after each migration.

**Schema and migrations**
- Change the schema only through migration files in `supabase/migrations/`, created locally and committed, never by clicking in the production dashboard. If someone did change production, pull the diff into a migration.
- Add foreign keys, `not null` and check constraints in the database, not only in the app. Index foreign keys and filtered columns.
- Destructive migrations (dropping columns or tables) need a person's confirmation and a deploy-safe sequence.

**Storage**
- Storage buckets are private unless the content is truly public. Write storage policies on `storage.objects` that scope access by bucket and path (for example a folder per user id).
- Use signed URLs with short expiry for private files.

**Edge functions and server code**
- Read secrets with `Deno.env.get` from secrets set with the CLI; never hard-code them. Verify the caller's JWT and create a client with their auth header unless the function must bypass RLS, and then check permissions explicitly.
- Validate request bodies, set CORS for your origins only, and return consistent error responses.

**Realtime**
- Postgres Changes subscriptions deliver only rows the subscriber can select when RLS is enabled on the table; a table without RLS streams every change to any subscriber. Check that subscribers cannot receive rows they cannot select. Use private channels with authorization for broadcast and presence on sensitive data.

**Before you finish**
- Run migrations locally from scratch (`supabase db reset`), run pgTAP or integration tests that check policies as `anon`, a regular user and another user, regenerate types, and run the app's tests. Say what you ran.
