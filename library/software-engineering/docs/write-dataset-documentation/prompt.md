---
schema: 1
id: write-dataset-documentation
kind: prompt
title: Write dataset documentation
description: Documents a maintained dataset that a data team publishes for other teams or partners, with grain, schema and units, freshness, known gaps, privacy, change policy and an example query.
category: docs
version: 1.0.0
status: incubating
stage: [build, ship]
role: [data-engineer, ml-engineer, data-scientist]
stack: []
requires: [none]
inputs: [notes, schema, dataset, text]
output: [docs, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [datasheet, data-product, data-provenance, data-freshness, data-contract]
pairs_with:
  prompts: [write-data-dictionary, anonymize-dataset, explore-dataset]
args:
  - name: dataset_notes
    description: What you know about the dataset - who builds it and why, upstream sources, pipeline steps, refresh schedule, who uses it today, known problems, licence or sharing terms, personal data handling and who to contact.
    type: text
    required: true
  - name: schema
    description: Column or field definitions - a DDL, a dbt model or schema file, a data dictionary or a sample of rows with headers.
    type: text
  - name: access
    description: How consumers get it, for example "warehouse table analytics.orders_daily", "Parquet files in a shared bucket" or "nightly CSV feed to partners".
    type: string
    default: not stated
output_contract:
  format: markdown
  sections: [Datasheet, Missing information]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
This is documentation for a dataset a data team keeps running and that other people build on: a warehouse table, a data product, a partner feed or an ML training set. Its readers are analysts, engineers and partner teams deciding in a few minutes whether they can depend on it. It fails when it lists column names without units or meaning, omits the grain and the time zone, describes the ideal pipeline instead of the known gaps, never says how fresh the data is or what happens when it is late, and changes schema without warning so dashboards break. It follows the spirit of "Datasheets for Datasets" and data cards, kept short enough to be read. For a one-off research dataset being archived, a dataset README with a codebook fits better.

Access: {{access}}.
</context>

<task>
<dataset_notes>
{{dataset_notes}}
</dataset_notes>
{{#schema}}
<schema>
{{schema}}
</schema>
{{/schema}}

1. Summary: what the dataset is, the grain (one row per what), coverage in time and population, approximate size, and the two or three uses it is good for and one it is not.
2. Ownership: owning team, how to report a problem, and where breaking changes are announced.
3. Lineage and processing: upstream sources and systems, filters, deduplication, joins, anything imputed or derived, and business rules applied (for example "cancelled orders excluded").
4. Schema: every field with type, unit, meaning in plain words, allowed values or range, null meaning (unknown, not applicable, not collected) and the time zone of every timestamp. Mark the primary key and join keys to other datasets.
5. Freshness: refresh schedule, typical lag between the event and its row, the latest time data is expected each day, how late, corrected or deleted records are handled (restatements, backfills), and how consumers can tell a load is complete.
6. Quality, gaps and biases: known missing periods, coverage gaps, definition or measurement changes over time with dates, sampling or selection effects, and who or what is under-represented. Name the checks that run on each load, if the notes give them.
7. Change policy: how schema changes are versioned, how much notice consumers get before a breaking change, and how deprecated fields are retired. If the notes say nothing, write [X] and propose a policy marked "proposed".
8. Licence, terms and privacy: who may use it and for what, attribution, whether it contains personal data, what was removed or pseudonymised, re-identification risks from combined fields (quasi-identifiers such as birth year plus location plus timestamps), and access controls.
9. Example: a short query or code snippet that reads the data and computes something correct, using the real field names and respecting the grain (no double counting).
</task>

<constraints>
- Use only facts from the notes and schema. Write [X] for anything missing and list it under Missing information; never guess units, time zones, schedules or licences.
- If the notes suggest personal data but say nothing about its handling, flag it prominently rather than describing safeguards that may not exist.
- Keep field meanings concrete: "order total in EUR including VAT, at time of purchase", not "the total".
- Do not overstate quality, and do not hide a limitation even if asked; describe it neutrally.
- If the notes do not say what the dataset contains or where it comes from, ask for the source system, the grain and a schema or sample rows before writing.
</constraints>

<output_format>
## Datasheet
The publishable document in Markdown with `###` headings for steps 1 to 9; the schema as a table (field, type, unit, meaning, nulls, notes); the example in a code block.
## Missing information
Numbered list of [X] items, each with who can likely answer it (owning team, upstream system owner, privacy or legal).
</output_format>
