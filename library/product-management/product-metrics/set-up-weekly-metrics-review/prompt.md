---
schema: 1
id: set-up-weekly-metrics-review
kind: prompt
title: Set up a weekly metrics review
description: Sets up a weekly metrics review meeting for a product team - the metric deck, owners, commentary format, deep-dive rotation, agenda and how actions are tracked - so the meeting drives decisions.
category: product-metrics
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [product-manager, executive, data-analyst, founder]
requires: [none]
inputs: [text, notes]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
depth: specific
tags: [metrics-review, operating-rhythm, weekly-business-review, metric-owners, team-rituals, input-metrics]
pairs_with:
  prompts: [write-weekly-metrics-update, define-north-star-metric, set-metric-targets-from-baseline, write-product-metrics-review]
args:
  - name: team
    description: Team or company, product, who would attend, current metrics and dashboards, and what goes wrong today (no meeting, a meeting that only reads numbers, too many charts).
    type: text
    required: true
  - name: goals
    description: The goals or OKRs the metrics should serve, and any metrics already chosen. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Purpose, Metric deck, Owners and commentary, Agenda, Deep-dive rotation, Action tracking, First month, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You set up operating rhythms for product teams. A good weekly metrics review is short, the same every week, and about controllable input metrics as much as outcomes: outcomes like revenue move slowly and late, while inputs (activation, feature adoption, latency, support backlog) can be acted on this week. Every metric has an owner who explains its movement in writing before the meeting, so the meeting discusses the exceptions instead of reading charts aloud. Each chart shows the week against the prior weeks and the same week last year where seasonality matters, with the target and normal variation, so people stop reacting to noise. The meeting rotates one deep dive per week so understanding builds over time. It fails when the deck grows every week, when owners are absent, when every wiggle triggers a hunt, and when actions are not followed up.

Team: {{team}}
{{#goals}}Goals: {{goals}}{{/goals}}
</context>

<task>
1. Purpose: one sentence on what decisions this meeting exists for, and what it is not for.
2. Metric deck: eight to fifteen metrics in a fixed order, from the north star or outcome down to inputs and health or guardrails, each with definition, chart form (weekly with trailing weeks and comparison), target and a normal-variation band.
3. Owners and commentary: an owner per metric and a commentary format due the day before (what moved, why we think so, whether it is noise, what we are doing), kept to three lines.
4. Agenda: 30 to 45 minutes with timings: exceptions only, deep dive, open actions, decisions.
5. Deep-dive rotation: an eight-week schedule of topics tied to the deck.
6. Action tracking: a running list with owner, due date and status, reviewed at the start of each meeting.
7. First month: how to launch it, what to cut after four weeks, and the rule for adding a metric (one out for one in).
</task>

<constraints>
- Keep the deck small; push back if the user lists too many metrics.
- Do not invent targets; mark them to be set from baselines.
- Commentary must separate observed facts from hypotheses.
- Fit the meeting to team size; a five-person team does not need a heavy process.
</constraints>

<output_format>
## Purpose
One or two sentences.

## Metric deck
Table: order | metric | definition | owner | target | variation band.

## Owners and commentary
Template and deadline.

## Agenda
Timed list.

## Deep-dive rotation
Table: week | topic.

## Action tracking
Template.

## First month
Bullets.

## Questions
What to confirm.
</output_format>
