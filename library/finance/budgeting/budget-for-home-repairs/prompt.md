---
schema: 1
id: budget-for-home-repairs
kind: prompt
title: Budget for home repairs
description: Sizes a yearly home repair and replacement fund from your home's age and big-ticket parts such as roof, boiler and appliances, with a replacement timeline and monthly set-aside.
category: budgeting
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [plan, table]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [homeowners, repair-fund, replacement-costs, sinking-funds]
pairs_with:
  prompts: [plan-home-maintenance, set-up-sinking-funds, check-home-sum-insured]
  personas: [personal-finance-coach]
args:
  - name: home
    description: Type of home (house, flat, leasehold or condo), its age and size, and the age and condition of the big items you know about (roof, boiler or furnace, water heater, windows, appliances, wiring, plumbing, driveway). Include any quotes you have.
    type: text
    required: true
  - name: finances
    description: "Optional: current savings for repairs, monthly budget room, any service charge or reserve fund you pay into, and the home's approximate value."
    type: text
  - name: currency
    description: Currency code or symbol for amounts. Optional; inferred from the input if missing.
    type: string
output_contract:
  format: markdown
  sections: [Component schedule, Yearly repair fund, Replacement timeline, What to save for first, Ways to lower costs, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a homeowner set aside the right amount for repairs and replacements. Popular rules of thumb (for example 1 to 4% of the home's value per year) are a rough starting point, but they ignore what actually needs replacing and when. A better method is component-based: list each big item, its age, a typical lifespan range, and a replacement cost from local quotes; the yearly amount for each is the cost divided by the years left. That shows which items are near the end of their life and need a bigger saving now. Experts also know that insurance covers sudden damage, not wear and tear; that regular maintenance extends lifespans; that older homes have more surprises (wiring, drains, damp); and that owners of flats, condos or leasehold homes usually pay into a shared reserve or service charge but still own their interior items and can face one-off major-works bills.

{{#currency}}Currency: {{currency}}{{/currency}}
</context>

<task>
The home:

<home>
{{home}}
</home>

{{#finances}}
Finances:

<finances>
{{finances}}
</finances>

{{/finances}}
1. Build a component schedule: each big item the person listed, plus common items they missed as questions; for each, age, a typical lifespan range stated as general, years left (range), and replacement cost from their quotes or as a placeholder to quote locally.
2. Calculate the yearly amount per component: cost / years left (use the shorter end of the range for items in poor condition). Add a general maintenance and small-repairs line. Total it and convert to monthly.
3. Compare with the rule-of-thumb percentage if the home value was given, and explain any big difference.
4. Lay out a replacement timeline: which items are likely due in the next 1, 2 to 5 and 5 to 10 years.
5. Decide what to save for first: items near end of life, items whose failure is urgent (heating, water, roof leaks), and items where early replacement saves money. Check against current savings and budget room, with arithmetic, and say if a catch-up amount is needed.
6. Suggest ways to lower costs: maintenance that extends life, getting several quotes, repairing before replacing where sensible, timing non-urgent work, and checking any grants or energy-efficiency schemes locally (marked "verify").
7. For flats, condos or leasehold homes: ask about the reserve fund, planned major works and what the owner is responsible for.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent local prices; use quotes given or placeholders with what to ask a tradesperson.
- Give lifespans only as broad general ranges and say actual life depends on quality, use, climate and maintenance.
- Do not give structural, electrical or gas safety advice. If the input mentions signs of danger (gas smell, scorching, sparking, sagging ceilings, major cracks), say to stop and call a qualified professional or emergency service first.
- Do not recommend specific contractors, brands or products.
{{> output/uncertainty}}
</constraints>

<output_format>
## Component schedule
Table: item | age | typical lifespan | years left | replacement cost | yearly amount.

## Yearly repair fund
Total yearly and monthly amounts with arithmetic, and the rule-of-thumb comparison if possible.

## Replacement timeline
Bullets grouped by next 1 year, 2 to 5 years, 5 to 10 years.

## What to save for first
Ranked list with any catch-up amount.

## Ways to lower costs
Bullets.

## Questions
Bullets, including quotes to get.
</output_format>
