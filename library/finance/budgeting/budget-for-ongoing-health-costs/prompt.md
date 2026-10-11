---
schema: 1
id: budget-for-ongoing-health-costs
kind: prompt
title: Budget for ongoing health costs
description: Budgets recurring health costs such as prescriptions, therapy, dental care and devices, with timing in the plan year, accounts or reliefs to check and ways to lower them.
category: budgeting
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [plan, table, questions]
risk: read-only
advice_risk: [financial, medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [health-costs, prescriptions, out-of-pocket, medical-expenses]
pairs_with:
  prompts: [compare-health-insurance-plans, set-up-sinking-funds, build-monthly-budget]
  personas: [personal-finance-coach]
args:
  - name: costs
    description: Recurring health costs with amounts and frequency (prescriptions, therapy sessions, dental, glasses or lenses, hearing aids, devices and supplies, travel to appointments), plus insurance premiums, deductibles or co-pays and when your plan year starts.
    type: text
    required: true
  - name: country
    description: Country (and state or region if relevant), because public cover, prescription charges, accounts and tax reliefs differ.
    type: string
    required: true
  - name: currency
    description: Currency code or symbol for amounts. Optional; inferred from the input if missing.
    type: string
output_contract:
  format: markdown
  sections: [Yearly cost picture, Monthly set-aside, Timing within the plan year, Ways to lower costs, Accounts and reliefs to check, Questions to ask]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone plan for health costs they know will keep coming. Predictable health spending is often treated as a surprise every month, which strains the budget and can lead people to skip care. A good plan totals the year, spreads it into a steady monthly amount, and uses the rules of the person's health system. Experts look at how costs fall across the plan year (deductibles and out-of-pocket maximums that reset, so costs are front-loaded), prepayment or capped-charge schemes for frequent prescriptions where they exist, tax-advantaged health accounts or medical expense tax reliefs in some countries, the price gap between generic and branded medicines and between pharmacies, and sliding-scale or subsidised options for therapy and dental care. Any change to treatment or medication itself is a decision for the prescriber, never a budgeting move.

Country: {{country}}
{{#currency}}Currency: {{currency}}{{/currency}}
</context>

<task>
Costs:

<costs>
{{costs}}
</costs>

1. Total the year: each cost converted to a yearly figure (weekly x 52, monthly x 12), premiums separately from out-of-pocket costs, with arithmetic. Mark estimates as placeholders.
2. Set a monthly set-aside: yearly out-of-pocket total / 12, and suggest a separate pot or sinking fund for it.
3. Map timing within the plan year: where deductibles or caps apply, show which months carry most of the cost and how much needs to be in the fund early. If costs are front-loaded, show the start-up amount needed.
4. Ways to lower costs, each phrased as a question to ask rather than a change to make: whether a generic or a different pack size exists (ask the prescriber or pharmacist), whether a prepayment scheme or cap would be cheaper, comparing pharmacy prices, in-network or public options, sliding-scale therapy, dental payment plans, and manufacturer or charity support programmes.
5. Accounts and reliefs to check in {{country}}: tax-advantaged health accounts, medical expense tax deductions or credits, employer schemes, and disability or carer benefits that may apply. Name schemes only when confident and mark them "verify", with who to ask.
6. List questions for the doctor, pharmacist, insurer or benefits adviser.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never suggest stopping, reducing, spacing out or switching medication or treatment to save money. Any change goes through the prescriber or clinician.
- Do not give medical advice or comment on whether a treatment is needed.
- Do not invent prices, caps, account limits or tax rules; mark anything uncertain "verify".
- Do not recommend specific insurers, pharmacies or products.
- If the person says they cannot afford essential medication or care now, put that first: tell them to speak to their prescriber or pharmacist about lower-cost options and to look for local hardship or charity support.
{{> output/uncertainty}}
</constraints>

<output_format>
## Yearly cost picture
Table: cost | frequency | yearly amount | covered or out-of-pocket. Totals row.

## Monthly set-aside
The figure with arithmetic and where to keep it.

## Timing within the plan year
Bullets or a short month-by-month table, and any start-up amount.

## Ways to lower costs
Bullets, each phrased as a question to raise with the right person.

## Accounts and reliefs to check
Bullets marked "verify", with who to ask.

## Questions to ask
Grouped by doctor or pharmacist, insurer, tax or benefits adviser.
</output_format>
