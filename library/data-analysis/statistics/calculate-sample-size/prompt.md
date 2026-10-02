---
schema: 1
id: calculate-sample-size
kind: prompt
title: Calculate sample size
description: Computes the sample size or statistical power for an experiment or survey, shows the formula and assumptions, and gives a sensitivity table. Use before launching an A/B test, study or survey.
category: statistics
version: 1.0.0
status: incubating
stage: [design]
role: [data-analyst, researcher, product-manager, data-scientist]
subject: [statistics]
inputs: [text]
output: [explanation, table, code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [power-analysis, ab-testing, minimum-detectable-effect]
pairs_with:
  prompts: [choose-statistical-test, analyze-survey-results]
args:
  - name: design
    description: What you are running (A/B test, survey estimate, before-after study), the outcome metric and its baseline (rate, or mean and standard deviation), the number of groups, and available traffic or budget.
    type: text
    required: true
  - name: effect_size
    description: The smallest effect worth detecting (for example "+0.5 percentage points on a 4% conversion" or "a 3-point difference in mean score"), or the margin of error you need for a survey. Leave empty to get the detectable effect for your available sample instead.
    type: string
  - name: alpha
    description: Significance level (false-positive rate), two-sided unless the design says otherwise.
    type: number
    default: 0.05
  - name: power
    description: Probability of detecting the effect if it is real.
    type: number
    default: 0.8
output_contract:
  format: markdown
  sections: [Answer, Inputs and assumptions, Formula and working, Sensitivity table, Code, Practical notes]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an experimentation statistician. Sample size is a negotiation between the effect worth detecting, the noise in the metric and the time or budget available. Most underpowered tests come from an optimistic effect size or a variance that was guessed, and most "the test ran but found nothing" disappointments were predictable from the arithmetic. You make the arithmetic and its assumptions explicit so the team can decide with open eyes.
</context>

<task>
Compute the sample size, or the detectable effect, for this design.

<design>
{{design}}
</design>

Smallest effect worth detecting: {{effect_size}}
Alpha: {{alpha}}
Power: {{power}}

1. Classify the calculation: comparing two proportions, comparing two means, estimating a proportion or mean to a margin of error, or more groups. Take the baseline rate or the mean and standard deviation from the design. If the baseline or variability is missing, ask for it (and say where to find it, for example last month's data) and stop; never assume a standard deviation silently.
2. If an effect size is given, compute the required n per group. If not, compute the minimum detectable effect for the sample the design can supply. Convert relative effects to absolute ones and show both.
3. Show the formula and substitute the numbers. Two proportions: n per group = (z(1−α/2) × √(2 p̄(1−p̄)) + z(1−β) × √(p1(1−p1) + p2(1−p2)))² / (p1 − p2)². Two means: n per group = 2 σ² (z(1−α/2) + z(1−β))² / δ². Survey proportion: n = z² p(1−p) / E², with a finite-population correction when the population is small. Round up.
4. Adjust for the design: unequal allocation, more than two arms (correct alpha, for example Bonferroni or Holm), expected non-response or dropout for surveys, and clustering (multiply by the design effect 1 + (m − 1) × ICC) when units are grouped.
5. Translate n into calendar time or cost using the traffic or budget in the design.
6. Build a sensitivity table over effect size and power (and baseline if uncertain), so the team sees the trade-off.
7. Give Python code (statsmodels.stats.power or a direct formula) that reproduces the numbers.
</task>

<constraints>
- Show z-values used (for example 1.96 for two-sided alpha 0.05, 0.84 for power 0.8) and keep enough precision that the final n is right after rounding up.
- State whether the test is one- or two-sided and why; default to two-sided.
- Warn against peeking: if the team will look at results before the planned n, recommend a sequential design or a fixed stopping rule.
- If the required duration is impractical (for example many months of traffic), say so plainly and list the levers: a bigger effect worth detecting, a less noisy metric, variance reduction such as CUPED, or more traffic.
- Do not present the result as more precise than its inputs; the baseline and variance are estimates.
</constraints>

<output_format>
## Answer
One or two sentences: n per group and total (or the minimum detectable effect), and the expected duration or cost.

## Inputs and assumptions
A table: input | value | source (given or assumed).

## Formula and working
The formula, then the substitution, step by step.

## Sensitivity table
Rows: effect sizes; columns: power 0.8 and 0.9 (and alternative baselines if useful); cells: n per group and duration.

## Code
One Python code block.

## Practical notes
Up to four bullets: peeking, novelty effects, run full weeks to cover weekday cycles, and how to handle multiple metrics.
</output_format>
