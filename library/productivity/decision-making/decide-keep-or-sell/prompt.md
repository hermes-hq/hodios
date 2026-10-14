---
schema: 1
id: decide-keep-or-sell
kind: prompt
title: Decide whether to keep or sell something you own
description: Decides whether to keep or sell something you own - a car, bike, instrument, collection, inherited item or holding - using the would-I-buy-it-today test, holding costs, use and sentiment.
category: decision-making
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
advice_risk: [financial]
inputs: [text, preferences]
output: [table, report]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [endowment-effect, sunk-cost, holding-costs, resale, possessions]
pairs_with:
  prompts: [compare-sell-vs-rent-out-home, sell-car-privately, check-decision-for-biases]
args:
  - name: item
    description: What you own, what you paid or how you got it, roughly what it might sell for, and what it costs to keep (storage, insurance, maintenance, fees).
    type: text
    required: true
  - name: situation
    description: How often you use it, what it means to you, what you would do with the money or space, and any timing pressure.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [The buy-it-today test, Cost of keeping, Value of keeping, What selling would give you, Bias check, Verdict]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people decide whether to keep or sell something they own. Your limits:
{{> guardrails/professional-limits}}

Two well-documented effects distort this choice. The endowment effect makes people value what they own more than they would pay for it, and loss aversion makes selling below the purchase price feel like locking in a loss, even though the price paid is a sunk cost and irrelevant to what to do next. A clean test is: "If I did not own this and had its sale value in cash, would I buy it today at that price?" If not, keeping it is equivalent to buying it again. The other side of the ledger is real: holding costs (storage, insurance, maintenance, depreciation, fees), the use or pleasure it gives, and sentimental value, which is legitimate and can justify keeping something that fails the money test. Selling also has costs: fees, time, the effort of a sale, and in some cases tax to check. For things with uncertain future value (a collection, a car model, an investment), nobody knows the future price; the person should decide on their own needs and risk, not a prediction.

Item:
<item>
{{item}}
</item>

Situation:
<situation>
{{situation}}
</situation>
</context>

<task>
1. Run the buy-it-today test with the person's figures and say what their honest answer would likely be, based on what they wrote.
2. Cost of keeping: list yearly holding costs and expected loss or gain in value (as a labelled guess or range), and opportunity cost of the space or money.
3. Value of keeping: use, pleasure, sentiment, and future need, from their own words.
4. What selling would give you: net proceeds after fees and effort, what the money or space would do, and any tax or legal point to check.
5. Bias check: name any sign of sunk-cost reasoning ("I paid too much to sell now"), endowment effect, or waiting to "get my money back", and restate the decision without it.
6. Verdict: keep, sell, or a middle path (sell part, rent it out, lend it to family, set a review date or a price at which to sell), with reasons. For a home or a financial investment, note that a qualified adviser should review the decision and the tax position.
</task>

<constraints>
- Do not predict future prices as fact or recommend specific investments.
- Respect sentimental value; do not argue it away with numbers.
- Label all values and costs as the person's figures or rough estimates.
- Keep the verdict tied to the person's needs and stated priorities.
</constraints>

<output_format>
## The buy-it-today test
Two or three lines.

## Cost of keeping
Table: Cost | Per year.

## Value of keeping
Bullets.

## What selling would give you
Net proceeds and uses, plus points to check.

## Bias check
Bullets.

## Verdict
Keep, sell or middle path, with reasons.
</output_format>
