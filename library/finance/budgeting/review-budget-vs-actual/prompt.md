---
schema: 1
id: review-budget-vs-actual
kind: prompt
title: Review last month's budget against actual spending
description: Compares a household's planned budget with what was actually spent last month, separates one-offs from real drift, and proposes the budget changes for next month.
category: budgeting
version: 1.0.0
status: incubating
stage: [review]
role: [individual, parent]
requires: [none]
inputs: [dataset, text]
output: [table, report, plan]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [monthly-review, spending-variance, budget-adjustment, household-money]
pairs_with:
  prompts: [build-monthly-budget, categorize-expenses, money-check-in-chat, set-up-sinking-funds]
  personas: [personal-finance-coach]
args:
  - name: budget
    description: Your planned budget for the month, category by category, with take-home income.
    type: text
    required: true
  - name: actuals
    description: What you actually spent per category last month (totals, or a categorised list of transactions).
    type: text
    required: true
  - name: notes
    description: Anything unusual about the month, such as a birthday, a car repair, an extra pay period or a refund. Optional.
    type: text
output_contract:
  format: markdown
  sections: [The month in one line, Category by category, What drove the gaps, Changes for next month, One habit to try]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A budget only works if it is compared with reality and adjusted. Most budgets fail not on the big lines (rent, loan payments) but on the variable ones: groceries, eating out, transport, small online orders. A useful review separates three kinds of gap: **one-offs** that will not repeat (a repair, a wedding gift), **timing** effects (an annual bill that landed this month, a five-week month), and **drift**, where the planned figure was simply unrealistic or a habit has crept up. One-offs belong in sinking funds, timing needs smoothing, and only drift calls for a new number or a change of habit. People also tend to set the grocery and fun lines too low to look virtuous, then feel they failed; a realistic number they can hit beats an ideal one they miss.

<budget>
{{budget}}
</budget>

<actuals>
{{actuals}}
</actuals>
{{#notes}}Notes on the month: {{notes}}{{/notes}}
</context>

<task>
1. Line up planned and actual for every category, with the difference in money and as a percentage. Add totals for income, spending and money left or saved, and check the totals add up; point out any category that appears in one list but not the other.
2. Flag material gaps: anything over about 10% and over a small absolute amount, and anything under budget by a lot (which can mean an annual cost is still to come).
3. For each material gap, label it one-off, timing or drift, using the notes and the transaction detail. Say when you cannot tell and what would settle it.
4. Propose changes for next month: new figures for drifting categories (based on the last two or three months if given, otherwise this month with a margin), one-offs moved to a sinking fund line with a monthly amount, and the cuts or moves needed so the budget still balances. Show the revised budget totals.
5. Suggest one specific habit or system tweak aimed at the biggest drift (for example a weekly grocery cap, unsubscribing from shop emails, a separate card for eating out).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the figures given. Do not invent transactions or typical spending; if a category is a guess, say so.
- Do not moralise about spending choices; the job is a budget that matches the life being lived.
- A revised budget must still balance: income minus spending minus saving equals zero or a stated surplus.
- If spending regularly exceeds income, say so plainly, and point to a tighter survival budget and free money advice rather than only trimming lines.
{{> output/uncertainty}}
</constraints>

<output_format>
## The month in one line
Planned versus actual total and what was left or overspent.

## Category by category
Table: category | planned | actual | difference | % | flag.

## What drove the gaps
Bullets: category, label (one-off, timing, drift) and reason.

## Changes for next month
Table: category | old figure | new figure | why. Then the new totals.

## One habit to try
One or two sentences.
</output_format>
