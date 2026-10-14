---
schema: 1
id: set-up-tax-debt-payment-plan
kind: prompt
title: Set up a payment plan for a tax debt
description: Prepares a request to the tax authority for time to pay a tax bill you cannot pay in full - the affordable amount, the budget evidence, what to say, and how to keep current taxes paid.
category: debt
version: 1.0.0
status: incubating
stage: [plan, ship]
role: [individual, founder]
requires: [none]
inputs: [document, text]
output: [plan, script, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [tax-arrears, time-to-pay, instalment-agreement, priority-debts]
pairs_with:
  prompts: [explain-tax-notice, plan-freelance-tax-set-aside, plan-estimated-tax-payments, build-tight-budget]
  personas: [tax-educator]
args:
  - name: tax_bill
    description: What you owe - which tax (income, self-employment, sales tax, payroll, property), the amount, the due date, penalties and interest so far, and any letters received.
    type: text
    required: true
  - name: finances
    description: Income, essential costs, other debts, savings, and what you could realistically pay each month. For a business, recent takings and costs.
    type: text
    required: true
  - name: country
    description: Country and region.
    type: string
output_contract:
  format: markdown
  sections: [Why act now, Your affordable offer, What to prepare, What to say, Keep current taxes paid, If they refuse, Get help]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people and small business owners who cannot pay a tax bill in full. Tax debts are priority debts: tax authorities usually have stronger collection powers than ordinary creditors (taking money from wages or bank accounts, enforcement, in some cases without a court order), and interest and penalties keep growing. But most tax authorities also offer instalment arrangements, sometimes online for smaller amounts, and are generally more flexible with people who contact them before enforcement starts. A request goes better with a realistic monthly figure supported by a budget, a short honest reason, and evidence that future tax will be paid on time, because an arrangement usually fails if new arrears build up. Filing returns on time even when unable to pay usually avoids the separate, often larger, late-filing penalty.

{{#country}}Country: {{country}}{{/country}}
</context>

<task>
Tax bill:

<tax_bill>
{{tax_bill}}
</tax_bill>

Finances:

<finances>
{{finances}}
</finances>

1. Why act now: explain in two or three lines that tax is a priority debt, what can happen if ignored (in general terms), and that contacting the authority early usually gives more options. If any return is not filed, say to file it even if unable to pay.
2. Your affordable offer: build a budget from the person's figures, showing the monthly surplus after essentials and other priority debts, and the monthly offer and how long it would take to clear the bill. If the term looks long, mention a part upfront payment if savings allow. Show the arithmetic.
3. What to prepare: references, the amount and breakdown, the budget, a short reason, proof of income, and for businesses recent figures and expected income.
4. What to say: a short phone or online script with [BRACKETS]: the debt, the reason, the offer, the plan to keep future taxes current, and a request to pause enforcement while it is considered.
5. Keep current taxes paid: a simple set-aside system (a separate account, a percentage of income set aside on receipt), to stop new arrears.
6. If they refuse or ask for more: what to ask (their reasoning, a shorter step-up plan), and when to involve an accountant, tax adviser or free debt advice.
7. Get help: free debt advice and tax help services, named only when confident.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never invent arrangement schemes, thresholds, interest rates or penalties. Mark specifics "verify".
- Do not suggest paying the tax with high-cost borrowing, or paying unsecured creditors before tax.
- Do not suggest hiding income or assets from the tax authority.
- If the business may be insolvent or payroll taxes are unpaid, say that directors may face personal consequences in some countries and recommend an accountant or insolvency adviser promptly.
{{> output/uncertainty}}
</constraints>

<output_format>
## Why act now
Two or three lines.

## Your affordable offer
Budget table and the offer calculation.

## What to prepare
Checklist.

## What to say
Script with [BRACKETS].

## Keep current taxes paid
Bullets.

## If they refuse
Bullets.

## Get help
Bullets.
</output_format>
