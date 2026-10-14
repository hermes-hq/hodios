---
schema: 1
id: explain-annuity-quote
kind: prompt
title: Explain an annuity quote or contract
description: Explains an annuity quote or contract in plain words - payout rate, fees, surrender charges, riders, inflation and insurer risk - with the breakeven age and questions to ask before signing.
category: investing
version: 1.0.0
status: incubating
stage: [learn, review]
role: [individual]
requires: [none]
inputs: [document, text]
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
tags: [annuities, surrender-charges, guaranteed-income, riders, inflation-protection]
pairs_with:
  prompts: [compare-pension-lump-sum-vs-income, explain-structured-product, explain-investment-concept]
  personas: [investing-educator]
args:
  - name: quote
    description: The annuity quote, illustration or contract summary, pasted as written (type, premium, income, start date, options, fees, surrender schedule, riders).
    type: text
    required: true
  - name: situation
    description: Your age, country, health if you choose to share it, whether a partner depends on this income, and what the money is for. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What this product is, The numbers decoded, Costs and lock-ins, What you get in each scenario, Risks to weigh, Questions to ask before signing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
"Annuity" covers very different products. A simple immediate (lifetime) annuity swaps a lump sum for guaranteed income for life: low cost and easy to compare, but usually irreversible. Deferred, variable, fixed-indexed and similar products sold as savings vehicles often carry layered annual fees (mortality and expense charges, fund fees, rider fees that can each be around 1% or more), surrender charges for many years, caps and participation rates that limit upside, and sales commissions. Common misreadings: treating the payout rate as an investment yield when much of each payment is your own money coming back; mistaking a rider's "income base" growing at a stated roll-up rate for real account value you could withdraw; ignoring that level income loses buying power to inflation while escalating or inflation-linked income starts much lower; choosing single life when a partner relies on the income; and not checking the insurer's financial strength or the limits of any guarantee scheme. In some markets people with health conditions or smoking histories qualify for higher rates, and shopping around beyond the current provider can change income noticeably.

<quote>
{{quote}}
</quote>
{{#situation}}Situation: {{situation}}{{/situation}}
</context>

<task>
1. Name the product type from the document (immediate lifetime, fixed-term, deferred, variable, fixed-indexed, other) and explain in two or three sentences what it does. If the document does not say, list what would identify it.
2. Decode the numbers: premium, income amount and frequency, payout rate (income divided by premium) and why it is not a yield, guarantee period, single or joint life, level or escalating, start date. Compute how many years of payments return the premium (simple breakeven, no growth) and the age that implies.
3. Costs and lock-ins: list every fee and charge shown with its yearly cost in money, the surrender schedule, free withdrawal allowance, cooling-off or free-look period, and anything marked as not guaranteed.
4. Scenarios: what is paid if they die early, live to an average age, live to 95; and if there are market-linked parts, what happens in a poor, middling and strong market using the product's own caps and rates.
5. Risks: inflation (show what the income buys after 20 years at an assumed inflation rate, labelled), insurer failure and guarantee scheme limits to check, irreversibility, liquidity, complexity.
6. Questions to ask the provider or adviser, including commission paid, comparable quotes from other providers, and whether enhanced rates apply.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only figures in the quote. Where a figure is missing, say what it is and why it matters; do not supply typical rates from memory.
- Do not say whether to buy it. Explain what they would be giving up and getting.
- Be plain about features that mainly benefit the seller, such as long surrender periods or high rider fees, describing them factually rather than as accusations.
- If health information is shared, use it only to mention that enhanced or impaired-life rates may exist in their market; do not estimate life expectancy for them.
{{> output/uncertainty}}
</constraints>

<output_format>
## What this product is
Short paragraph.

## The numbers decoded
Table: item | value | what it means, with the breakeven working below.

## Costs and lock-ins
Table: charge | rate | yearly cost in money | notes.

## What you get in each scenario
Table or bullets.

## Risks to weigh
Bullets.

## Questions to ask before signing
Bullets.
</output_format>
