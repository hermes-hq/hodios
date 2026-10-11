---
schema: 1
id: draw-database-er-diagram
kind: prompt
title: Draw a database ER diagram
description: Draws entity-relationship diagrams in Mermaid or DBML from a schema or ORM models, grouped by domain, with keys, cardinality from real constraints and relationships that exist only in code.
category: docs
version: 1.0.0
status: incubating
stage: [discover, design, maintain]
role: [backend-engineer, data-engineer, dba, architect]
stack: []
requires: [repo-read]
inputs: [schema, repo, file]
output: [diagram, docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [er-diagram, mermaid, dbml, foreign-keys, cardinality]
pairs_with:
  prompts: [write-data-dictionary, design-database-schema, write-c4-diagram]
args:
  - name: schema_source
    description: The DDL, migrations, ORM models or a path to them in the repository.
    type: text
    required: true
  - name: format
    description: The diagram language to output.
    type: enum
    enum: [mermaid, dbml]
    default: mermaid
output_contract:
  format: markdown
  sections: [Overview, Diagrams, Relationship notes, Gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
One diagram with sixty tables is unreadable, and tool-generated ones show every column so the relationships disappear. A good ER diagram groups tables by domain (billing, catalogue, users) with one diagram per group, plus a small overview showing how the groups connect. Cardinality has to come from constraints, not table names. A nullable foreign key means zero-or-one on that side, and a unique foreign key means one-to-one. A join table with only two keys is a many-to-many, while a join table with its own columns is a real entity. ORMs often declare relationships that have no foreign key in the database, which matters for integrity and for anyone writing SQL directly. Polymorphic references (a type column plus an id column) cannot be enforced by the database and should be shown differently.
</context>

<task>
<schema_source>
{{schema_source}}
</schema_source>

1. Read the full schema. If migrations are given, apply them in order to get the current state, including dropped and renamed columns.
2. List every table with its primary key, foreign keys (with nullability and uniqueness), unique constraints and soft-delete columns.
3. Find relationships declared only in ORM code (associations without a database constraint) and polymorphic references.
4. Group tables by domain using naming, foreign keys and module structure. Shared tables such as users can appear in several groups as a reference.
5. Draw one {{format}} diagram per group showing keys, foreign keys and only the columns that explain the relationships. Derive cardinality from the constraints. Then draw a small overview of groups and the links between them.
6. Note relationships that look wrong: foreign keys without an index, missing foreign keys where code joins tables, and circular dependencies.
</task>

<constraints>
- Every relationship comes from a constraint or a named ORM association. Label code-only relationships as such, for example with a comment or dashed style.
- Do not invent tables, columns or cardinalities. If the source is partial, diagram what is there and list what is missing.
- Mermaid output must be valid erDiagram syntax; DBML output must use Ref lines with the correct `<`, `>` or `-` direction.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Overview
The group list and a small diagram of how groups connect.
## Diagrams
One code block per group.
## Relationship notes
Table: relationship, cardinality, source (constraint or ORM only), note.
## Gaps
Partial sources, polymorphic references and suspicious relationships. Or "None".
</output_format>
