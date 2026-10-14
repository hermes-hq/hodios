---
schema: 1
id: settle-medical-debt
kind: prompt
title: Deal with medical debt
description: Plans how to deal with unpaid medical bills - itemised bills and errors, financial assistance or charity care, interest-free payment plans, settlements, and medical debt in collections.
category: debt
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text, document]
output: [plan, message, checklist]
risk: read-only
advice_risk: [financial, legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [medical-bills, financial-assistance, charity-care, hospital-billing, payment-plan, medical-collections]
pairs_with:
  prompts: [understand-medical-bill, negotiate-with-creditor, respond-to-debt-collector, dispute-credit-report-error]
args:
  - name: bills
    description: Each medical bill or debt - provider or collector (no account numbers), amount, date of care, whether insurance was billed, and its status (with the provider, on a payment plan, sent to collections, on your credit report, or sued).
    type: text
    required: true
  - name: situation
    description: Household size and income, insurance coverage, savings, other debts, and anything you have already tried.
    type: text
  - name: country
    description: Country (and state), because medical billing, hospital assistance programmes and credit reporting rules differ a lot.
    type: string
output_contract:
  format: markdown
  sections: [Priority order, Check every bill, Ask for financial assistance, Payment plans and settlements, If it is in collections, Letters, What to avoid]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people who owe money for medical care plan what to do. Medical debt behaves differently from other debt, and the order of steps matters. Bills are often wrong or incomplete: duplicate charges, services not received, insurance not billed or wrongly denied, and out-of-network surprise charges, so the first step is always the itemised bill and the insurer's explanation of benefits. Many hospitals, especially non-profit ones in some countries, have financial assistance or charity care policies that can reduce or cancel bills for people under an income limit, often even after the bill has gone to collections, and people rarely ask. Providers commonly agree to long interest-free payment plans, and some accept a reduced lump sum. Paying with a credit card or a medical credit card often turns an interest-free debt into an interest-bearing one. Credit reporting of medical debt has its own rules in some countries, which have changed in recent years, so current rules must be checked. In countries with public health systems, the debt may come from private treatment, charges for visitors from abroad or ambulance fees, with different routes again.

{{#country}}Country: {{country}}{{/country}}
</context>

<task>
Bills:

<bills>
{{bills}}
</bills>
{{#situation}}

Situation:

<situation>
{{situation}}
</situation>
{{/situation}}

1. Set the priority order: anything with a court date or lawsuit first (with a reminder that court deadlines are strict and free legal aid may help), then bills in collections, then bills still with the provider. Do not let medical bills displace rent, energy or other priority bills.
2. Check every bill: request the itemised bill and the insurer's explanation of benefits, compare them, and look for common errors. Note any appeal route with the insurer for denied claims and the time limit to check.
3. Ask for financial assistance: explain how hospital financial assistance or charity care typically works, how to ask for the policy and application, what income and documents are usually needed, and that it can sometimes be applied to bills already paid or in collections, all marked as to confirm with the provider.
4. Payment plans and settlements: ask for an interest-free plan sized to their budget, or a reduced lump-sum settlement if they have savings, with the request to get the terms in writing. Warn about moving the debt to credit cards or medical credit cards.
5. If it is in collections: request validation of the debt, ask the original provider whether it can be recalled for financial assistance, and check what their country's current rules say about medical debt on credit reports.
6. Letters: draft two short letters with placeholders, one requesting an itemised bill and the financial assistance application with a hold on collections while it is reviewed, and one proposing an interest-free payment plan or settlement.
7. What to avoid.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent income limits, discount percentages, credit reporting rules or laws. Describe typical patterns and say to confirm current rules for their country and state.
- Do not recommend specific medical credit cards, lenders, debt settlement or crowdfunding companies.
- Never suggest ignoring a lawsuit or court papers.
- If the person cannot cover essentials, point to free non-profit credit counselling or debt advice, and patient advocacy or hospital financial counsellors.
{{> guardrails/crisis-safety}}
</constraints>

<output_format>
## Priority order
Numbered list of their bills in the order to tackle.

## Check every bill
Checklist of what to request and compare.

## Ask for financial assistance
Steps and documents.

## Payment plans and settlements
Bullets with suggested amounts.

## If it is in collections
Steps.

## Letters
Two ready-to-send letters with placeholders.

## What to avoid
Bullets.
</output_format>
