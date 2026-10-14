---
schema: 1
id: model-exit-waterfall
kind: prompt
title: Model who gets what when a startup is sold
description: Models the exit waterfall for a startup sale - debt and costs, liquidation preferences by seniority, participation, conversion decisions and common - at several sale prices.
category: fundraising
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, executive, financial-analyst]
advice_risk: [legal, financial]
inputs: [dataset, document]
output: [table, explanation]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [liquidation-preference, exit-waterfall, acquisition, cap-table, payout]
pairs_with:
  prompts: [compare-term-sheets, explain-term-sheet, evaluate-down-round-terms]
args:
  - name: cap_table
    description: Every class of shares with share counts, original issue price, preference multiple, participation (and any cap), seniority, and options with strike prices. Include debt outstanding.
    type: text
    required: true
  - name: exit_values
    description: The sale prices to model, and any transaction costs, management carve-out or escrow. Leave empty to model five values from low to high.
    type: text
output_contract:
  format: markdown
  sections: [Stack as read, Method, Waterfall at each exit value, Conversion breakpoints, Founder and employee outcomes, Points to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You model exit waterfalls. In a sale, the price is not split by ownership percentage until preferences are paid. Debt and deal costs come off first; then each preferred class takes its preference in seniority order (or pari passu); non-participating preferred holders compare taking the preference with converting to common and take whichever is larger, which creates breakpoints where the split changes; participating preferred take the preference and also share in the rest, up to any cap. Options only matter if the price per common share exceeds their strike, and the exercise cash or net exercise changes the count. Founders often learn at a modest exit that common receives far less than their ownership suggests.
</context>

<task>
Model the waterfall.

<cap_table>
{{cap_table}}
</cap_table>

<exit_values>
{{exit_values}}
</exit_values>

1. Stack as read: a table of each class in payout order with its terms. Flag missing terms (seniority, participation cap) and state the assumption you use.
2. Method: in five or fewer steps, how proceeds flow for this stack, including how you resolve conversion decisions (iterate: assume conversion for the classes better off converting, recompute, repeat until stable).
3. Waterfall at each exit value (if none given, model five: well below total preferences, at total preferences, two, five and ten times total preferences). For each: costs and debt, each preference, conversions, participation, residual to common, options in the money.
4. Conversion breakpoints: the exit value at which each non-participating class switches to converting, with the calculation.
5. Founder and employee outcomes: proceeds and the effective share of the exit versus their ownership percentage at each value.
6. Points to confirm in the documents and with the lawyer (carve-outs, escrow, earn-outs, tax).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the terms given; label every assumption. Never assume participation or seniority silently.
- Show calculations; totals at each exit value must equal net proceeds exactly.
- Present proceeds before tax; tax on sale proceeds differs by person and country, so refer to a tax adviser.
- Do not advise whether to accept a sale offer.
</constraints>

<output_format>
## Stack as read
Table: Class | Shares | Issue price | Preference | Participation | Seniority.
## Method
## Waterfall at each exit value
Table per value or one table with columns per value: Holder | Proceeds | % of exit.
## Conversion breakpoints
## Founder and employee outcomes
## Points to confirm
</output_format>
