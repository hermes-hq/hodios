---
schema: 1
id: compare-two-funds
kind: prompt
title: Compare two investment funds side by side
description: Compares two funds or ETFs from their factsheets on objective, index or strategy, holdings overlap, total cost in money, risk, tracking and structure, so a learner sees what really differs.
category: investing
version: 1.0.0
status: incubating
stage: [learn, review]
role: [individual]
requires: [none]
inputs: [document, text]
output: [table, explanation, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [fund-comparison, etfs, factsheets, tracking-difference]
pairs_with:
  prompts: [explain-fund-document, calculate-fee-drag, check-portfolio-diversification, explain-investment-concept]
  personas: [investing-educator]
args:
  - name: fund_a
    description: Factsheet or key information for the first fund (paste the text or the key figures).
    type: text
    required: true
  - name: fund_b
    description: Factsheet or key information for the second fund.
    type: text
    required: true
  - name: amount
    description: The amount you are thinking of investing and for how long, so costs can be shown in money. Optional.
    type: string
output_contract:
  format: markdown
  sections: [In one sentence each, Side by side, Costs in money, What really differs, Things that look different but are not, What is missing, Questions to check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Two funds with similar names can be very different (one global index fund may exclude emerging markets or small companies, another may not), and two funds with different names can hold nearly the same thing. A useful comparison looks at what each fund is trying to do (its objective and index or strategy), what it holds (regions, sectors, number of holdings, top ten weight, overlap), what it costs in total (ongoing charge plus transaction costs, and for ETFs the spread), how well an index fund tracks its index (tracking difference over several years, not one), structure (accumulating or distributing, replication method, securities lending, domicile and currency share class, which can affect tax), size and age, and risk indicators. Past performance differences between two index funds tracking different indices mostly reflect the indices, not skill, and short periods mislead.

<fund_a>
{{fund_a}}
</fund_a>

<fund_b>
{{fund_b}}
</fund_b>
{{#amount}}Amount and horizon: {{amount}}{{/amount}}
</context>

<task>
1. In one sentence each: what each fund is, in plain words.
2. Side by side: a table across objective, index or strategy, number of holdings, top ten weight, regions, sectors, ongoing charge, other costs, tracking difference, accumulating or distributing, replication, domicile and currency, size, launch date, risk indicator. Use "not given" where the documents are silent.
3. Costs in money: if an amount is given, the yearly cost of each and the difference over the horizon at an illustrative return (labelled as such).
4. What really differs: the two to four differences that matter most for an investor, explained.
5. Things that look different but are not: for example, a past-performance gap explained by index choice, or a currency share class that does not change the underlying currency exposure.
6. What is missing: figures you would need for a fair comparison and where to find them.
7. Questions to check: tax treatment of accumulating versus distributing and of the fund's domicile in their country, platform availability and dealing costs.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only figures in the documents; do not fill gaps from memory about named funds. Mark missing items.
- Do not say which fund to buy or that one is "better"; explain the differences and who each design tends to suit, in general terms.
- Do not extrapolate past performance.
{{> output/uncertainty}}
</constraints>

<output_format>
## In one sentence each
Two sentences.

## Side by side
Table: feature | fund A | fund B.

## Costs in money
Short table or line.

## What really differs
Numbered list.

## Things that look different but are not
Bullets.

## What is missing
Bullets.

## Questions to check
Bullets.
</output_format>
