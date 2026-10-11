---
schema: 1
id: quantify-incident-impact
kind: prompt
title: Quantify an incident's impact
description: Estimates how many users, requests, orders or revenue an incident affected from logs and metrics, with the method, the queries, a confidence range and stated assumptions.
category: incident
version: 1.0.0
status: incubating
stage: [operate]
role: [sre, backend-engineer, engineering-manager]
stack: []
requires: [none]
inputs: [dataset, logs, text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [impact-analysis, blast-radius, revenue-impact, affected-users, postmortem-input]
pairs_with:
  prompts: [write-postmortem, calculate-sla-availability, write-observability-queries, build-incident-timeline]
  personas: [incident-commander]
args:
  - name: incident
    description: What failed, the start and end times with time zone, which features or endpoints, and how failures showed to users (errors, slowness, wrong data, nothing visible).
    type: text
    required: true
  - name: data
    description: Whatever numbers you have - request and error counts per interval, baseline from a comparable period, order or sign-up counts, logs with user or tenant IDs, average order value. Paste as text or a table.
    type: text
    required: true
  - name: query_language
    description: Optional. The query language or tool to write queries for, for example SQL on the warehouse, PromQL, LogQL, Splunk SPL or Datadog.
    type: string
output_contract:
  format: markdown
  sections: [Impact summary, Method, Numbers, Assumptions and confidence, Queries, Gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a team put honest numbers on an incident for the postmortem, customer communication, SLA credits or leadership. Impact numbers get challenged, so the method matters as much as the result. Experts separate measures: failed requests (counted directly), affected users or tenants (distinct IDs among failures, not requests divided by an average), lost business (the gap between expected and actual orders or sign-ups, with the expected value from a comparable baseline such as the same weekday and hour last week), and recovered business (users who retried successfully later, which reduces the real loss). Traps: counting retries as separate users, using averages across a day for an incident at peak hour, ignoring traffic that never arrived (users who could not load the page produce no error logs), assuming every failed checkout is lost revenue, and mixing time zones between sources. Give ranges when the method has uncertainty.
</context>

<task>
<incident>
{{incident}}
</incident>

<data>
{{data}}
</data>
{{#query_language}}
Write queries in: {{query_language}}
{{/query_language}}

1. Fix the window in one time zone and state it.
2. Choose measures that fit the incident: failed requests, distinct affected users or tenants, lost or delayed transactions, revenue at risk versus lost, SLA minutes. Say which cannot be computed from the data given.
3. For each measure, compute from the data where possible, showing the arithmetic, and the baseline used for expected values.
4. Adjust for retries and recovery: users who succeeded later, orders completed after the incident.
5. Give a range (low, best estimate, high) where assumptions drive the result, and name the assumption behind each bound.
6. Write the queries that would produce or refine each number from raw data, with placeholders for table and field names you do not know.
7. List gaps: data that would tighten the estimate and how to get it.
</task>

<constraints>
- Show the arithmetic for every number; do not present a figure you did not compute from given data.
- Never invent baselines, conversion rates or order values; ask for them or leave a placeholder.
- Distinguish failed requests from affected users and from lost revenue; never convert one into another without a stated assumption.
- Use neutral, factual wording suitable for a postmortem; no blame.
{{> output/uncertainty}}
</constraints>

<output_format>
## Impact summary
Three to five lines a non-engineer can read, with ranges.

## Method
Window, measures, baselines.

## Numbers
Table: Measure | Low | Best estimate | High | How computed.

## Assumptions and confidence
Each assumption and its effect.

## Queries
One block per measure.

## Gaps
Missing data and how to get it.
</output_format>
