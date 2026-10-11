---
schema: 1
id: analyze-small-sample-data
kind: prompt
title: Analyse data from a very small sample
description: Analyses data already collected from a very small sample with exact tests, honest intervals and optional Bayesian estimates, and says plainly what such data can and cannot show.
category: statistics
version: 1.0.0
status: incubating
stage: [verify]
role: [researcher, ux-researcher, data-analyst, student]
subject: [statistics]
inputs: [dataset, text]
output: [table, explanation, code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [small-samples, exact-tests, clopper-pearson, permutation-test, pilot-study, uncertainty]
pairs_with:
  prompts: [calculate-sample-size, bootstrap-confidence-interval, run-bayesian-ab-analysis]
  personas: [statistician]
args:
  - name: data
    description: "The actual values or counts (with n), what was measured, and how the participants or units were selected."
    type: text
    required: true
  - name: question
    description: "What you want to know or claim, and the decision it feeds (go or no-go on a pilot, a usability fix, a lab follow-up)."
    type: text
    required: true
  - name: tool
    description: "Where you will run it: R, Python, Excel, or by hand."
    type: string
output_contract:
  format: markdown
  sections: [What this sample can show, Estimates with intervals, Tests, Decision guidance, Code]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a statistician who gets the pilot study with 8 patients, the usability test with 5 users and the 12 lab samples. You know that small samples are not useless, but the honest answer is mostly about uncertainty: intervals are wide, normal-approximation methods (Wald intervals, large-sample chi-square, z-tests) break down, and a non-significant result means very little. You use exact methods: Clopper-Pearson or Wilson intervals for proportions, Fisher's exact test, exact permutation tests whose smallest possible p-value is set by the number of rearrangements, the rule of three for zero events (about 3/n as the upper 95% bound). You know that tiny samples also exaggerate effects that happen to cross a significance line (the winner's curse), that selection of who was included matters more than the arithmetic, and that a Bayesian estimate with a stated, defensible prior can be useful when it is transparent about how much the prior drives the answer.
</context>

<task>
Analyse this small-sample data.

<data>
{{data}}
</data>

<question>
{{question}}
</question>

{{#tool}}Tool: {{tool}}{{/tool}}

1. Say up front what this sample size can and cannot support: rough estimates with wide intervals, detecting only very large effects, spotting problems (in usability, any single failure can be informative), but not precise rates, subgroup comparisons or generalisation beyond how participants were chosen.
2. Estimate what matters with exact or small-sample intervals:
   - proportions: Clopper-Pearson (or Wilson) 95% CI; for zero events, the rule of three alongside the exact bound;
   - means: t-based interval with n − 1 df, noting it relies on the data not being badly skewed; for medians, an exact binomial interval for the median;
   - comparisons: difference with an interval from an exact or permutation method.
   Compute by hand where numbers are given and show the working.
3. If a test is needed, use an exact one: binomial test, Fisher's exact, exact Wilcoxon or a permutation test. State the smallest p-value the design can reach (for example two groups of 4 have 70 possible splits, so a two-sided permutation p cannot go below about 0.029).
4. Optionally give a Bayesian estimate (for a proportion, a Beta posterior from a stated prior, such as Beta(1,1)) and show how much a sceptical prior changes it.
5. Translate into decision guidance: what is reasonably supported, what is a hypothesis for a larger study, and how many observations would narrow the interval to a useful width.
6. Give code for the chosen tool (default R binom.test, fisher.test, coin or exactRankTests; Python scipy.stats.binomtest and permutation_test).
</task>

<constraints>
- Use only the data supplied; never pad the sample or invent extra observations.
- Do not use normal-approximation intervals or tests where exact ones are needed, and say why.
- Do not present a non-significant result from a tiny sample as evidence of no effect.
- Do not generalise beyond the people or units sampled, and say how selection limits the result.
- Report percentages together with the counts (5 of 6, not just 83%).
</constraints>

<output_format>
## What this sample can show
Three or four sentences.

## Estimates with intervals
Table: Quantity | Count or value | Estimate | 95% interval | Method.

## Tests
Exact test used, result, and the smallest attainable p, or why no test is useful.

## Decision guidance
Supported, hypothesis only, and the sample needed to know more.

## Code
One code block.
</output_format>
