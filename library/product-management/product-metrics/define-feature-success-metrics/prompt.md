---
schema: 1
id: define-feature-success-metrics
kind: prompt
title: Define feature success metrics
description: Defines success metrics for a feature using HEART and goals-signals-metrics, with baselines, targets, guardrails, decision rules and the event data needed. Use before building or launching.
category: product-metrics
version: 1.0.0
status: incubating
stage: [plan, design]
role: [product-manager, data-analyst, designer, ux-researcher]
requires: [none]
inputs: [spec, text]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [heart-framework, goals-signals-metrics, guardrail-metrics, feature-measurement, success-criteria]
pairs_with:
  prompts: [write-tracking-plan, design-ab-test, review-launch-results, define-north-star-metric]
args:
  - name: feature
    description: The feature, the user problem it solves, who it is for, how users reach it, the launch plan (experiment, staged rollout or full launch) and any current metrics you already have.
    type: text
    required: true
  - name: goals
    description: What the team and business want the feature to achieve, and any company-level metric it should move. Optional; without it, goals are proposed for you to confirm.
    type: text
output_contract:
  format: markdown
  sections: [Goals, Metrics, Primary metric and decision rule, Guardrails, Event data needed, Readout plan, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product analytics lead. You use Google's HEART framework (Happiness, Engagement, Adoption, Retention, Task success) to pick which dimensions of user experience matter for a feature, and the goals-signals-metrics process to turn each one into something measurable: a goal (what success looks like for users), a signal (the behaviour or attitude that shows it), and a metric (the number you track). Teams misuse both by filling in all five dimensions with vanity counts, setting targets with no baseline, declaring success on a metric the feature could not move, and forgetting what the feature might break.
</context>

<task>
<feature>
{{feature}}
</feature>
{{#goals}}

<goals>
{{goals}}
</goals>
{{/goals}}

If the feature description does not say what user problem it solves or who it is for, ask and stop.

1. **Goals.** Write two or three user-centred goals and the business goal they serve. If goals were not given, propose them and mark them "to confirm".
2. **Metrics.** Choose the two to four HEART dimensions that matter for this feature and explain why the others are left out. For each chosen dimension, give goal, signal, metric (exact formula with numerator, denominator and time window), baseline (from the input, or "unknown: measure for N weeks before launch"), target with time frame and the reasoning behind it, and data source.
3. **Primary metric and decision rule.** Pick one metric the launch decision rests on, and write the rule: "Ship to everyone if X rises by at least Y within Z, with no guardrail breached; iterate if…; roll back if…". Prefer a metric the feature directly moves over a lagging company metric.
4. **Guardrails.** Two to four metrics that must not get worse (for example support contacts, latency, conversion of a nearby flow, unsubscribes, revenue per user), each with its tolerance.
5. **Event data needed.** The events and properties to instrument, with when each fires and which metric uses it. Note any event that already exists according to the input.
6. **Readout plan.** How the effect will be measured (A/B test, staged rollout with holdout, or before-and-after with its weaknesses stated), when to read it (early health check, then the decision date), and who decides.
7. **Open questions.** What must be confirmed before launch.
</task>

<constraints>
- Do not invent baselines. Targets without a baseline are expressed as relative change and flagged for revision once the baseline is known.
- Every metric must be computable from named events or a named data source; drop any that cannot.
- Happiness metrics from surveys need a sample size and a timing (for example in-product survey after the third use); do not rely on them alone for the decision.
- Keep metric names unambiguous: "weekly active users of X" must say what counts as active.
{{> output/uncertainty}}
</constraints>

<output_format>
## Goals
Bullets.

## Metrics
| HEART dimension | Goal | Signal | Metric (formula, window) | Baseline | Target | Source |
Then one line on the dimensions left out.

## Primary metric and decision rule
## Guardrails
| Metric | Tolerance | Why it could move |
## Event data needed
| Event | Fires when | Properties | Used by |
## Readout plan
## Open questions
</output_format>
