---
schema: 1
id: plan-car-purchase
kind: prompt
title: Plan a car purchase
description: Compares buying a car new or used, leasing or financing on total cost of ownership, including depreciation, insurance, fuel or charging, maintenance and finance costs.
category: financial-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [table, report, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [total-cost-of-ownership, car-finance, leasing, depreciation]
pairs_with:
  prompts: [compare-loan-offers, plan-savings-goal, build-monthly-budget]
  personas: [personal-finance-coach]
args:
  - name: options
    description: The options you are weighing, with prices or quotes - for example a new car at 32,000, a 3-year-old one at 19,500, a 4-year lease at 340 a month with 2,000 upfront, dealer finance terms. Include fuel type and consumption if known.
    type: text
    required: true
  - name: usage
    description: How you use a car - distance per year, city or motorway, how long you keep cars, home charging availability, family or work needs.
    type: text
  - name: budget
    description: Cash available upfront and the monthly amount you could comfortably spend on the car, all-in.
    type: string
output_contract:
  format: markdown
  sections: [Options compared, Total cost of ownership, Monthly reality, Risks and catches, What changes the answer, Questions to ask, Assumptions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help car buyers compare options on what the car really costs over the time they will keep it. The purchase price is rarely the biggest number: depreciation is usually the largest cost of a new car, while an older car swaps depreciation for higher repair risk; finance adds interest and sometimes a balloon payment; leases cap the risk of depreciation but add mileage limits and charges for wear at hand-back; and running costs (insurance, fuel or charging, maintenance, tyres, tax and registration, parking) can differ a lot between options. A fair comparison puts every option on the same holding period and the same distance, and is honest about which numbers are estimates.

{{#usage}}Usage: {{usage}}{{/usage}}
{{#budget}}Budget: {{budget}}{{/budget}}
</context>

<task>
Options:

<options>
{{options}}
</options>

1. Pick a common holding period and annual distance from the usage (default: the lease length, or 4 years and the stated distance) and say what you chose.
2. For each option, estimate over that period: upfront cash; finance or lease payments; interest (use the amortisation formula when a loan is involved); balloon or optional final payment; estimated value at the end (depreciation), using a stated, round percentage assumption per year that differs for new and used; insurance (ask for quotes or label an assumption); fuel or charging from consumption x distance x the price the person gives or a labelled assumption; maintenance, tyres and likely repairs (higher for older cars); tax and registration; and for leases, excess-mileage and end-of-lease charges if usage exceeds the allowance.
3. Total cost of ownership = all money out minus the car's estimated value at the end (zero for a lease). Express it per year, per month and per unit of distance.
4. Show the monthly reality: the cash leaving the account each month for each option, compared with the budget if one was given.
5. List the risks and catches for each option: negative equity, balloon payments, variable rates, mileage caps, repair surprises, battery or warranty status, and the impact of an early exit.
6. Show what changes the answer: a sensitivity line for higher annual distance, a shorter or longer holding period, and a lower resale value.
7. List questions to ask the dealer, lender or leasing company, and checks before buying a used car (service history, independent inspection, outstanding finance check).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Label every assumption (depreciation rate, fuel or electricity price, insurance, repairs) and invite the person to replace it with real quotes. Never present an estimate as a quote.
- Do not recommend a make, model, dealer, lender or leasing company, or tell the person which option to choose. You may say which option is cheapest in total under these assumptions and what would flip the result.
- Do the arithmetic carefully and show the main sums. If you can run code, use it.
- If the monthly cost would exceed the stated budget or the person mentions existing debt problems, say so plainly before anything else.
- Business use, company cars and tax benefits depend on the country; flag them for an accountant rather than estimating them.
{{> output/uncertainty}}
</constraints>

<output_format>
## Options compared
One line per option describing it and the holding period and distance used.

## Total cost of ownership
Table: cost item | each option. Final rows: total cost, per year, per month, per unit of distance.

## Monthly reality
Table: option | monthly cash out | within budget?

## Risks and catches
Bullets per option.

## What changes the answer
Short sensitivity table or bullets.

## Questions to ask
Bullets.

## Assumptions
Bullets.
</output_format>
