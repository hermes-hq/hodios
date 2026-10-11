---
schema: 1
id: plan-parental-leave-process
kind: prompt
title: Plan HR's parental leave process
description: Plans the HR process for maternity, paternity, adoption and shared parental leave - notification, entitlement and pay checks, cover, keep-in-touch contact, return and flexible working requests.
category: hr-operations
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [operations-manager, founder, manager]
advice_risk: [legal]
requires: [none]
inputs: [text]
output: [plan, checklist, table, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [parental-leave, maternity-leave, adoption-leave, keeping-in-touch, return-to-work]
pairs_with:
  prompts: [plan-return-from-leave, assess-flexible-working-request, write-workplace-policy, plan-workplace-adjustments-as-manager]
  personas: [hr-business-partner]
args:
  - name: organisation
    description: Countries or states where staff work, headcount, any enhanced parental leave policy and its terms, payroll set-up, and who handles leave cases today.
    type: text
    required: true
  - name: case_or_gaps
    description: Either a specific upcoming case (role, type of leave, expected dates, without names) or the gaps in your current process (for example missed pay changes, no cover planning, poor returns).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Assumptions to confirm, Process timeline, Pay and entitlements, Cover plan, During leave, Return, Templates needed, Questions for an adviser]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan parental leave administration the way an experienced HR operations lead does. What experts know: entitlements, notice deadlines, eligibility tests and statutory pay differ greatly by country and type of leave (birth, adoption, partner, shared), and enhanced company schemes add their own rules, so the first job is to confirm which apply; the common failures are administrative - missed payroll changes, benefits and pension contributions handled wrongly during leave, holiday accrual forgotten, no written confirmation of dates, and cover arranged too late; pregnant employees often have health and safety risk assessment rights and protection from detriment; keep-in-touch contact must be agreed, not imposed, and some countries allow a set number of paid working days during leave without ending it; the return is where many people leave, often because they come back to a changed role or a refused flexible working request; and redundancy during or around leave carries special protection in many places.

<organisation>
{{organisation}}
</organisation>

<case_or_gaps>
{{case_or_gaps}}
</case_or_gaps>
</context>

<task>
1. Assumptions to confirm: the jurisdictions and leave types involved, and the specific rules HR must check for each (eligibility, notice, length, statutory pay, protection), without stating values as fact.
2. Process timeline: from the first notification to six months after return, the HR actions at each point with owners (HR, manager, payroll, employee).
3. Pay and entitlements: the checklist for pay calculation, enhanced pay terms and any repayment clause, benefits and pension during leave, holiday accrual and when it can be taken.
4. Cover plan: options (redistribute, temporary hire, acting-up opportunity, pause work), lead times and how to brief cover.
5. During leave: keep-in-touch arrangements agreed with the employee, what information they must still receive (restructures, promotion opportunities, pay reviews), and paid working days where they exist.
6. Return: a return meeting, phased return or leave days, flexible working requests and how to assess them fairly, feeding needs, and a check-in after one and three months.
7. Templates needed: letters and forms to prepare (confirmation of dates and pay, keep-in-touch agreement, return letter).
8. Questions for an employment or payroll adviser.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never state statutory leave lengths, pay rates, notice periods or eligibility thresholds as fact; mark them "confirm locally".
- Do not suggest anything that disadvantages someone because of pregnancy or parental leave, including excluding them from pay reviews, promotion or information.
- Use roles, not names.
{{> output/uncertainty}}
</constraints>

<output_format>
## Assumptions to confirm
## Process timeline
Table: When | Action | Owner.
## Pay and entitlements
Checklist.
## Cover plan
## During leave
## Return
## Templates needed
## Questions for an adviser
Numbered.
</output_format>
