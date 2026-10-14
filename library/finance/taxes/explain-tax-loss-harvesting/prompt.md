---
schema: 1
id: explain-tax-loss-harvesting
kind: prompt
title: Explain tax-loss harvesting
description: Explains tax-loss harvesting with your own holdings - the possible saving, the repurchase rules that can cancel a loss in your country, and the cases where it does not help.
category: taxes
version: 1.0.0
status: incubating
stage: [learn]
role: [individual]
requires: [none]
inputs: [text]
output: [explanation, table, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [tax-loss-harvesting, capital-gains, wash-sale, cost-basis]
pairs_with:
  prompts: [explain-tax-on-investments, explain-rebalancing, explain-marginal-tax-rates]
  personas: [tax-educator]
args:
  - name: holdings
    description: Investments in taxable accounts with their cost and current value, gains or losses already realised this tax year, any loss carried forward, and which accounts are tax-advantaged.
    type: text
    required: true
  - name: country
    description: Country where you are tax resident.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [How it works, With your numbers, Rules that can cancel the loss, When it does not help, Questions for an adviser, Points to verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You explain tax-loss harvesting using the person's own holdings so they can discuss it with an adviser. The idea: sell an investment that is below its cost to realise a loss, use the loss to offset taxable gains (and in some countries a limited amount of other income), and stay invested by buying something similar. What novices miss: the saving is often a deferral, not a permanent gain, because the replacement has a lower cost basis and a larger future gain; most countries have anti-avoidance rules that disallow or defer a loss if the same or a substantially identical investment is bought back within a set window (and some count purchases by a spouse or in a tax-advantaged account); losses inside tax-advantaged accounts usually cannot be used; it adds nothing if gains are already covered by an annual allowance or a zero rate; and trading costs, spreads, time out of the market and currency conversion can outweigh the benefit.

Country: {{country}}
</context>

<task>
Holdings:

<holdings>
{{holdings}}
</holdings>

1. Explain how loss harvesting works in {{country}}: whether realised losses offset gains, whether they can offset other income and how much, whether unused losses carry forward, and whether short-term and long-term gains are treated differently. Mark any figure "verify" with the tax year.
2. With the person's numbers: list holdings with an unrealised loss in taxable accounts, the realised gains they could offset, and an illustrative saving (loss used x the rate the person supplies or a clearly labelled assumed rate). Show how the replacement's lower basis increases a future gain, so the long-run effect is clear.
3. Explain the rules that can cancel the loss in {{country}}: the repurchase window and what counts as the same or substantially identical investment, purchases by a spouse or in tax-advantaged accounts, and how a disallowed loss is treated (lost or added to the new basis). If unsure, describe the general pattern and say exactly what to look up.
4. Explain when it does not help: gains already within an allowance or zero rate, losses only in tax-advantaged accounts, small amounts where costs exceed the saving, and when the person may need the money soon.
5. Give questions to take to an adviser.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not tell the person what to sell, when, or which replacement to buy. Explain the mechanics and the trade-offs only.
- Never invent rates, allowances, windows or limits. If unsure, say "verify" and point to the tax authority's guidance.
- Use only the figures given; label any assumed rate.
- Note that rules for crypto, funds, options and foreign holdings can differ.
{{> output/uncertainty}}
</constraints>

<output_format>
## How it works
Short paragraph plus bullets on offset, income offset, carry-forward and holding periods in {{country}}.

## With your numbers
Table: holding | cost | value | unrealised loss | taxable account. Then the illustrative saving and the effect on future gains, with arithmetic.

## Rules that can cancel the loss
Bullets.

## When it does not help
Bullets.

## Questions for an adviser
Up to six questions.

## Points to verify
Bullets with where to check each.
</output_format>
