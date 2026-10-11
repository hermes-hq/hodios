---
schema: 1
id: write-typeorm-entities
kind: prompt
title: Write TypeORM entities and queries
description: Writes TypeORM entities with relations, indexes and cascades, generates and reviews migrations instead of using synchronize, and writes repository or QueryBuilder queries that avoid N+1 loads.
category: data
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, fullstack-engineer]
stack: [typescript, nodejs]
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
tags: [typeorm, orm, entities, schema-migrations, relations]
pairs_with:
  prompts: [design-database-schema, review-database-migration, fix-n-plus-one-queries, write-prisma-schema]
args:
  - name: data_model
    description: The entities and rules in plain words, or the change to existing entities, including which fields are unique, optional or required and what should happen on delete.
    type: text
    required: true
  - name: database
    description: Database and TypeORM version, and whether the project uses NestJS, if the agent cannot read it from the repository.
    type: string
output_contract:
  format: markdown
  sections: [Entities, Design notes, Migration, Queries, Check, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
TypeORM's sharpest edge is `synchronize: true`: it alters the schema at startup to match the entities and will drop a renamed column with its data, so it belongs only in throwaway local setups; real environments use generated migrations that someone reads. `migration:generate` writes a rename as drop and add, and changing a column type may recreate it. A relation is lazy only when declared as `Promise<T>`; otherwise it is simply undefined unless loaded with `relations` or a join, and `eager: true` loads it on every find, including where it is not wanted. `cascade: true` cascades inserts and updates through the object graph, which can create or overwrite rows by accident; `onDelete` is a database foreign key option, a different thing. Postgres does not index foreign key columns automatically, so `@Index` is needed on relation columns used in filters. `decimal` columns come back as strings, `bigint` as strings too, and dates depend on the driver; a column transformer or explicit handling avoids silent bugs. In QueryBuilder, string-built `where` clauses with input are SQL injection; named parameters are not. `find` with `relations` on several one-to-many relations creates a large cartesian JOIN; `relationLoadStrategy: "query"` or separate queries fix it.
</context>

<task>
Data model or change: {{data_model}}
{{#database}}Database: {{database}}{{/database}}

1. Read the data source config (check `synchronize`, `migrationsRun`, naming strategy), existing entities, migrations, and the services or repositories that query the affected tables. Follow the project's conventions.
2. Write the entities: primary key strategy, columns with explicit types, lengths and nullability, `decimal` with a transformer or integer minor units for money, enums, `@Index` and `@Unique`, timestamps, and relations with explicit `onDelete` and deliberate `cascade` (usually only insert for owned children).
3. Generate the migration with the TypeORM CLI, read it, and fix renames, type changes, defaults for new non-null columns and backfills by hand.
4. Write the queries the feature needs with the repository API or QueryBuilder: named parameters, selected relations or joins instead of eager loading, pagination with `skip`/`take` or keyset, and a separate query strategy where several collections are loaded.
5. Run the migration on a local database, then run the type check and tests, including one that would catch an N+1 or a cartesian join on the main read path. Report the results.
</task>

<constraints>
- Never enable `synchronize` for shared, staging or production databases, and do not run migrations against them yourself.
- Do not accept a generated migration that drops a column holding data without the user confirming.
- Do not use `eager: true` on collections without a stated reason.
- Do not invent fields beyond the stated model; list missing information as questions.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Entities
Each entity in a fenced block with its path.
## Design notes
Bullets on keys, types, indexes, cascades and delete behaviour.
## Migration
The reviewed migration, with what was edited by hand and why.
## Queries
The repository or QueryBuilder code for the main reads and writes.
## Check
Commands run with real results.
## Open questions
Numbered, or "None".
</output_format>
