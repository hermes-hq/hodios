---
schema: 1
id: design-pto-policy
kind: prompt
title: Design a paid time off policy
description: Designs a paid time off model - accrual, fixed allowance or unlimited - with statutory minimums, carryover, approval rules, payout on leaving and a usage check, then drafts the key policy rules.
category: hr-operations
version: 1.0.0
status: incubating
stage: [design, plan]
role: [operations-manager, founder, executive]
advice_risk: [legal]
requires: [none]
inputs: [text]
output: [plan, table, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [paid-time-off, annual-leave, unlimited-pto, holiday-allowance, carryover]
pairs_with:
  prompts: [write-workplace-policy, write-employee-handbook, design-benefits-package, plan-hr-annual-calendar]
  personas: [hr-business-partner]
args:
  - name: organisation
    description: Countries or states where staff work, headcount, shift or office-based work, full-time and part-time mix, and any union or collective agreement.
    type: text
    required: true
  - name: current_policy
    description: What you offer now (days, accrual, carryover, how sick days are handled), what goes wrong (people not taking leave, end-of-year rush, cover gaps), and why you are changing it.
    type: text
    required: true
  - name: preferences
    description: Models you are considering (for example unlimited PTO), budget limits, and anything leadership wants such as a company-wide shutdown week. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Model comparison, Recommended model, Policy rules, Cost and liability, Rollout, Questions to confirm locally]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design time off policies the way an experienced HR operations lead does. What experts know: many countries set a statutory minimum of paid leave and public holidays, and some forbid paying it out except on leaving or forbid losing it at year end, so the legal floor comes first; accrual models are simple to administer and fair to new joiners, but create a balance-sheet liability where unused leave must be paid out; "unlimited" policies remove that liability in some places but often lead people to take less leave, especially new joiners and high performers, unless there is a minimum and managers model it; carryover caps prevent hoarding but push an end-of-year rush; part-time staff need pro-rata rules in hours, not days; and the rules on approval, notice, blackout periods and cover matter more to managers than the headline number. Shift-based workplaces need a booking system that protects cover.

<organisation>
{{organisation}}
</organisation>

<current_policy>
{{current_policy}}
</current_policy>
{{#preferences}}
<preferences>
{{preferences}}
</preferences>
{{/preferences}}
</context>

<task>
1. Model comparison: fixed annual allowance, accrual per pay period, and unlimited or flexible leave with a minimum, compared on fairness, administration, payout liability, actual usage, fit with the workforce and legal fit in the stated locations.
2. Recommended model: choose one, with the reason tied to the stated problems, and the statutory minimum it sits on top of, marked "confirm locally".
3. Policy rules: allowance or minimum, accrual and pro-rating for joiners, leavers and part-time staff, carryover and expiry, booking notice, approval and refusal reasons, blackout periods, cover, interaction with sickness during leave, public holidays, and payout on leaving.
4. Cost and liability: how the change affects accrued balances and any payout liability, and how to transition existing balances without anyone losing earned leave.
5. Rollout: communication, manager guidance, system set-up, and a usage check after six months (who is not taking leave, by team).
6. Questions to confirm locally with an employment adviser.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never state statutory leave days, payout or carryover rules for a country as fact; mark them "confirm locally".
- Do not design a transition that removes leave people have already earned.
- Do not recommend unlimited PTO without a minimum and a usage check.
{{> output/uncertainty}}
</constraints>

<output_format>
## Model comparison
Table: Model | Fairness | Admin | Liability | Usage risk | Fit here.
## Recommended model
## Policy rules
Numbered rules in plain language.
## Cost and liability
## Rollout
## Questions to confirm locally
Numbered.
</output_format>
