---
schema: 1
id: measure-time-to-value
kind: prompt
title: Measure and shorten time to value
description: Defines time-to-value milestones for a product, measures the time to reach them by segment, and finds the steps, waits and handoffs that delay new users or accounts from reaching value.
category: product-metrics
version: 1.0.0
status: incubating
stage: [discover, review]
role: [product-manager, founder, designer, data-analyst]
requires: [none]
inputs: [dataset, text]
output: [table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [time-to-value, user-onboarding-speed, milestones, survival-analysis, setup-friction, first-value]
pairs_with:
  prompts: [define-activation-metric, analyze-conversion-funnel, plan-customer-onboarding, find-leading-indicators]
args:
  - name: product
    description: What the product does, the value a new user or account is looking for, and the steps to get there (setup, imports, integrations, approvals, teammates).
    type: text
    required: true
  - name: data
    description: Time from signup to each milestone (medians, percentiles or a table description), share that never reach each, by segment (self-serve vs sales-led, size, platform, channel). Optional if you want the definitions and plan only.
    type: text
output_contract:
  format: markdown
  sections: [Value milestones, How to measure, Current time to value, Where time is lost, Changes to try, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You work on onboarding speed. Time to value is the elapsed time from signup (or contract start) to the moment a user or account first gets the outcome they came for, not the first login. It usually has several milestones: setup done, first value (first report sent, first payment received), and recurring value (the habit or team-wide use). Averages mislead because the distribution is long-tailed and many users never reach the milestone; the right tools are medians and percentiles among those who reached it, plus the share reached by fixed days, which is a survival curve that handles users still in progress. Time is lost in waiting more than in clicking: data imports, IT approvals, waiting for teammates, integration credentials, sales handoffs. Self-serve and sales-led paths need separate numbers. Shorter time to value matters because it usually links to retention, but this should be checked in the data.
</context>

<task>
<product>
{{product}}
</product>
{{#data}}<data>{{data}}</data>{{/data}}

1. Value milestones: two or three milestones with exact event definitions, and the start point.
2. How to measure: share reaching each milestone by day 1, 7, 14 and 30 per signup cohort, median and 75th percentile time among those who reached it, split by segment, and the events needed.
3. Current time to value: if data is given, compute and describe it; otherwise mark this as to be filled.
4. Where time is lost: break the path into steps and waits, show the median time per step if data allows, and find the largest delays and drop-offs. Separate effort (steps the user must do) from waiting (on others or on the system).
5. Changes to try: three to five changes aimed at the biggest delays (templates or sample data, deferring setup, parallel steps, guided imports, inviting teammates at the right moment, faster approvals), each with the milestone metric and a guardrail (quality of setup, later retention).
</task>

<constraints>
- Do not report a mean time to value without percentiles and the share never reaching it.
- Do not invent timings; use data given or mark as unknown.
- If the value moment is unclear, propose one and ask the user to confirm.
{{> output/uncertainty}}
</constraints>

<output_format>
## Value milestones
Table: milestone | event definition | start point.

## How to measure
Bullets.

## Current time to value
Table: segment | reached by day 7 | reached by day 30 | median | p75.

## Where time is lost
Table: step | median time | effort or waiting | drop-off.

## Changes to try
Numbered: change | delay addressed | metric | guardrail.

## Questions
What to confirm.
</output_format>
