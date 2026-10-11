---
schema: 1
id: plan-bill-payment-calendar
kind: prompt
title: Plan a bill payment calendar around payday
description: Maps every bill and direct debit against paydays to show where the account runs low, then plans due-date moves, a bills buffer and a pay-cycle budget to stop the mid-month crunch.
category: budgeting
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text, dataset]
output: [table, plan, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [bill-calendar, payday-timing, direct-debits, cash-flow-gap]
pairs_with:
  prompts: [build-monthly-budget, set-up-money-accounts-system, clear-overdraft, untangle-bnpl-plans]
  personas: [personal-finance-coach]
args:
  - name: income_dates
    description: When money comes in and how much, for example "salary 2,450 on the last working day" or "paid every two weeks on Fridays, 1,100".
    type: text
    required: true
  - name: bills
    description: Each regular bill, its amount and the day it leaves the account (rent, loan, cards, utilities, phone, subscriptions, childcare, insurance).
    type: text
    required: true
  - name: starting_balance
    description: What is usually in the account on payday morning, and any overdraft limit. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Your month at a glance, Where it gets tight, Due dates worth moving, Your pay-cycle budget, Set-up checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Many people who "run out of money" every month actually have a timing problem: most bills leave the account in a cluster just before payday, or a four-weekly or fortnightly pay cycle drifts against monthly bills, so the account dips into an overdraft even though income covers the month. Fixes that cost nothing: asking billers to move due dates to just after payday (many utilities, card issuers and phone companies allow it), running a separate bills account funded on payday, and budgeting by pay cycle rather than calendar month. Fortnightly or four-weekly pay produces "extra" pay periods in some months, which are best planned for, not spent by accident. Dates that fall on weekends or bank holidays usually move to the next working day, for income as well as bills.

Income: {{income_dates}}

<bills>
{{bills}}
</bills>
{{#starting_balance}}Usual balance and overdraft: {{starting_balance}}{{/starting_balance}}
</context>

<task>
1. Build a day-by-day running balance for one typical month (or one full pay cycle plus the next payday if pay is not monthly): each income and bill on its date, the running balance, and the lowest point. Assume a starting balance of zero after the previous cycle's spending if none is given, and say so. Spread day-to-day spending (food, fuel) evenly and state the figure you used.
2. Where it gets tight: name the days the balance is lowest or negative, by how much, and which bills cause it.
3. Due dates worth moving: list the bills that would most improve the low point if moved to just after payday, the new date to ask for, and a one-line request script. Note which bills usually cannot move (rent, some loans) so the rest must work around them.
4. If pay is fortnightly or four-weekly, show which months have an extra pay period and propose what that money does (buffer, sinking funds, debt).
5. Pay-cycle budget: what to transfer on payday into bills, savings and spending, so bills are covered whatever their date. Size a one-off bills buffer to cover the low point.
6. Set-up checklist: the concrete steps in order.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the amounts and dates given. Ask about bills that look missing (for example no energy or phone listed) rather than inventing them.
- Do not promise a biller will agree to move a date; present it as something worth asking.
- Do not ask for account numbers or log-in details.
- If income is lower than the bills plus basic living costs over the month, say so plainly; a calendar cannot fix that, so point to a survival budget and free money advice.
{{> output/uncertainty}}
</constraints>

<output_format>
## Your month at a glance
Table: date | in | out | what | running balance.

## Where it gets tight
Bullets with the lowest point.

## Due dates worth moving
Table: bill | current date | ask for | effect on low point. Then the request script.

## Your pay-cycle budget
Payday transfers and buffer size.

## Set-up checklist
Numbered steps.
</output_format>
