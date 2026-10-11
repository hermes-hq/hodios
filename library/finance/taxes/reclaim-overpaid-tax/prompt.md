---
schema: 1
id: reclaim-overpaid-tax
kind: prompt
title: Reclaim overpaid tax
description: Works out whether you overpaid income tax - from a wrong tax code, a job change, part-year work or unclaimed reliefs - roughly how much, and drafts the claim or letter to get it back.
category: taxes
version: 1.0.0
status: incubating
stage: [review]
role: [individual, student]
requires: [none]
inputs: [text, document]
output: [explanation, message, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [tax-refund, tax-code, overpayment, payroll]
pairs_with:
  prompts: [check-tax-withholding, explain-payslip, fix-tax-return-mistake]
  personas: [tax-educator]
args:
  - name: situation
    description: The tax year or years in question, jobs and dates, pay and tax from payslips or year-end forms, tax codes or withholding settings used, periods not working or studying, moves abroad, and expenses or reliefs you may not have claimed.
    type: text
    required: true
  - name: country
    description: Country where the tax was paid.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Was tax overpaid, Likely causes, Rough amount, How to claim, Draft claim or letter, Deadlines and warnings, Points to verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone find out whether they paid too much income tax and how to get it back. Overpayments through payroll are common and often go unclaimed. Typical causes: an emergency or temporary tax code or withholding setting applied after starting a job; a job change where the tax-free allowance was not carried over or was used twice; working only part of the year (students, people who left work, retired or moved abroad) when payroll assumed a full year's pay; two jobs with the allowance on the wrong one; unclaimed work expenses, professional fees or pension relief at a higher rate; double withholding on foreign income; and overpaid advance or estimated payments. Some systems reconcile automatically after year end; others need a return or a specific claim. Time limits apply to claiming back past years. Refund agents may charge a large share for what is often a simple claim, and scam messages offering tax refunds are common.

Country: {{country}}
</context>

<task>
Situation:

<situation>
{{situation}}
</situation>

1. Say whether tax looks overpaid, and how confident you are, from the figures given. If key figures are missing, say which and where to find them (final payslip, year-end form, tax account online).
2. List the likely causes that fit the facts, most likely first.
3. Estimate the overpayment roughly: expected tax for the period (using rates and allowances the person supplies, or ones you are confident of for the year marked "verify") minus tax paid. Show the arithmetic and label it approximate. If you cannot estimate reliably, explain the method instead.
4. How to claim in {{country}}: whether it is likely to be refunded automatically, or by filing a return, a specific claim form, the online tax account, or contacting payroll for a correction within the current year. Mark routes "verify".
5. Draft the claim or letter: a short, factual message to the tax authority (or payroll) with the tax year, the cause, the figures and what is being asked for, with placeholders for reference numbers.
6. Deadlines and warnings: time limits for past years, the free route versus paid refund agents, and how to spot refund scams (unsolicited messages with links asking for bank details).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never invent rates, allowances, time limits or forms; mark them "verify".
- Do not ask for full identity or reference numbers; use placeholders.
- Do not claim reliefs the person has not said they are entitled to; list possible ones as questions.
- If the figures suggest an underpayment rather than an overpayment, say so plainly and explain the usual ways it is collected.
{{> output/uncertainty}}
</constraints>

<output_format>
## Was tax overpaid
Two or three sentences with confidence.

## Likely causes
Ranked bullets.

## Rough amount
Arithmetic, labelled approximate.

## How to claim
Numbered steps, routes marked "verify".

## Draft claim or letter
The message with placeholders.

## Deadlines and warnings
Bullets.

## Points to verify
Bullets with where to check each.
</output_format>
