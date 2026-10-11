---
schema: 1
id: migrate-firebase-to-supabase
kind: prompt
title: Migrate an app from Firebase to Supabase
description: Moves an app from Firebase to Supabase, covering auth users and password hashes, Firestore to Postgres modelling, security rules to RLS, functions, storage and old app versions.
category: migration
version: 1.0.0
status: incubating
stage: [plan, build]
role: [fullstack-engineer, mobile-engineer, backend-engineer]
stack: [firebase, supabase]
requires: [repo-read, file-write, shell]
inputs: [repo, schema, text]
output: [plan, code, checklist]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [baas-migration, firestore, row-level-security, auth-migration, data-remodelling]
pairs_with:
  prompts: [build-supabase-backend, secure-supabase-project, audit-firebase-security-rules, migrate-auth-provider]
  personas: [migration-engineer]
args:
  - name: app
    description: Platforms (web, iOS, Android), Firebase products used (Auth providers, Firestore or Realtime Database, Storage, Functions, FCM), data size, and user count.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Inventory, Data model, Auth migration, "Rules, functions and storage", Cutover and client rollout, Remaining risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Firebase to Supabase is three migrations at once: auth, data model and security model. Firebase Auth exports users with password hashes in a modified scrypt format; whether those hashes can be verified on the target decides between a seamless move and forced password resets or lazy migration on next sign-in, so check current support before promising either. Firebase uids are strings, not UUIDs, and every document that stores a uid needs a mapping. Firestore data is shaped for reads, with duplicated fields and subcollections; Postgres wants normalized tables with foreign keys, using JSONB only for truly schemaless parts. Security rules do not translate mechanically into row-level security policies: rules are evaluated per request path, RLS per row, and every table needs RLS enabled or it is open to the public API key. Cloud Functions triggers map to database triggers, webhooks or edge functions. Firestore client features such as offline persistence and latency-compensated writes have no direct equivalent, which changes app behaviour. Mobile apps already installed keep talking to Firebase until users update, so there must be a transition period.
</context>

<task>
App: {{app}}

1. Read the client code, Firestore or Realtime Database structure, security rules, functions and storage usage. Build the inventory and list the read and write paths the app actually uses.
2. Design the Postgres schema from those access patterns: tables, keys (keep Firebase ids as text where they are referenced externally), foreign keys, indexes, JSONB only where justified.
3. Plan auth: export users, decide on hash import, lazy migration or reset based on verified support, reconfigure OAuth providers with the same client ids where possible, and keep a uid mapping.
4. Rewrite each security rule as RLS policies with tests for allowed and denied cases. Map functions and storage rules.
5. Write the data migration as a repeatable script with counts and spot checks, and plan how writes during the transition are handled (Firebase read-only, dual write, or a final sync).
6. Plan the rollout: backend ready, new app versions released, a minimum version gate or in-app update prompt, and a date to shut Firebase writes. Note offline behaviour changes for the product owner.
</task>

<constraints>
- Do not leave any table without RLS enabled and tested.
- Do not promise users keep their passwords until hash import support is confirmed.
- Do not run migrations or exports against production; give scripts and steps for the user.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Inventory
Auth providers and user count, collections and access patterns, rules, functions, storage buckets, client platforms.
## Data model
Firestore collections mapped to tables, keys, relations and JSONB use.
## Auth migration
How users, password hashes, OAuth providers and ids move.
## Rules, functions and storage
Security rules to RLS policies, functions to triggers or edge functions, storage policies.
## Cutover and client rollout
Data sync, app release order, handling old app versions.
## Remaining risks
Bullets, or "None".
</output_format>
