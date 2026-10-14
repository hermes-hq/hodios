---
schema: 1
id: calculate-fee-drag
kind: prompt
title: Calculate what investment fees cost over time
description: Adds up every layer of investment fees (fund charges, platform, adviser, transaction costs) and shows in money what they take over 10, 20 and 30 years, compared with a lower-cost set-up.
category: investing
version: 1.0.0
status: incubating
stage: [learn, review]
role: [individual]
requires: [none]
inputs: [text, document]
output: [table, explanation]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [investment-fees, ongoing-charges, compounding-costs, cost-comparison]
pairs_with:
  prompts: [explain-fund-document, compare-ways-to-invest, choose-financial-advisor, compare-two-funds]
  personas: [investing-educator]
args:
  - name: holdings_and_fees
    description: Portfolio value, regular contributions, and every fee you know of - fund ongoing charges, platform or account fee (percentage or flat), adviser fee, dealing charges, any entry or exit fees.
    type: text
    required: true
  - name: comparison
    description: An alternative fee set-up to compare with (for example a quote from another platform), or leave blank for a labelled illustrative lower-cost case. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Your total yearly cost, What fees take over time, Comparison, Fees you may not see, What fees buy, Questions to ask]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Fees are one of the few things in investing that are known in advance and controllable. They look small as percentages but compound against the investor: a 1.5% total annual cost on a portfolio growing at 6% before costs leaves the investor with roughly a third less after 30 years than they would have had with no costs. Costs come in layers that are often quoted separately: the fund's ongoing charge (OCF or expense ratio), transaction costs inside the fund, the platform or account fee (percentage, or flat which favours larger pots), adviser or discretionary management fees, dealing charges and FX fees, and sometimes entry, exit or performance fees. The fair comparison is total cost in money for the same assumed return, not headline percentages. Lower cost is not automatically better if the service (advice, tax planning, behavioural coaching) is worth the difference to the person.

<holdings_and_fees>
{{holdings_and_fees}}
</holdings_and_fees>
{{#comparison}}<comparison>
{{comparison}}
</comparison>{{/comparison}}
</context>

<task>
1. Your total yearly cost: list every fee layer with its rate, convert flat fees to a percentage of their pot and back to money, and give the total annual cost in percent and money today.
2. What fees take over time: project the pot over 10, 20 and 30 years at an illustrative return before costs (say 5%, clearly labelled as an assumption, not a forecast), with and without their total costs, including contributions if given. Show the money lost to fees (fees plus the growth those fees would have earned).
3. Comparison: the same projection for their alternative, or for an illustrative lower-cost set-up labelled as such. Show the difference in money at each horizon.
4. Fees you may not see: costs that are often missing from headline figures (transaction costs, FX, spreads, cash drag, performance fees) and where to find them in disclosure documents.
5. What fees buy: what the person gets for each layer and how to judge whether it is worth it to them.
6. Questions to ask: their provider and any adviser, for a full cost breakdown in money.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Returns are assumptions for illustration; never present them as expected or forecast returns.
- Do not recommend specific funds, platforms or advisers, or tell the person to switch. Note that switching can have its own costs and tax effects to check.
- Show the formula or year-by-year method so the maths can be checked; round sensibly.
- If a fee is unclear (for example "around 1%"), say how the result changes across the plausible range.
{{> output/uncertainty}}
</constraints>

<output_format>
## Your total yearly cost
Table: fee | rate | money per year.

## What fees take over time
Table: horizon | pot without fees | pot with fees | lost to fees.

## Comparison
Table: horizon | current set-up | alternative | difference.

## Fees you may not see
Bullets.

## What fees buy
Bullets.

## Questions to ask
Bullets.
</output_format>
