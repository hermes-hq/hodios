---
schema: 1
id: set-up-sinking-funds
kind: prompt
title: Set up sinking funds
description: Sets up sinking funds for predictable irregular costs such as car repairs, gifts, insurance and travel, with monthly amounts, catch-up plans and a simple tracker.
category: budgeting
version: 1.0.1
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [table, plan, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [sinking-funds, irregular-expenses, annual-costs, envelope-method]
pairs_with:
  prompts: [budget-for-holidays-and-gifts, build-monthly-budget, build-emergency-fund-plan, budget-irregular-income]
  personas: [personal-finance-coach]
args:
  - name: irregular_costs
    description: Each cost that comes round predictably but not monthly - what it is, rough amount, when it is next due and how often (for example car insurance 640 due in March, yearly). Say what is already saved toward any of them.
    type: text
    required: true
  - name: monthly_budget
    description: How much you can put toward these costs each month in total, if you know. Optional; without it the plan shows what is needed and you choose.
    type: string
output_contract:
  format: markdown
  sections: [Your funds, Monthly total, Catch-up plan, If it does not fit, Where to keep the money, Tracker, Rules]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Steady-state formula covers costs that recur every few years, not only yearly and two-yearly ones."}
---
<context>
Most budget "emergencies" are not emergencies: the car service, the annual insurance renewal, birthdays, school trips, the dentist, the boiler check, the summer holiday. They are predictable in amount and roughly in timing, just not monthly. A sinking fund saves a fixed amount each month for each of them, so the bill is already paid for when it arrives and the emergency fund is kept for real shocks. The common failure is a cost that is due soon with nothing saved; the plan has to handle catch-up honestly instead of pretending every fund starts twelve months out.

<irregular_costs>
{{irregular_costs}}
</irregular_costs>
{{#monthly_budget}}Total available each month: {{monthly_budget}}{{/monthly_budget}}
</context>

<task>
1. Turn each cost into a fund: name, target amount, next due date, frequency, months until next due, amount already saved.
2. Monthly amount per fund:
   - Steady state = cost / (12 x years between occurrences), so a yearly cost / 12 and a two-yearly cost / 24.
   - First cycle = (target - already saved) / months until due. Where this is higher than steady state, show both and when it drops back.
   - Round up to a tidy figure.
3. Add a "probably forgot" check: list 5-8 common irregular costs not in the list (for example car tyres and MOT or inspection, glasses, vet bills, annual subscriptions, gifts at work, home maintenance at roughly 1% of home value a year for owners) and ask which apply. Do not add them to the totals unless the person listed them.
4. Total the monthly amounts. Compare with the available budget if given.
5. If it does not fit: rank the funds (essential and contractual first, such as insurance, tax, car roadworthiness; then health; then flexible goals like travel and gifts), and show options - lower a flexible target, push a date, pay an annual cost monthly if that costs no more, or accept a smaller catch-up on one fund. Show the revised total.
6. Where to keep it: one separate easy-access savings account with a simple ledger, or several labelled savings pots if the bank offers them. Keep it apart from day-to-day spending and from the emergency fund. No bank or app names.
7. Tracker: a table the person can copy into a spreadsheet, with columns for fund, target, monthly amount, balance, due date, and a spend log.
8. Rules: what to do if a cost comes in under target (roll over or move the surplus), over target (top up from flexible funds before the emergency fund), and an annual reset.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use the person's amounts and dates. If a cost has no amount or no due date, ask for it or mark it [X], and do not guess a figure silently.
- Sinking funds are for predictable costs only. If the list includes truly unpredictable events (job loss, medical emergencies, a sudden large repair of unknown size), move them to an "emergency fund, not a sinking fund" note and explain why.
- Show the arithmetic for each first-cycle amount.
- No product, bank or app recommendations.
{{> output/uncertainty}}
</constraints>

<output_format>
## Your funds
Table: fund | target | due | frequency | months left | saved | first-cycle monthly | steady monthly.

## Monthly total
Totals for the first cycle and the steady state, against the budget if given.

## Catch-up plan
Only for funds due soon; how the amount steps down.

## If it does not fit
Ranked list and the revised totals (omit this section if it fits).

## Where to keep the money
Two or three sentences.

## Tracker
Copyable table.

## Rules
Bullets, plus the "probably forgot" question list.
</output_format>
