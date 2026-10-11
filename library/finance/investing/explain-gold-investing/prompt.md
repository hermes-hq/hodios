---
schema: 1
id: explain-gold-investing
kind: prompt
title: Explain the ways to invest in gold
description: Explains the ways to hold gold and commodities - coins and bars, physically backed funds, futures funds, miners, gold apps - with costs, storage, tax questions and gold's long-run history.
category: investing
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
level: beginner
tags: [gold, precious-metals, commodities, bullion, inflation-hedge]
pairs_with:
  prompts: [evaluate-alternative-investment, spot-investment-scam, check-portfolio-diversification]
  personas: [investing-educator]
args:
  - name: question
    description: What prompted the question - a product or offer you are looking at, a worry about inflation or a crash, or general curiosity - and any route you are considering.
    type: text
    required: true
  - name: country
    description: Your country, since tax and sales tax on gold differ a lot.
    type: string
    required: true
  - name: amount
    description: Roughly how much you are thinking about and what share of your savings that is. Optional.
    type: string
output_contract:
  format: markdown
  sections: [What gold is and is not, Ways to hold it, Costs in money, What history shows, Tax and storage questions, Warning signs, Questions to ask]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Gold pays no income, so its return comes only from price changes, which have been large in both directions. History is mixed: gold has risen strongly in some crises and inflationary periods, but has also gone through long stretches of falling or flat real value (for example, after its 1980 peak it took decades to regain that level in real terms), and its link to inflation is weak over shorter periods. Each route carries different costs and risks: small coins and bars carry dealer premiums and buy-sell spreads that can be several percent or more, plus storage and insurance; physically backed exchange-traded products hold metal through a custodian and charge a yearly fee; futures-based commodity funds can lose money from rolling contracts even when the spot price is flat; mining shares are businesses with operating leverage and company risk, often moving much more than gold; app-based "digital gold", gold accounts and retirement accounts built around gold can carry high fees or weak protection. Tax varies widely: some countries charge sales tax or VAT on some bullion, treat gains on gold or gold funds at special rates, or exempt certain legal tender coins. Gold is also a favourite of high-pressure sales and scams.

Question: {{question}}

Country: {{country}}
{{#amount}}Amount: {{amount}}{{/amount}}
</context>

<task>
1. Explain in plain words what owning gold does and does not do for an investor: no income, a possible diversifier, uneven hedge against inflation and crises.
2. Compare the ways to hold it in a table: physical coins and bars, vaulted or allocated bullion accounts, physically backed funds, futures-based commodity funds, gold mining shares or funds, digital gold apps, any government-backed gold schemes in their country (marked "verify"). Cover what you actually own, costs, liquidity, counterparty risk and storage.
3. Costs in money: if an amount is given, the round-trip cost of each route over a ten-year hold using illustrative premiums, spreads and fees clearly labelled as assumptions to check.
4. What history shows: periods when gold did well and badly, in general terms without precise figures you cannot support, and why past performance in a crisis is not a promise.
5. Tax and storage questions for their country (sales tax or VAT, gains tax treatment, exempt coins, reporting), labelled as things to verify.
6. Warning signs in gold sales: pressure, fear-based marketing, buy-back promises, "free" storage, retirement-account rollovers into gold with high fees, collectable coins sold at large markups.
7. Questions to ask any dealer or fund provider.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not predict gold prices or say whether now is a good time to buy. Do not recommend a dealer, fund or allocation for this person.
- If you mention the share of a portfolio some educational sources discuss for gold, present it as a range people debate, not a recommendation.
- Do not state current prices, premiums or tax rates as fact; label any figures as illustrative.
- If the question describes an offer with scam signs, put that first.
{{> output/uncertainty}}
</constraints>

<output_format>
## What gold is and is not
Short paragraph.

## Ways to hold it
Table: route | what you own | costs | liquidity | risks.

## Costs in money
Table with labelled assumptions, or what is needed.

## What history shows
Short paragraph.

## Tax and storage questions
Bullets.

## Warning signs
Bullets.

## Questions to ask
Bullets.
</output_format>
