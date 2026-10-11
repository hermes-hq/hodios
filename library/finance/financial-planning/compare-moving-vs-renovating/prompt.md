---
schema: 1
id: compare-moving-vs-renovating
kind: prompt
title: Compare moving home with renovating
description: Compares moving to a bigger or better home with extending or renovating the current one - full costs of each, value added, borrowing, disruption and timeline - for owner-occupiers.
category: financial-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
subject: [real-estate]
requires: [none]
inputs: [text]
output: [table, explanation, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [home-extension, moving-costs, extend-or-move, ceiling-price, property-decision]
pairs_with:
  prompts: [estimate-home-buying-costs, plan-renovation-budget, decide-on-remortgage, compare-sell-vs-rent-out-home]
  personas: [personal-finance-coach]
args:
  - name: current_home
    description: Current home value, mortgage balance and rate, what is wrong with it (space, layout, condition), and how long you plan to stay.
    type: text
    required: true
  - name: renovation
    description: The project you are considering and any quotes or rough budget, plus permissions needed and how you would pay (savings, extra borrowing).
    type: text
    required: true
  - name: move
    description: The kind of home you would move to and its rough price, plus what you know about local moving costs. Optional.
    type: text
  - name: country
    description: Country and region, because transfer taxes, agent fees and permission rules differ.
    type: string
output_contract:
  format: markdown
  sections: [What you need, Cost of moving, Cost of renovating, Side by side, Non-money factors, Questions to settle, Assumptions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help homeowners decide between moving and improving. The fair comparison is between money that is lost and money that stays in the house. Moving costs (selling agent fees, transfer taxes, legal fees, surveys, removals, mortgage fees, plus redecorating the new place) are gone for good; renovation costs partly turn into value, but rarely pound for pound, and much less if the house would end up the most expensive on its street (the ceiling price). Renovation budgets commonly overrun, so a contingency of 10 to 20 percent is normal, and projects need permissions, may require living elsewhere for a time, and can take much longer than planned. Moving solves location problems (schools, commute, garden) that renovation cannot. The question underneath is whether the improved home would truly meet the need, and for how long.

{{#country}}Country: {{country}}{{/country}}
</context>

<task>
Current home:

<current_home>
{{current_home}}
</current_home>

Renovation:

<renovation>
{{renovation}}
</renovation>
{{#move}}

Move:

<move>
{{move}}
</move>
{{/move}}

1. State what the household actually needs (more space, better layout, location) and whether each option meets it.
2. Estimate the full cost of moving: selling costs, buying costs, mortgage costs (including any early repayment charge on the current deal), removals and settling-in, and the extra borrowing needed for the price difference. Use the person's figures and mark typical allowances as assumptions to verify locally.
3. Estimate the full cost of renovating: quote or budget, a contingency, professional fees, permissions, temporary living costs if any, and how it would be funded and the effect on monthly payments.
4. Put them side by side: money spent that does not come back, likely value added (as a cautious range, noting a possible ceiling price), new monthly cost, timeline and disruption.
5. Set out non-money factors: location, schools, commute, stress of building work, how long the solution lasts.
6. List questions to settle (estate agent valuation before and after the works, builder quotes, permissions, lender on extra borrowing) and state assumptions.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never invent transfer tax rates, agent fee levels or building costs. Use the person's figures and mark any typical range "verify locally".
- Do not predict house prices; treat value added as a cautious range from local agents.
- Do not tell the household which to choose; show the trade-off and what would tip it.
- Include a renovation contingency and say why.
{{> output/uncertainty}}
</constraints>

<output_format>
## What you need
Short bullets.

## Cost of moving
Table: cost | amount | source or assumption.

## Cost of renovating
Table: cost | amount | source or assumption.

## Side by side
Table: factor | move | renovate.

## Non-money factors
Bullets.

## Questions to settle
Bullets.

## Assumptions
Bullets.
</output_format>
