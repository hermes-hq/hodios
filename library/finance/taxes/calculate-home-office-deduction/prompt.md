---
schema: 1
id: calculate-home-office-deduction
kind: prompt
title: Calculate a home office deduction
description: Works out a home office deduction or relief for the self-employed under the simplified and actual-cost methods, with apportionment, side effects and the records to keep.
category: taxes
version: 1.0.0
status: incubating
stage: [build]
role: [individual, founder]
requires: [none]
inputs: [text]
output: [table, explanation, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [home-office, business-expenses, deductions, working-from-home]
pairs_with:
  prompts: [track-business-expenses, claim-employee-tax-deductions, plan-freelance-tax-set-aside]
  personas: [tax-educator]
args:
  - name: workspace
    description: Size of your home and the workspace (area or number of rooms), whether the space is used only for work, hours of business use per month, whether you own or rent, and yearly costs (rent or mortgage interest, energy, water, internet, insurance, local property taxes, repairs).
    type: text
    required: true
  - name: country
    description: Country (and state or region if relevant) where you are tax resident.
    type: string
    required: true
  - name: work_status
    description: Self-employed, employee working from home, or both. Employees often have different or no home office relief.
    type: enum
    enum: [self-employed, employee, both]
    default: self-employed
output_contract:
  format: markdown
  sections: [Eligibility checks, Simplified method, Actual-cost method, Comparison, Side effects, Records to keep, Points to verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You work out what someone may be able to claim for working from home, comparing the methods their country offers. Many systems offer two routes. A simplified method uses a flat rate (per unit of area or per hour of use) with few records. An actual-cost method claims a business share of real costs, usually apportioned by area (the office's share of the home's floor area or rooms) and sometimes by time (the share of hours the space is used for business). Common tests for the actual-cost route are regular and exclusive business use, and some costs are not allowable (mortgage capital repayments, for example, as opposed to interest in some places). Costs only for the office, such as repairs to that room, may be claimed in full. Side effects matter: using part of a home exclusively for business can affect relief from tax on a gain when the home is sold, or create recapture of depreciation in some systems, and some employees have no home office relief at all or a separate, narrower one.

Country: {{country}}
Work status: {{work_status}}
</context>

<task>
Workspace and costs:

<workspace>
{{workspace}}
</workspace>

1. Eligibility checks: the use tests that usually apply in {{country}} (regular, exclusive, principal place of business, employer requirement for employees), applied to the facts. Mark country rules "verify". If the person is an employee where relief is limited or unavailable, say so early.
2. Simplified method: if {{country}} has one you are confident of, calculate it with the rate labelled with the tax year and "verify". If not, say so.
3. Actual-cost method: calculate the area share (office area / total area, or rooms) and any time share, apply it to each eligible household cost, add costs only for the office in full, and exclude non-allowable items with the reason. Show arithmetic.
4. Compare the two methods and the record-keeping burden of each.
5. Side effects: effects on tax when selling the home, depreciation recapture where it applies, mixing with other claims (internet and phone often claimed separately by business-use share), and whether the method can be changed each year.
6. Records to keep and points to verify.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never invent flat rates, caps or rules. Use figures you are confident are current for {{country}}, with the tax year, marked "verify"; otherwise show the method with placeholders.
- Do not tell the person which method to file; show both and the trade-offs.
- Use only costs given; do not add costs the person did not mention, but list common ones to check.
- Do not count the same cost twice across methods or claims.
{{> output/uncertainty}}
</constraints>

<output_format>
## Eligibility checks
Bullets: test, facts, likely result.

## Simplified method
Calculation or "not available or not sure".

## Actual-cost method
Table: cost | yearly amount | share | claimable amount | notes. Totals row and the share arithmetic.

## Comparison
Short table: method | amount | records needed.

## Side effects
Bullets.

## Records to keep
Checklist.

## Points to verify
Bullets with where to check each.
</output_format>
