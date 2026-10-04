---
schema: 1
id: write-siem-query
kind: prompt
title: Write a SIEM investigation query
description: Writes a SIEM or log query for an investigation question in the platform's query language, stating field assumptions, explaining each step, and adding performance tips and a way to validate results.
category: security-operations
version: 1.0.0
status: incubating
stage: [operate]
role: [security-engineer]
requires: [none]
inputs: [text, schema]
output: [code, explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [siem, kql, spl, log-search, investigation]
pairs_with:
  prompts: [write-threat-hunt-plan, triage-soc-alert, write-sigma-rule]
  personas: [soc-analyst]
args:
  - name: question
    description: The investigation question in plain words, with the time range and any known entities - for example "which hosts did svc_backup log on to interactively in the last 7 days".
    type: text
    required: true
  - name: platform
    description: The query language. kql for Kusto-based tools, spl for Splunk, esql for Elastic ES|QL, sql for data-lake or warehouse logs, other to name your own.
    type: enum
    enum: [kql, spl, esql, sql, other]
    default: kql
  - name: schema
    description: Table or index names and field names as they exist in your environment, or a sample event. Without it, the query uses common field names and marks them as assumptions.
    type: text
output_contract:
  format: markdown
  sections: [Query, Field assumptions, How it works, Performance, Validate the results, Variations]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
During an investigation, a query that silently returns nothing is worse than no query: the analyst concludes "no activity" when the field was named differently, the time range was wrong, or a join dropped rows. Good investigation queries state their assumptions, filter on time and indexed fields first, aggregate before joining, and come with a quick way to prove they would have found the activity if it existed.
</context>

<task>
Write a {{platform}} query for this question:

<question>
{{question}}
</question>
{{#schema}}

<schema>
{{schema}}
</schema>
{{/schema}}

1. If platform is `other` and the question does not name the language, ask which one and stop. If the question has no time range, use the last 24 hours and say so.
2. Translate the question into precise conditions: entities, event types (for example interactive versus network logons, process starts versus file writes), time window, and the shape of the answer (a list, counts per entity, first and last seen).
3. Write the query using the fields in the schema; where none is given, use the platform's common names (for example the vendor's standard tables or a common schema) and list each as an assumption to check.
4. Structure it for speed: time filter first, then the most selective filters on indexed fields, avoid leading wildcards and unbounded regex, aggregate before any join, and project only the columns needed.
5. Explain each stage in one line.
6. Give a validation step: a known-positive check (an entity or time you know has the activity), a sanity count without the narrowing filters, and a note on what an empty result does and does not mean.
7. Offer up to two variations (for example a broader version for hunting, or a version that runs as a scheduled detection).
8. Before answering, check the syntax belongs to {{platform}} (operators, pipes, functions, time syntax) and that every field used appears in the schema or the assumptions list.
</task>

<constraints>
- Do not mix syntax between languages. If unsure whether a function exists in {{platform}}, say so and offer the safer alternative.
- Never invent table or field names silently; every guess goes in the assumptions table.
- Read-only queries only; no commands that delete, modify or export data outside the platform.
{{> output/uncertainty}}
</constraints>

<output_format>
## Query
One fenced block.

## Field assumptions
Table: Field or table | Assumed meaning | Check by.

## How it works
Numbered, one line per stage.

## Performance
Up to three bullets.

## Validate the results
Numbered steps.

## Variations
Up to two, each with a fenced block and one line on when to use it.
</output_format>
