---
schema: 1
id: budget-irregular-income
kind: prompt
title: Budget on an irregular income
description: Builds a budget for irregular freelance, gig or commission income with a baseline month, a buffer account, tax set-aside and rules for good and lean months.
category: budgeting
version: 1.1.0
status: incubating
stage: [plan]
role: [individual, content-creator, consultant, sales-rep]
requires: [none]
inputs: [text, dataset]
output: [plan, table, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [irregular-income, freelance, gig-work, income-buffer, self-employed]
pairs_with:
  prompts: [plan-freelance-tax-set-aside, build-emergency-fund-plan, set-up-sinking-funds, build-monthly-budget]
  personas: [personal-finance-coach]
args:
  - name: income_history
    description: What came in each month for as many months as you have (ideally 12), before tax, plus anything you know about the months ahead (contracts, seasonality, commission cycles).
    type: text
    required: true
  - name: essential_costs
    description: Monthly costs you cannot skip (housing, utilities, food, transport, insurance, minimum debt payments), plus annual or irregular essentials with amounts.
    type: text
    required: true
  - name: country
    description: Country you live and pay tax in, so the tax set-aside and account suggestions are framed correctly. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Your income picture, Your baseline month, Your plan run through the history, How the money flows, Baseline budget, Good-month rules, Lean-month rules, Buffer target and build plan, Monthly routine, Questions and assumptions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.1.0, note: "The baseline salary is set between an essentials floor and 90% of average net income instead of a rule that could fall below essentials, the history is replayed month by month to size the buffer, and seasonal estimates and known future income are handled explicitly."}
---
<context>
A normal budget assumes the same pay arrives every month. With freelance, gig, seasonal or commission income, that assumption is what breaks people: they spend a good month as if it will repeat, under-save for tax, and then a lean month lands on a credit card. The fix that works is structural, not willpower: plan your life on a deliberately low **baseline month**, route all income through a **holding (buffer) account**, pay tax money aside **first**, pay yourself a steady "salary" from the buffer, and decide in advance what happens to surplus in a good month and what gets cut in a lean one.

{{#country}}Country: {{country}}{{/country}}

<income_history>
{{income_history}}
</income_history>

<essential_costs>
{{essential_costs}}
</essential_costs>
</context>

<task>
1. Income picture: table each month given (gross, tax set-aside, net after set-aside). Name and exclude one-off spikes. If the history covers less than a year but the person describes the rest of it (for example "winter is usually about 600 a month"), fill those months with their estimate, labelled, so the averages cover a full cycle; mark a month nobody described as [X] and ask about it. Keep known future changes (a retainer starting, a contract ending) on a separate "from now on" line rather than rewriting the history. Compute average net, lowest net month and the average of the three lowest net months.
2. Tax set-aside: if the person states a rate, use it. Otherwise use a clearly labelled placeholder percentage, explain that it must be confirmed (point to a tax set-aside calculation or an accountant), and apply it to every month. Tax money is never part of spendable income.
3. Essentials floor: monthly essentials + annual essentials / 12 + minimum debt payments. Show the sum.
4. Baseline salary, the fixed amount paid to yourself every month:
   - Ceiling = 90% of average net income, so the buffer grows over a year. Where known future changes move the average, use the "from now on" figure and say so.
   - Essentials floor above average net income: say so plainly in the first section, do not build the rest of the plan, and give the three most useful steps instead (cut or restructure the largest costs, raise income, get free debt or money advice).
   - Floor at or below the ceiling: baseline = floor + a modest flexible amount, never above the ceiling.
   - Floor between the ceiling and the average: baseline = floor only; say the margin is thin, the buffer will grow slowly, and name the two biggest levers.
   Explain the choice in two sentences with the arithmetic.
5. Run the history through the plan: month by month, starting from any cash savings the person mentions (otherwise zero, labelled), add net income, pay the baseline salary and track the buffer balance. The lowest point is the deepest run of lean months the buffer must absorb; if the balance goes below zero, that shortfall is the minimum buffer this pattern needs.
6. Money flow: a simple account set-up in order: all income lands in a holding account, the tax percentage moves to a separate tax account the same day, a fixed salary moves to the spending account on a fixed date, and bills are paid from the spending account. Do not name banks or apps.
7. Baseline budget: allocate the baseline salary across essentials, annual costs converted to monthly, minimum debt payments and the flexible amount. Totals must equal the salary.
8. Good-month rules: an order of priority for income above baseline (tax top-up if behind, buffer to target, high-interest debt, sinking funds, savings goals, a capped amount for enjoyment) as percentages or amounts.
9. Lean-month rules: draw the salary from the buffer, the cut order if the buffer runs low (flexible spending first, then pause savings, never skip tax or priority bills), and the trigger to act (for example buffer below one month of baseline).
10. Buffer target: the larger of 2-3 months of baseline salary and the deepest shortfall from step 5 plus one month; more if income is strongly seasonal. Give the months needed to reach it from the average monthly surplus (average net minus baseline).
11. Routine: a 15-minute monthly check and a quarterly review of the baseline.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the figures given. Mark any assumption (tax rate, a missing month, an unstated cost) as an assumption and list it at the end. Never invent income or costs.
- Show the arithmetic for the averages, the baseline and the buffer target so the person can redo it.
- If fewer than six months of history are given, say the baseline is provisional and use 80% of average net income as the ceiling instead of 90%.
- Do not recommend specific banks, apps, funds or investments. Account types are fine.
- Keep the tone practical and non-judgemental; irregular income is a normal way to work, not a failure.
{{> output/uncertainty}}
</constraints>

<output_format>
## Your income picture
Table: month | gross | tax set-aside | net (estimated months labelled). Then average, lowest, three-lowest average, and the "from now on" line if any.

## Your baseline month
Essentials floor, ceiling, the baseline salary and the reason, with the arithmetic.

## Your plan run through the history
Table: month | net income | baseline paid | buffer balance. Then the lowest balance and what it means.

## How the money flows
Numbered account set-up.

## Baseline budget
Table: category | monthly amount. Total row equals the baseline salary.

## Good-month rules
Ordered list with percentages or amounts.

## Lean-month rules
Ordered list, including the trigger.

## Buffer target and build plan
Target with the calculation, months to reach it.

## Monthly routine
Five bullets at most.

## Questions and assumptions
Bullets.
</output_format>
