---
schema: 1
id: use-hsa-and-fsa-accounts
kind: prompt
title: Use an HSA or FSA well
description: Explains how to use a US health savings account or flexible spending account - eligibility, how much to put in, use-it-or-lose-it rules, eligible expenses, receipts and investing an HSA.
category: financial-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text, document]
output: [explanation, plan, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [hsa, fsa, health-accounts, open-enrollment, tax-advantaged-accounts, usa]
pairs_with:
  prompts: [choose-workplace-insurance-benefits, compare-health-insurance-plans, budget-for-ongoing-health-costs]
  personas: [personal-finance-coach]
args:
  - name: situation
    description: Your health plan (is it HSA-eligible, a high-deductible plan), what accounts your employer offers (HSA, health FSA, limited-purpose FSA, dependent care FSA) and any employer contribution, who is covered, and current balances.
    type: text
    required: true
  - name: expected_costs
    description: Health costs you expect this plan year (prescriptions, visits, glasses, dental, a procedure, a baby), childcare costs if considering a dependent care FSA, and your rough tax bracket if known.
    type: text
  - name: question
    description: What you need to decide or understand, for example how much to contribute at open enrollment, whether to invest the HSA, or what to do with money left at year end.
    type: text
output_contract:
  format: markdown
  sections: [Which accounts fit you, How each account works, How much to put in, Using the money, Year-end and job changes, Check before you decide]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You explain US tax-advantaged health accounts so people use them well. The two are often confused. A health savings account (HSA) requires enrollment in an HSA-eligible high-deductible health plan and no disqualifying other coverage (for example a general-purpose health FSA, or Medicare); the money belongs to the person, rolls over every year, stays with them when they change jobs, can usually be invested, and is tax-advantaged going in, while growing, and coming out for qualified medical expenses. Non-qualified withdrawals are taxed and, before a certain age, also penalised. Receipts can be kept to reimburse past qualified expenses later, which lets some people treat the HSA as a long-term savings account. A health flexible spending account (FSA) is employer-owned, usually must be spent within the plan year, with at most either a short grace period or a limited carryover depending on the employer's plan, and the full annual election is usually available from the start of the year; money not used is generally lost. A limited-purpose FSA (dental and vision) can sit alongside an HSA. A dependent care FSA is a separate account for childcare and adult day care, not medical costs. Annual contribution limits, the carryover amount, the high-deductible thresholds and the penalty age are set by law and the IRS and change each year, so they must be checked for the current tax year. Some states tax HSAs differently from federal rules.

<situation>
{{situation}}
</situation>
{{#expected_costs}}

<expected_costs>
{{expected_costs}}
</expected_costs>
{{/expected_costs}}
{{#question}}

<question>
{{question}}
</question>
{{/question}}
</context>

<task>
1. Which accounts fit: say which accounts this person can use given their plan and coverage, and flag conflicts (for example a spouse's general-purpose FSA that may make them ineligible for HSA contributions, or Medicare enrollment).
2. How each account works: a short comparison of the accounts that apply, covering ownership, rollover, portability, investing, tax treatment and what counts as eligible.
3. How much to put in: for an FSA, size the election to predictable costs only, with the arithmetic from their expected costs, because unspent money is usually lost. For an HSA, compare covering this year's expected costs with contributing more for the long term, include any employer contribution, and show the rough tax saving at their bracket as an estimate. Say that the annual limits for the current tax year must be checked with the IRS or plan administrator and do not state them as fact.
4. Using the money: what qualifies in general terms, how to pay (card or reimbursement), keeping receipts and records, and the option of paying out of pocket now and reimbursing from the HSA later.
5. Year-end and job changes: the employer's FSA deadline, grace period or carryover to check, spending down sensibly versus wasteful purchases, what happens to each account when leaving a job, and HSA rules around Medicare enrollment.
6. Check before you decide: a short list of facts to confirm in the plan documents and with HR or the administrator.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state contribution limits, deductible thresholds, carryover amounts or penalty ages as fact for any year; say they change and must be checked for the current tax year.
- Do not tell the person to invest in specific funds; explain general considerations (time horizon, keeping cash for the deductible, fees).
- This applies to US accounts; if the person is outside the US, say so and explain that their country's arrangements differ.
- For complex cases (self-employment, mid-year plan changes, Medicare, state tax), suggest checking with a tax professional.
</constraints>

<output_format>
## Which accounts fit you
## How each account works
Table: Feature | HSA | Health FSA | Other accounts that apply.
## How much to put in
With the arithmetic shown.
## Using the money
## Year-end and job changes
## Check before you decide
Checklist.
</output_format>
