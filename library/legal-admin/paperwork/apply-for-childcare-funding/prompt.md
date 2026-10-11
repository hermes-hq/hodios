---
schema: 1
id: apply-for-childcare-funding
kind: prompt
title: Apply for childcare funding
description: Works through applying for childcare subsidies, funded hours or vouchers, covering eligibility, codes and reconfirmation, the provider's part and the deadlines that lose a place.
category: paperwork
version: 1.0.0
status: incubating
stage: [plan, build]
role: [parent]
subject: [law]
requires: [none]
inputs: [text]
output: [checklist, plan, table]
risk: read-only
advice_risk: [legal, financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [childcare-subsidy, funded-hours, childcare-costs, eligibility-code, working-parents]
pairs_with:
  prompts: [choose-childcare, check-benefits-entitlement, prepare-government-form]
args:
  - name: family
    description: Children and their dates of birth, who works and roughly how much each earns, self-employment, any disability or special needs, and benefits you already get.
    type: text
    required: true
  - name: childcare
    description: The childcare you use or plan to use (nursery, childminder, after-school club, nanny), hours needed, costs and the start date.
    type: text
    required: true
  - name: location
    description: Country and state, province or region. Schemes and deadlines differ widely.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Schemes to check, What each one needs from you, Timeline, Provider steps, Keeping it going, Costs funding may not cover]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help parents claim help with childcare costs. Most countries run several overlapping schemes: universal or work-linked free or funded hours for children of certain ages, means-tested subsidies paid to the provider, tax-free accounts or vouchers, tax credits or deductions, and childcare elements of benefits. Families lose money in predictable ways: they apply too late for the term or period the child starts (many schemes require the code or approval before a cut-off date before the term begins); they forget to reconfirm eligibility every few months and the funding stops; they choose a provider that does not offer funded places or does not accept the subsidy; they do not know that schemes can sometimes be combined and sometimes cannot; or they get surprised by consumables, meals or extra-hours charges that funding does not cover. Eligibility often depends on the child's age on a set date, each parent's working hours or minimum earnings, an upper income limit per parent, and immigration status. Figures and dates change each year.

Location: {{location}}

<family>
{{family}}
</family>

<childcare>
{{childcare}}
</childcare>
</context>

<task>
1. List the schemes that commonly exist in {{location}} for this family's children and situation, each with what it pays for, who runs it and whether it is likely to apply, marked "[to verify]". Say which can be combined and which conflict, as points to check.
2. For each likely scheme, list what the family needs: the age rule, work or earnings tests per parent, income caps, documents, how to apply and what they receive (a code, an approval letter, an account). Mark figures "[to verify for the current year]".
3. Build a dated timeline working back from the childcare start date: when to apply, when the code or approval must be given to the provider, the term or period cut-offs, and reconfirmation dates.
4. Explain the provider's part: confirming they offer funded places or accept the subsidy, giving them the code or approval, what the contract or invoice should show, and questions to ask.
5. Explain keeping funding going: reconfirmations, reporting changes in work or income, and what happens if a parent loses work.
6. List costs that funding often does not cover (meals, consumables, trips, extra hours) and how to check the provider's charges are allowed under the scheme, marked "[to verify]".
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state hours, amounts, income limits or deadlines as fact; they change yearly. Mark them and name the type of official source to check.
- Base eligibility notes only on the facts given; list what is missing.
- Never suggest misreporting working hours, income or the child's age.
- If one parent is self-employed or newly employed, flag that special rules on minimum earnings often apply and need checking.
{{> output/uncertainty}}
</constraints>

<output_format>
## Schemes to check
Table: Scheme type | Pays for | Likely to apply? | Combine with.

## What each one needs from you
A short block per scheme: tests, documents, how to apply.

## Timeline
Table: Date | Action. Dates marked "[to verify]".

## Provider steps
Checklist.

## Keeping it going
Bullets.

## Costs funding may not cover
Bullets.
</output_format>
