---
schema: 1
id: budget-a-pay-rise
kind: prompt
title: Plan where a pay rise goes
description: Works out what a pay rise adds after tax and deductions, then splits it between goals, debt and lifestyle before it disappears, with the payday changes to set up so it sticks.
category: budgeting
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text, preferences]
output: [plan, table, explanation]
risk: read-only
advice_risk: [financial]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [pay-rise, lifestyle-creep, savings-rate, salary-increase]
pairs_with:
  prompts: [build-monthly-budget, plan-savings-goal, build-emergency-fund-plan, plan-windfall]
  personas: [personal-finance-coach]
args:
  - name: rise
    description: Old and new gross pay (or the percentage), how often you are paid, and the country so deductions can be framed. A payslip after the rise is best.
    type: text
    required: true
  - name: situation
    description: Current savings, debts with interest rates, goals, and anything you have been putting off spending on. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What actually lands, Three ways to split it, Order of priorities, Set it up on payday, What to watch]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A pay rise is the easiest moment to raise a savings rate, because money you never got used to spending is not missed. Without a plan it is usually absorbed within a few months by "lifestyle creep": slightly nicer groceries, more takeaways, a bigger phone contract. Two traps catch people: assuming the gross rise arrives in full, when income tax at the marginal rate, social contributions, pension contributions set as a percentage and loan repayments tied to income can take a large share of it; and crossing a threshold that changes a benefit, credit, allowance or student loan repayment. A common, balanced approach is to decide a split in advance (for example half to goals, half to living better), automate it from the first larger payslip, and let the rise feel like a reward too.

<rise>
{{rise}}
</rise>
{{#situation}}<situation>
{{situation}}
</situation>{{/situation}}
</context>

<task>
1. What actually lands: estimate the extra take-home per pay period from the gross rise, showing which deductions scale with pay (income tax at their marginal band, social contributions, percentage pension contributions, income-linked loan repayments). Use a payslip if given; otherwise give a range and label it an estimate to check against the first new payslip. Flag any threshold the rise may cross that could affect tax bands, benefits, credits, allowances or loan repayments, as a question to check locally.
2. Three ways to split it: a goals-first split, a balanced split and a mostly-lifestyle split, each in money per month and what it achieves in a year (for example emergency fund complete by a month, debt cleared by a month).
3. Order of priorities: given their situation, the usual order (starter buffer, high-interest debt, any employer pension match they are missing, emergency fund, then goals), presented as a common approach, not an instruction.
4. Set it up on payday: the transfers or contribution changes to make before the first larger payslip, including raising a pension percentage if they choose that route.
5. What to watch: signs of lifestyle creep at three and six months, and a short review question.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Tax and deduction figures are estimates unless taken from a payslip; name the country assumption and do not state rates you are not confident of. If no country is given, ask and work in percentages.
- Do not recommend specific investments, funds or providers.
- Respect that spending some of the rise is legitimate; do not push a 100% savings split.
{{> output/uncertainty}}
</constraints>

<output_format>
## What actually lands
Calculation and the extra take-home per pay period, with the range.

## Three ways to split it
Table: split | to goals | to debt | to lifestyle | after 12 months.

## Order of priorities
Numbered list tied to their situation.

## Set it up on payday
Checklist.

## What to watch
Bullets.
</output_format>
