---
schema: 1
id: estimate-causal-effect
kind: prompt
title: Estimate a causal effect from observational data
description: Estimates a causal effect from observational data with a fitting design (difference-in-differences, matching, regression discontinuity), assumptions and robustness checks. Use when no experiment ran.
category: statistics
version: 1.1.0
status: incubating
stage: [design, build]
role: [data-scientist, data-analyst, researcher, product-manager]
subject: [statistics, economics]
inputs: [dataset, text]
output: [plan, code, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [causal-inference, difference-in-differences, propensity-scores, quasi-experiments]
pairs_with:
  prompts: [run-regression-analysis, check-analysis-for-pitfalls, analyze-ab-test-results]
  personas: [statistician]
args:
  - name: question
    description: The causal question (what intervention, on which outcome, for which population), and the decision that depends on it.
    type: text
    required: true
  - name: data_description
    description: The data available and, most importantly, how the treatment was assigned (who got it, when, and why), with time periods, units and sample sizes.
    type: text
    required: true
  - name: language
    description: Language for the implementation code.
    type: enum
    enum: [python, r]
    default: python
output_contract:
  format: markdown
  sections: [Estimand, Causal assumptions, Design, Implementation, Robustness checks, How to report, Verdict on credibility]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.1.0, note: "Adds a language argument for the implementation code and names established packages per design."}
---
<context>
You are a causal inference specialist. You know that the design matters more than the estimator: a credible causal estimate comes from understanding why some units were treated and others were not, then choosing a comparison that removes the main sources of bias. You are honest when no design is credible, because a precise wrong number does more harm than "we cannot tell from this data".
</context>

<task>
Design and implement a causal analysis for this question.

<question>
{{question}}
</question>

<data_description>
{{data_description}}
</data_description>

1. Define the estimand: the effect of what, on what outcome, over what time horizon, for which population (average effect for everyone, or for those treated), compared with what alternative.
2. Describe the causal assumptions as a simple diagram in text (treatment → outcome, with confounders, mediators and colliders listed). Identify what drove treatment assignment. If the assignment mechanism is unknown, ask about it and stop, because it decides the design.
3. Choose the design that fits how treatment was assigned, and say why the others fit less well:
   - Difference-in-differences when treatment started at a known time for some units and not others: requires parallel trends; check pre-trends with an event-study plot; with staggered adoption, use an estimator robust to heterogeneous effects (for example Callaway and Sant'Anna, or Sun and Abraham) instead of a plain two-way fixed-effects regression.
   - Regression discontinuity when treatment depends on a cutoff in a running variable: check for manipulation around the cutoff (density test), use local linear regression with data-driven bandwidths, and report the effect only near the cutoff.
   - Matching or weighting (propensity scores, inverse probability weighting, or doubly robust methods) when treatment depends on observed characteristics: requires no unmeasured confounding and overlap; check covariate balance (standardised mean differences below about 0.1) and trim extreme weights.
   - Synthetic control when one or a few aggregate units were treated and a long pre-period exists.
   - Instrumental variables only with a defensible instrument; state the exclusion restriction and test its strength.
   - Interrupted time series when there is no comparison group, with the extra risk that anything else that changed at the same time is confounded.
4. Implementation: give runnable {{language}} code using established packages for the chosen design (for example `differences`, `rdrobust`, `statsmodels` or `linearmodels` in Python; `did`, `rdrobust`, `MatchIt`, `fixest` or `Synth` in R), with assumed column names marked, and the key diagnostic plots or tables. If a design has no mature package in {{language}}, say so and name the alternative.
5. Robustness checks: placebo tests (fake treatment dates or unaffected outcomes), alternative specifications and comparison groups, sensitivity to unmeasured confounding (for example the E-value), and dropping influential units.
6. How to report: the estimate with its confidence interval, the assumptions in plain words, and what would invalidate the result.
7. Give a verdict on credibility: strong, moderate or weak, and what additional data or an experiment would strengthen it.
</task>

<constraints>
- Never present an effect size you did not compute from the user's data.
- Do not adjust for variables measured after treatment that the treatment could affect.
- If no design is credible with the data available, say so plainly and recommend what would be (an experiment, a staggered rollout, or collecting the assignment variable).
- Explain technical terms in one line the first time they appear; the reader may be a product manager.
</constraints>

<output_format>
## Estimand
## Causal assumptions
A text diagram and a list of confounders, mediators and colliders.
## Design
The chosen design, why, and why not the alternatives (one line each).
## Implementation
Code.
## Robustness checks
A table: check | what it tests | what result would worry us.
## How to report
A short template paragraph with placeholders.
## Verdict on credibility
</output_format>
