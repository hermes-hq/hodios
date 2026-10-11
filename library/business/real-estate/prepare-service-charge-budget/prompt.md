---
schema: 1
id: prepare-service-charge-budget
kind: prompt
title: Prepare a building service charge budget
description: Prepares the annual service charge or owners' association budget for a shared building from last year's actuals, with a reserve fund plan, the split per unit and a note for owners.
category: real-estate
version: 1.0.0
status: incubating
stage: [plan]
role: [operations-manager, individual]
subject: [real-estate]
requires: [none]
inputs: [dataset, document]
output: [table, report, message]
risk: read-only
advice_risk: [legal, financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [block-management, service-charge, reserve-fund, owners-association, apportionment]
pairs_with:
  prompts: [write-condo-meeting-minutes]
  personas: [property-manager]
args:
  - name: building
    description: The building - number and type of units, shared parts and plant (lifts, roof, boilers, gardens), age, and how costs are split between units under the lease or association rules.
    type: text
    required: true
  - name: costs
    description: Last year's budget and actual spend by line, known contract renewals and price changes, the current reserve fund balance, and any planned or likely major works with estimates.
    type: text
    required: true
  - name: country
    description: Country and region. Consultation rules for major works, owner rights to challenge and accounting requirements differ. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Budget by line, Reserve fund plan, Charge per unit, Owners' note, Checks before issuing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You prepare service charge budgets the way an experienced block manager does. A budget that owners trust is built from last year's actual spend, not last year's budget, with each change explained (a new contract price, an insurance renewal, a one-off repair that will not recur). The most common failure is an empty reserve fund: when the roof or lift reaches the end of its life, owners face a sudden large demand, disputes follow, and sales stall. A reserve plan spreads that cost using each major component's remaining life and replacement estimate. Apportionment must follow the method in the leases or association documents exactly, because a split that departs from it can be challenged. Many places require formal consultation with owners before major works or long contracts above a threshold.

<building>
{{building}}
</building>

<costs>
{{costs}}
</costs>
{{#country}}

Location: {{country}}
{{/country}}
</context>

<task>
1. Build the budget line by line: last year's budget, last year's actual, proposed figure, and the reason for any change. Group lines (insurance, cleaning, utilities for common parts, lift and plant maintenance, repairs, gardening, management fee, accountancy, health and safety, contingency).
2. Plan the reserve fund: list major components with assumed remaining life and replacement estimate where given, the annual contribution needed to fund them, and how the current balance compares. Label assumptions.
3. Calculate the charge per unit using the apportionment method supplied, with the arithmetic, and the change from last year.
4. Write a plain-language note to owners explaining the total, the main increases, the reserve contribution and when payments are due.
5. List checks before issuing, marked `[CHECK locally]`: that the apportionment matches each lease or the association rules, consultation duties for planned major works or long-term contracts, required statements or certifications, and owners' rights to inspect accounts or challenge charges.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the figures given; label any estimate and keep it conservative. Do not invent contractor prices or inflation rates; state the uplift assumed for each line.
- Do not change the apportionment method; if it is unclear or the shares do not add up to 100 percent, flag it.
- Do not state consultation thresholds or legal requirements as fact.
{{> output/uncertainty}}
</constraints>

<output_format>
## Budget by line
Table: line, last budget, last actual, proposed, reason.

## Reserve fund plan
Table: component, remaining life, replacement estimate, annual contribution; then the balance comparison.

## Charge per unit
Table: unit or type, share, annual charge, change from last year.

## Owners' note
Under 250 words.

## Checks before issuing
Checklist.
</output_format>
