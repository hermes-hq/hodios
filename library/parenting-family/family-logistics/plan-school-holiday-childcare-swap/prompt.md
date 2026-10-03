---
schema: 1
id: plan-school-holiday-childcare-swap
kind: prompt
title: Plan a school-holiday childcare swap
description: Organises a childcare swap or shared care rota with other families for the school holidays, with a fair schedule, ground rules, a contact sheet and a backup plan.
category: family-logistics
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [preferences, text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [school-holidays, childcare-swap, care-rota, working-parents, summer-holidays, shared-care]
pairs_with:
  prompts: [plan-kids-summer, coordinate-family-calendar, plan-school-run-carpool]
args:
  - name: families
    description: How many families are in the swap.
    type: number
    required: true
  - name: weeks
    description: How many weeks of holiday the rota covers.
    type: number
    required: true
  - name: constraints
    description: Each family's work days and blocked dates, for example "Family A works Mon-Wed, away week 3; Family B can host Thu and Fri; Family C can do one full week". Optional.
    type: text
  - name: children_info
    description: The children's ages per family and any needs, for example "family A has 6 and 9; family B has a 7-year-old with a nut allergy; family C has an 8-year-old who needs quiet time". Optional.
    type: text
output_contract:
  format: markdown
  sections: [How fairness works, The rota, Ground rules, Contact and medical sheet, Backup plan, Costs, Check-in]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help groups of parents run childcare swaps for the school holidays: families take turns hosting each other's children so everyone covers their work days with fewer paid days of care. Swaps succeed when the fairness rule is agreed before the schedule, the ground rules are written down, every host has each child's medical and contact information, and there is a plan for when a host falls ill. Friendships between parents survive when nobody feels they are giving more than they get.

Families: {{families}}
Weeks: {{weeks}}
{{#constraints}}
<constraints>
{{constraints}}
</constraints>
{{/constraints}}
{{#children_info}}
<children>
{{children_info}}
</children>
{{/children_info}}
</context>

<task>
1. How fairness works: propose a simple credit system, for example one credit per child per day hosted and one debit per child per day of care received, balanced by the end of the holidays or carried into the next break. Account for families with more children and for hosting more children at once being harder.
2. The rota: a day-by-day table across {{weeks}} weeks for {{families}} families that covers each family's work days, respects blocked dates, keeps the number of children per host manageable for their ages, and shows each family's running credit balance. Where constraints are missing, mark days as [to confirm] and state your assumptions. Flag any day nobody can cover.
3. Ground rules: hours and drop-off and pickup times, food and allergies, screens, outings and transport (car seats, who may drive), water and road safety, discipline (each host follows agreed shared basics, no physical punishment), what happens if a child is unwell in the morning, and photos online.
4. Contact and medical sheet: a template per child with [placeholders] for parent contacts, backup contact, allergies and medicines as written by the parents, who may collect, and consent for outings and for emergency treatment, to confirm with local requirements.
5. Backup plan: what happens when a host or child is ill (a standby family each week, swapping days, or each family's own backup), and how to notify everyone.
6. Costs: how to share outing costs, food and entry fees fairly, and a simple record.
7. Check-in: a short mid-holiday check-in for the parents to adjust the plan and keep goodwill.
8. Note that informal swaps without payment are usually treated differently from paid childcare, and if money changes hands, local childcare registration rules may apply; check locally.
</task>

<constraints>
- The rota must cover each family's work days given in the constraints, or flag the gap; never silently leave a day uncovered.
- Copy allergies and medical needs exactly; never add treatment advice.
- Keep each host's load realistic: suggest a maximum number of children per host based on ages and space, and avoid back-to-back full weeks for one family unless they offered it.
- Use placeholders for names, numbers and addresses that were not given.
- Before answering, check that credits balance or the imbalance is stated, and that every working day is covered or flagged.
</constraints>

<output_format>
## How fairness works
## The rota
Table: Week | Day | Host | Children | Notes, then a balance table: Family | Days hosted | Days received | Balance.
## Ground rules
## Contact and medical sheet
Template in a code block.
## Backup plan
## Costs
## Check-in
</output_format>
