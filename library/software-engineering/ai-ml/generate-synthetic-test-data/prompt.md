---
schema: 1
id: generate-synthetic-test-data
kind: prompt
title: Generate synthetic test records from a schema
description: Generates a synthetic dataset of one record type that hits stated distributions, labels its edge cases and opt-in invalid records with the expected result, and uses no real people's data.
category: ai-ml
version: 2.0.0
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
    description: Number of records in this batch. Above about 200, generate several batches and set start_index for each one.
    type: number
    default: 50
  - name: distributions
    description: Optional target shares and ranges, for example "status 70% active, 20% trial, 10% churned; age 18-75 skewed to 25-40".
    type: text
  - name: edge_cases
    description: Optional specific edge cases to include, such as empty optional fields, very long names, leap-day dates, zero amounts or non-Latin scripts.
    type: text
  - name: invalid_share
    description: Percentage of records that deliberately break one schema rule, for testing validators and error handling. 0 means every record is valid.
    type: number
    default: 0
  - name: start_index
    description: Number of the first record in this batch, so ids and the planned mix continue across batches. Use 1 for the first batch, 201 for the second batch of 200, and so on.
    type: number
    default: 1
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
  - {version: 2.0.0, note: "First version."}
---
<context>
You generate a synthetic dataset of one record type (a flat row or a nested JSON document) to test validators, APIs, data pipelines, dashboards and models. What makes such a dataset useful is its shape as a whole: target distributions actually hit, realistic variety across locales, edge cases placed on purpose, and, when asked, invalid records whose expected outcome is known in advance so a test can assert on it. Unplanned generation drifts into the same five names, round amounts and one country, which hides bugs instead of finding them. The data must never be traceable to a real person.

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
Invalid share: {{invalid_share}}%
Batch: {{count}} records starting at record {{start_index}}
</context>

<task>
1. Read the schema and list for yourself every field's type, format, enum, required flag, uniqueness rule and cross-field rule. If the schema describes several related tables, ask which one record type to generate (relational seeding with foreign keys is a different job). If a field has no type or allowed values and you cannot infer them safely, ask for that detail instead of generating.
2. Plan the batch before writing any record:
   - how many records per category meet each distribution, or a realistic, uneven spread if none was given;
   - which records carry each requested edge case (every one at least once) and which carry your own edge cases, about one in ten valid records in total;
   - which records are invalid: exactly {{invalid_share}}% of the batch, rounded to the nearest whole record, each breaking one rule only (a missing required field, a wrong type, a value outside its enum or range, a violated cross-field rule, a duplicate of a unique value). With 0%, every record satisfies every rule, including edge-case records.
3. Write values that vary the way real data does: names, addresses, phone and date formats from the requested locales in their native scripts and conventions; uneven amounts; dates spread across the allowed range; free text of different lengths and tones.
4. Keep every value fictional:
   - invented names, never public figures or anyone named in the request, even if the request asks for real people;
   - email domains example.com, example.org or example.net, and .test or .invalid hosts;
   - phone numbers from ranges reserved for fiction or documentation where the country has one, otherwise visibly fake;
   - ID, card and bank numbers taken from published test values or built to fail their checksum.
5. Number records from {{start_index}}. Use the schema's id format if it has one, otherwise rec-0001 style, so ids never collide across batches.
6. Check before output: the record count is {{count}}; valid records pass every rule; each invalid record breaks exactly the one rule its manifest row names; unique fields are unique within the batch; the achieved distribution is within a few percentage points of the target; every requested edge case is present.
</task>

<constraints>
- Do not add fields the schema does not define, and do not put markers or comments inside records. All labelling goes in the manifest.
- Never copy real personal data, even when the request includes sample rows from real customers; use samples only to infer formats.
- No commentary between records.
</constraints>

<output_format>
## Records
One code block containing only the {{format}} records (CSV with a header row).

## Manifest
A table with one row per labelled record: record id | edge case or broken rule | expected result (valid, or the validation error a correct system should raise). Then one line comparing the achieved distribution with the target, and one line naming the test-value conventions used for IDs, cards and phones.
</output_format>
