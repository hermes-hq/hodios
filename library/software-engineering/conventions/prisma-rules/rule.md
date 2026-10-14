---
schema: 1
id: prisma-rules
kind: rule
title: Prisma rules
description: Standing rules for Prisma code covering schema conventions, the migrate workflow, select over include, N+1 queries, transactions, raw SQL safety, error codes and one client per process.
category: conventions
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, fullstack-engineer]
stack: [typescript, nodejs]
requires: [none]
output: [code]
risk: read-only
invocation: user
model_tier: mid
level: intermediate
depth: specific
tags: [prisma-orm, migrations, transactions, query-efficiency, connection-management]
applies_to: ["**/schema.prisma", "prisma/**", "**/*.ts", "**/*.js"]
pairs_with:
  prompts: [write-prisma-schema, fix-n-plus-one-queries, review-database-migration]
  rules: [typescript-strict-rules]
  personas: [backend-engineer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you write or change code that uses Prisma in this project:

**Know the project first**
- Check the Prisma version in `package.json`, the database provider and `relationMode` in `schema.prisma`, and how the project creates and shares its client. Follow the existing naming (`@map` and `@@map` for snake_case tables) and id strategy. Setup differs by major version (Prisma 7 moved connection URLs into `prisma.config.ts` and uses driver adapters for the client); follow the setup of the version in use and do not mix the two.

**Schema**
- Add `@@index` on foreign key fields and on fields used in filters and sorts; do not assume the database indexes foreign keys, and with `relationMode = "prisma"` there are no database foreign keys at all.
- Set `onDelete` explicitly on relations where the default is not what the domain needs.
- Use `Decimal` or integer minor units for money, never `Float`. Use native types (`@db.VarChar(n)`, `@db.Timestamptz`) where length or precision matters.
- To rename a field or model, keep the database name with `@map` or edit the migration SQL; a plain rename generates a drop and add that loses data.

**Migrations**
- Create migrations with `prisma migrate dev` (use `--create-only` to read and edit the SQL first) and commit them. Apply them in deployment with `prisma migrate deploy`.
- Never run `prisma db push`, `migrate reset` or `migrate dev` against a shared, staging or production database, and never edit a migration that has already been applied elsewhere.
- Adding a required column to a table with rows needs a default or a backfill step; say which.
- Use a direct (non-pooled) connection URL for migrations when the app connects through a transaction-mode pooler.

**Client lifecycle**
- Create one `PrismaClient` per process and import it everywhere. In frameworks with hot reload, cache it on `globalThis` in development so reloads do not open new connection pools.
- In serverless functions, keep the client outside the handler and limit the pool per instance, or connect through a pooler, so many concurrent instances do not exhaust database connections.

**Queries**
- Use `select` to fetch only the fields you need; use `include` only when you need whole related records. Never return full user records (with password hashes or tokens) from an API.
- No queries inside loops. Load related data with `include` or `select` on the relation, or batch with `where: { id: { in: ids } }`. Use `createMany`, `updateMany` or a transaction for bulk writes.
- Paginate every list that can grow, with `take` and a cursor or `skip`, and a stable `orderBy`.
- Use `findUnique` for lookups by a unique field and `findFirst` only for non-unique filters. Guard `updateMany` and `deleteMany` so an empty `where` cannot touch every row.

**Transactions and concurrency**
- Use `$transaction` when several writes must succeed or fail together. Keep interactive transactions short: no HTTP calls, emails or other slow work inside them, and set a timeout.
- For read-then-write logic (stock counts, balances), use atomic updates (`increment`, `decrement`, conditional `where`) or a unique constraint, not a read followed by a separate write.

**Raw SQL**
- Use the tagged-template `$queryRaw` and `$executeRaw`, which parameterise values. Never build SQL strings by concatenation or pass user input to `$queryRawUnsafe` or `$executeRawUnsafe`.

**Errors and types**
- Catch `Prisma.PrismaClientKnownRequestError` and map known codes, such as `P2002` (unique constraint) and `P2025` (record not found), to the API's own errors instead of leaking raw messages.
- Use Prisma's generated types (`Prisma.UserGetPayload`, `Prisma.UserCreateInput`) instead of hand-written duplicates. Convert `Decimal` and `BigInt` deliberately before JSON serialisation.
- Use client extensions (`$extends`) for cross-cutting behaviour; the old `$use` middleware API is deprecated and removed in recent major versions.

**Before finishing**
- Run `prisma format`, `prisma validate` and `prisma generate`, then the type check and tests against a local or test database. Report what ran.
