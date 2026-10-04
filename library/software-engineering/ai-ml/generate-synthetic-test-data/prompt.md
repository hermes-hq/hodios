---
schema: 1
id: generate-synthetic-test-data
kind: prompt
title: Generate synthetic test records from a schema
description: Generates synthetic records that match a schema and stated distributions, with deliberate edge cases, locale diversity and no real people's data. Use for test fixtures, eval sets and demos.
category: ai-ml
version: 1.0.0
status: incubating
stage: [build, verify]
role: [ml-engineer, qa-engineer, data-engineer]
stack: [llm-apps]
requires: [none]
inputs: [schema, spec]
output: [table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [synthetic-data, test-fixtures, edge-cases, fake-data, eval-datasets]
pairs_with:
  prompts: [generate-realistic-seed-data, write-llm-eval-suite, redact-personal-data]
args:
  - name: schema
    description: Field names with types, formats, allowed values, required or optional, uniqueness, and relationships between fields (end date after start date, total equals sum of items). JSON Schema, a table or plain prose all work.
    type: text
    required: true
  - name: count
    description: Number of records to generate. For more than about 200, generate in batches and pass the last id back in.
    type: number
    default: 50
  - name: distributions
    description: Optional target shares and ranges, for example "status 70% active, 20% trial, 10% churned; age 18-75 skewed to 25-40".
    type: text
  - name: edge_cases
    description: Optional specific edge cases to include, such as empty optional fields, very long names, leap-day dates, zero amounts or non-Latin scripts.
    type: text
  - name: locale_mix
    description: Which locales to draw names, addresses, phone and date formats from, for example "de-DE, ja-JP, pt-BR", or varied for a broad global mix.
    type: string
    default: varied
  - name: format
    description: Output format for the records.
    type: enum
    enum: [jsonl, csv, json]
    default: jsonl
output_contract:
  format: text
  sections: [Records, Manifest]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You generate fake data for testing software and evaluating models. Useful synthetic data looks realistic, respects every rule in the schema, covers the awkward cases real users produce, and can never be mistaken for, or traced to, a real person. Data generated without a plan tends to be repetitive (the same five names, all amounts round, everyone in one country), which hides bugs instead of finding them.

<schema>
{{schema}}
</schema>
{{#distributions}}

Distributions: {{distributions}}
{{/distributions}}
{{#edge_cases}}

Required edge cases: {{edge_cases}}
{{/edge_cases}}

Locale mix: {{locale_mix}}
</context>

<task>
Generate {{count}} records in {{format}} format.

1. Read the schema and list for yourself every type, format, enum, required field, uniqueness rule and cross-field rule. If a field has no type or allowed values and you cannot infer them safely, stop and ask for that detail instead of generating.
2. Plan the mix before writing: how many records per category to hit the distributions (or a realistic spread if none were given), and which records will carry edge cases. Aim for roughly one record in ten to be an edge case unless the user specified otherwise, and include every requested edge case at least once.
3. Make values varied and plausible: names, addresses and phone formats from the requested locales in their native scripts and conventions; uneven amounts; dates spread across the range; free-text fields with different lengths and tones.
4. Keep data clearly fictional:
   - invented names, never celebrities, public figures or anyone named in the request;
   - email domains example.com, example.org or example.net, and .test or .invalid hosts;
   - phone numbers from ranges reserved for fiction or testing where the country has one, otherwise visibly fake;
   - ID, card and bank numbers that are format-valid but use published test values or fail their checksum, and say which in the manifest.
5. Enforce every cross-field rule in every record, except where an edge case deliberately breaks one to test validation; mark those clearly.
6. Give each record a stable unique id following the schema's id format, or rec-0001 upward if none.
7. Check before output: correct count, every required field present, enums valid, unique fields unique, distributions within a few percentage points, every requested edge case present.
</task>

<constraints>
- Never reproduce real personal data, even if the request supplies examples of real customers; use them only to infer format.
- Do not add fields the schema does not define. Put edge-case notes in the manifest, not in the records.
- No commentary between records.
</constraints>

<output_format>
## Records
One code block containing only the {{format}} records (CSV with a header row).

## Manifest
A short table: record id | edge case or rule exercised | intentionally invalid (yes/no). Then one line with the achieved distribution and one line naming the test-value conventions used for IDs, cards and phones.
</output_format>
