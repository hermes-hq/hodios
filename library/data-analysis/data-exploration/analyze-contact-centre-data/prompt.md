---
schema: 1
id: analyze-contact-centre-data
kind: prompt
title: Analyse contact centre performance data
description: Analyses contact centre data - volume by interval, handle time, abandonment, service level, repeat contacts and contact reasons - and recommends staffing alignment and process fixes.
category: data-exploration
version: 1.0.0
status: incubating
stage: [discover, review]
role: [operations-manager, support-agent, data-analyst]
requires: [none]
inputs: [dataset, text]
output: [report, table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [contact-centre, call-centre, service-level, abandon-rate, failure-demand, workforce-management]
pairs_with:
  prompts: [plan-support-staffing, run-pareto-analysis, detect-anomalies, write-monthly-business-review]
  personas: [data-analyst]
args:
  - name: data
    description: Contact records or interval summaries - timestamps or intervals, channel, queue, offered, answered, abandoned, wait times, talk, hold and wrap times, contact reason or disposition, and customer id if repeats are to be measured.
    type: text
    required: true
  - name: targets
    description: Service level targets and definitions, for example "80% of calls answered within 20 seconds; abandons under 5 seconds excluded; chat first response within 60 seconds".
    type: text
  - name: channels
    description: Channels and queues in scope, opening hours and time zone, for example "phone (billing, technical), chat, email; 08:00-20:00 local".
    type: text
output_contract:
  format: markdown
  sections: [Data check, Headline metrics, When demand arrives, Where time goes, Why customers contact us, Recommendations, What to measure next]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Contact centre metrics mislead when definitions are loose: abandonment that counts callers who hung up in two seconds, a daily service level that hides a terrible lunchtime, average handle time pushed down by rushing calls that then come back as repeats, and "volume up" that is really customers chasing the same unresolved issue. The useful analysis looks at demand by interval against staffing, breaks handle time into talk, hold and wrap, measures repeat contacts within a window, and separates failure demand (contacts caused by something the organisation failed to do or did wrong) from value demand. The best fixes often reduce demand rather than add agents.
</context>

<task>
Analyse this contact centre data.

<data>
{{data}}
</data>
{{#targets}}
Targets and definitions: {{targets}}
{{/targets}}
{{#channels}}
Channels and hours: {{channels}}
{{/channels}}

1. Data check: the period, the channels and queues, the interval length, the time zone, duplicates or transfers counted twice, missing fields, and the definitions used for each metric. Where no definition is given, use a standard one and state it (for example service level = answered within threshold divided by offered minus short abandons).
2. Headline metrics by channel and queue: contacts offered and handled, service level, average speed of answer, abandonment rate (with the short-abandon rule), average handle time split into talk, hold and wrap, transfer rate, and repeat contact rate within seven days if customer ids exist. Compare with targets where given.
3. When demand arrives: volume by hour of day and day of week, the peak intervals, and service level and abandonment in those intervals. Point out intervals where performance collapses even if the daily figure looks fine. If staffing or schedule data are included, compare handled capacity with demand by interval.
4. Where time goes: handle time by contact reason and queue, the spread (not just the average), long hold or wrap patterns, and transfers between queues.
5. Why customers contact us: a Pareto of contact reasons; classify each top reason as failure demand or value demand with the reasoning; repeat contacts by reason.
6. Recommendations: up to six, ranked by expected impact, split into reduce demand (fix the root cause, proactive messages, self-service for simple value demand), handle better (first-contact resolution, routing, knowledge base), and staff better (shift patterns aligned to the interval pattern). For a full staffing requirement, say a staffing forecast is the next step and what inputs it needs.
7. What to measure next: gaps in the data that limit the analysis.
8. Before you answer, recompute each headline metric from the counts and confirm that each recommendation traces to a finding.
</task>

<constraints>
- Compute only from the data given; never invent volumes, industry benchmarks or targets.
- Do not judge individual agents; if agent-level data are present, analyse patterns at team or queue level and mention coaching only as a process.
- Do not recommend cutting handle time without checking repeat contacts and resolution.
- If the data are too aggregated for a step (for example daily totals only), say what that step needs and skip it.
</constraints>

<output_format>
Markdown with the sections in the output contract. Headline metrics as a table per channel. Demand by interval as a table or heat-map style grid (hour by day). Contact reasons as a Pareto table (Reason | Contacts | Share | Cumulative share | Failure or value demand). Recommendations as a numbered list with the finding each is based on.
</output_format>
