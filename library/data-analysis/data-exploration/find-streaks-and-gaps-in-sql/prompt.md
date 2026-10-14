---
schema: 1
id: find-streaks-and-gaps-in-sql
kind: prompt
title: Find streaks and gaps in SQL
description: Solves gaps-and-islands problems in SQL, such as consecutive-day streaks, sessions built from events, outage periods and missing sequence numbers, with the logic explained step by step.
category: data-exploration
version: 1.0.0
status: incubating
stage: [discover]
role: [data-analyst, data-scientist, data-engineer, product-manager]
stack: [sql]
requires: [none]
inputs: [schema, text]
output: [code, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: expert
depth: advanced
tags: [gaps-and-islands, streaks, sessionization, window-functions, analytics-sql]
pairs_with:
  prompts: [write-window-function-query, answer-question-with-sql]
args:
  - name: problem
    description: What you need, for example "longest run of consecutive login days per user", "group page views into sessions with a 30-minute inactivity gap", "periods when a sensor was offline" or "missing invoice numbers".
    type: text
    required: true
  - name: schema
    description: The table with column names and types, what one row is, and whether duplicates (two events on the same day) can occur. Sample rows help.
    type: text
    required: true
  - name: dialect
    description: SQL dialect the query must run on.
    type: enum
    enum: [postgres, bigquery, snowflake, mysql, sql-server, sqlite, redshift, duckdb]
    default: postgres
  - name: time_zone
    description: The time zone that defines a "day" for streaks, if timestamps are involved. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Pattern, Definitions, Query, How it works, Edge cases, Check it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an analyst who has solved many gaps-and-islands problems. They come in a few shapes: islands of consecutive values (login streaks, consecutive months subscribed), sessions where a new group starts after an inactivity gap, status periods where a value stays the same across rows, and gaps in what should be a complete sequence. Each has a standard technique: the "value minus ROW_NUMBER" trick for consecutive integers or dates, a running SUM of a "new group starts here" flag for sessions and status changes, and LEAD/LAG differences or a generated series for gaps. Most wrong answers come from not deduplicating first (two logins on one day break the date-minus-row-number trick), from defining "day" in UTC when the user lives elsewhere, and from forgetting that a streak still running today is not finished.
</context>

<task>
Solve this in {{dialect}}:

<problem>
{{problem}}
</problem>

<schema>
{{schema}}
</schema>

{{#time_zone}}Days are defined in this time zone: {{time_zone}}.{{/time_zone}}

1. Name the pattern: consecutive islands, inactivity-gap sessions, status periods, or missing values in a sequence.
2. Write the definitions: what counts as one step (a calendar day, a month, an integer), the gap threshold if any, whether the boundary is inclusive, and how a streak that is still open at the end of the data is treated.
3. Deduplicate to one row per entity per step before applying the technique, and convert timestamps to the stated day boundary first.
4. Apply the matching technique in named CTEs: group key from value minus ROW_NUMBER; or a new-group flag from LAG plus a running SUM; or LEAD to find the next value and report where the difference exceeds one step.
5. Aggregate each group to start, end and length, then answer the actual question (longest streak, current streak, session count, list of gaps).
6. Explain each CTE in one line, with a tiny worked example of five rows showing the group key.
7. List the edge cases and give a check.
</task>

<constraints>
- Use only {{dialect}} syntax for date arithmetic and series generation (for example generate_series in Postgres, GENERATE_DATE_ARRAY in BigQuery, a recursive CTE where neither exists).
- Never apply the row-number trick to data that can have duplicates per step without deduplicating first.
- State the day boundary and time zone; if timestamps exist and no time zone is given, assume UTC and say so.
- Treat a streak that reaches the last date in the data as possibly ongoing and label it, rather than presenting it as complete.
- If the schema lacks the entity key or the ordering column, ask for it instead of guessing.
- Read-only: no DDL or writes.
</constraints>

<output_format>
## Pattern
One line naming the pattern and technique.

## Definitions
Bullets: step unit, gap threshold, boundaries, open streaks, time zone.

## Query
One code block with named CTEs.

## How it works
One line per CTE, then a five-row worked example as a small table.

## Edge cases
Bullets: duplicates, single-step islands, open streaks, data starting mid-streak.

## Check it
One check, such as counting total steps across islands and comparing with distinct steps per entity.
</output_format>
