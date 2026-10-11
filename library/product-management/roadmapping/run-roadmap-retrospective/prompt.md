---
schema: 1
id: run-roadmap-retrospective
kind: prompt
title: Run a roadmap retrospective
description: Compares last period's roadmap with what actually shipped and what it achieved, measures predictability, finds why plans slipped and turns the causes into changes for next planning.
category: roadmapping
version: 1.0.0
status: incubating
stage: [review, plan]
role: [product-manager, engineering-manager, manager, founder]
requires: [none]
inputs: [text, document, notes]
output: [table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [planned-vs-actual, predictability, slippage, planning-retrospective, estimation-accuracy, unplanned-work]
pairs_with:
  prompts: [run-quarterly-planning, critique-roadmap, forecast-roadmap-dates-with-ranges, write-roadmap-update]
args:
  - name: planned_roadmap
    description: The roadmap as committed at the start of the period, with items, owners, target dates and the outcome or goal each item was meant to move.
    type: text
    required: true
  - name: what_happened
    description: What actually shipped and when, what was dropped or added mid-period and why, unplanned work (incidents, escalations, urgent requests) and any outcome data you have.
    type: text
    required: true
  - name: period
    description: Optional. The period under review, such as Q2 or the first half of the year.
    type: text
output_contract:
  format: markdown
  sections: [Planned versus actual, Predictability, Outcomes, Why plans changed, Changes for next planning, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You run a retrospective on a roadmap, not on a team's mood. Most teams replan every quarter without ever checking the last plan, so the same causes of slippage repeat. Three distinctions matter. Delivery and outcome are different questions: an item can ship on time and move nothing, or ship late and work. Slips from bad estimates differ from slips caused by unplanned work or by deliberate re-prioritisation, and each needs a different fix. And a plan that delivers 100% of its items can be a sign of sandbagging rather than good planning; a plan that deliberately includes stretch items is expected to land short of full scope, and the useful question is whether the miss was the stretch or the core.

{{#period}}Period under review: {{period}}{{/period}}
</context>

<task>
<planned_roadmap>
{{planned_roadmap}}
</planned_roadmap>

<what_happened>
{{what_happened}}
</what_happened>

1. Build one row per planned item and per item added mid-period: planned date, actual date or status (shipped, partial, dropped, carried over), days of slip, and whether it was planned or added.
2. Predictability: share of committed items shipped in the period, share shipped by their target date, median slip, and the share of capacity that went to unplanned or added work if the input lets you estimate it. Show the arithmetic. Say what the numbers suggest (overcommitment, sandbagging, a healthy range) and how weak they are with few items.
3. Outcomes: for each shipped item, whether the intended outcome moved, did not, or is not yet measurable. Mark items that had no stated outcome.
4. Why plans changed: classify every slip, drop and addition into one cause: estimate miss, dependency, unplanned work, deliberate re-prioritisation, scope growth, people or capacity change, unknown. Count by cause. Treat deliberate re-prioritisation as a decision, not a failure.
5. Changes for next planning: two to five concrete changes tied to the biggest causes (for example a fixed share for unplanned work, dependency sign-off before commit, ranges instead of single dates, an outcome required per item), each with how to check next period whether it worked.
</task>

<constraints>
- Use only the dates, items and data given. Mark missing dates or outcomes as [unknown] and do not guess them.
- Do not assign blame to individuals; describe causes in the system (planning, intake, dependencies, estimates).
- Do not call the period a success or failure from delivery numbers alone; outcomes and the reasons for change come first.
- If the plan or the record of what happened is missing, ask for it and stop.
{{> output/uncertainty}}
</constraints>

<output_format>
## Planned versus actual
Table: item | planned or added | target date | actual or status | slip | cause.

## Predictability
The ratios with arithmetic and a short reading.

## Outcomes
Table: shipped item | intended outcome | result | evidence.

## Why plans changed
Counts by cause, then the two or three causes that cost most.

## Changes for next planning
Numbered changes, each with the cause it addresses and how to check it next period.

## Questions
What to confirm.
</output_format>
