---
schema: 1
id: analyze-feature-adoption
kind: prompt
title: Analyse feature adoption
description: Analyses how a feature is adopted - exposure, first use, repeat use and depth by segment - to find where users drop off between seeing it and relying on it, and what to change.
category: product-metrics
version: 1.0.0
status: incubating
stage: [review, learn]
role: [product-manager, data-analyst, designer, founder]
subject: [saas]
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
tags: [adoption-funnel, feature-usage, repeat-usage, breadth-and-depth, segment-analysis, discoverability]
pairs_with:
  prompts: [review-launch-results, define-feature-success-metrics, analyze-conversion-funnel, write-tracking-plan]
args:
  - name: feature
    description: The feature, who it is for (eligible users), when and how it launched, and the job it is meant to do.
    type: text
    required: true
  - name: usage_data
    description: Counts or a table of eligible users, users who saw the entry point, first used it, used it again, and used it regularly, ideally by week since launch and by segment (plan, platform, user type).
    type: text
    required: true
  - name: expected_frequency
    description: Optional. How often a user who relies on the feature would naturally use it (daily, weekly, monthly, per project).
    type: text
output_contract:
  format: markdown
  sections: [Adoption funnel, Over time, By segment, Where it breaks, What to change, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You analyse adoption of a single product feature. A single "% of users who used it" figure hides where the problem is. Break adoption into stages: eligible (could use it), exposed (saw the entry point), tried (first use), repeated (second use within the natural interval), and retained (still using it several intervals later), plus depth (how much of it they use). Each stage break has different causes: low exposure is a discoverability problem, low trial a value-proposition or relevance problem, low repeat a first-experience problem, and decay after repeat a "not valuable enough" problem. The denominator must be eligible users, not all users, and repeat use must be judged at the feature's natural frequency: a monthly report feature used once a month is healthy.

{{#expected_frequency}}Natural frequency: {{expected_frequency}}{{/expected_frequency}}
</context>

<task>
<feature>
{{feature}}
</feature>

<usage_data>
{{usage_data}}
</usage_data>

1. Adoption funnel: eligible, exposed, tried, repeated, retained, each as a count and a percentage of the previous stage and of eligible. Show the arithmetic. If a stage is missing from the data, say so and what event would capture it.
2. Over time: whether trial and retained use are rising, flat or decaying since launch; separate the launch spike and novelty from steady state.
3. By segment: compare the funnel across the segments given; point out where the biggest gaps are and whether segment sizes are big enough to trust.
4. Where it breaks: the stage with the largest drop relative to what is reasonable for this kind of feature and frequency, with the likely causes for that stage.
5. What to change: two to four actions aimed at the breaking stage, each with the metric that should move and a way to test it.
</task>

<constraints>
- Use eligible users as the denominator; if only total users are given, say how this distorts the rate.
- Do not compare against invented industry benchmarks; compare across stages, segments and time.
- Usage alone does not prove value; say when a qualitative check (a few user interviews or a one-question survey) is needed.
- If the data has fewer than about 100 eligible users per segment, say comparisons are rough.
{{> output/uncertainty}}
</constraints>

<output_format>
## Adoption funnel
Table: stage | count | % of previous | % of eligible.

## Over time
Short paragraph or table by week.

## By segment
Table: segment | eligible | tried % | repeated % | retained %.

## Where it breaks
The breaking stage and likely causes.

## What to change
Numbered actions with the metric and the test.

## Questions
Data or definitions to confirm.
</output_format>
