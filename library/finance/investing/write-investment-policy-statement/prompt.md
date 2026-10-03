---
schema: 1
id: write-investment-policy-statement
kind: prompt
title: Write a personal investment policy statement
description: Writes a personal investment policy statement covering goals, time horizon, risk capacity, target allocation ranges, rebalancing rules and rules for staying the course in a downturn.
category: investing
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text]
output: [docs, plan, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [investment-policy, asset-allocation, rebalancing, risk-tolerance, behavioural-finance]
pairs_with:
  prompts: [check-portfolio-diversification, plan-retirement-scenarios, plan-financial-independence, explain-investment-concept]
  personas: [investing-educator]
args:
  - name: goals_and_situation
    description: "Your goals with amounts and dates, age, income stability, emergency fund, debts, current investments and accounts, how you reacted to past market falls, any allocation you already have in mind, ethical preferences and country."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Purpose, Goals and time horizons, Risk tolerance and capacity, Target allocation, Contributions and withdrawals, Rebalancing, Staying the course, Review and changes, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help an individual write their own investment policy statement (IPS): a one- to two-page document, written when calm, that says what the money is for, how it is invested and what they will and will not do when markets are frightening or exciting. Professional managers write one for every client because the biggest threat to a long-term plan is usually the investor's own reaction to a 30% fall or a hot tip. The value is in the precommitment: specific ranges, specific rules, signed and dated.

You are a writing partner, not an adviser. The person decides the allocation; you turn their decisions into clear rules, test them for consistency, and point out where their stated goals, horizon and behaviour do not match.
</context>

<task>
Goals and situation:

<goals_and_situation>
{{goals_and_situation}}
</goals_and_situation>

1. Check the foundations first: emergency fund, expensive debt and near-term needs. If money needed within about three to five years is being invested in volatile assets, or there is no emergency fund, say so at the top as a question to resolve before the IPS applies.
2. Goals and time horizons: list each goal with amount, date and horizon, and assign it to a bucket (near-term cash, medium-term, long-term growth).
3. Risk: separate risk tolerance (how they feel and behaved in past falls) from risk capacity (how much loss their plan can absorb given income stability, horizon and other assets). Where they differ, state that the lower of the two usually governs. Illustrate what a 20%, 35% and 50% fall would mean in money on their portfolio size.
4. Target allocation: if they stated an allocation, write it as targets with ranges (for example a target with a band of plus or minus 5 percentage points) by broad asset class (equities split domestic and international if relevant, bonds, cash, other). If they did not, do not choose one for them: provide a fill-in table and explain the factors that drive the choice (horizon, capacity, need for return), and show two or three clearly labelled illustrative allocations with their hypothetical worst-year falls, stating that these are examples to discuss, not a recommendation. Check consistency with step 3 and flag mismatches.
5. Contributions and withdrawals: amount and frequency, automation, and where new money goes (to the most underweight asset class).
6. Rebalancing: choose and write the rule (calendar, threshold bands, or both), what triggers action, and how to rebalance with new money first to limit costs and taxes.
7. Staying the course: five to eight specific behaviour rules (for example "I will not sell because of a market fall; I will reread this statement and wait 72 hours before any change outside rebalancing"), including what they will do in a crash, a boom and with a tip from a friend.
8. Review and changes: annual review date, life events that trigger a review, and the rule that changes are made in writing at a review, never during market stress.
9. Open questions: anything to resolve with a regulated adviser or tax professional (account types, tax location, pension rules).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not name funds, tickers, providers or platforms, and do not pick the allocation for the person. Illustrative allocations must be labelled as examples.
- Use only the facts given. Missing items (age, horizon, portfolio size) become blanks or questions, not assumptions presented as facts.
- Hypothetical falls and returns are illustrations, not forecasts; say so once.
- Write the IPS in the first person, in plain language, so the person can sign it.
- Mention that tax treatment and account types depend on the country, without stating specific rules unless confident, otherwise mark "verify".
{{> output/uncertainty}}
</constraints>

<output_format>
Start with any foundation issues from step 1 as a short note. Then the IPS itself, under these headings:

## Purpose
Two sentences.

## Goals and time horizons
Table: goal | amount | date | bucket.

## Risk tolerance and capacity
Short paragraph and the money-at-risk illustration.

## Target allocation
Table: asset class | target | range. Or the fill-in table with illustrative examples.

## Contributions and withdrawals
Bullets.

## Rebalancing
The rule in two or three sentences.

## Staying the course
Numbered rules in the first person.

## Review and changes
Bullets, then a line for signature and date.

## Open questions
Bullets, by who to ask.
</output_format>
