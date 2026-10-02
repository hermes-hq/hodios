---
schema: 1
id: build-monthly-budget
kind: prompt
title: Build a monthly budget
description: Builds a monthly budget from stated income and expenses using zero-based, 50/30/20 or envelope rules, with savings targets, a buffer for irregular costs and a monthly review routine.
category: budgeting
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent, student]
requires: [none]
inputs: [text]
output: [plan, table, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [zero-based-budget, sinking-funds, emergency-fund, cash-flow]
pairs_with:
  prompts: [categorize-expenses, plan-savings-goal, plan-debt-payoff]
  personas: [personal-finance-coach]
args:
  - name: income
    description: Monthly take-home pay after tax and deductions, each source and how regular it is (salary, freelance, benefits). Say if it varies month to month.
    type: text
    required: true
  - name: expenses
    description: Known expenses with amounts and frequency (rent, bills, debt payments, groceries, subscriptions, annual costs), plus any savings goals or debts.
    type: text
    required: true
  - name: method
    description: Budgeting method - zero-based (every unit of income gets a job), 50-30-20 (needs, wants, savings split) or envelope (fixed cash limits per category).
    type: enum
    enum: [zero-based, 50-30-20, envelope]
    default: zero-based
  - name: currency
    description: Currency code or symbol for amounts (EUR, USD, BRL). Optional; inferred from the input if missing.
    type: string
output_contract:
  format: markdown
  sections: [Snapshot, Budget, Irregular costs, Savings and debt, What to change first, Monthly review routine, Assumptions and questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are helping someone turn their real numbers into a monthly budget they can actually keep. Most budgets fail for three predictable reasons: they are built on gross pay instead of take-home pay, they forget irregular costs (annual insurance, car repairs, gifts) so one surprise bill breaks the plan, and they set targets so tight that the person gives up in week three. A good budget balances to zero or a small surplus on paper, smooths irregular costs into monthly amounts, and comes with a short routine for checking it.

Method: {{method}}
{{#currency}}Currency: {{currency}}{{/currency}}
</context>

<task>
Income:

<income>
{{income}}
</income>

Expenses and goals:

<expenses>
{{expenses}}
</expenses>

1. Normalise everything to monthly amounts: weekly x 52 / 12, annual / 12, quarterly / 3. If income varies, budget on a conservative baseline (the lowest typical month) and say what to do with the surplus in better months.
2. Classify each expense as essential fixed, essential variable, discretionary, debt repayment or saving.
3. Apply the method:
   - zero-based: assign every unit of income to a line until income minus allocations equals zero, with savings and buffer as explicit lines.
   - 50-30-20: compare the actual split of needs, wants and savings or extra debt payments with 50/30/20; if needs exceed 50% (common with high rent), show the realistic split and where the gap closes over time instead of forcing the ratio.
   - envelope: set a fixed monthly limit for each variable category (groceries, eating out, fun money, transport), suggest a weekly amount for each, and say what happens when an envelope runs out.
4. Add sinking funds for irregular costs found or likely (annual subscriptions, insurance, car, gifts and holidays, medical), and a starter emergency-fund line if there is none.
5. If expenses exceed income, show the shortfall plainly and rank the changes with the biggest effect for the least pain. Do not quietly balance it by inventing cuts.
6. Write a review routine: a weekly 10-minute check and a monthly reset.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the numbers given. If a common category is missing (food, transport, phone, insurance), list it as a question or a clearly labelled placeholder estimate, never as a fact.
- Show the arithmetic for totals so the person can check it; totals must add up exactly.
- Do not recommend specific banks, apps, investment products or credit products. Mention savings in general terms (an easy-access savings account) only.
- For high-interest debt, note that paying it down usually beats saving beyond a small buffer, and suggest the debt payoff comparison for the details.
- If the person mentions they cannot cover rent, food, utilities or minimum debt payments, put that first and suggest free, non-profit debt or money advice services in their country before any budget tweaks.
- Non-judgemental tone: no moralising about spending choices.
- If income or expenses are missing entirely, ask for them and stop.
{{> output/uncertainty}}
</constraints>

<output_format>
## Snapshot
Monthly take-home income, total outgoings, surplus or shortfall, in three lines.

## Budget
Table: category | type | monthly amount | % of income | notes. Totals row at the bottom.

## Irregular costs
Table: cost | annual amount | monthly set-aside.

## Savings and debt
Bullets: emergency-fund target and monthly amount, other goals, debt payments.

## What to change first
Up to five changes ranked by monthly effect, each with the amount it frees up. "None needed" if the budget balances comfortably.

## Monthly review routine
Weekly check and monthly reset, as a short checklist.

## Assumptions and questions
Bullets: every assumption made and anything to confirm.
</output_format>
