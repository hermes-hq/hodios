---
schema: 1
id: rebuild-credit-after-insolvency
kind: prompt
title: Rebuild credit after bankruptcy or insolvency
description: Plans rebuilding credit and finances after bankruptcy, an insolvency arrangement or a debt relief order - checking reports are right, a safe sequence of credit steps and realistic timelines.
category: debt
version: 1.0.0
status: incubating
stage: [plan, maintain]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [plan, checklist, explanation]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [bankruptcy, credit-rebuilding, fresh-start, credit-report]
pairs_with:
  prompts: [improve-credit-score, dispute-credit-report-error, build-emergency-fund-plan, build-monthly-budget]
  personas: [personal-finance-coach]
args:
  - name: insolvency
    description: What kind of formal debt solution it was, when it started and ended (or will end), and which debts were included.
    type: text
    required: true
  - name: situation
    description: Income and essential costs now, savings, any remaining debts, and what you want to be able to do (rent, get a phone contract, buy a car, get a mortgage in a few years). Optional.
    type: text
  - name: country
    description: Country and region, because how long records stay and what restrictions apply differ.
    type: string
output_contract:
  format: markdown
  sections: [Where you stand, Check your records, Foundations first, Credit steps in order, Timeline for your goals, Traps to avoid]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people rebuild after a formal insolvency such as bankruptcy, an individual voluntary arrangement, a consumer proposal, a debt relief order or their local equivalent. The record stays on credit files for a set period (often six to ten years, depending on the country and type), but its weight fades with time and with a run of on-time payments afterwards. The most common problems are errors: debts that were included still shown as outstanding or in default after discharge, which must be corrected; and new borrowing taken too fast from high-cost lenders who target people with poor credit. A sound sequence is: confirm discharge or completion and get the paperwork; correct every credit report; build a budget and an emergency buffer so new credit is never needed for emergencies; register on the electoral roll or equivalent where it affects scoring; then take small, manageable steps (a basic bank account, a phone contract, a low-limit card paid in full every month); and only later larger borrowing.

{{#country}}Country: {{country}}{{/country}}
</context>

<task>
Insolvency:

<insolvency>
{{insolvency}}
</insolvency>
{{#situation}}

Situation:

<situation>
{{situation}}
</situation>
{{/situation}}

1. Where you stand: the general rules on how long this type of record usually stays and any restrictions that may still apply (for example on borrowing above a limit without disclosure while undischarged), all marked "verify locally". Note whether the person is discharged or completed yet.
2. Check your records: get reports from every main credit reference agency in the country, check each included debt shows as settled, discharged or included with the right date, check addresses and links to other people, and dispute errors with the discharge or completion certificate as evidence.
3. Foundations first: budget with a monthly surplus, a starter emergency fund, regular bills in the person's name paid on time, and electoral or address registration where it matters.
4. Credit steps in order, with roughly when: basic or standard bank account, phone contract or similar, a low-limit card used lightly and paid in full by direct debit, then larger borrowing only when needed. Explain why each step helps and the risk of each.
5. Timeline for the person's goals (renting, car, mortgage): what lenders commonly look for, framed as typical and to check, and how to prepare for each.
6. Traps to avoid: high-cost credit, fee-charging "credit repair" firms, guarantor loans, missing even one payment, and applying for many products in a short time.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never invent record durations, restrictions or agency names for a country you are unsure of; describe them generally and mark "verify".
- Do not recommend specific lenders, cards or credit-builder products.
- Be encouraging and shame-free: a formal insolvency is a legal fresh start.
- If the person is still in an arrangement, remind them to follow its terms and check with their insolvency practitioner or trustee before new borrowing.
{{> output/uncertainty}}
</constraints>

<output_format>
## Where you stand
Short paragraph with items to verify.

## Check your records
Checklist.

## Foundations first
Bullets.

## Credit steps in order
Numbered list with timing and risk.

## Timeline for your goals
Table: goal | typical lender expectations | what to do now.

## Traps to avoid
Bullets.
</output_format>
