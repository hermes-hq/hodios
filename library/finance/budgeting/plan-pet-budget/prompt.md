---
schema: 1
id: plan-pet-budget
kind: prompt
title: Plan a pet budget
description: Estimates the first-year and yearly cost of a pet - food, vet care, insurance or a vet fund, boarding and supplies - and sets a monthly amount before you commit.
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
level: beginner
tags: [pet-costs, vet-bills, dogs, cats]
pairs_with:
  prompts: [compare-pet-insurance, set-up-sinking-funds, build-monthly-budget]
  personas: [personal-finance-coach]
args:
  - name: pet
    description: The animal, breed or size, age, whether you are adopting, buying or already own it, and any known health issues.
    type: text
    required: true
  - name: situation
    description: "Optional: your monthly budget room, how often you travel or work away from home, your home type, and any local prices or quotes you already have."
    type: text
  - name: currency
    description: Currency code or symbol for amounts. Optional; inferred from the input if missing.
    type: string
output_contract:
  format: markdown
  sections: [First-year costs, Yearly running costs, Lifetime view, Monthly amount, Vet emergency fund, Ways to lower costs, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone budget for a pet before or soon after they take one on. The purchase or adoption fee is usually a small part of the cost. The first year adds one-off costs: vaccinations, neutering, microchipping, equipment, training, and for some animals fencing or a hutch. After that, the steady costs are food, routine vet care and parasite treatment, insurance or self-insuring, grooming, litter or bedding, and boarding, pet sitting or dog walking when the owner is away or at work. Costs rise as animals age, and some breeds are prone to expensive conditions. Insurance usually excludes pre-existing conditions and has an excess per claim, and premiums tend to rise with age, so the real choice is between a policy and a dedicated vet fund, or both. Prices vary widely by country, city and vet, so a good plan is built on local quotes, not on national averages.

{{#currency}}Currency: {{currency}}{{/currency}}
</context>

<task>
The pet:

<pet>
{{pet}}
</pet>

{{#situation}}
Situation:

<situation>
{{situation}}
</situation>

{{/situation}}
1. List first-year one-off costs relevant to this animal, each with the person's figure or a placeholder to price locally.
2. List yearly running costs: food, routine vet and preventive care, insurance or vet fund, grooming, litter or bedding, toys and replacements, licensing or registration where it applies, and care while away (days per year away x the local daily rate as a placeholder).
3. Give a lifetime view: typical lifespan range for the species or size (stated as a general range), the yearly cost over that span, and costs that usually grow with age (more vet visits, special diets, medication).
4. Set a monthly amount: yearly running costs / 12, plus a first-year top-up, and check it against any budget room given, with arithmetic.
5. Size a vet emergency fund: the larger of the insurance excess plus a buffer, or the cost of one unexpected treatment based on a local quote, and how many months to build it. Explain insurance versus self-insuring in general terms and point to comparing policies separately.
6. Suggest ways to lower costs without harming welfare: adopting, buying supplies second-hand, preventive care, comparing vet prices for routine work, pet-sitting swaps, and checking breed-specific risks before choosing.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent local prices. Use the person's figures; elsewhere use placeholders with a note on what to ask a local vet, shelter or insurer.
- Do not give veterinary advice on diet, medication or treatment; say to ask a vet.
- Do not recommend specific brands, insurers or products.
- Never suggest cutting essential care such as vaccinations, parasite control or vet treatment to fit a budget. If the budget cannot cover the basics, say so kindly and suggest reconsidering the timing or the type of pet.
{{> output/uncertainty}}
</constraints>

<output_format>
## First-year costs
Table: item | one-off cost | notes.

## Yearly running costs
Table: item | yearly cost | monthly. Total row.

## Lifetime view
Short bullets with the lifespan range and costs that rise with age.

## Monthly amount
The amount and the arithmetic, checked against budget room.

## Vet emergency fund
Target, monthly saving, time to build it, insurance versus self-insuring.

## Ways to lower costs
Bullets.

## Questions
Bullets, including prices to get locally.
</output_format>
