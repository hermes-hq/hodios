---
schema: 1
id: model-polymorphic-associations
kind: prompt
title: Model polymorphic associations
description: Models a relation that can point at several entity types, such as comments, attachments or likes, comparing polymorphic type-and-id columns, exclusive arcs and join tables, with DDL and queries.
category: data
version: 1.0.0
status: incubating
stage: [design]
role: [backend-engineer, fullstack-engineer, architect]
stack: [sql]
requires: [none]
inputs: [schema, text]
output: [code, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [polymorphic-associations, exclusive-arc, referential-integrity, orm-relations, join-tables]
pairs_with:
  prompts: [design-database-schema, model-hierarchical-data]
args:
  - name: need
    description: What relates to what, for example "comments on posts, photos and videos" or "attachments on invoices, tickets and projects", with expected counts and the main queries.
    type: text
    required: true
  - name: stack
    description: Database engine and the ORM or framework, since some ORMs have built-in polymorphic support.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Options compared, Recommendation, DDL, Queries, ORM mapping, Migration notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Frameworks make the polymorphic pattern easy: `commentable_type` plus `commentable_id`. It is convenient and has real costs: the database cannot enforce a foreign key, so deleting a post leaves orphan comments; queries need the type in every join; and type strings tied to class names break on renames. Alternatives: an exclusive arc (one nullable foreign key column per parent type plus a CHECK that exactly one is set) keeps real foreign keys and cascades, and works well for a handful of types that rarely change; separate join tables per parent (post_comments, photo_comments) keep integrity but duplicate structure; a shared supertype table (every commentable thing has a row in `commentables`, and each parent references it) gives one foreign key target at the cost of an extra table. The right choice depends on how many parent types exist, how often new ones are added, whether integrity and cascading deletes matter, and the queries ("all comments for this post" versus "all activity by this user across types").
</context>

<task>
Need: {{need}}
Stack: {{stack}}

1. Restate the relation: the child entity, the parent types, cardinality, and the main read and delete paths.
2. Compare the options for this case: polymorphic columns, exclusive arc, per-parent join tables, supertype table. For each: integrity, cascading deletes, query shape, adding a new parent type, ORM support.
3. Recommend one with the reason.
4. Write the DDL for the recommendation in the stated engine: tables, foreign keys, CHECK constraints, indexes for the main queries, and for polymorphic columns, a stable type value (not a class name) plus a cleanup strategy for orphans.
5. Write the main queries: children for one parent, children across types with parent details, and delete behaviour.
6. Show how the stated ORM maps it, using its native features where they exist.
7. If an existing schema uses a different pattern, outline moving to the recommendation without downtime, or say it is not worth it.
</task>

<constraints>
- Do not claim a foreign key exists where the pattern cannot have one.
- Use only CHECK and constraint features supported by the stated engine version (older MySQL ignored CHECK constraints).
- Do not invent ORM APIs; mark uncertain ones to verify.
{{> output/uncertainty}}
</constraints>

<output_format>
## Options compared
Table: option | integrity | deletes | queries | new parent type | ORM support.

## Recommendation
Two to four lines.

## DDL
SQL.

## Queries
SQL for the main paths.

## ORM mapping
Code.

## Migration notes
Bullets or "not needed".
</output_format>
