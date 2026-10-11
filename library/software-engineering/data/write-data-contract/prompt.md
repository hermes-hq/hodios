---
schema: 1
id: write-data-contract
kind: prompt
title: Write a data contract
description: Writes a data contract between the producer and consumers of a table, topic or feed, covering schema, meaning, keys, quality rules, freshness, ownership and change policy as reviewable YAML.
category: data
version: 1.0.0
status: incubating
stage: [design, build]
role: [data-engineer, backend-engineer, data-analyst]
requires: [none]
inputs: [schema, text, spec]
output: [config, docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [data-contract, data-ownership, schema, freshness, breaking-changes, data-quality]
pairs_with:
  prompts: [write-data-quality-checks, write-data-dictionary, review-event-schema-change]
  personas: [data-engineer, analytics-engineer]
args:
  - name: dataset
    description: The table, topic or feed with its current schema, what produces it, and what it is used for.
    type: text
    required: true
  - name: consumers
    description: Who reads it and what they rely on, for example "finance dashboard needs yesterday's orders by 06:00 UTC; ML team joins on customer_id".
    type: text
    required: true
  - name: format
    description: Optional. A contract format or template your organisation uses. Leave empty for a plain YAML layout.
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, Contract, Enforcement, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most data incidents are upstream changes nobody told downstream about: a column renamed in an application migration, a status value added, a timestamp switched to local time, a backfill that rewrote history. A data contract makes the producer's promises explicit and checkable: the schema and its types, the grain and keys, what each field means (including units, time zones and nullability), allowed values, quality rules, freshness and delivery time, retention, personal data classification, who owns it, how consumers are told about changes, and what counts as a breaking change with how much notice it gets. It only works if it is versioned next to the producing code, checked in CI or at runtime, and owned by the producer. A contract copied from the current schema without the meaning, the guarantees and the change policy is just a schema.
</context>

<task>
<dataset>
{{dataset}}
</dataset>
<consumers>
{{consumers}}
</consumers>
{{#format}}
Use this format:
{{format}}
{{/format}}

1. Record assumptions: what you inferred about grain, keys, time zones and units from names alone.
2. Write the contract with: identity (name, version, owner team and contact role, status), purpose, grain and primary key, each field with type, meaning, unit or time zone, nullability, allowed values or range, and personal-data classification; quality rules (uniqueness, referential checks, accepted values, volume bounds); service levels (freshness, delivery time, availability) drawn from what consumers need; retention and history (are rows updated, deleted, backfilled); and the change policy (what is breaking, notice period, versioning, deprecation steps, how consumers are notified).
3. Keep the promises realistic: set service levels the producer can measure, and say what happens when they are missed.
4. Describe enforcement: where each rule is checked (producer CI, pipeline tests, runtime monitors), what fails the build versus what alerts.
5. List open questions for the producer and consumers to agree on before the contract is signed off.
</task>

<constraints>
- Do not invent business meanings, owners, SLAs or classifications; use placeholders like `<owner team>` and list them in Open questions.
- Keep the YAML valid and the field list complete for the given schema.
- Do not classify data as non-personal unless the fields make that clear.
{{> output/uncertainty}}
</constraints>

<output_format>
## Assumptions
Bullets.

## Contract
One YAML code block.

## Enforcement
Table: Rule | Where checked | On failure.

## Open questions
Numbered, each addressed to producer or consumer.
</output_format>
