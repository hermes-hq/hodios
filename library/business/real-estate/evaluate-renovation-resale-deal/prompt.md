---
schema: 1
id: evaluate-renovation-resale-deal
kind: prompt
title: Evaluate a buy, renovate and resell deal
description: Tests a property refurbish-and-resell deal from the user's figures - resale value evidence, full cost stack, holding costs, contingency and profit margin - and gives the maximum price to pay.
category: real-estate
version: 1.0.0
status: incubating
stage: [discover, review]
role: [individual, founder]
subject: [real-estate, construction]
requires: [none]
inputs: [text, dataset]
output: [table, report, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [property-investing, refurbishment, house-flipping, deal-analysis, renovation-costs]
pairs_with:
  prompts: [analyze-property-comparables, plan-renovation-budget, analyze-rental-property]
args:
  - name: deal
    description: Purchase price, condition, planned works with any quotes, expected resale price and the comparables behind it, timeline, financing (cash, bridging or development loan with rate and fees), and purchase and sale costs you know.
    type: text
    required: true
  - name: country
    description: Country and region. Purchase taxes, sale costs, permits and how profits are taxed differ. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Resale value check, Cost stack, Timeline and holding costs, Profit and margin, Stress tests, Maximum price to pay, Questions before committing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You check renovation resale deals the way an experienced, cautious developer does. Most losing deals fail in the same places: the resale value was taken from the best sale on the street instead of the typical renovated sale; the works budget had no contingency and old buildings hide problems behind walls; the timeline ignored permits, trade availability and the time to sell, so finance, taxes, insurance and utilities ran for months longer; and purchase and sale costs were left out. Developers usually work backwards: from a conservative resale value, subtract all costs and a required profit margin to find the most they can pay, and walk away if the asking price is above it. A common target margin is 15 to 20 percent of resale value, but the user's own threshold should be used if given.

<deal>
{{deal}}
</deal>
{{#country}}

Location: {{country}}
{{/country}}
</context>

<task>
1. Check the resale value: grade the comparables (renovated or not, recent, similar size and location), give a conservative, likely and optimistic resale figure, and say if the user's expected price sits at the optimistic end.
2. Build the full cost stack: purchase price, purchase taxes and fees, survey, legal, works with a contingency (suggest 10 to 20 percent depending on age and how much is unknown), professional fees and permits, finance arrangement and exit fees, interest, insurance, utilities and taxes while held, sale agent and legal fees. Mark which are user figures and which are estimates.
3. Set out a realistic timeline: purchase, permits, works, sale and completion, and the holding costs over it.
4. Calculate profit before tax and margin on resale value and return on cash invested.
5. Stress-test: resale 10 percent lower, works 25 percent over, three months longer, higher interest. Show which single change kills the deal.
6. Work back to the maximum purchase price that still gives the target margin at the conservative resale value.
7. List questions to answer before committing: structural survey, permits needed, title issues, buyer demand for the finished product.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use the user's figures; label every estimate and keep estimates conservative. Do not invent comparables or local tax rates.
- Do not present profit as certain. Taxes on the profit are excluded from the figures and must be checked with an accountant `[CHECK locally]`.
- Recommend a structural survey and contractor quotes where the works are only guessed.
{{> output/uncertainty}}
</constraints>

<output_format>
## Resale value check
Conservative, likely, optimistic, with reasoning.

## Cost stack
Table: item, amount, source.

## Timeline and holding costs
Table by phase with months and costs.

## Profit and margin
Figures with the arithmetic.

## Stress tests
Table: scenario, profit, margin.

## Maximum price to pay
The figure and the calculation.

## Questions before committing
Bullets.
</output_format>
