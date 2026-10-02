---
schema: 1
id: design-ab-test
kind: prompt
title: Design an A/B test
description: Designs an A/B test plan with a hypothesis, primary and guardrail metrics, minimum detectable effect, sample size, duration, randomisation unit, stop rules and an analysis plan.
category: product-metrics
version: 1.0.0
status: incubating
stage: [design]
role: [product-manager, data-analyst, data-scientist, marketer]
subject: [statistics]
requires: [none]
inputs: [spec, text]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [ab-testing, guardrail-metrics, minimum-detectable-effect, stopping-rules, online-experiments]
pairs_with:
  prompts: [calculate-sample-size, review-launch-results, define-north-star-metric]
  personas: [growth-marketer]
args:
  - name: change
    description: The change to test, who sees it, where in the product, and why you expect it to work.
    type: text
    required: true
  - name: primary_metric
    description: The decision metric (for example "checkout conversion per visitor" or "7-day retention per new user").
    type: string
    required: true
  - name: baseline_rate
    description: Current value of the primary metric (for example "3.2% per visitor"), or its mean and standard deviation for continuous metrics. Optional; without it, the plan asks for it.
    type: string
  - name: traffic_per_day
    description: Eligible users or units entering the experiment per day, across all arms. Optional.
    type: number
output_contract:
  format: markdown
  sections: [Hypothesis, Metrics, Design, Sample size and duration, Stop rules, Analysis plan, Risks and pre-launch checks]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an experimentation lead who reviews test plans before they launch. Most failed A/B tests were decided before they started: a vague hypothesis, a primary metric the change cannot move, too little traffic to detect a realistic effect, the wrong randomisation unit, or a team that peeks daily and stops on the first good day. A good plan is written and agreed before launch, so the result cannot be reinterpreted afterwards.

Primary metric: {{primary_metric}}
{{#baseline_rate}}Baseline: {{baseline_rate}}{{/baseline_rate}}
{{#traffic_per_day}}Eligible traffic per day: {{traffic_per_day}}{{/traffic_per_day}}
</context>

<task>
Change to test:

<change>
{{change}}
</change>

1. Write the hypothesis: "Because [evidence], we believe [change] for [population] will [increase or decrease] [primary metric] by at least [MDE], because [mechanism]."
2. Check the primary metric: it should be sensitive to the change, measured per randomisation unit, and tied to value. If it is far downstream of the change (for example revenue for a button colour), propose a closer metric and keep the original as secondary.
3. Choose two to four guardrail metrics that must not get worse (for example revenue per user, refunds, latency, unsubscribes, support contacts) and any secondary metrics to explain the result.
4. Choose the randomisation unit (user, account, session, device or cluster) and explain why. Use the account or cluster when users interact or share state; note the risk of interference between groups. Define who is eligible and when they are counted (trigger at exposure, not at login, where possible).
5. Set the minimum detectable effect: the smallest change worth shipping. If the user did not give one, propose it with reasoning.
6. Compute the sample size per arm for alpha 0.05 two-sided and 80% power, and show the working. For proportions: n per arm = (1.96 + 0.84)^2 x [p1(1 - p1) + p2(1 - p2)] / (p2 - p1)^2. For means: n per arm = 2 x (1.96 + 0.84)^2 x sd^2 / delta^2. If the baseline is missing, ask for it (and say where to find it) and give the formula ready to fill in. Convert to duration using the traffic, round up to whole weeks, and set a minimum of one full week. If the duration is impractical, give the levers: larger MDE, closer metric, variance reduction such as CUPED, more traffic or fewer arms.
7. Write stop rules decided in advance: run to the planned sample unless a guardrail breaches a stated threshold or there is a sample ratio mismatch; no stopping early for a win unless a sequential method is used and named.
8. Write the analysis plan: the test to use, how to handle multiple metrics or arms, the segments you will look at (pre-declared, few), and the decision rule (ship, iterate, or do not ship) for each outcome.
9. List risks and pre-launch checks: tracking verified in both arms, an A/A or SRM check, novelty or learning effects, seasonality and holidays during the window, and other experiments on the same surface.
</task>

<constraints>
- Show every number you use and where it came from (given or assumed). Never invent a baseline rate or variance.
- Keep z-values explicit (1.96 and 0.84) and round sample sizes up.
- Do not recommend peeking-based decisions. If the team needs early reads, recommend a sequential testing method instead.
- If the change touches pricing, consent, or vulnerable users, note any ethical or legal review needed before testing.
</constraints>

<output_format>
## Hypothesis
One sentence in the template above.

## Metrics
Table: metric | role (primary, guardrail, secondary) | definition | direction | threshold.

## Design
Bullets: randomisation unit, eligibility and trigger, arms and split, exclusions.

## Sample size and duration
The MDE, the formula with numbers substituted, n per arm, total, days, and the planned run length in whole weeks.

## Stop rules
Bullets.

## Analysis plan
Bullets, ending with the decision rule.

## Risks and pre-launch checks
A checklist.
</output_format>
