---
schema: 1
id: plan-savings-goal
kind: prompt
title: Plan a savings goal
description: Works out the monthly amount and timeline to reach a savings goal, checks whether it is realistic, and lays out the trade-offs that would get there sooner.
category: budgeting
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent, student]
requires: [none]
inputs: [text]
output: [plan, table]
risk: read-only
advice_risk: [financial]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [savings-goal, emergency-fund, sinking-funds, house-deposit]
pairs_with:
  prompts: [build-monthly-budget, categorize-expenses, plan-debt-payoff]
  personas: [personal-finance-coach]
args:
  - name: goal
    description: What you are saving for and why it matters, plus anything relevant - your monthly surplus today, other goals competing for the money, any debts.
    type: text
    required: true
  - name: amount
    description: Target amount to reach.
    type: number
    required: true
  - name: deadline
    description: When you need the money (a date or "in 18 months"). Optional; without it the plan shows how long different monthly amounts take.
    type: string
  - name: current_savings
    description: Amount already saved towards this goal.
    type: number
    default: 0
output_contract:
  format: markdown
  sections: [The number, Is it realistic, Timeline options, Ways to get there sooner, Where to keep the money, Milestones, Assumptions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone turn a savings goal into a monthly number and a plan they can stick to. The arithmetic is simple; the useful part is honesty about whether the goal fits their budget, and a clear menu of levers: more time, a smaller target, more income, or cuts elsewhere. Money needed within a few years should not be exposed to market swings, so short-horizon goals are about steady saving, not investment returns.

Goal: {{goal}}
Target: {{amount}}
Already saved: {{current_savings}}
{{#deadline}}Deadline: {{deadline}}{{/deadline}}
</context>

<task>
1. Gap = target minus already saved. If a deadline is given, count the months from today and compute the monthly amount needed. If not, show months needed at three monthly amounts that fit the stated situation.
2. If the person gave their monthly surplus, compare the required amount with it and say whether the goal fits, is tight (over about half the surplus), or does not fit.
3. Show the effect of each lever with numbers: extending the deadline by 3, 6 and 12 months; lowering the target; a one-off windfall (bonus, tax refund, selling something); a specific monthly increase.
4. Interest: for horizons under about 3-5 years, assume savings sit in cash. You may show a second line with a modest illustrative interest rate on cash savings, labelled as an assumption, but base the plan on 0%.
5. Note conflicts: if the person has high-interest debt or no emergency fund, say how that might affect the order of goals, briefly.
6. Set milestones at 25%, 50% and 75% with expected dates.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not recommend specific accounts, banks, funds or investments. Describe options in general terms (easy-access savings, fixed-term savings, government-backed savings schemes where they exist) and suggest checking deposit-protection limits locally.
- For goals more than about 5 years away, say that investing may be worth discussing with a regulated adviser, without suggesting what to invest in.
- Show the arithmetic. Round monthly amounts up to a sensible unit.
- If today's date matters for the month count and you do not know it, state the date you assumed.
- Encouraging and practical, never preachy.
{{> output/uncertainty}}
</constraints>

<output_format>
## The number
One or two lines: monthly amount needed, or months needed at a given amount.

## Is it realistic
Two or three sentences, or a question if the surplus is unknown.

## Timeline options
Table: monthly amount | months to goal | date reached.

## Ways to get there sooner
Bullets, each with its numeric effect.

## Where to keep the money
Two or three sentences in general terms.

## Milestones
Table: milestone | amount | expected date.

## Assumptions
Bullets.
</output_format>
