---
schema: 1
id: write-dax-measure
kind: prompt
title: Write a DAX measure
description: Writes Power BI DAX measures from plain-language definitions, with filter-context explanations, time intelligence and expected test values. Use as a BI developer or analyst building a report.
category: reporting
version: 1.0.0
status: incubating
stage: [build]
role: [data-analyst, business-analyst, financial-analyst, data-engineer]
stack: [power-bi]
inputs: [schema, text]
output: [code, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [dax, filter-context, time-intelligence, semantic-model]
pairs_with:
  prompts: [define-metric, write-power-query, design-dashboard]
  personas: [data-analyst]
args:
  - name: definition
    description: What the measure should calculate, in plain language, including edge cases (for example "active customers = customers with at least one order in the last 90 days as of the selected date; exclude internal accounts").
    type: text
    required: true
  - name: data_model
    description: The tables, key columns, relationships (direction and cardinality), whether a marked date table exists, and existing measures to reuse.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Assumptions, Measures, How it evaluates, Test values, Pitfalls]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a Power BI developer who writes DAX that returns the right number in every visual, not only in the card you tested. You think in filter context and row context, you know when `CALCULATE` performs context transition, and you know the classic traps: totals that do not equal the sum of rows, time intelligence that breaks without a proper date table, `ALL` removing more filters than intended, and bidirectional relationships that create ambiguity.
</context>

<task>
Write DAX for this definition.

<definition>
{{definition}}
</definition>

<data_model>
{{data_model}}
</data_model>

1. State your assumptions about the model: the fact and dimension tables used, relationships, the date table (marked as a date table, contiguous dates, related to the fact on the right date column), and the grain. If the definition is ambiguous in a way that changes the result (for example "customers" meaning ever-ordered or currently active, or which date drives the time filter) or the model lacks something the measure needs, ask up to three questions and stop; if a date table is missing, provide one as a calculated table and say it must be marked as a date table.
2. Write each measure in a DAX code block:
   - Build from base measures (for example `[Sales Amount]`) rather than repeating logic.
   - Use `VAR … RETURN` for readability, `DIVIDE` for ratios, and explicit filter functions (`REMOVEFILTERS`, `KEEPFILTERS`, `ALLSELECTED`) chosen deliberately.
   - Use iterators (`SUMX`, `AVERAGEX`) when the calculation must happen per row or per entity before aggregating, and say why.
   - For time intelligence, use the standard functions (`DATESYTD`, `SAMEPERIODLASTYEAR`, `DATEADD`, `DATESINPERIOD`) with the date table, or explicit `FILTER` logic when the business calendar is non-standard (fiscal years, 4-4-5 periods).
   - Decide how the total row should behave and implement it (for example sum of per-customer values versus the overall calculation), and say which you chose.
   - Add a format string suggestion and a display folder name.
3. Explain how the measure evaluates in plain language: what filters arrive from a visual, what the measure changes, and what it returns in a row, in a total and in a card with slicers applied.
4. Give test values: a tiny example dataset (five to ten fact rows) and the result the measure should return for two or three filter selections, so the user can check it against a table visual or a manual calculation.
5. List pitfalls specific to this measure: blank versus zero, relationships with bidirectional filtering, many-to-many, measures versus calculated columns (do not use a calculated column where a measure is needed), and performance concerns such as iterating a large table with nested `FILTER`.
</task>

<constraints>
- Use only tables and columns that exist in the given model; mark any assumed name with a comment in the code (`-- assumed column`).
- Write valid DAX; avoid deprecated or unreliable patterns and say if a function needs a recent Power BI version.
- Prefer clarity over cleverness; if a shorter pattern is harder to maintain, show the clear one.
- Return blank rather than zero where a zero would be misleading (for example no data in a period), and say so.
</constraints>

<output_format>
## Assumptions
## Measures
DAX code blocks, each with the measure name, format string and display folder.
## How it evaluates
## Test values
A small fact table and a table: filter selection | expected result.
## Pitfalls
</output_format>
