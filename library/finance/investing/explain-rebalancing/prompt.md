---
schema: 1
id: explain-rebalancing
kind: prompt
title: Explain portfolio rebalancing
description: Explains portfolio rebalancing approaches (calendar, threshold, cash-flow) with a worked example on the user's own allocation and the tax, cost and behavioural trade-offs of each.
category: investing
version: 1.0.0
status: incubating
stage: [learn, maintain]
role: [individual]
requires: [none]
inputs: [text]
output: [explanation, table]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [rebalancing, asset-allocation, portfolio-drift, tax-efficiency]
pairs_with:
  prompts: [write-investment-policy-statement, check-portfolio-diversification, explain-tax-on-investments]
  personas: [investing-educator]
args:
  - name: current_allocation
    description: What you hold now and the value of each part (for example global shares fund 78,000, bond fund 22,000), and which account each sits in (pension, tax-free, taxable) if you know.
    type: text
    required: true
  - name: target_allocation
    description: The mix you intended (for example 60% shares, 40% bonds), and how much you add or withdraw each month. Optional; without it the drift is described against a labelled example target.
    type: text
output_contract:
  format: markdown
  sections: [What rebalancing does, Your drift, Three ways to rebalance this portfolio, Costs and tax, A written rule you could adopt, Questions to check]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Rebalancing means bringing a portfolio back to its intended mix after markets move it. Its purpose is **risk control**, not extra return: a 60/40 portfolio that drifts to 80/20 after a long rally now carries the risk of an 80/20 portfolio, often without the owner noticing. The three common approaches are calendar (rebalance on a set date, for example yearly), threshold (rebalance when an asset class drifts beyond a band, such as 5 percentage points absolute or 20-25% relative), and cash-flow (steer new contributions or withdrawals toward whatever is underweight, so little or nothing has to be sold). The costs are trading fees, spreads, taxes on gains in taxable accounts, and the discomfort of selling what has done well.

<current_allocation>
{{current_allocation}}
</current_allocation>
{{#target_allocation}}<target_allocation>
{{target_allocation}}
</target_allocation>{{/target_allocation}}
</context>

<task>
1. What rebalancing does: explain in three or four sentences, using their portfolio, why drift changes risk. Include a short illustration: what a 30% fall in shares would do to their current mix versus their target mix, in money.
2. Your drift: compute current weights, target weights, the drift in percentage points for each holding, and whether it breaches a 5-point absolute band. If no target is given, ask for it and use a clearly labelled example target meanwhile; never present the example as advice.
3. Three ways to rebalance this portfolio, with the actual amounts:
   - Sell-and-buy: the trades in money that restore the target today.
   - Cash-flow only: how much new money directed to the underweight holding would restore the target without selling, and how many months that takes at their contribution rate if given.
   - Partial or band rebalance: trade back to the edge of the band rather than the exact target, and the trades that requires.
4. Costs and tax: trading costs and spreads; that selling in a taxable account can realise gains, while rebalancing inside pensions or tax-free accounts usually does not (point to checking local rules); that holdings across several accounts can be rebalanced as one household portfolio by trading where it is cheapest; the behavioural cost of selling winners and buying laggards.
5. A written rule you could adopt: one or two example rules in plain words (for example "Each January, or whenever shares are more than 5 points from target, direct new money first and sell only for what remains, inside the pension first"), presented as examples to adapt, not instructions.
6. Questions to check: with their platform (fees, fractional trading, automatic rebalancing), and with a tax adviser if the taxable account holds large gains.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not recommend a target allocation, specific funds, or whether the person should rebalance now; show what each approach would involve.
- Do not frame rebalancing as market timing or a way to boost returns; say plainly that it can lower returns in a long one-way rally and why people do it anyway.
- Show the arithmetic for weights, drift and trades. Trades must net to zero for sell-and-buy.
- If the holdings are not clear asset classes (for example several overlapping funds), group them sensibly and state the grouping.
{{> output/uncertainty}}
</constraints>

<output_format>
## What rebalancing does
Short explanation plus the 30% fall illustration.

## Your drift
Table: holding | value | current weight | target weight | drift (points) | outside band?

## Three ways to rebalance this portfolio
Table: approach | trades or new money needed | sells anything? | notes.

## Costs and tax
Bullets.

## A written rule you could adopt
One or two example rules.

## Questions to check
Bullets.
</output_format>
