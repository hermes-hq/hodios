---
schema: 1
id: explain-bonds-and-interest-rates
kind: prompt
title: Explain why bond prices move with interest rates
description: Explains why bonds and bond funds lose value when interest rates rise and gain when they fall, using duration and yield on the user's own bond or fund, and what that means for different time horizons.
category: investing
version: 1.0.0
status: incubating
stage: [learn]
role: [individual, student]
requires: [none]
inputs: [text, document]
output: [explanation, table]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [bonds, duration, yield, interest-rate-risk]
pairs_with:
  prompts: [explain-fund-document, explain-investment-concept, compare-cash-vs-money-market-funds, explain-rebalancing]
  personas: [investing-educator]
args:
  - name: bond_or_fund
    description: The bond or bond fund you hold or are reading about - its name or type, yield, duration or average maturity, and what happened to its price - or simply your question.
    type: text
    required: true
  - name: horizon
    description: When you might need the money. Optional.
    type: string
output_contract:
  format: markdown
  sections: [The see-saw, Duration in money, Your bond or fund, Individual bond versus bond fund, Other risks, Questions to check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A bond pays fixed interest. When market interest rates rise, newly issued bonds pay more, so existing bonds with lower coupons are worth less, and their price falls until their yield matches the market. When rates fall the reverse happens. **Duration** measures how sensitive a bond's price is to rate changes: as a rule of thumb, a 1 percentage point rise in yields lowers the price by roughly the duration in percent (a duration of 7 means about 7%). Long-dated bonds therefore fall more than short-dated ones; this is why some "safe" long government bond funds fell sharply when rates rose quickly. An individual bond held to maturity returns its face value if the issuer does not default, so interim price falls matter only if it is sold early. A bond fund never matures; it keeps a roughly constant duration, and after a rise in rates it earns the higher yield going forward, which recovers the fall over a period of roughly its duration. Credit risk (default), inflation and currency are separate risks from interest-rate risk.

<bond_or_fund>
{{bond_or_fund}}
</bond_or_fund>
{{#horizon}}Horizon: {{horizon}}{{/horizon}}
</context>

<task>
1. The see-saw: explain price and yield moving in opposite directions with a simple worked example (a 1,000 bond paying 3% when new bonds pay 5%).
2. Duration in money: using their bond or fund's duration (or an example duration labelled as such), show the approximate price change for a 1 and 2 point rise and fall in yields, on an example holding of their size if given.
3. Your bond or fund: read what they shared: the yield, duration, credit quality and what the price move they saw likely reflects. Say what you would need to know if details are missing.
4. Individual bond versus bond fund: hold-to-maturity versus a rolling fund, and the rough recovery period after a rate rise for a fund (about its duration), with the caveat that this is approximate.
5. Other risks: credit and default, inflation, currency for foreign bonds, and liquidity, each in one or two lines.
6. Questions to check: where to find duration, yield to maturity and credit quality in the fund documents, and what to ask a provider or adviser given their horizon.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not predict interest rates or say whether bonds are a good buy now.
- Duration-based estimates are approximations; say so, and do not claim precision.
- Do not recommend specific bonds or funds.
{{> output/uncertainty}}
</constraints>

<output_format>
## The see-saw
Short explanation and worked example.

## Duration in money
Table: yield change | approximate price change | on your holding.

## Your bond or fund
Bullets.

## Individual bond versus bond fund
Short comparison.

## Other risks
Bullets.

## Questions to check
Bullets.
</output_format>
