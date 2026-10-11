---
schema: 1
id: write-jpa-entity-mappings
kind: prompt
title: Write JPA entity mappings
description: Writes JPA or Hibernate entities with correct associations, lazy fetch types, cascades, equals and hashCode, and an id strategy that avoids the common Hibernate performance and correctness traps.
category: data
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer]
stack: [java]
requires: [repo-read, file-write, shell]
inputs: [repo, spec, schema]
output: [code, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [jpa, hibernate, entity-mapping, associations, fetch-strategy]
pairs_with:
  prompts: [fix-jpa-lazy-loading-error, fix-n-plus-one-queries, design-database-schema]
args:
  - name: data_model
    description: The entities and relationships in plain words or the existing table schema, plus how they are read and written.
    type: text
    required: true
  - name: setup
    description: Java and framework versions (for example Spring Boot 3 with Hibernate 6), database, and how the schema is managed (Flyway, Liquibase, ddl-auto).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Entities, Mapping decisions, Tests, Check, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most JPA trouble comes from defaults. `@ManyToOne` and `@OneToOne` are eager by default, so loading a list of entities fires extra queries or huge joins; set them to `LAZY` and fetch what each use case needs with a join fetch or entity graph. `@OneToMany` without `mappedBy` creates a join table nobody wanted. A unidirectional one-to-many or `List` on a many-to-many causes delete-and-reinsert of the whole collection on change; `Set` and a bidirectional mapping with helper methods that set both sides avoid that. `CascadeType.ALL` or `REMOVE` on a `@ManyToOne` deletes the parent with the child. `equals` and `hashCode` based on a generated id break in `HashSet` before persist, and Lombok's `@Data` on entities pulls lazy associations into `toString` and `hashCode`; use a natural key or the id-with-constant-hashCode pattern. `GenerationType.IDENTITY` disables JDBC batch inserts in Hibernate, while `SEQUENCE` with an allocation size batches well on databases that have sequences. Open Session in View hides lazy-loading problems until production, and `ddl-auto=update` is not a migration tool.
</context>

<task>
Data model: {{data_model}}
Setup: {{setup}}

1. Read the existing entities, base classes, repositories and migration scripts. Follow existing conventions for ids, auditing fields and naming.
2. Write the entities: id strategy chosen for the database (sequence with allocation size where available), columns with nullability, length and precision, enums as `STRING`, `@Version` where concurrent updates are possible, and table constraints and indexes.
3. Map associations: `LAZY` on to-one sides, `mappedBy` on the inverse side, `Set` for many-to-many, cascades only from owner to owned children, `orphanRemoval` only for true composition, and helper methods that keep both sides in sync.
4. Implement `equals`, `hashCode` and `toString` safely, without Lombok `@Data` and without touching lazy associations.
5. Write the migration script for the schema in the project's tool (Flyway or Liquibase), matching the mappings exactly, and set Hibernate schema validation if the project allows.
6. Write repository tests (for example `@DataJpaTest` with the real database via Testcontainers if the project uses it) that persist, load with a join fetch, check the number of SQL statements for one listing path, and remove children. Run them and report.
</task>

<constraints>
- Do not rely on `ddl-auto=update` or `create` for anything beyond local experiments.
- Do not add `FetchType.EAGER` to fix a lazy-loading error; fix the query instead.
- Do not invent fields or relationships beyond the data model; ask.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Entities
Code blocks with file paths.
## Mapping decisions
Bullets: association, owner side, fetch, cascade and why; id strategy; equals and hashCode approach.
## Tests
Code blocks with file paths, plus the migration script.
## Check
Commands run with real results.
## Open questions
Numbered, or "None".
</output_format>
