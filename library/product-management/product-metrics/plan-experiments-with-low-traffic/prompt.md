---
schema: 1
id: plan-experiments-with-low-traffic
kind: prompt
title: Plan experiments with low traffic
description: Works out what a low-traffic product can learn from experiments - detectable effect sizes, bigger bets, more sensitive metrics and non-experimental evidence - instead of underpowered A/B tests.
category: product-metrics
version: 1.0.0
status: incubating
stage: [plan, design]
role: [product-manager, founder, data-analyst, marketer]
subject: [statistics]
requires: [none]
inputs: [text]
output: [plan, table, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [statistical-power, sample-size, minimum-detectable-effect, b2b-experiments, small-samples, evidence-strategy]
pairs_with:
  prompts: [design-ab-test, build-experiment-backlog, estimate-feature-impact]
args:
  - name: traffic_and_metrics
    description: Weekly users or accounts reaching the area you want to test, the current rate of the metric you care about (for example 3% trial-to-paid), and any faster metrics you track.
    type: text
    required: true
  - name: ideas
    description: The changes you want to evaluate and the effect you hope each has.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What your traffic can detect, Per idea, Ways to get more signal, Evidence without A/B tests, Plan, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a team with little traffic (a B2B product, a niche consumer app, an early startup) decide how to learn from changes. The usual failure is running A/B tests that cannot detect any realistic effect, stopping them early when one arm looks ahead, and shipping noise as a win. First compute what effect size the traffic can detect in a reasonable time. Then use the levers that work at small scale: test bigger changes (only large effects are detectable), move the metric closer to the change (a step completion rate instead of revenue), use more sensitive analysis (pre-period covariates such as CUPED, stratification, paired designs), run longer only if seasonality and novelty allow, test at the account level only if accounts are the unit, and combine with non-experimental evidence: usability tests, before and after with a control period, painted-door tests and qualitative signals.
</context>

<task>
<traffic_and_metrics>
{{traffic_and_metrics}}
</traffic_and_metrics>

<ideas>
{{ideas}}
</ideas>

1. What your traffic can detect: for the main metric, compute the minimum detectable effect (relative and absolute) at 80% power and 5% two-sided significance for 2, 4 and 8 weeks of a 50/50 test, using n per arm approx. 16 x p(1-p) / d^2 for a rate p and absolute difference d. Show the arithmetic.
2. Per idea: is the hoped-for effect detectable in 8 weeks or less? If not, which faster or closer metric would be, and with what MDE.
3. Ways to get more signal: which levers apply here and roughly how much each helps (for example variance reduction from pre-period data often shrinks required samples by a meaningful fraction when the covariate correlates well; say it depends on that correlation).
4. Evidence without A/B tests: for ideas that cannot be tested, the best alternative method and what it can and cannot show.
5. Plan: an ordered list of what to test, what to ship with lighter evidence, and what to skip, with decision rules set before starting.
</task>

<constraints>
- Do not recommend running tests that cannot detect the hoped-for effect; say plainly when a test is not worth running.
- Warn against peeking and stopping early; if they must monitor, suggest a sequential method planned in advance.
- Use only the traffic and rates given; if they are missing, ask for them and stop.
- Mark all approximations as approximations.
{{> output/uncertainty}}
</constraints>

<output_format>
## What your traffic can detect
Table: duration | n per arm | MDE absolute | MDE relative. Arithmetic below.

## Per idea
Table: idea | hoped effect | detectable in 8 weeks | better metric | MDE on that metric.

## Ways to get more signal
Bullets with the expected help.

## Evidence without A/B tests
Table: idea | method | what it shows | limits.

## Plan
Ordered list with decision rules.

## Questions
What to confirm.
</output_format>
