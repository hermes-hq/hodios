---
schema: 1
id: estimate-experiment-reagent-costs
kind: prompt
title: Estimate an experiment's reagent costs
description: Estimates consumables and reagent costs for an experiment or project from the plan and the prices you supply, with per-sample costs, overage, pack sizes and where money can be saved.
category: lab-work
version: 1.0.0
status: incubating
stage: [plan]
role: [researcher, student]
requires: [none]
inputs: [text, notes]
output: [table, summary]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [lab-budget, reagent-costs, consumables, cost-per-sample, grant-budget]
pairs_with:
  prompts: [plan-bench-experiment, set-up-reagent-inventory, write-equipment-purchase-case]
  personas: [lab-manager]
args:
  - name: plan
    description: The experiment or project - number of samples, conditions, replicates, repeats, and the assays or kits used per sample.
    type: text
    required: true
  - name: prices
    description: Pack prices and pack sizes from your supplier quotes or catalogue, in your currency, plus what you already have in stock.
    type: text
    required: true
  - name: purpose
    description: What the estimate is for, for example "grant budget for 3 years" or "can we afford this pilot this month". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Usage per run, Cost table, Totals, Assumptions, Ways to save, Missing prices]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Lab budgets go wrong in predictable ways: counting samples but not controls, standards and repeats; forgetting dead volume and failed runs; pricing per unit when reagents only come in packs; ignoring kits that expire once opened; and leaving out plastics, shipping, cold-chain surcharges and tax. A useful estimate separates per-sample cost from fixed costs per run, adds an explicit overage, and makes every price traceable to a quote, because catalogue prices change and vary by institution.
</context>

<task>
<plan>
{{plan}}
</plan>

<prices>
{{prices}}
</prices>
{{#purpose}}

Purpose: {{purpose}}
{{/purpose}}

1. Usage per run: for each reagent and consumable, the amount used per sample and per run, counting controls, standards, blanks, replicates and planned repeats.
2. Cost table: quantity needed for the whole plan, plus overage (state the percentage, typically 10 to 20% for liquids, more for kits with dead volume), packs to buy rounding up, cost, and stock already on hand.
3. Totals: total, cost per sample, fixed versus variable costs, and for multi-year plans a split by year if the plan gives timing.
4. Assumptions: list them, including expiry after opening and any shipping or tax treatment.
5. Ways to save: shared bulk orders, smaller reaction volumes validated first, cheaper equivalents to test against the current one, avoiding expiry by scheduling runs together.
6. Missing prices: items in the plan with no price given.
</task>

<constraints>
- Use only the prices supplied; never invent a price or a supplier. Items without a price stay in the table with "price needed".
- Show the arithmetic so the user can check it.
- Do not recommend switching reagents without validating the replacement against the current one.
</constraints>

<output_format>
## Usage per run
## Cost table
| Item | Needed | Overage | Packs | Pack price | Cost | In stock |
## Totals
## Assumptions
## Ways to save
## Missing prices
</output_format>
