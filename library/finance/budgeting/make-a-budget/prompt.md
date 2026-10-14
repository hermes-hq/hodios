---
schema: 1
id: make-a-budget
kind: prompt
title: Make a budget
description: Builds a first simple budget from your take-home pay and main costs, irregular ones included, with a weekly spending number and fixes if it does not add up. Use when you keep running short.
category: budgeting
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent, student]
requires: [none]
inputs: [preferences, text]
output: [plan, table, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
depth: basic
tags: [money, spending, bills, payday, save-money, monthly-plan, overspending]
pairs_with:
  prompts: [build-monthly-budget, categorize-expenses, plan-savings-goal, plan-debt-payoff]
  personas: [personal-finance-coach]
args:
  - name: income
    description: Money coming in each month after tax (salary, benefits, side work), and whether it changes month to month.
    type: text
  - name: costs
    description: Your main costs with rough amounts, for example rent, bills, phone, transport, food, debt payments, childcare, subscriptions. Guesses are fine.
    type: text
  - name: goal
    description: Why you want a budget, for example "stop running out before payday", "save for a deposit", "pay off my card".
    type: text
output_contract:
  format: markdown
  sections: [Your month at a glance, Your budget, Irregular costs, What to change first, Your weekly spending number, Keeping it going, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-14
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people make their first budget, or a simpler one that finally sticks. First budgets fail when they start from gross pay instead of take-home pay, forget irregular costs (yearly bills, birthdays, car repairs), track forty categories, or are so strict that people quit in week two. A budget that works is short: essentials first, a set-aside for irregular costs, savings or debt as a planned line, and one weekly spending number for everything else.

{{#income}}Income: {{income}}
{{/income}}{{#costs}}Costs:
<costs>
{{costs}}
</costs>
{{/costs}}{{#goal}}Goal: {{goal}}
{{/goal}}
</context>

<task>
1. Missing essentials. If you do not yet have their monthly take-home income and their main costs (here or in their message), ask these and stop:
   1. Roughly how much comes in each month after tax, and is it the same every month? (for example "2,100 a month, steady")
   2. What are your main regular costs, with rough amounts? Guesses are fine. (for example "rent 900, bills 150, phone 30, travel 120, credit card 100")
   3. What do you most want the budget to do: stop running short, save for something, or pay off debt?
   Say that if they would rather not share numbers, you will give a fill-in budget template with the same structure. If they gave enough, skip this step.
2. Check first: if they cannot cover rent or housing, energy, food or minimum debt payments, or creditors are chasing them, say so first and suggest a free, non-profit debt or money advice service in their country before any budget work. Ask their country if it matters.
3. Turn everything into monthly amounts (weekly x 52 / 12, yearly / 12). If income varies, budget on a low typical month and say what to do with extra in better months.
4. Group the costs: essentials (housing, bills, food, transport, minimum debt payments, childcare), irregular costs, savings or extra debt payments, and everything else.
5. Add a monthly set-aside for irregular costs they mentioned or are likely to have (yearly subscriptions and insurance, gifts and holidays, car or home repairs, school costs), and a small emergency-savings line if they have none.
6. Compare money in with money out. If there is a gap, show it plainly and list up to five changes ranked by how much each frees up for the least pain. Do not quietly balance it with cuts they did not agree to.
7. Give one weekly spending number: what is left for food shopping, eating out and fun after everything else, divided by 4.3.
8. Set a 10-minute weekly check and a monthly reset.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only their numbers. Missing common costs (food, phone, transport, insurance) become questions or clearly labelled guesses, never facts.
- Show the arithmetic; totals must add up exactly. Keep their currency; if none is given, use plain numbers.
- Keep it simple: no more than about twelve lines in the budget table.
- Do not recommend specific banks, apps, credit or investment products. For high-interest debt, say paying it down usually beats saving beyond a small buffer.
- No moralising about spending choices.
</constraints>

<output_format>
## Your month at a glance
Money in, money out, left over or short, in three lines.
## Your budget
Table: Line | Type | Monthly amount | Notes. Totals row.
## Irregular costs
Table: Cost | Per year | Set aside each month.
## What to change first
Up to five changes with the amount each frees up, or "Nothing needed".
## Your weekly spending number
The number and how it was worked out.
## Keeping it going
Weekly check and monthly reset as a checklist.
## Next steps
One line: to go deeper, try "Build a monthly budget", "Categorise expenses from a bank export", "Plan a savings goal" or "Plan a debt payoff".
</output_format>
