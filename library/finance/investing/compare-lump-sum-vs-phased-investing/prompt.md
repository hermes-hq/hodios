---
schema: 1
id: compare-lump-sum-vs-phased-investing
kind: prompt
title: Compare investing a lump sum at once or in stages
description: Explains the trade-off between investing a lump sum all at once and phasing it in over months, with worked scenarios, what the evidence says, the regret factor and how to set a phasing rule.
category: investing
version: 1.0.0
status: incubating
stage: [learn, plan]
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
tags: [lump-sum, pound-cost-averaging, dollar-cost-averaging, market-timing]
pairs_with:
  prompts: [plan-windfall, write-investment-policy-statement, explain-investment-concept, make-sense-of-market-drop]
  personas: [investing-educator]
args:
  - name: amount_and_context
    description: The sum to invest, where it came from (inheritance, bonus, house sale), the time horizon, and how you would feel if it fell 20% soon after investing.
    type: text
    required: true
  - name: options
    description: The phasing options you are weighing, for example "all now", "over 6 months" or "over 12 months". Optional.
    type: text
output_contract:
  format: markdown
  sections: [The trade-off in plain words, Three scenarios, What the evidence says, The regret factor, If you phase it in, Before either, Questions to check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
"Dollar-cost averaging" or "pound-cost averaging" means two different things that are often confused. Investing a fixed amount from each pay cheque is simply how people invest income; there is no lump sum to time. Phasing an existing lump sum in over months is a choice. Historical studies across many markets have found that, because markets rise more often than they fall, investing a lump sum at once has ended up ahead roughly two thirds of the time over the following year, with phasing ahead in the other third, usually when a fall came soon after. Phasing mostly reduces the risk of regret, not long-run risk, and the uninvested money sits in cash meanwhile. For people who would panic and sell after a sharp early fall, a set phasing plan can be the better behaviour even if it is often slightly worse on average. Past patterns are not a guarantee.

<amount_and_context>
{{amount_and_context}}
</amount_and_context>
{{#options}}Options: {{options}}{{/options}}
</context>

<task>
1. The trade-off in plain words: three or four sentences tied to their amount and horizon.
2. Three scenarios with their amount, using clearly illustrative numbers: markets rise steadily over the phasing period; markets fall 20% early then recover; markets fall steadily through the period. For each, show the value at the end of the phasing period for "all now" and for each phasing option (or six and twelve months if none given). Keep the arithmetic visible.
3. What the evidence says: summarise the historical finding in general terms with its limits; do not cite specific study figures beyond "about two thirds of the time" unless you are confident, and say past results do not predict the future.
4. The regret factor: use what they said about a 20% fall to discuss which choice they are more likely to stick with.
5. If you phase it in: how to make a phasing rule that does not become market timing (fixed dates and amounts, written down, automatic, a set end date), and where the waiting money sits.
6. Before either: checks that come first (emergency fund, expensive debt, money needed within five years should usually not be in shares, tax wrappers to use first), framed as common practice.
7. Questions to check with a provider or adviser.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not tell the person which option to choose or what to invest in.
- Scenarios are illustrations, not forecasts; label them.
- Do not suggest waiting for a dip or predicting markets.
{{> output/uncertainty}}
</constraints>

<output_format>
## The trade-off in plain words
Short paragraph.

## Three scenarios
Table: scenario | all now | phased option(s) | which ended ahead.

## What the evidence says
Short paragraph with limits.

## The regret factor
Short paragraph.

## If you phase it in
Bullets with an example rule.

## Before either
Bullets.

## Questions to check
Bullets.
</output_format>
