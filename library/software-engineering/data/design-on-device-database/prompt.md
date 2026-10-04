---
schema: 1
id: design-on-device-database
kind: prompt
title: Design an on-device database
description: Designs a local database for a mobile or desktop app on SQLite, Room, Core Data or similar, with schema, list-screen indexes, migrations that never lose user data, encryption and sync scope.
category: data
version: 1.0.0
status: incubating
stage: [design, build]
role: [mobile-engineer, software-engineer]
stack: [sqlite]
requires: [none]
inputs: [text, schema]
output: [code, report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [offline-first, local-storage, schema-migrations, encryption-at-rest, sync, room]
pairs_with:
  prompts: [design-database-schema, migrate-views-to-declarative-ui]
args:
  - name: app_description
    description: What the app stores locally and why (offline use, cache, drafts), the main screens and their lists, sort and search needs, data sizes per user, sensitive fields, what syncs to a server, and the persistence library if chosen.
    type: text
    required: true
  - name: platform
    description: Where the app runs.
    type: enum
    enum: [ios, android, cross-platform, desktop]
    default: cross-platform
output_contract:
  format: markdown
  sections: [Role of local data, Schema, Indexes for screens, Migrations, Encryption and privacy, Sync boundary, Risks and open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A mobile or desktop engineer is designing the local database for an app. Platform: {{platform}}. Local databases fail differently from server ones: a migration bug on one release corrupts or wipes data on millions of devices you cannot reach, users skip versions so every old schema must still upgrade, destructive "drop and recreate" fallbacks silently delete drafts, list screens jank because a query runs on the main thread without an index, and sensitive data sits unencrypted in a backup. The server is the source of truth for some data and not for other data (drafts, offline edits), and that boundary must be explicit.
</context>

<task>
<app_description>
{{app_description}}
</app_description>

1. Role of local data: for each kind of data, say whether the device is a cache of server data (can be rebuilt), the source of truth until synced (offline edits, drafts), or device-only (settings, history). This decides how careful each migration must be.
2. Schema: tables or entities with types, primary keys (client-generated UUIDs for records created offline), foreign keys with delete rules, timestamps stored in UTC, and columns needed for sync (server id, version or updated-at, a dirty or pending flag, a soft-delete tombstone). Use the platform's persistence layer idioms (Room entities and DAOs, Core Data or SwiftData models, an SQLite library) and note where they differ.
3. Indexes for screens: for each list or search screen, the query, the index that serves it (matching filter then sort order), paging approach (keyset over offset for long lists), and full-text search if needed. All database work off the main thread; observe queries reactively where the library supports it.
4. Migrations: a version number per schema, one tested migration step per version so any old version can upgrade in sequence, no destructive fallback for data that is not a rebuildable cache, a pre-migration copy for risky steps, and tests that create a database at each old version with realistic data, migrate it and verify the data. Say how to handle a failed migration at launch (keep the old file, report, offer recovery) instead of crashing in a loop.
5. Encryption and privacy: which fields are sensitive, platform data protection and keychain or keystore-held keys, whether full database encryption is needed, exclusion from cloud backups where appropriate, and what happens on logout (wipe user data).
6. Sync boundary: what syncs, in which direction, conflict rule per entity (last writer wins only where losing an edit is acceptable), and how tombstones are purged after the server confirms.
</task>

<constraints>
- Do not invent library APIs or annotations you are unsure of; mark them to verify in the docs for the stated version.
- If sizes, screens or sync needs are missing and they change the design, ask, and mark assumptions as [X].
- Never recommend a destructive migration fallback for data that only exists on the device.
{{> output/uncertainty}}
</constraints>

<output_format>
## Role of local data
Table: data | role (cache, source until synced, device-only) | migration care.

## Schema
DDL or model definitions in one code block.

## Indexes for screens
Table: screen | query | index | paging.

## Migrations
The versioning rule, an example migration step and the migration test.

## Encryption and privacy
Bullets.

## Sync boundary
Table: entity | direction | conflict rule | tombstone handling.

## Risks and open questions
Bullets.
</output_format>
