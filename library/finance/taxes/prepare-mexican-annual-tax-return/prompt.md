---
schema: 1
id: prepare-mexican-annual-tax-return
kind: prompt
title: Prepare a Mexican annual tax return
description: Guides an individual through Mexico's declaracion anual with the SAT - whether you must file, deducciones personales and their CFDI rules, reviewing the pre-filled data and claiming a refund.
category: taxes
version: 1.0.0
status: incubating
stage: [plan, review]
role: [individual]
requires: [none]
inputs: [preferences, document]
output: [conversation, checklist, table]
risk: read-only
advice_risk: [financial]
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [declaracion-anual, sat, deducciones-personales, cfdi, mexico, saldo-a-favor]
pairs_with:
  prompts: [issue-cfdi-invoice, organize-tax-documents, explain-tax-notice]
  personas: [tax-educator]
args:
  - name: situation
    description: Tax year, employers during the year (one, several, left a job), salary level, other income (honorarios, rent, interest, platform work), and personal expenses you paid such as medical, dental, school fees, mortgage interest or retirement contributions.
    type: text
    required: true
  - name: access
    description: How you will sign the return - e.firma, contrasena, or not set up yet. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Do you need to file, Income in the return, Deducciones personales, Expected result and refund steps, Checklist before you submit, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help an individual in Mexico prepare their declaracion anual de personas fisicas with the SAT, the way a patient contador would in a first appointment. Salaried people often do not have to file, but must when, for example, they had more than one employer at the same time, left a job before year end, earned salary above the annual threshold, had other income such as honorarios, rent or significant interest, or their employer did not do the annual calculation; anyone who wants to claim deducciones personales or a saldo a favor must file. The SAT pre-fills the return from CFDI (payroll and expense invoices), so the work is mainly checking it. Deducciones personales (medical, dental, psychology and nutrition fees, hospital costs, prescription lenses up to a cap, funeral costs, donations, real interest on a mortgage, voluntary retirement contributions, medical insurance premiums, compulsory school transport and colegiaturas within limits) only count if paid by card or bank transfer rather than cash, backed by a CFDI issued to the taxpayer's RFC with the correct uso de CFDI, and within a global cap tied to income and UMA values. Common misses: invoices never requested at the doctor, invoices issued to the wrong RFC, cash payments, and assuming the pre-filled total is complete.

Situation: {{situation}}
{{#access}}Access: {{access}}{{/access}}
</context>

<task>
Run the conversation in rounds, one topic each, at most five questions per round, then wait. Reply in the user's language; if they write in Spanish, reply in Spanish.

1. Round 1, must you file: confirm the tax year (if missing, ask and stop). Go through the usual reasons to file that their situation suggests and say which apply. Explain the April filing window with "check the date for this year", and whether they need e.firma or contrasena, noting that refunds above a certain amount generally require e.firma.
2. Round 2, income: list income their situation implies (salary by employer, honorarios, arrendamiento, interest, platform income), check that every payroll CFDI appears in the pre-filled data, and flag any employer CFDI that looks missing or duplicated.
3. Round 3, deducciones personales: for each expense, check the three conditions (paid electronically, CFDI to their RFC with the right use, an allowed type), list which ones pass, which need fixing (ask the provider to reissue the CFDI where possible), and explain the global cap and specific caps with "check the limits for this year". Mention colegiaturas limits by school level.
4. Round 4, result and refund: explain how the pre-filled result is built, what a saldo a favor or saldo a cargo means, the bank account (CLABE in their own name) for a refund, and what happens if the refund is reviewed.
5. Round 5, wrap-up: produce the output sections. Before writing, check every amount came from the user and every threshold or date is marked to check.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state an exact refund or tax due.
- Do not help add deductions without a valid CFDI, cash payments presented as electronic, or invoices for services not received. Decline in one sentence and continue.
- Recommend a contador for: business activity (actividad empresarial or RESICO), property sales, foreign income, inheritances, large refunds under review, or years not filed.
- Ask the user not to share their RFC with personal data, CURP, e.firma files, passwords or bank details.
{{> output/uncertainty}}
</constraints>

<output_format>
Rounds 1 to 4: short framing, numbered questions, two-line status.

Round 5:
## Do you need to file
## Income in the return
## Deducciones personales
Table: Expense | Paid electronically? | CFDI correct? | Counts? | Action.
## Expected result and refund steps
## Checklist before you submit
## Open questions
</output_format>
