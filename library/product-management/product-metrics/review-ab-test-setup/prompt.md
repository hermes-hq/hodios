---
schema: 1
id: review-ab-test-setup
kind: prompt
title: Review an A/B test setup before launch
description: Reviews an experiment's setup before launch - randomisation unit, exposure logging, metric definitions, interference, power and stopping rules - and lists the fixes needed for trustworthy results.
category: product-metrics
version: 1.0.0
status: incubating
stage: [verify, review]
role: [product-manager, data-scientist, data-analyst, software-engineer]
requires: [none]
inputs: [spec, config, text]
output: [checklist, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [experiment-review, pre-launch-check, randomisation-unit, exposure-logging, statistical-power, a-b-testing]
pairs_with:
  prompts: [design-ab-test, diagnose-sample-ratio-mismatch, define-guardrail-metrics, write-experiment-readout]
args:
  - name: test_setup
    description: The experiment plan or config - hypothesis, variants, randomisation unit and bucketing key, targeting, where exposure is logged, primary and guardrail metrics with definitions, traffic split, planned duration and stopping rule.
    type: text
    required: true
  - name: product_context
    description: Traffic, baseline metric values, other experiments running on the same surface, and anything shared between users (marketplace inventory, team workspaces, social feeds). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Blocking issues, Should fix, Checks before launch, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You review experiments before they launch, because most broken tests are broken by setup, not analysis. The usual faults: the randomisation unit does not match the metric (randomising sessions but measuring user retention; randomising users when teammates share a workspace); exposure is logged at assignment rather than when the user actually sees the change, diluting the effect with people who never saw it; exposure logging differs between variants (a redirect or slower page drops events in one arm, causing sample ratio mismatch); the primary metric is vague, a ratio with a different denominator than the unit, or not available for weeks; interference between users in marketplaces and social products biases simple A/B tests; the test is too small for any realistic effect; there is no stopping rule, so someone will peek and stop on a good day; and overlapping tests on the same surface interact.
</context>

<task>
<test_setup>
{{test_setup}}
</test_setup>
{{#product_context}}<product_context>{{product_context}}</product_context>{{/product_context}}

1. Check the randomisation unit against the metrics and against shared state (accounts, teams, households, two-sided interactions); propose cluster or switchback designs when interference is likely.
2. Check exposure: where and when it is logged, that it fires identically in every arm, and that analysis uses exposed users only (triggered analysis).
3. Check metrics: precise definitions, units and denominators that match the randomisation unit (flag ratio metrics needing the delta method), availability within the test window, guardrails present.
4. Check power: rough minimum detectable effect from the traffic and baseline given; say if the test cannot detect a realistic effect.
5. Check stopping and analysis: fixed duration in full weeks or a sequential method, pre-registered primary metric, segments chosen in advance, SRM check planned.
6. Check overlaps, targeting changes during the test, bots and internal traffic, and novelty effects.
7. Sort findings into blocking issues and should fix, each with the fix.
</task>

<constraints>
- Review what is described; do not assume a setting that is not stated, ask instead.
- Show any power arithmetic; if baseline or traffic is missing, ask.
- Blocking means results would be untrustworthy; do not inflate minor issues.
{{> output/uncertainty}}
</constraints>

<output_format>
## Verdict
Launch, launch after fixes, or redesign, with one sentence why.

## Blocking issues
Numbered: issue | why it breaks the result | fix.

## Should fix
Numbered: issue | fix.

## Checks before launch
Checklist: A/A or SRM check, exposure event QA in each arm, dashboard dry run, owner of the stop decision.

## Questions
What to confirm.
</output_format>
