---
schema: 1
id: issue-contractor-tax-forms
kind: prompt
title: Issue year-end tax forms to contractors
description: Works out which contractors a business must send year-end tax forms such as the US 1099-NEC, what details to collect, the deadlines, and how to file and deliver them, with a tracking table.
category: taxes
version: 1.0.0
status: incubating
stage: [operate]
role: [founder, operations-manager]
requires: [none]
inputs: [dataset, preferences]
output: [table, checklist, plan]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [form-1099-nec, form-w-9, information-returns, contractors, year-end, united-states]
pairs_with:
  prompts: [check-contractor-tax-status, plan-business-tax-calendar, track-business-expenses]
args:
  - name: payees
    description: Each contractor or vendor you paid in the year, with the type of entity if known (individual, LLC, corporation), what for, the total paid, and how you paid (bank transfer, check, card, payment app).
    type: text
    required: true
  - name: business
    description: Country, business type, tax year, and whether you have W-9s or tax IDs on file already.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Scope and assumptions, Payee decisions, W-9 request message, Filing and delivery steps, Dates and penalties, Classification flags]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a small business owner meet their year-end reporting duty for contractors, the way a bookkeeper runs the January information-return checklist. In the US, a business generally files Form 1099-NEC for each non-employee paid for services at or above the reporting threshold during the year, and Form 1099-MISC for items such as rent or prizes. The threshold was 600 dollars for many years and recent legislation changes it for later years, so the figure must be checked for the tax year. Payments to most corporations are exempt, but payments to attorneys are reportable even if incorporated. Payments made by credit card or through a third-party payment network are generally reported by the payment processor on Form 1099-K, so the payer leaves them out. The payer needs a W-9 with the legal name, tax classification and taxpayer identification number before paying, ideally at onboarding; without a valid TIN, backup withholding can apply. Recipient copies and the IRS filing for 1099-NEC are generally due by January 31, and e-filing is required above a small total count of information returns. States may have their own filing. Outside the US, similar duties exist under other names, for example payer reporting in some industries, so the job is to check the local rule rather than assume.

Business: {{business}}
Payees: {{payees}}
</context>

<task>
1. Confirm country and tax year. If the business is outside the US, say that the rest of this prompt describes the US system, list the questions to check with the local tax authority or an accountant, and stop after a short checklist.
2. For each payee, decide: needs a 1099-NEC, needs a 1099-MISC, excluded (with the reason: corporation, card or payment-app payments, below threshold, goods not services, personal not business), or unclear. Count only payments in the tax year, by date paid.
3. List missing information per payee (legal name, address, TIN, entity type) and draft a short, polite W-9 request message the user can send.
4. Give the filing steps: how the forms are filed with the IRS (including the IRS online portal for information returns and e-file requirements), how and when recipients get their copy, state filing to check, and corrections if a form is wrong.
5. Give the dates with "check the date for your tax year" and the penalty structure in general terms.
6. Flag classification risk: if any payee looks like an employee in practice (set hours, long-term, controlled), say this is a separate question and point to a worker classification check.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state the reporting threshold as a fixed fact; say it changed and must be checked for the year.
- Do not invent TINs, addresses or amounts.
- Do not help avoid reporting by splitting payments or paying in cash to stay under a threshold. Decline in one sentence.
- Recommend an accountant or payroll provider when there are many payees, foreign contractors (who need different forms), backup withholding already applied, or prior years not filed.
{{> output/uncertainty}}
</constraints>

<output_format>
## Scope and assumptions
## Payee decisions
Table: Payee | Paid in year | Payment method | Form | Reason | Missing info.
## W-9 request message
## Filing and delivery steps
## Dates and penalties
## Classification flags
</output_format>
