---
schema: 1
id: write-mongoose-schema
kind: prompt
title: Write Mongoose schemas and models
description: Writes Mongoose schemas and models with validation, indexes, virtuals, middleware, lean queries and TypeScript types, avoiding defaults that skip validation or build indexes in production.
category: data
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, fullstack-engineer]
stack: [mongodb, nodejs]
requires: [repo-read, file-write, shell]
inputs: [repo, spec]
output: [code, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [mongoose, odm, validation, indexes, typescript-types]
pairs_with:
  prompts: [design-mongodb-schema, optimize-mongodb-queries, write-mongodb-aggregation]
args:
  - name: data_model
    description: The documents to model in plain words, or the change to existing schemas, including which fields are required, unique, embedded or referenced.
    type: text
    required: true
  - name: setup
    description: Mongoose version, TypeScript or JavaScript, and how the app connects and deploys, if the agent cannot read it from the repository.
    type: text
output_contract:
  format: markdown
  sections: [Schemas, Design notes, Index rollout, Check, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Mongoose adds a schema to a database that has none, and its defaults trip people up. Validators run on `save()` and `create()` but not on `updateOne`, `findOneAndUpdate` or `updateMany` unless `runValidators: true` is set, so updates write invalid data. `unique: true` is an index, not a validator: it fails with a duplicate key error (E11000) only if the index exists, and it is not built if `autoIndex` is off or the collection already holds duplicates. `autoIndex` builds indexes at startup, which is fine in development and risky on large production collections; production indexes belong in a migration or a deliberate `syncIndexes` step. Middleware differs by operation: `pre('save')` does not run for `findOneAndUpdate`, and `this` means a document in one and a query in the other. Arrays that grow without limit inside a document hit the 16 MB cap and slow every read; references with `populate` or a separate collection fit unbounded children. `lean()` returns plain objects without getters, virtuals or defaults, which is faster for reads but changes what callers get. Since Mongoose 7, `strictQuery` defaults to `false`, so filter fields that are not in the schema are sent to MongoDB as they are instead of being stripped; set it explicitly rather than relying on the version default. With TypeScript, types inferred from the schema (`InferSchemaType`, `HydratedDocument`) avoid a hand-written interface drifting from the schema.
</context>

<task>
Data model or change: {{data_model}}
{{#setup}}Setup: {{setup}}{{/setup}}

1. Read the existing schemas, models, connection setup (including `autoIndex` and `strict` options) and the queries that use the affected collections. Follow the project's conventions for file layout, timestamps and id handling.
2. Decide embed or reference for each relation from size and access pattern: embed small bounded data read with the parent, reference unbounded or independently updated data. Say why in one line each.
3. Write the schemas: types, `required`, enums, `min`/`max`, custom validators, defaults, `timestamps`, and compound indexes that match the real queries (equality fields first, then sort, then range), with `unique` and `partialFilterExpression` where needed.
4. Add virtuals, instance or static methods and middleware only where they earn their place, with the right hook for each operation. Set `runValidators: true` where updates bypass validation.
5. Export typed models (inferred types or a typed schema) and use `lean()` with the matching type for read-only paths.
6. Plan the index rollout: how new indexes get built in production (migration script or `syncIndexes` run on purpose), and what happens if existing data violates a new unique index.
7. Write tests against a test database or an in-memory server, covering validation on create and on update, the unique index, and middleware. Run them and the type check, and report the results.
</task>

<constraints>
- Do not drop indexes or collections, or run `syncIndexes` against a shared or production database yourself.
- Do not rely on `unique` for validation without saying the index must exist and existing duplicates must be cleaned first.
- Do not invent fields beyond the stated model; list missing information as questions.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Schemas
Each schema and model in a fenced block with its path.
## Design notes
Bullets on embed or reference choices, indexes, validators, middleware and lean use.
## Index rollout
How and when indexes are built in each environment, and the duplicate cleanup if needed.
## Check
Commands run with real results.
## Open questions
Numbered, or "None".
</output_format>
