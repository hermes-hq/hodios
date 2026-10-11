---
schema: 1
id: validate-data-migration
kind: prompt
title: Validate a data migration
description: Verifies data moved correctly between an old and new store with row counts, per-column aggregates, hashed record diffs, sampled checks and business invariants, ending in pass or fail.
category: data
version: 1.0.0
status: incubating
stage: [verify]
role: [data-engineer, backend-engineer, dba]
stack: []
requires: [repo-read, file-write, shell]
inputs: [schema, spec, text]
output: [code, report, checklist]
risk: runs-commands
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [data-parity, row-counts, checksums, cutover, data-integrity]
pairs_with:
  prompts: [migrate-database-engine, test-database-migrations, write-data-quality-checks]
  personas: [data-engineer]
args:
  - name: migration
    description: What moved from where to where (engines, tables, any transformation or mapping rules) and whether the source is still taking writes.
    type: text
    required: true
  - name: invariants
    description: Business facts that must still hold, for example "sum of ledger entries per account equals the balance" or "every order has at least one item".
    type: text
  - name: tolerance
    description: What differences are acceptable, for example timestamp precision loss or trimmed trailing spaces.
    type: text
output_contract:
  format: markdown
  sections: [Validation plan, Check code, Results, Verdict, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
"The row counts match" is the most common sign-off and the weakest one: a migration can keep every row and still truncate strings, shift time zones, round decimals, swap character encodings, lose trailing zeros or map an enum wrongly. Real validation works in layers: counts per table and per partition, then per-column aggregates (sum, min, max, null count, distinct count, total length), then a full or chunked hash comparison of rows normalised to a common representation, then targeted sample diffs that show exact differing values, then business invariants. Differences between engines must be normalised before comparing (time zone and precision of timestamps, float versus decimal, collation and trailing spaces, boolean representation, JSON key order), otherwise every row looks different. If the source still takes writes, comparisons need a fixed cutoff, such as a snapshot time or a high-water mark, or they chase a moving target.
</context>

<task>
Migration: {{migration}}
{{#invariants}}Invariants: {{invariants}}{{/invariants}}
{{#tolerance}}Accepted differences: {{tolerance}}{{/tolerance}}

1. Read the migration code and both schemas. Write a column mapping old to new, including transformations, and list each place information could be lost (type narrowing, encoding, precision, time zone, enum mapping, defaults filling missing values).
2. Fix the comparison cutoff: a snapshot or high-water mark both sides are compared at.
3. Write the checks in layers: counts per table and per partition or date; per-column aggregates; chunked row hashes on normalised values keyed by primary key, drilling into mismatching chunks; a random and an edge-case sample diff (nulls, max lengths, unusual characters, oldest and newest rows); and the business invariants.
4. Make the checks read-only, runnable against both stores, and cheap enough not to hurt production (chunked, on replicas where possible).
5. Run them against the environments you have access to, or describe exactly how the user runs them, and fill in results.
6. Give a verdict: pass, pass with accepted differences (listed), or fail with each mismatch, its likely cause and the fix.
</task>

<constraints>
- Read-only. Do not modify either store to make the checks pass.
- Do not report a pass based only on row counts.
- Never hide a mismatch inside a tolerance the user did not accept; list it.
- Do not print personal data in results beyond primary keys and the minimum needed to show a difference.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Validation plan
Column mapping, loss risks, cutoff and the check layers.
## Check code
Code blocks with file paths.
## Results
Table: check | source | target | match? Or "not run" with the reason.
## Verdict
Pass, pass with accepted differences, or fail, with each mismatch and fix.
## Open questions
Numbered, or "None".
</output_format>
