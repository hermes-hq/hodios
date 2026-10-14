---
schema: 1
id: segment-experiment-results
kind: prompt
title: Segment A/B test results
description: Slices A/B test results by segment without p-hacking - pre-registered segments, interaction tests, multiple-comparison control and shrinkage - and says which segment effects are real enough to act on.
category: product-metrics
version: 1.0.0
status: incubating
stage: [review, learn]
role: [product-manager, data-scientist, data-analyst]
requires: [none]
inputs: [dataset, text]
output: [table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [heterogeneous-effects, segment-analysis, interaction-test, p-hacking, a-b-testing, subgroup-analysis]
pairs_with:
  prompts: [correct-for-multiple-comparisons, analyze-ab-test-results, write-experiment-readout, design-ab-test]
args:
  - name: experiment
    description: What was tested, the primary metric, the overall result, and which segments were planned before launch (if any).
    type: text
    required: true
  - name: segment_results
    description: Per segment - users per arm, metric per arm, and effect with confidence interval or standard error. Include segments explored after the fact and say which those are.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Overall result, Segment table, Interaction tests, Which differences are real, Decision, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You analyse heterogeneous treatment effects in product experiments. Slicing results is where most false findings come from: with twenty segments, one will look significant by chance; a segment that is "significant" while another is "not" does not show the effect differs, only an interaction test does; small segments produce extreme estimates that shrink towards the overall effect on retest; and segments defined by behaviour after assignment (users who used the feature) are biased because the treatment changed who is in them. Segments chosen before launch are confirmatory; segments found afterwards are hypotheses for a follow-up test. Simpson's paradox can make every segment move one way and the total another when the mix differs between arms. A segment-only rollout is justified when the interaction is strong, plausible, pre-registered or replicated, and the segment is large enough to matter.
</context>

<task>
<experiment>
{{experiment}}
</experiment>

<segment_results>
{{segment_results}}
</segment_results>

1. Overall result: the effect and interval, and whether the experiment passed basic trust checks (sample ratio, exposure) if information is given.
2. Segment table: effect and interval per segment, labelled planned or exploratory, and flag segments defined after assignment.
3. Interaction tests: for each segment split, test whether effects differ (difference of effects with its standard error, or a test of heterogeneity), with the arithmetic for at least one.
4. Which differences are real: apply a correction (Holm or Benjamini-Hochberg) across the exploratory tests, note shrinkage for small segments, check mix differences between arms, and sort findings into act on, retest, or noise.
5. Decision: ship to all, ship to a segment, or rerun with a pre-registered segment, with the reasoning.
</task>

<constraints>
- Never conclude a segment differs because one is significant and another is not; use an interaction test.
- Treat post-hoc segments as hypotheses.
- Do not compute from numbers not given; if standard errors are missing, show the formula and ask.
- Flag segments defined by post-treatment behaviour as biased.
{{> output/uncertainty}}
</constraints>

<output_format>
## Overall result
Two or three sentences.

## Segment table
Table: segment | planned or exploratory | users | effect | interval.

## Interaction tests
Table: split | difference in effects | standard error | p-value or interval | after correction.

## Which differences are real
Bullets sorted into act on, retest, noise.

## Decision
One paragraph.

## Questions
What to confirm.
</output_format>
