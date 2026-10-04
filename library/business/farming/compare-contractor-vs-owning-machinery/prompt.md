---
schema: 1
id: compare-contractor-vs-owning-machinery
kind: prompt
title: Compare contractor vs owning machinery
description: Compares using a contractor with owning or sharing a farm machine, costing each per hectare or hour with depreciation, labour and timeliness, and shows the break-even area.
category: farming
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, individual]
subject: [agriculture]
requires: [none]
inputs: [notes, text]
output: [table, report, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [machinery-costs, contractor-rates, break-even-area, depreciation, timeliness, machinery-sharing]
pairs_with:
  prompts: [compare-equipment-lease-vs-buy, calculate-break-even, plan-machinery-preseason-checks]
  personas: [farm-business-advisor]
args:
  - name: operation
    description: The job, for example "drilling cereals", "baling round bales", "spraying", "combining".
    type: string
    required: true
  - name: area
    description: Hectares (or acres, say which) or hours of this job per year on your farm.
    type: number
    required: true
  - name: machine_cost
    description: Price of the machine (new or second-hand), expected years of use, expected resale value, how it would be paid for, and the tractor power it needs if you would have to upgrade.
    type: text
    required: true
  - name: contractor_rate
    description: Quoted or typical contractor charge per hectare, hour or bale, what it includes (tractor, driver, fuel), and how reliably contractors turn up when you need them.
    type: text
    required: true
  - name: farm_costs
    description: Optional. Your own costs - interest rate, labour cost per hour and spare labour time, fuel use, insurance, storage, expected repairs, and what a late job costs you in yield or quality.
    type: text
output_contract:
  format: markdown
  sections: [Snapshot, Cost per hectare, Break-even area, Timeliness and risk, Other options, What to check next, Assumptions and questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a farmer decide whether to keep using a contractor or to own (or share) the machine for one job. The comparison goes wrong when it counts only the purchase price against the contractor's bill: the real cost of owning includes depreciation, interest on the money tied up, insurance, housing, repairs, fuel and the farmer's own labour, spread over the area actually worked. On the other side, the contractor's rate leaves out timeliness: a contractor who arrives a week late at drilling or a wet hay window can cost more than the bill. Ownership gets cheaper per hectare as area grows, so the answer turns on the break-even area, and on options in between such as sharing or doing contract work for neighbours.

Operation: {{operation}}
Area or hours per year: {{area}}
</context>

<task>
<machine_cost>
{{machine_cost}}
</machine_cost>

<contractor_rate>
{{contractor_rate}}
</contractor_rate>

{{#farm_costs}}
<farm_costs>
{{farm_costs}}
</farm_costs>
{{/farm_costs}}

1. Annual fixed cost of owning: depreciation = (price - resale) / years of use; interest = (price + resale) / 2 x interest rate; plus insurance and housing. Show each line.
2. Variable cost per hectare or hour: fuel, repairs and maintenance, your labour (valued at what it costs or what that time could earn elsewhere), and any tractor costs if your tractor does the work.
3. Cost per hectare of owning = annual fixed cost / area + variable cost per hectare. Compare with the contractor's rate on a like-for-like basis (does it include tractor, driver, fuel?).
4. Break-even area = annual fixed cost / (contractor rate per hectare - variable cost per hectare of owning). Say what area you would need and how far the farm is from it.
5. Timeliness: estimate the cost of a late job only from the farmer's figures or as a clearly labelled scenario (for example "if a 5-day delay costs 2% of yield"), and show how it shifts the answer.
6. Non-money factors: labour at the busiest time, skill and risk of operating, storage, reliability and relationship with the contractor, the machine's age at resale.
7. Options in between: second-hand machine, sharing or a machinery ring, doing contract work for others to spread the fixed cost, or a contractor with a guaranteed slot.
8. Run a sensitivity: area 25% lower and higher, resale value 25% lower, contractor rate up 10%.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the figures given. If repairs, interest or labour cost are missing, use a labelled assumption the farmer can change, and list it under questions.
- Do not quote current machinery prices, contractor rates, grants or tax allowances as fact. Tax treatment of machinery (allowances, VAT) is a question for the farm's accountant.
- Present the decision as the numbers point, with the conditions that would change it; do not tell the farmer what to buy or how to finance it.
- If it is unclear whether the area is in hectares, acres or hours, say which unit you assumed and convert the contractor rate to the same unit.
- If area (or a zero area), machine cost or contractor rate is missing, ask and stop.
</constraints>

<output_format>
## Snapshot
Three lines: cost per hectare owning, cost per hectare contractor, break-even area.

## Cost per hectare
Table: cost line | owning per year | owning per hectare | contractor per hectare. Arithmetic shown.

## Break-even area
The formula with figures, and the sensitivity table: scenario | owning per hectare | contractor per hectare | cheaper option.

## Timeliness and risk
Bullets, with any timeliness scenario costed.

## Other options
Table: option | rough cost per hectare or how to price it | pros | cons.

## What to check next
Up to five actions (quotes, conversations, records to pull).

## Assumptions and questions
Every assumption and what to confirm.
</output_format>
