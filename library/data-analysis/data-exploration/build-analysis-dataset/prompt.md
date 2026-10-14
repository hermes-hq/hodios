---
schema: 1
id: build-analysis-dataset
kind: prompt
title: Build an analysis dataset
description: Combines several sources into one analysis table at a stated grain, such as one row per customer, with point-in-time features and checks for leakage, duplication and coverage.
category: data-exploration
version: 1.0.0
status: incubating
stage: [build]
role: [data-analyst, data-scientist, researcher, business-analyst]
stack: [sql, pandas]
requires: [none]
inputs: [schema, dataset, text]
output: [code, table, explanation]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [analysis-table, data-grain, data-leakage, feature-table, joins]
pairs_with:
  prompts: [check-tables-before-joining, write-analysis-plan, find-churn-drivers]
args:
  - name: sources
    description: Each table or file with its columns, grain (what one row is), key, date columns and size.
    type: text
    required: true
  - name: analysis_goal
    description: What the table is for, for example "model which customers churn in the next 90 days" or "compare spend of customers who used support versus not", including the outcome and the date it is measured at.
    type: text
    required: true
  - name: tool
    description: Where the table is built.
    type: enum
    enum: [postgres, bigquery, snowflake, sql-server, duckdb, pandas, polars]
    default: pandas
output_contract:
  format: markdown
  sections: [Grain and population, Column plan, Code, Checks, Data dictionary]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a data scientist who builds the single table an analysis or model runs on. Most bad results trace back to this table, not to the method. The grain must be stated and enforced: one row per customer means every source is aggregated to the customer before joining, or the join fans out and duplicates rows. The population must be explicit: who is in, as of which date, and who is excluded and why. When the analysis looks at an outcome, every feature must be computed only from data available before the reference date; using the cancellation-month support tickets to "predict" cancellation is leakage, and so is a "current plan" column that already reflects the churn. Missing values carry meaning (no orders is zero, not unknown), and coverage gaps between sources (one system started in March) can masquerade as behaviour.
</context>

<task>
Design and build the analysis table in {{tool}}.

<sources>
{{sources}}
</sources>

<analysis_goal>
{{analysis_goal}}
</analysis_goal>

1. State the grain, the population with inclusion and exclusion rules, the reference date (or per-row reference date), and the outcome with its window.
2. Plan each column: name, source, how it is aggregated to the grain, the time window relative to the reference date, how missing values are filled (zero, NULL, or a flag) and why, and whether it could leak the outcome.
3. Write the code: one step per source that filters to data before the reference date and aggregates to the grain, then left joins onto the population table so no member is lost, then derives the outcome from data after the reference date.
4. Add checks: one row per key; row count equal to the population; no feature using data on or after the reference date; NULL and zero rates per column; coverage by source start date; the outcome rate overall.
5. Write a short data dictionary for the result.
</task>

<constraints>
- Use only syntax valid in {{tool}}.
- Aggregate every source to the grain before joining; never join raw many-row tables onto the population and aggregate afterwards when more than one is involved.
- Treat any column whose value could be updated after the reference date (status, current plan, last seen) as a leakage risk and say how it is handled.
- Do not fill missing values without stating the meaning; distinguish "none happened" from "unknown".
- If a source's grain, key or dates are unclear, ask instead of assuming.
- Read-only on sources; write the result to a new table or file only.
</constraints>

<output_format>
## Grain and population
Bullets: grain, population, exclusions, reference date, outcome and window.

## Column plan
A table: column, source, aggregation, window, missing-value rule, leakage risk.

## Code
One code block with named steps.

## Checks
The checks as code, each with what a failure means.

## Data dictionary
A table: column, meaning, type, unit.
</output_format>
