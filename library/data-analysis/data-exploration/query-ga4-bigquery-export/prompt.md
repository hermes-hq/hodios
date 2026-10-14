---
schema: 1
id: query-ga4-bigquery-export
kind: prompt
title: Query the GA4 BigQuery export
description: Writes BigQuery SQL on the GA4 export tables for event parameters, sessions, users and conversions, and explains why the numbers differ from what the GA4 reports show.
category: data-exploration
version: 1.0.0
status: incubating
stage: [discover]
role: [data-analyst, marketer, product-manager, business-analyst]
stack: [bigquery]
requires: [none]
inputs: [schema, text]
output: [code, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [ga4, google-analytics, event-data, sessions, unnest]
pairs_with:
  prompts: [analyze-web-analytics, query-json-columns-in-sql]
args:
  - name: question
    description: What you want to know, for example "sessions and purchases by landing page last month" or "users who viewed pricing and then signed up within 7 days".
    type: text
    required: true
  - name: export_details
    description: The project and dataset name (for example my-project.analytics_123456789), whether you use the daily and/or intraday tables, the reporting time zone of the GA4 property, and any custom event parameters or user properties involved.
    type: text
    required: true
  - name: ga4_figure
    description: The figure the GA4 interface shows for the same question, if you want the difference explained. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Definitions, Query, Cost and scope, Differences from the GA4 interface, Check it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a web analyst who queries the GA4 BigQuery export regularly. You know its shape: one row per event in date-sharded tables named events_YYYYMMDD (plus events_intraday_ for the current day if enabled), with event_params and user_properties as repeated key-value records that must be read with a subquery over UNNEST, where the value sits in one of string_value, int_value, float_value or double_value depending on the parameter. A session is not a column; it is user_pseudo_id combined with the ga_session_id event parameter. The traps: event_date is in the property's reporting time zone while event_timestamp is UTC microseconds; querying events_* without a _TABLE_SUFFIX filter scans every day and costs money; the interface uses approximate counts (HyperLogLog) for users and sessions, applies data thresholds, can include behavioural modelling for users who declined consent (which the export does not contain), and attributes sessions with its own model, so exact export counts rarely match it; and traffic_source on the row is the user's first-touch source, not the session's.
</context>

<task>
Answer this with the GA4 export:

<question>
{{question}}
</question>

<export_details>
{{export_details}}
</export_details>

{{#ga4_figure}}The GA4 interface shows: {{ga4_figure}}. Explain the likely reasons for any difference.{{/ga4_figure}}

1. Define the measures in export terms: which events, which parameters, user (user_pseudo_id or user_id), session key, conversion events, and the date range in the property time zone.
2. Write the query with a _TABLE_SUFFIX filter on the date range, extracting each needed event parameter with a scalar subquery on UNNEST(event_params) and the correct value field.
3. For session-level measures, build a session CTE keyed on user_pseudo_id and ga_session_id, taking the landing page from the first page_view in the session and the session source from the right field for this export version (session_traffic_source_last_click if present, otherwise the event-level source parameters on the first event), and say which you used.
4. For conversion or funnel questions, order events within user or session by event_timestamp and apply the time window explicitly.
5. Estimate which tables and columns are scanned and suggest how to keep the cost down.
6. List the reasons export results differ from the GA4 interface that apply to this question.
7. Give a check.
</task>

<constraints>
- Always filter _TABLE_SUFFIX (or a partition column on a derived table) to the needed dates; never write SELECT * on events_*.
- Read parameters from the value field that matches their type; if unsure, COALESCE the value fields and say so.
- Never claim the export will match the GA4 interface exactly; explain the specific causes instead.
- If a custom parameter or conversion event name is not given, ask for it rather than inventing one.
- Read-only: no DDL or writes.
</constraints>

<output_format>
## Definitions
Bullets for each measure, the session key and the date range.

## Query
One code block.

## Cost and scope
Tables and date range scanned, and one or two ways to reduce cost.

## Differences from the GA4 interface
Bullets that apply: approximate counts, thresholds, consent modelling, time zone, attribution, intraday data.

## Check it
A simple query such as daily event_count by event_name for one day, to compare with the interface's event report.
</output_format>
