---
schema: 1
id: plan-sequential-test
kind: prompt
title: Plan a sequential test
description: Plans an experiment that can be checked before it ends, with group sequential boundaries or always-valid tests, a look schedule, stop rules and the sample cost. Use when stakeholders want to peek.
category: statistics
version: 1.0.0
status: incubating
stage: [plan]
role: [data-scientist, data-analyst, product-manager, researcher]
subject: [statistics]
inputs: [text]
output: [plan, table, code]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [ab-testing, sequential-testing, alpha-spending, early-stopping]
pairs_with:
  prompts: [calculate-sample-size, design-ab-test, analyze-ab-test-results]
  personas: [statistician]
args:
  - name: experiment
    description: "The experiment: primary metric and its baseline, the smallest effect worth detecting, traffic or enrolment per day, the fixed-horizon sample size if known, and the significance level and power you want."
    type: text
    required: true
  - name: monitoring_needs
    description: "How often people want to look (daily dashboard, weekly review, a few planned interim analyses), whether you want to stop early for a win, for harm, for futility or all three, and the platform or tool."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Why peeking breaks the test, Recommended design, Look schedule and boundaries, Cost in sample size, Decision rules, Code, Team agreement]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an experimentation statistician. You know that checking a fixed-horizon test daily and stopping the first time p < 0.05 pushes the real false-positive rate far above 5% (to roughly 20 to 30% over a few weeks of daily looks), and that the honest alternatives cost something: group sequential designs (O'Brien-Fleming or Pocock boundaries, or Lan-DeMets alpha spending for flexible timing) need a modestly larger maximum sample, and always-valid methods (mixture sequential probability ratio tests, confidence sequences) allow continuous monitoring at a larger power cost. You also know that early stopping for a win overstates the effect (the winner's curse), that novelty and weekday effects mean a test should run at least one or two full weekly cycles, and that a futility rule saves traffic on dead ideas.
</context>

<task>
Plan a sequential test for this experiment.

<experiment>
{{experiment}}
</experiment>

<monitoring_needs>
{{monitoring_needs}}
</monitoring_needs>

1. Explain in three sentences why repeated looks at a fixed-horizon test inflate false positives, using this team's planned look frequency.
2. Recommend a design that fits the monitoring need:
   - a few planned reviews (2 to 5): group sequential with O'Brien-Fleming-type alpha spending, which keeps early boundaries strict and the final boundary close to the fixed test;
   - irregular or many looks: Lan-DeMets spending on information fraction;
   - truly continuous dashboards: an always-valid method (mSPRT or confidence sequences), or a Bayesian rule with its frequentist error rates checked by simulation;
   - also consider whether peeking is needed at all, and offer a fixed-horizon plan with only guardrail monitoring.
3. Set the look schedule by information fraction (share of the maximum sample), not calendar dates, and give the efficacy boundary (z or nominal p) at each look. Add a non-binding futility boundary if wanted, and a harm boundary for guardrails.
4. State the cost: maximum sample size versus the fixed design (about 1 to 3% more for O'Brien-Fleming with two to five looks, roughly 10 to 25% more for Pocock, and more again for continuous methods) and the expected sample size under a real effect versus no effect.
5. Write decision rules: what happens when a boundary is crossed, a minimum duration of full weekly cycles before any efficacy stop, what to do if traffic is lower than planned, and how to report the effect after an early stop (bias-adjusted estimate or a note that the naive estimate is inflated).
6. Give code: R (rpact or gsDesign) or Python (a spending-function implementation or simulation) that reproduces the boundaries, plus a short simulation that checks the false-positive rate under the planned looks.
7. Write a short team agreement to sign before launch.
</task>

<constraints>
- Do not give boundary values you have not computed or cannot derive; when exact values need software, give the code and approximate well-known values labelled as approximate.
- Never present a fixed-horizon p-value checked daily as valid.
- Do not allow efficacy stops before at least one full weekly cycle when the metric has weekly patterns.
- If the platform already uses a sequential method, say to use its built-in method rather than layering another on top.
- Keep the primary metric and boundaries fixed before launch; changes afterwards void the error guarantees.
</constraints>

<output_format>
## Why peeking breaks the test
Three sentences.

## Recommended design
The design and why it fits.

## Look schedule and boundaries
Table: Look | Information fraction | Approx. sample | Efficacy boundary | Futility boundary.

## Cost in sample size
Maximum and expected sample versus fixed horizon.

## Decision rules
Numbered rules.

## Code
One code block with the boundary calculation and the simulation.

## Team agreement
Five or six bullets to agree before launch.
</output_format>
