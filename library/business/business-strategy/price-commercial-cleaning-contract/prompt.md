---
schema: 1
id: price-commercial-cleaning-contract
kind: prompt
title: Price a commercial cleaning contract
description: Prices a commercial cleaning contract from site size, tasks, frequency and production rates - labour, on-costs, consumables, travel, supervision and margin - with a bid price and assumptions.
category: business-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, operations-manager, sales-rep]
requires: [none]
inputs: [text, spec, notes]
output: [table, report, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [cleaning-business, bid-pricing, production-rates, labour-costing, tender, contract-pricing]
pairs_with:
  prompts: [build-commercial-cleaning-rota, price-services, assess-big-contract-risk]
args:
  - name: site_details
    description: The site - type (office, school, gym, clinic, retail), floor area by type (carpet, hard floor, washrooms, kitchens), number of toilets and sinks, occupancy, access hours, and travel distance from your base.
    type: text
    required: true
  - name: tasks_and_frequency
    description: The specification - tasks per area and how often (daily, weekly, monthly, periodic deep cleans), any hours the client expects, and service levels or penalties.
    type: text
    required: true
  - name: wage_rate
    description: Hourly pay for cleaners and supervisors, plus employer on-costs if you know them (tax, pension, holiday pay), and the currency.
    type: string
    required: true
  - name: target_margin
    description: Net margin you aim for on contracts, as a percentage after all costs.
    type: string
    default: "10%"
output_contract:
  format: markdown
  sections: [Labour hours, Cost build-up, Bid price, Sensitivity, Assumptions to state in the bid, Questions for the client]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a cleaning company owner or estimator price a commercial contract they can deliver at a profit. Contracts are lost on price and then lost again on margin: the usual errors are guessing hours from the walk-round instead of building them from areas and production rates, forgetting holiday cover, absence and paid travel between sites, leaving out supervision and periodic work, and quoting a monthly price with no assumptions so every extra request becomes free. You build the price from the bottom up and show every step so the owner can adjust it.
</context>

<task>
<site_details>
{{site_details}}
</site_details>

<tasks_and_frequency>
{{tasks_and_frequency}}
</tasks_and_frequency>

Wage rate: {{wage_rate}}
Target net margin: {{target_margin}}

1. Labour hours: split the site into areas by floor type and use. For each, take the area or unit count, a production rate (square metres or units per hour) and the frequency, and compute hours per visit and per week. State each production rate as an assumption from typical ranges for that task and floor type, to be checked against the owner's own timed cleans. Add fixed time per visit for set-up, bins and lock-up.
2. Periodic tasks (deep cleans, carpet extraction, high-level dusting, window cleaning) as hours per year, converted to weekly.
3. Cost build-up per week, then per month (weekly x 52 / 12): productive wages; employer on-costs; holiday and absence cover; supervision and quality checks; travel time and cost; consumables and washroom supplies (per unit or as a labelled share of labour); equipment wear; insurance and overhead share; then margin on top.
4. Bid price: monthly price, equivalent hourly charge-out rate, and the cost per square metre for comparison. If the client expects fewer hours than your build-up, say so and show what would have to be cut from the specification.
5. Sensitivity: the price at production rates 15% slower and 15% faster, and the effect of a wage rise.
6. Assumptions to state in the bid: hours, frequencies, what is excluded, access and keys, consumables supply, price review date, extra work rates.
7. Check the arithmetic before answering.
</task>

<constraints>
- Use the wage and site figures given. Label every production rate, on-cost share and overhead share as an assumption to replace with the owner's own figures.
- Never price below legal minimum wage or leave out holiday pay. If the wage given looks below a statutory minimum, flag it to check locally.
- If floor areas or frequencies are missing, ask for them and stop; you can show the method on one area.
- Mention that taking over staff from a previous contractor may bring employment-law transfer obligations in some countries, to check with an adviser, and price it as a question.
- Do not invent competitor prices.
</constraints>

<output_format>
## Labour hours
Table: Area | Size or units | Rate per hour (assumed) | Frequency | Hours per week. Totals row.
## Cost build-up
Table: Cost line | Basis | Per week | Per month. Totals row, then margin and price.
## Bid price
Monthly price, charge-out rate, cost per square metre; one line if the client's expected hours differ.
## Sensitivity
Table: Scenario | Hours per week | Monthly price | Margin.
## Assumptions to state in the bid
Bullets ready to paste.
## Questions for the client
Numbered.
</output_format>
