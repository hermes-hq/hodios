---
schema: 1
id: calculate-cost-basis
kind: prompt
title: Calculate cost basis for a sale
description: Works out the cost basis and gain on shares or funds sold, across several purchases, reinvested dividends, fees and splits, under the matching rule your country uses.
category: taxes
version: 1.0.0
status: incubating
stage: [build]
role: [individual]
requires: [none]
inputs: [text, dataset]
output: [table, explanation, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [cost-basis, capital-gains, reinvested-dividends, share-matching]
pairs_with:
  prompts: [explain-tax-on-investments, organize-crypto-tax-records, explain-brokerage-statement]
  personas: [tax-educator]
args:
  - name: transactions
    description: Every purchase and sale of the holding with date, quantity, price per unit, fees and currency, plus reinvested dividends, stock splits, mergers, return of capital and transfers between brokers. Remove account numbers.
    type: text
    required: true
  - name: country
    description: Country where you are tax resident, since the rule for matching sold units to purchases differs (for example specific identification, first-in first-out, average cost or pooling).
    type: string
    required: true
  - name: method
    description: "Optional: the matching method you have elected or your broker uses, if you know it."
    type: string
output_contract:
  format: markdown
  sections: [Rule applied, Purchase ledger, Cost basis of the units sold, Gain or loss, Differences to check, Records to keep, Points to verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You work out the cost basis of investments sold so the gain or loss is reported correctly. The gain is the sale proceeds minus the cost basis, and the basis is where people make expensive mistakes. Countries use different rules to decide which purchases the sold units came from: some allow specific identification with first-in first-out as the default, some require average cost, and some pool holdings with special rules for units bought on the same day or within a short period around the sale. Basis usually includes purchase fees and is reduced by sale fees from proceeds. Reinvested dividends are new purchases that add to basis; forgetting them means paying tax twice on the same money. Stock splits change the number of units and the cost per unit but not the total cost. Return of capital reduces basis. For foreign-currency investments, each purchase and sale is often converted at the rate on its own date. Broker figures can be missing or wrong for holdings transferred in from another broker or bought long ago.

Country: {{country}}
{{#method}}Method stated: {{method}}{{/method}}
</context>

<task>
Transactions:

<transactions>
{{transactions}}
</transactions>

1. State the matching rule you will apply for {{country}} and this kind of investment, and how confident you are. If the rule depends on an election or on the type of holding (shares, funds, crypto), say so and ask. If you are not confident of the rule, show the calculation under the most likely rule and one alternative, clearly labelled.
2. Build a purchase ledger in date order: date, units, price, fees, total cost, running units, running total cost. Include reinvested dividends as purchases, adjust units and cost per unit for splits, and reduce basis for return of capital. Convert foreign-currency amounts at each transaction date's rate if the person supplied rates; otherwise leave a placeholder.
3. For each sale, identify which units were sold under the rule, and calculate their cost basis step by step.
4. Calculate the gain or loss: proceeds minus sale fees minus basis. Note the holding period where the country distinguishes short and long term.
5. Compare with any broker figure given and list differences and their likely causes.
6. List the records to keep and the points to verify.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Show every step of arithmetic so the person or an accountant can check it. Totals must reconcile: units bought minus units sold equals units left.
- Never invent prices, dates, exchange rates or quantities. Use placeholders for anything missing and say what document holds it.
- Do not say how much tax is due or recommend what to sell; this is the basis and gain only.
- Mark the matching rule and any special rules (short-period repurchase rules, wash-sale adjustments) as "verify" unless you are confident, and point to the tax authority guidance or an adviser.
- For crypto, derivatives, employee share schemes and inherited or gifted holdings, flag that special basis rules may apply and recommend an adviser.
{{> output/uncertainty}}
</constraints>

<output_format>
## Rule applied
Two or three sentences, with confidence and any alternative shown.

## Purchase ledger
Table: date | event | units | price | fees | total cost | running units | running cost.

## Cost basis of the units sold
Step-by-step calculation per sale.

## Gain or loss
Table: sale date | proceeds | sale fees | basis | gain or loss | holding period.

## Differences to check
Bullets, or "No broker figure given".

## Records to keep
Checklist.

## Points to verify
Bullets with where to check each.
</output_format>
