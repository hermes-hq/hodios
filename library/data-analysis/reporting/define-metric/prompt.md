---
schema: 1
id: define-metric
kind: prompt
title: Define a metric
description: Writes a precise metric definition (formula, grain, filters, edge cases, owner, known caveats) so every team computes the number the same way. Use when a metric is disputed or about to be launched.
category: reporting
version: 1.0.0
status: incubating
stage: [design]
role: [data-analyst, product-manager, data-engineer, business-analyst]
inputs: [text, schema]
output: [docs, code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [metric-definitions, kpi, semantic-layer, data-governance]
pairs_with:
  prompts: [design-dashboard, answer-question-with-sql]
args:
  - name: metric_name
    description: The metric's working name (for example "Weekly active users", "Net revenue retention").
    type: string
    required: true
  - name: intent
    description: What the metric is meant to tell people and which decisions it drives, plus any definitions currently in use that disagree.
    type: text
    required: true
  - name: data_sources
    description: Tables, events or systems the metric would be computed from, with their grain and known quirks. Leave empty for a source-neutral definition.
    type: text
output_contract:
  format: markdown
  sections: [Definition, Specification, Edge cases, Reference query, Caveats and guardrails, Ownership, Open decisions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are the analytics lead who owns the company's metric catalogue. Disputes about numbers are usually disputes about definitions: two teams compute "active users" from different events, time zones or exclusions and then argue about whose dashboard is wrong. A good definition is precise enough that two analysts working separately get the same number, and it says what the metric does not measure.
</context>

<task>
Define the metric "{{metric_name}}".

<intent>
{{intent}}
</intent>

<data_sources>
{{data_sources}}
</data_sources>

1. Write a one-sentence plain-language definition a non-analyst can repeat correctly.
2. Specify it fully:
   - Formula: numerator and denominator (or aggregation), each defined in terms of entities and events.
   - Entity and grain: what is counted (user, account, order) and at what time grain the metric is reported.
   - Time window and anchor: calendar or rolling, time zone, and how partial periods are shown.
   - Inclusions and exclusions: test and internal accounts, bots, refunds, free tiers, deleted users, and the reason for each.
   - Unit and format: count, percentage, currency (gross or net, which currency, conversion rate source), and rounding.
   - Directionality: whether up is good, and the related metric that guards against gaming it.
3. Work through edge cases specific to this metric (for example a user active on two devices, an account that upgrades mid-month, a refund in a later period, late-arriving data, reactivated users) and state the rule for each.
4. If data sources are given, write a reference SQL query (postgres unless the sources imply another dialect) that implements the definition exactly, with comments mapping each clause to the specification. If they are not given, describe the required inputs instead.
5. Name caveats: what the metric does not capture, known data-quality issues, and how it can mislead.
6. Propose ownership and change control: an owner role, where the definition lives, and how changes are versioned and announced (with a back-filled series or a visible break).
</task>

<constraints>
- Do not invent tables, columns or events; when a source is unknown, write the requirement instead.
- Where the intent leaves a real choice open (for example rolling 7 days vs calendar week), state the options with the trade-off, recommend one, and list it under Open decisions.
- Prefer definitions that can be computed from data the company already has over ideal ones that cannot.
- Use one name per concept; if the metric name is ambiguous or overlaps an existing metric, propose a clearer name.
</constraints>

<output_format>
## Definition
One sentence.

## Specification
A table: field (formula, entity, grain, window, time zone, inclusions, exclusions, unit, direction, guardrail metric) | value.

## Edge cases
A table: case | rule.

## Reference query
One SQL code block, or the list of required inputs.

## Caveats and guardrails
Bullets.

## Ownership
Owner role, location of the definition, change process.

## Open decisions
Numbered choices for the owner to confirm, each with the recommended option.
</output_format>
