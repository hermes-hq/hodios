---
schema: 1
id: make-financial-plan
kind: prompt
title: Make a financial plan
description: Turns a rough money picture into a simple financial plan - foundations first, goals made concrete, a monthly split and the next 90 days. Use when you do not know where to start.
category: financial-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text, preferences]
output: [plan, table, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
depth: basic
tags: [money-plan, saving-money, emergency-fund, money-goals, get-organised, personal-finance]
pairs_with:
  prompts: [prioritize-financial-goals, build-monthly-budget, plan-debt-payoff]
  workflows: [financial-checkup-track]
  personas: [personal-finance-coach]
args:
  - name: situation
    description: "Your money picture, roughly: monthly take-home pay, what is left after bills, savings, debts with interest rates, any workplace pension or retirement plan, and who depends on you."
    type: text
  - name: goals
    description: What you want your money to do, with rough amounts and dates if you know them, for example "pay off my card, save a house deposit in 5 years, stop worrying".
    type: text
  - name: country
    description: Country you live in, so account types and protections are framed for the right place. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Where you stand, Your foundations, Your goals made concrete, Your monthly plan, The next 90 days, Questions for a professional, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-14
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help everyday people make their first real financial plan. Generic advice ("spend less, save more, invest early") fails because it ignores the order that matters: people invest while paying 25% on a credit card, or save for a holiday with no emergency buffer, or try to fund every goal at once and finish none. A sound plan checks the foundations first (essentials covered, a starter buffer, any free employer match, expensive debt, a full emergency fund), then makes each goal concrete with an amount, a date and a monthly figure, then splits the monthly surplus in that order.

{{#situation}}Their situation:
<situation>
{{situation}}
</situation>
{{/situation}}{{#goals}}Their goals:
<goals>
{{goals}}
</goals>
{{/goals}}{{#country}}Country: {{country}}
{{/country}}
</context>

<task>
1. Missing essentials. If you do not yet know roughly what they earn and spend, what they owe, and what they want (here or in their message), ask these and stop:
   1. What comes in each month after tax, and roughly how much is left after bills and essentials? (for example "2,400 in, about 300 left")
   2. What do you have and owe? Savings, debts with interest rates, any workplace pension. (for example "1,000 saved, 3,000 on a card at 24%")
   3. What do you want your money to do in the next 1, 5 and 20 years?
   Say that if they answer "just do it", you will use a labelled example of a single adult with a small surplus and show how to swap in their numbers. If they gave enough, skip this step.
2. Safety screen. If essentials are not covered by income, they are missing payments, facing court or bailiff letters, borrowing to pay bills, or someone is pressuring them over money, stop planning goals: say the first step is free debt advice or a money-advice service in their country, and give three things to do this week (list debts, contact creditors, protect rent or mortgage and energy).
3. Where you stand: a one-screen snapshot from their figures (monthly surplus, savings, debts by rate, net worth if possible). Mark gaps as [X] and show the arithmetic.
4. Your foundations: check each step in order and mark done, in progress or not started: essentials covered; starter buffer (about one month of essentials); any employer retirement match taken; debts above about 8% interest being cleared; full emergency fund (three to six months of essentials, more if income is irregular); basic protection (insurance and a will if others depend on them) to look into.
5. Your goals made concrete: each goal with amount, date and monthly saving needed. Propose placeholders where they gave none and mark them [confirm].
6. Your monthly plan: split the surplus across foundations then goals, in order. If it does not fit, show which goals wait and what changing a date or amount would do.
7. The next 90 days: five to seven dated actions, the first one doable today.
8. Questions for a professional: where their situation needs a regulated adviser, tax adviser or debt adviser, and what to bring.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only their figures; mark every placeholder and illustrative rate as such. Do not predict returns or interest rates.
- Never name specific products, providers, funds or shares. You may name account types to ask about in their country.
- Do not assume a country. If none is given, keep account and tax points general and say so.
- Respect their values; show the cost of a choice rather than overruling it.
- Never help hide income or assets from a partner, creditors or tax authorities.
- Keep it short: one plan, not a textbook.
</constraints>

<output_format>
If the safety screen stops you: only "Where you stand" (one line), "Get help first" (who to contact and why) and "This week" (three actions).
Otherwise:
## Where you stand
Table: item | amount. Then monthly surplus with the arithmetic.
## Your foundations
Table: step | status | what to do.
## Your goals made concrete
Table: goal | amount | date | monthly needed.
## Your monthly plan
Table: where the money goes | amount per month | until when.
## The next 90 days
Checklist with dates.
## Questions for a professional
## Next steps
One line: to go deeper, try "Prioritise competing financial goals", "Build a monthly budget", "Plan a debt payoff" or the "Yearly financial check-up".
</output_format>
