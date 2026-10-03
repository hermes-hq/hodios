---
schema: 1
id: run-cost-benefit-analysis
kind: prompt
title: Run a cost-benefit analysis
description: Runs a cost-benefit analysis of options against a do-nothing baseline, with monetised and non-monetised items, a time horizon, ranges for uncertainty, a sensitivity check and a recommendation.
category: decision-making
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, founder, business-analyst, individual]
requires: [none]
inputs: [text, dataset]
output: [report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [cost-benefit, npv, opportunity-cost, sensitivity-analysis, trade-offs]
pairs_with:
  prompts: [compare-options-matrix, run-second-order-thinking, run-pre-mortem]
args:
  - name: options
    description: The options you are choosing between, with any costs, savings, revenues, time and other effects you know, and who bears them. Rough numbers and ranges are fine.
    type: text
    required: true
  - name: horizon
    description: The period to evaluate over, for example "3 years" or "until the lease ends in 2029".
    type: string
    default: 3 years
output_contract:
  format: markdown
  sections: [Question and baseline, Assumptions, Costs and benefits, Monetised comparison, Non-monetised factors, Uncertainty and sensitivity, Recommendation, Data to firm up]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You run cost-benefit analyses the way a careful analyst in a finance or policy team would. A useful analysis compares each option against a realistic baseline (usually "do nothing" or "keep the status quo"), counts only differences from that baseline, includes indirect costs and opportunity costs, converts to money only what can be valued honestly, keeps the rest visible instead of pretending it is zero, puts values over time on a common footing, and shows how fragile the answer is. Precision theatre (one confident number built on guesses) is worse than a clear range.

Options:
<options>
{{options}}
</options>
Time horizon: {{horizon}}
</context>

<task>
1. State the decision question and the baseline. If the options or their main effects are too unclear to analyse, ask up to four questions and stop.
2. List the assumptions you need: prices, volumes, rates, people's time valued at what rate, a discount rate if the horizon is longer than a year (state it and why; use a simple, stated rate and show the undiscounted totals too). Mark each as "given" or "assumed". Use ranges (low / likely / high) where the input is uncertain.
3. For each option, list costs and benefits relative to the baseline: one-off and recurring, direct and indirect (time, training, disruption, maintenance), opportunity cost (what else the money, time or space could do), and who bears or receives each.
4. Monetise what can be valued defensibly. Show the arithmetic line by line per year across the horizon, then total costs, total benefits, net benefit, and the payback point. Give low, likely and high cases.
5. Keep non-monetised factors (quality, risk, morale, reputation, flexibility, environmental or wellbeing effects) in a separate table, rating each as better, same or worse than baseline with a short reason. Say which ones could change the answer.
6. Test sensitivity: find the two or three assumptions that most change the net result, and the break-even value of each (the value at which the ranking flips).
7. Recommend an option, explaining it through the numbers, the non-monetised factors and the sensitivity. Say what would make you change the recommendation.
8. List the data that would most improve the analysis, in order of value.
</task>

<constraints>
- Never present an assumed number as a fact. Every number is either quoted from the input or labelled as an assumption with its basis.
- Show your arithmetic so the user can check it; double-check sums and per-year totals.
- Do not double count (for example counting both a time saving and the salary it frees).
- Keep money in the currency given; do not convert unless asked.
- This is a decision aid, not financial, tax, investment or legal advice. If the options involve loans, investments, tax treatment or legal obligations, say which figures a qualified adviser should confirm.
- The decision is the user's. If the analysis is close, say so rather than forcing a winner.
</constraints>

<output_format>
## Question and baseline
Two or three sentences.

## Assumptions
Table: Assumption | Value or range | Given or assumed | Basis.

## Costs and benefits
Per option, a table: Item | Type (one-off / recurring) | Cost or benefit | Who | Monetised?

## Monetised comparison
Per-year table per option, then a summary table: Option | Total costs | Total benefits | Net (low / likely / high) | Payback.

## Non-monetised factors
Table: Factor | Option A | Option B | ... with a reason.

## Uncertainty and sensitivity
Table: Assumption | Range tested | Effect on net | Break-even.

## Recommendation
A short paragraph, plus "I would change this if...".

## Data to firm up
Numbered list.
</output_format>
