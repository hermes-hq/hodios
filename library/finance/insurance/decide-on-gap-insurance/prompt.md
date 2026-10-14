---
schema: 1
id: decide-on-gap-insurance
kind: prompt
title: Decide on GAP insurance for a car
description: Works out whether GAP insurance is worth buying for a financed, leased or new car by modelling the shortfall after a write-off over time, comparing GAP types and dealer versus standalone prices.
category: insurance
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text, document]
output: [report, table]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [gap-insurance, car-finance, write-off, depreciation, dealer-add-ons]
pairs_with:
  prompts: [compare-car-insurance, review-car-purchase-contract]
args:
  - name: car_deal
    description: Price paid, deposit, finance or lease type and term, amount still owed by month or year if you have it, and whether it is new or used.
    type: text
    required: true
  - name: gap_offer
    description: The GAP quotes you have - dealer or standalone, type (return to invoice, finance or lease shortfall, vehicle replacement), term, cost, maximum benefit and whether the premium is added to the finance.
    type: text
  - name: car_policy
    description: What your car insurance pays on a write-off - market value, or new car replacement for the first year or two - if you know.
    type: text
  - name: country
    description: Country you live in. GAP products and rules on how dealers may sell them vary.
    type: string
output_contract:
  format: markdown
  sections: [Summary, The shortfall over time, GAP types compared, Price check, Questions before buying]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
If a car is written off or stolen, the car insurer usually pays its market value at the time, which falls fastest in the first two or three years. GAP insurance pays some or all of the difference. Whether that gap exists depends on the deal: a small deposit, a long finance term, a balloon payment or a lease can leave more owed than the car is worth for years, while a large deposit or cash purchase may leave little or no finance gap. Types differ: finance or lease shortfall GAP pays what is still owed minus the insurer's payout; return-to-invoice pays back to the original price; vehicle replacement pays to replace with a new equivalent. Some car policies already replace a new car in the first year, which overlaps. Dealer GAP is often far more expensive than standalone GAP, and adding the premium to the finance means paying interest on it. Some countries require a waiting period between a dealer offering GAP and selling it, so the buyer can compare. Policies have maximum benefit caps, excesses, and terms shorter than the finance.
{{#country}}

Country: {{country}}
{{/country}}
{{#car_policy}}

<car_policy>
{{car_policy}}
</car_policy>
{{/car_policy}}
{{#gap_offer}}

<gap_offer>
{{gap_offer}}
</gap_offer>
{{/gap_offer}}
</context>

<task>
<car_deal>
{{car_deal}}
</car_deal>

1. The shortfall over time: build a year-by-year table of the amount owed (from the figures given, or estimated with the stated assumptions) against a rough market value using a depreciation assumption you state clearly (for example 15 to 25% in year one, then 10 to 15% a year), and the gap each year. Say plainly if the gap disappears early or never exists.
2. GAP types compared: which type would cover which part of the gap for this deal, and any overlap with new-car replacement in the car policy.
3. Price check: the cost of each GAP offer, the cost including interest if added to finance, and the maximum benefit against the largest projected gap.
4. Questions before buying: cap, excess, term versus finance term, cancellation and refunds, whether it transfers if the car is sold, what happens on early settlement, and exclusions.
5. Give a reasoned view of whether GAP addresses a real risk here, without choosing for the person.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Label all depreciation and value figures as estimates; do not present them as valuations.
- Do not invent GAP prices or legal waiting periods; say what to check locally.
- Do not recommend a provider.
- If the dealer is pressing for a decision on the day, say that standalone GAP can usually be bought later, within a time limit set by the GAP provider (often counted from the car purchase), so there is no need to decide under pressure.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Whether a meaningful gap exists, for how long, and how the offers compare.

## The shortfall over time
Table: year | owed | estimated value | gap. Then the assumptions used.

## GAP types compared
Table: type | what it pays here | overlap with car policy.

## Price check
Table: offer | cost | cost with interest | maximum benefit.

## Questions before buying
Numbered.
</output_format>
