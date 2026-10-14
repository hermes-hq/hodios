---
schema: 1
id: explain-margin-and-leverage
kind: prompt
title: Explain margin trading and leveraged products
description: Explains margin loans, leveraged ETFs, CFDs and spread bets with worked numbers for gains, losses, margin calls, financing costs and daily-reset decay, and why most retail accounts lose money.
category: investing
version: 1.0.0
status: incubating
stage: [learn]
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
depth: specific
tags: [margin-trading, leveraged-etfs, cfds, margin-call]
pairs_with:
  prompts: [explain-options-risks, explain-crypto-risks, evaluate-stock-tip, spot-investment-scam]
  personas: [investing-educator]
args:
  - name: product
    description: The leveraged product or set-up you are looking at (margin account, 2x or 3x ETF, CFD, spread bet, leveraged crypto) and its terms if you have them (leverage, interest rate, margin requirement).
    type: text
    required: true
  - name: amount
    description: The amount you are thinking of using, so examples are in your money. Optional.
    type: string
output_contract:
  format: markdown
  sections: [How the leverage works, Gains and losses in money, Margin calls and forced selling, Costs of borrowing, Daily reset and volatility decay, What the regulators' warnings mean, Questions to ask first]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Leverage multiplies exposure: a margin loan or a CFD at 5:1 means a 1% move in the asset is a 5% move on the investor's own money. The ways people lose money are specific. **Margin calls**: when losses shrink equity below the maintenance requirement, the broker demands more cash or sells positions, often at the worst moment, and gaps overnight can leave a balance owed beyond the deposit (negative balance protection exists in some places for some products, to check). **Financing costs**: margin interest and overnight funding on CFDs and spread bets are charged daily and add up over months. **Daily reset decay**: a 2x or 3x leveraged ETF targets that multiple of the **daily** return, so over longer periods in a volatile, sideways market it can lose value even if the index ends flat. In several jurisdictions, CFD providers must publish the percentage of retail accounts that lose money, and these figures are typically high.

<product>
{{product}}
</product>
{{#amount}}Amount: {{amount}}{{/amount}}
</context>

<task>
1. How the leverage works: for their product, explain exposure versus deposit in two or three sentences.
2. Gains and losses in money: a table for asset moves of +10%, +5%, -5%, -10%, -20% showing the result on their own money, with the leverage they gave or a labelled example.
3. Margin calls and forced selling: at what fall a margin call would come for the example, what happens, and whether losses can exceed the deposit for this product (as a question to check with the provider).
4. Costs of borrowing: the interest or overnight funding on the example over one month, six months and a year, labelled if the rate is assumed.
5. Daily reset and volatility decay: for leveraged ETFs, a worked example of an index going +10% then -10% (or alternating days) and the 2x or 3x fund's result versus the index. Skip with a note if not relevant.
6. What the regulators' warnings mean: the retail loss disclosures and product restrictions some jurisdictions have, as things to check, not exact figures.
7. Questions to ask first: of the provider, and of themselves (could I afford to lose all of it, how long can I hold, what is my exit rule).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not recommend using leverage, any product or any trade.
- Do not state specific regulatory percentages or rules as fact; frame as things to check in their jurisdiction.
- Show all arithmetic; label assumed rates and leverage.
{{> output/uncertainty}}
</constraints>

<output_format>
## How the leverage works
Short explanation.

## Gains and losses in money
Table: asset move | result on your money.

## Margin calls and forced selling
Short explanation with the trigger level.

## Costs of borrowing
Table: period | cost.

## Daily reset and volatility decay
Worked example, or note.

## What the regulators' warnings mean
Short paragraph.

## Questions to ask first
Bullets.
</output_format>
