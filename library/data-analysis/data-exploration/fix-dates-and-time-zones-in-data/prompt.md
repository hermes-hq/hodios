---
schema: 1
id: fix-dates-and-time-zones-in-data
kind: prompt
title: Fix dates and time zones in a dataset
description: Standardises mixed date formats, UTC versus local timestamps and daylight-saving shifts in a dataset, and shows how each fix moves records between days so daily counts change.
category: data-exploration
version: 1.0.0
status: incubating
stage: [discover]
role: [data-analyst, data-scientist, business-analyst, data-engineer]
stack: [python, sql]
requires: [none]
inputs: [dataset, text]
output: [code, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [dates, time-zones, daylight-saving, timestamps, data-cleaning]
pairs_with:
  prompts: [explore-dataset, build-date-spine-for-metrics, reconcile-datasets]
args:
  - name: data_sample
    description: Sample values of each date or time column (include odd ones), where each column comes from (which system or country), and what you know about its time zone. Remove personal data.
    type: text
    required: true
  - name: reporting_time_zone
    description: The time zone the business reports in, as an IANA name such as America/Sao_Paulo or Europe/Paris, or "unsure".
    type: string
    required: true
  - name: tool
    description: Where the fix runs.
    type: enum
    enum: [pandas, polars, postgres, bigquery, snowflake, sql-server, mysql, duckdb]
    default: pandas
output_contract:
  format: markdown
  sections: [Diagnosis, Rules, Code, Effect on counts, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an analyst who has untangled many date problems. Text dates are ambiguous whenever the day is 12 or less: 03/04/2026 is 3 April in most of the world and 4 March in the US, so the format must be inferred from values above 12 in either position, or from the source system's locale, and never from the first row. Spreadsheet exports may hold serial numbers (days since 1899-12-30) mixed with text. Timestamps without an offset are "naive" and mean nothing until you know whether they were written in UTC or local time; mixing a UTC column with a local one shifts evening events into the next day. Daylight saving creates a missing hour in spring and a repeated hour in autumn, so local-time events at 01:30 on the autumn change are ambiguous, and fixed offsets like "+01:00" stored as the zone are wrong half the year. Every one of these fixes moves some records to a different day, which changes daily counts and can break reconciliation with other reports.
</context>

<task>
Fix the dates and times in this data using {{tool}}.

<data_sample>
{{data_sample}}
</data_sample>

Reporting time zone: {{reporting_time_zone}}

1. Diagnose each column: type (text date, serial number, naive timestamp, timestamp with offset, epoch seconds or milliseconds), the formats present, ambiguous values, and the most likely time zone with the evidence (for example activity peaking at 03:00 suggests UTC for a daytime business).
2. Write explicit rules per column: the parse format or formats, how ambiguous day-month values are resolved and on what evidence, the source time zone, conversion to UTC for storage, and conversion to the reporting time zone for a reporting date. Use IANA zone names, not fixed offsets.
3. Write the code: parse with explicit formats (no silent guessing), handle serials and epochs, localise naive timestamps with rules for nonexistent and ambiguous daylight-saving times, convert, and derive a reporting date column.
4. Report rows that failed to parse or were ambiguous instead of coercing them to NULL silently.
5. Show the effect: a query or code that counts records per reporting date before and after the fix, and the number of records that moved day.
6. List questions to confirm with the data owner.
</task>

<constraints>
- Use only functions available in {{tool}}; in pandas, use format= or format="mixed" knowingly, dayfirst only where justified, and tz_localize with explicit ambiguous and nonexistent arguments.
- Never resolve day-month ambiguity by assumption alone; state the evidence or flag it as an open question.
- If the reporting time zone is "unsure", explain the choice and default to UTC with a clear note.
- Keep the original columns and add new ones, so the change can be audited.
- Do not invent time zones for sources; mark each as known, inferred or unknown.
</constraints>

<output_format>
## Diagnosis
A table: column, type, formats found, ambiguity, likely time zone and evidence.

## Rules
Numbered rules per column.

## Code
One code block.

## Effect on counts
The before-and-after code and what to expect.

## Open questions
Numbered questions for the data owner.
</output_format>
