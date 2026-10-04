---
schema: 1
id: prepare-for-debt-advice-appointment
kind: prompt
title: Prepare for a debt advice appointment
description: Prepares someone for a free debt advice appointment with a debt list, an income and spending sheet, the letters to bring, priority debts flagged, and questions to ask about the options.
category: financial-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text]
output: [table, checklist, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [debt-advice, debt-help, priority-debts, financial-statement, money-advice]
pairs_with:
  prompts: [negotiate-with-creditor, respond-to-debt-collector, build-tight-budget, plan-debt-payoff]
args:
  - name: debts
    description: Each debt you know about - who it is owed to (creditor or collector), type (rent, energy, tax, loan, card, overdraft, phone, fines), roughly how much, how far behind, and any letters or court papers. Leave out account numbers.
    type: text
    required: true
  - name: income
    description: Household income per month after tax, from all sources (wages, benefits, pensions, support from others), with the currency.
    type: string
    required: true
  - name: country
    description: Country and region; priority debts and the options an adviser can offer differ by place.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Before the appointment, Your debts in one table, Priority debts, Income and spending sheet, Documents to bring, Questions to ask, Until the appointment]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people get the most out of a free debt advice appointment. Non-profit debt advisers can look at the whole picture, protect people from the most serious consequences first, negotiate with creditors and explain formal options, but appointments are often short and the first one can be spent just piecing together who is owed what. People who arrive with a debt list, an honest income and spending sheet and their letters get to options faster. Advisers usually start by separating priority debts - those where non-payment can lead to losing a home, energy supply, liberty or essential goods, such as rent or mortgage, energy, council or property tax, court fines, child support and tax - from non-priority debts such as cards, overdrafts and most loans. Your job is preparation and organisation, not choosing a debt solution.

Income: {{income}}
Country: {{country}}
</context>

<task>
Debts as described:

<debts>
{{debts}}
</debts>

1. Start with anything urgent: court papers, a hearing date, an eviction or repossession notice, enforcement agent or bailiff visits, disconnection warnings, or a deadline in the next 14 days. Put those at the top and say to tell the adviser service about them when booking, since many services prioritise urgent cases.
2. Put every debt into one table: creditor or collector, type, approximate balance, arrears, monthly payment now, letters received, and priority or non-priority. Mark unknowns "[find out]" rather than guessing.
3. Explain in plain words which debts look like priority debts in {{country}} and why, marked "to confirm with the adviser".
4. Build an income and spending sheet the adviser can use: income by source, then spending by category (housing, energy and water, council or property tax, food and household, phone and internet, transport, childcare, insurance, health, other essentials), with the person's figures where given and blanks to fill where not. Show what is left over, or the shortfall, from the figures given.
5. List the documents to bring: recent letters and statements for each debt, any court papers, payslips or benefit letters, bank statements for the last one to three months, tenancy or mortgage details, and a list of household members and dependants.
6. Write questions to ask the adviser: which debts to deal with first, whether any interest and charges can be frozen, what options exist and how each affects credit record, home, job and assets, whether any debts may be time-barred or unenforceable, whether they qualify for any breathing space or debt relief scheme, and what to do if a creditor calls before the plan is in place.
7. Add what to do until the appointment: keep paying priority debts if possible, open and keep every letter, do not take new credit to pay old debts, note every creditor call, and tell creditors advice is being sought and ask them to hold action.
8. Check before answering: the table lists every debt mentioned, totals are added correctly, and no specific debt solution is recommended.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not recommend a specific formal solution (bankruptcy, insolvency arrangements, debt relief orders, consolidation loans, debt management plans). Name them only as options the adviser may discuss.
- Point to free, non-profit debt advice. Warn against paid debt management or "debt elimination" firms charging fees for help available for free, and do not name any paid company.
- Do not invent legal protections, limitation periods or scheme names; mention them only as questions or, if confident, with "to confirm".
- Keep the tone calm and free of shame. Debt is common and fixable.
- If the person mentions not being able to afford food or heating, or feeling hopeless or unsafe, respond with care and point to emergency food and crisis support services alongside the preparation.
</constraints>

<output_format>
## Before the appointment
Urgent items first, or one line saying nothing looks urgent from what was shared.

## Your debts in one table
Table: creditor | type | balance | arrears | paying now | letters | priority? Total row.

## Priority debts
Short explanation, marked to confirm.

## Income and spending sheet
Table with filled figures and blanks, and the leftover or shortfall line.

## Documents to bring
Checklist.

## Questions to ask
Numbered.

## Until the appointment
Bullets.
</output_format>
