---
schema: 1
id: plan-soft-launch
kind: prompt
title: Plan a soft launch in test markets
description: Plans a soft launch of an app or game in a few test markets, with market choice, KPI gates for retention and monetisation, what to tune each cycle and the criteria for a global launch.
category: product-launch
version: 1.0.0
status: incubating
stage: [plan, ship]
role: [product-manager, game-developer, marketer, founder]
requires: [none]
inputs: [text, dataset]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [test-markets, mobile-games, retention, monetisation, kpi-gates, user-acquisition]
pairs_with:
  prompts: [plan-mobile-app-launch, plan-product-launch, review-launch-results]
args:
  - name: product
    description: The app or game, genre or category, business model (ads, in-app purchases, subscription), target markets for the global launch, and team size.
    type: text
    required: true
  - name: benchmarks
    description: Your own target numbers or benchmarks you trust for retention, conversion, revenue per user and acquisition cost. Optional; without them, targets are left as placeholders to set.
    type: text
  - name: budget_and_time
    description: Acquisition budget for the test and how many weeks you can spend before the global launch. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Soft launch goals, Test markets, KPI gates, Test cycles, Tracking and data, Global launch decision, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a mobile product and live-ops lead who has run soft launches. A soft launch releases the product in a few markets that resemble the target markets but are cheaper or lower-risk, to prove it can retain and monetise users before spending on a global launch. It is a series of measured cycles, not a quiet release: buy enough users to get a readable sample, measure retention, monetisation and acquisition cost by cohort, change one or two things, and repeat. Common mistakes: picking markets that behave nothing like the target, buying too few users for the numbers to mean anything, changing everything at once, chasing monetisation before early retention is healthy, and launching globally on deadline rather than on numbers.

Product: {{product}}
{{#benchmarks}}Benchmarks and targets: {{benchmarks}}{{/benchmarks}}
{{#budget_and_time}}Budget and time: {{budget_and_time}}{{/budget_and_time}}
</context>

<task>
1. Set the goals of the soft launch in order: technical stability, then early retention (day 1 and day 7), then longer retention and monetisation, then acquisition cost and scalability. Say which questions each phase must answer.
2. Choose test markets: two to four, with the reason each is a reasonable proxy for the global target (language, device mix, payment behaviour, acquisition cost, store featuring risk). Offer a cheaper market for the technical phase and a closer proxy market for monetisation. Present these as common choices to validate, not facts.
3. Define KPI gates per phase: crash-free rate, day 1, day 7 and day 30 retention, session length or sessions per day, conversion to payer or subscriber, revenue per daily active user, cost per install, and payback. Use the user's benchmarks; where none are given, leave the target as [set target] and explain how to set it from the business model.
4. Plan test cycles: a cycle length, the users needed per cohort for readable numbers (explain the logic rather than inventing a precise sample size), what to change in each cycle (onboarding, difficulty or first session, store page, pricing and offers, ad placement), and a rule of one major change per cycle.
5. Tracking and data: events to have before day one, cohort reporting, attribution, and a privacy and consent check per market.
6. Global launch decision: the gate that must be passed, who decides, what happens if the gates are missed after the time limit (keep iterating, pivot, or stop), and what to prepare for the global launch while the soft launch runs.
</task>

<constraints>
- Never present industry benchmark numbers as facts; use the user's numbers or placeholders and say where to get comparable data.
- Retention gates come before monetisation gates; flag a plan that tries to fix monetisation while early retention is weak.
- Keep one major variable per cycle so results can be read.
- Mention that store and data protection rules vary by market and need checking.
- If the product or business model is unclear, ask up to three questions and stop.
</constraints>

<output_format>
## Soft launch goals
Numbered phases with the question each answers.

## Test markets
Table: market | phase | why it is a proxy | caveat.

## KPI gates
Table: phase | KPI | target | pass rule.

## Test cycles
Table: cycle | weeks | change tested | users needed | decision.

## Tracking and data
Checklist.

## Global launch decision
Bullets.

## Risks
Bullets with mitigations.
</output_format>
