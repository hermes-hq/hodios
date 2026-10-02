---
schema: 1
id: write-data-dictionary
kind: prompt
title: Write a data dictionary
description: Writes a data dictionary for database tables with each column's meaning, units, nullability, allowed values, owner and lineage, and flags every column it cannot infer. Use when documenting a schema.
category: data
version: 1.0.0
status: experimental
stage: [maintain]
role: [data-engineer, data-analyst, backend-engineer, technical-writer]
requires: [none]
inputs: [schema, dataset]
output: [docs, table, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [data-catalog, metadata, lineage, pii]
pairs_with:
  prompts: [write-data-quality-checks]
  personas: [data-engineer]
args:
  - name: schema
    description: CREATE TABLE statements, ORM models or a column list, with any existing comments.
    type: text
    required: true
  - name: sample_rows
    description: A handful of representative rows per table, with personal data masked.
    type: text
output_contract:
  format: markdown
  sections: [Questions for owners]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A data dictionary is only trusted if it never guesses silently. The expensive mistakes come from the columns that look obvious: `amount` stored in cents and read as currency units, `created_at` in local time read as UTC, a `status` code 3 nobody can decode, a nullable column whose nulls mean "not applicable" in one era and "unknown" in another. The value of the dictionary is as much in naming what is not known, and whom to ask, as in describing what is.
</context>

<task>
Write a data dictionary for:
{{schema}}
{{#sample_rows}}

Sample rows:
{{sample_rows}}
{{/sample_rows}}

1. For each table, state the grain ("one row per …"), the primary key, and how rows appear to change (append-only, updated in place, soft-deleted), if the evidence shows it.
2. For each column, record:
   - meaning, in one plain sentence;
   - unit or format (currency and minor units, time zone, ID format, encoding);
   - nullability, declared and observed in the sample, and what a null means;
   - allowed values or range, from constraints or observed in the sample;
   - an example value (masked if sensitive);
   - personal data classification: none, personal or sensitive;
   - lineage: the foreign key it references, or what it is derived from;
   - owner, or "TBD";
   - confidence: declared (from constraints or comments), inferred (from the name or sample), or unknown.
3. Where you cannot infer the meaning or unit with confidence, write "Cannot infer" and add a precise question for the owner, for example "Is orders.amount in cents or in currency units? Sample values 1999 and 250 suggest cents."
4. Flag inconsistencies: the same concept named differently across tables, mixed units, columns that look unused or always null in the sample, and codes without a lookup table.
</task>

<constraints>
- Never present an inference as a fact. Every inferred entry is marked as inferred.
- Do not copy personal data from the sample into the dictionary. Mask example values.
- Keep each meaning to one sentence. Put detail in the questions, not in the table.
</constraints>

<output_format>
For each table, a heading `## <table name>`, a one-line summary (grain, key, change pattern), then a table: Column | Type | Meaning | Unit or format | Nullable (declared/observed) | Allowed values | Example | PII | Lineage | Owner | Confidence.

Finish with `## Questions for owners`: a numbered list grouped by table, each question answerable in one line.
</output_format>
