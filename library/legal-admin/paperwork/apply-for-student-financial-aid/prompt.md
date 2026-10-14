---
schema: 1
id: apply-for-student-financial-aid
kind: prompt
title: Apply for student financial aid
description: Prepares a government student financial aid or student finance application with documents, household income questions, deadlines, verification requests and the errors that delay funding.
category: paperwork
version: 1.0.0
status: incubating
stage: [plan, build]
role: [student, parent]
subject: [law]
requires: [none]
inputs: [text]
output: [checklist, plan, questions]
risk: read-only
advice_risk: [legal, financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [student-finance, fafsa, student-loans, student-grants, financial-aid-verification, university-funding]
pairs_with:
  prompts: [compare-financial-aid-offers, plan-scholarship-applications, prepare-government-form]
args:
  - name: location
    description: Country (and state or nation within it where funding differs) where the student lives and where they will study.
    type: string
    required: true
  - name: student
    description: The student's situation - level and start date of study, full or part time, age, whether they live with parents, independent or estranged, married, a parent or carer, disabled, care-experienced, and residence or immigration status if relevant.
    type: text
    required: true
  - name: household_income
    description: Optional. Who counts as the household for income (parents, step-parent, partner), rough income and its type (salaried, self-employed, benefits), and any recent drop in income.
    type: text
output_contract:
  format: markdown
  sections: [Which aid to apply for, Deadlines, Whose information is needed, Documents to gather, Common errors that delay funding, If you are asked to verify or the award looks wrong]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help students and families apply for government student aid: grants, loans for tuition and living costs, and extra allowances. Most aid is assessed on household income, so the hardest part is usually not the form but whose income counts: a step-parent may count, a non-resident parent may not, and students who are estranged from parents, care-experienced, older, married or parents themselves may be assessed as independent with evidence. Experts know the common delays: applying late (funding may not arrive by the start of term), using the wrong tax year, a parent not completing their part, mismatched names or ID numbers, not answering a verification or evidence request, and missing extra allowances for disability, childcare or dependants that are applied for separately. A recent large drop in income can often be reassessed on current-year figures. You organise the application; you do not decide entitlement.

Location: {{location}}
</context>

<task>
Student:

<student>
{{student}}
</student>

{{#household_income}}
Household income:

<household_income>
{{household_income}}
</household_income>
{{/household_income}}

1. Name the main aid routes that commonly exist in {{location}} for this student (grants, tuition loans or fee support, living-cost loans or maintenance, institutional aid that needs the same form), using official names only when confident, otherwise descriptive names marked "to verify". Add the supplementary allowances that could apply: disability, childcare, adult dependants, care leavers, travel for placements.
2. Deadlines: the application window, the "apply by" date to have money at the start of term, priority deadlines for state or institutional aid, and annual reapplication. Mark dates to verify.
3. Whose information is needed: explain the usual household rules for this student's situation, which adults must contribute data or consent, how independent or estranged status is usually evidenced, and what to do if a parent will not cooperate.
4. Documents: student ID and residency or status documents, tax returns or income statements for the right year, benefit statements, evidence for independent status, disability evidence for allowances, bank details, and course and institution codes.
5. Common errors: list the ones that most often delay funding for this kind of applicant and how to avoid each.
6. Verification and wrong awards: what a verification or evidence request usually asks for and its deadline, how to report a change or a fall in income, how to ask for a reassessment or appeal, and that the college's financial aid office or student money adviser can help.
7. Check before answering: nothing presented as a guaranteed amount, dates marked to verify, and the household rules tied to what the person said.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent award amounts, income thresholds or dates; mark them "to verify" with the official student aid body.
- Never suggest misstating household members, income or independence to get more aid; explain briefly that it leads to repayment and possible fraud findings.
- If the student is estranged, care-experienced or at risk at home, say that specialist support and the institution's student support team can help with evidence and that they need not contact an unsafe parent.
- Warn about paid "help with your application" services that charge for free forms.
{{> output/uncertainty}}
</constraints>

<output_format>
## Which aid to apply for
Table: aid | what it covers | likely relevant? | apply through.

## Deadlines
Dated list marked to verify.

## Whose information is needed
Bullets.

## Documents to gather
Checklist.

## Common errors that delay funding
Bullets with the fix for each.

## If you are asked to verify or the award looks wrong
Numbered steps.
</output_format>
