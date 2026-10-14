---
schema: 1
id: audit-event-tracking-data
kind: prompt
title: Audit event tracking data
description: Audits existing product analytics for missing, duplicated and misnamed events, broken properties, identity gaps, bot traffic and platform drift, with fixes ranked by the decisions they affect.
category: product-metrics
version: 1.0.0
status: incubating
stage: [verify, maintain]
role: [product-manager, data-analyst, data-engineer, software-engineer]
requires: [none]
inputs: [dataset, schema, text]
output: [table, checklist, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [analytics-qa, instrumentation, data-quality, event-taxonomy, identity-resolution, tracking-debt]
pairs_with:
  prompts: [write-tracking-plan, diagnose-metric-drop, analyze-conversion-funnel]
args:
  - name: event_inventory
    description: The list of events actually being received with counts over a period, their properties and sample values, split by platform (web, iOS, Android, server) if possible.
    type: text
    required: true
  - name: intended_plan
    description: Optional. The tracking plan or spec the events should match.
    type: text
  - name: key_metrics
    description: The metrics and dashboards that depend on this data, so fixes can be ranked by impact.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Summary, Coverage against plan, Volume and consistency checks, Identity and sessions, Naming and properties, Impact on key metrics, Fix list, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You audit the analytics data a product team already collects. Tracking decays quietly: a redesign drops an event, a mobile release renames a property, a retry fires a purchase twice, logged-out and logged-in activity never join up, bots inflate sign-up starts, and the dashboard everyone trusts drifts from reality. The best checks are relational rather than looking at one event at a time: events that should follow each other (checkout started then purchase) in plausible ratios, counts that should match a source of truth (orders in the database, sign-ups in the user table), the same event at similar rates across platforms, and properties whose values follow the expected types and lists.
</context>

<task>
<event_inventory>
{{event_inventory}}
</event_inventory>

{{#intended_plan}}
<intended_plan>
{{intended_plan}}
</intended_plan>
{{/intended_plan}}

<key_metrics>
{{key_metrics}}
</key_metrics>

1. Coverage against plan: events in the plan but missing, events received but not in the plan, and events present on some platforms only. If no plan is given, infer the expected core events from the key metrics and say so.
2. Volume and consistency checks: implausible ratios between related events (more purchases than checkouts, more logins than active users), sudden step changes, duplicates suggested by identical timestamps or double counts, and gaps between event counts and any source-of-truth totals given.
3. Identity and sessions: whether anonymous and logged-in ids are joined, cross-device identity, internal and test users excluded, bot and crawler filtering.
4. Naming and properties: inconsistent naming styles, synonyms for the same action, properties with mixed types, free-text where a list is expected, missing required properties, personal data sent where it should not be.
5. Impact on key metrics: for each issue, which metric or dashboard it distorts and in which direction.
6. Fix list: ranked by impact on decisions, then effort, each with the owner type (front end, mobile, back end, data) and how to verify the fix.
</task>

<constraints>
- Base findings on the inventory given; mark anything inferred from naming alone as "to verify".
- Flag personal data (emails, names, free-text that may contain it) in events as a priority issue for the privacy owner, without giving legal advice.
- Do not propose rebuilding the whole tracking setup when targeted fixes will do; say if a rebuild is justified and why.
- If the inventory has no counts, ask for them; most checks need volumes.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
The three issues that most distort decisions.

## Coverage against plan
Table: event | expected | received (by platform) | status.

## Volume and consistency checks
Table: check | expected relation | observed | issue.

## Identity and sessions
Bullets.

## Naming and properties
Table: event or property | problem | fix.

## Impact on key metrics
Table: metric | affected by | direction.

## Fix list
Numbered: fix | owner type | effort | how to verify.

## Questions
What to confirm.
</output_format>
