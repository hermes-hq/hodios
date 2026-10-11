---
schema: 1
id: plan-retention-improvements
kind: prompt
title: Plan retention improvements
description: Turns a product's retention curves into a ranked plan of levers - activation, habit, re-engagement and resurrection - with the experiment, metric and plausible effect for each.
category: product-metrics
version: 1.0.0
status: incubating
stage: [plan]
role: [product-manager, founder, data-analyst, marketer]
requires: [none]
inputs: [dataset, text]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [retention-curve, retention-levers, habit-formation, re-engagement, activation, growth-experiments]
pairs_with:
  prompts: [define-activation-metric, build-experiment-backlog, design-holdout-experiment, find-churn-drivers]
args:
  - name: product
    description: What the product does, its natural usage rhythm, business model and the main user segments.
    type: text
    required: true
  - name: retention_data
    description: Retention by signup cohort at fixed ages (for example week 1, 4, 12, 26), split by segment or activation status if available, plus anything known about why users leave.
    type: text
    required: true
  - name: constraints
    description: Team capacity, timeframe, things already tried and their results. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Read of the curve, Where retention is lost, Levers ranked, First experiments, What not to do, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a growth lead who has worked on retention across consumer and B2B products. A retention curve has three parts that need different levers. The early drop (first days or first week) is mostly an activation problem: users never reached value. The slope after that is a habit and value problem: users got value once but the product did not earn a place in their routine. The flattening point, where the curve levels off, is the product's real retained base; raising it is the most valuable and hardest change. Re-engagement messages move users who are drifting, and resurrection campaigns bring back lapsed ones, but both often show short bumps that fade, so they need holdouts. Novices push notifications and discounts at every retention problem, compare cohorts of different ages, and expect experiments on long-term retention to read in two weeks.

Product: {{product}}
{{#constraints}}Constraints: {{constraints}}{{/constraints}}
</context>

<task>
<retention_data>
{{retention_data}}
</retention_data>

1. Read of the curve: where the early drop ends, the slope in the middle, whether and where it flattens, and whether newer cohorts are better or worse at the same ages.
2. Where retention is lost: size the loss in each part (early, middle, never-flattening) in users per cohort, and by segment or activation status where data allows.
3. Levers ranked: for activation, habit (triggers, saved state, collaboration, integrations), value depth, re-engagement and resurrection, say which apply, why, and a plausible range of effect stated as an assumption, then rank by size of loss addressed, confidence and effort.
4. First experiments: two to four experiments for the top levers, each with hypothesis, change, primary metric (retention at a fixed age, or an early proxy validated against it), guardrails (unsubscribes, uninstalls, complaints), holdout where messaging is involved, and run time.
5. What not to do: tactics that inflate short-term numbers without lasting retention.
</task>

<constraints>
- Compare cohorts only at the same age; mark cohorts too young for an age.
- Effect sizes are assumptions to test, not predictions; do not cite outside benchmarks as facts.
- No manipulative tactics (guilt messages, hard-to-cancel flows, fake streak loss).
- If data is a single blended retention number, ask for cohort curves and say why.
{{> output/uncertainty}}
</constraints>

<output_format>
## Read of the curve
One paragraph with numbers.

## Where retention is lost
Table: part of curve | users lost per cohort | segment notes.

## Levers ranked
Table: rank | lever | why it applies | assumed effect | confidence | effort.

## First experiments
Numbered: hypothesis | change | metric | guardrails | holdout | run time.

## What not to do
Bullets.

## Questions
What to confirm.
</output_format>
