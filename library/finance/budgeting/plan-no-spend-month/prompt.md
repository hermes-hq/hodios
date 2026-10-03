---
schema: 1
id: plan-no-spend-month
kind: prompt
title: Plan a no-spend month
description: Plans a no-spend or low-spend month with clear rules, allowed essentials, a grey-zone test, swaps, a daily tracker and a decision on where the saved money goes.
category: budgeting
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [plan, checklist, table]
risk: read-only
advice_risk: [financial]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [no-spend-challenge, spending-habits, frugal-living, money-challenge]
pairs_with:
  prompts: [categorize-expenses, cut-monthly-costs, build-monthly-budget, build-tight-budget]
  personas: [personal-finance-coach]
args:
  - name: current_spending
    description: Roughly where your money goes in a normal month, especially the discretionary bits (takeaways, shopping, subscriptions, nights out). A pasted list of categories and amounts works best. Optional.
    type: text
  - name: goals
    description: Why you want to do this and what the saved money is for (a debt, a deposit, a reset of habits). Optional.
    type: text
  - name: household
    description: Who you live with and anything already booked this month (birthdays, travel, school costs), so the rules fit real life. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Strict or low-spend, Your rules, Allowed essentials, Paused for the month, Grey-zone test, Prep week, Swaps, Tracker, Where the money goes, After the month]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A no-spend month works when it is a designed experiment, not a vow. People fail it in predictable ways: the rules were vague so every purchase became a negotiation, they stockpiled beforehand and spent the money anyway, one slip turned into "I've blown it", the household was not on board, or the saved money quietly evaporated into next month. The design below prevents each of those. For many people a low-spend month (one small fun allowance) beats a strict one because it survives contact with real life.

{{#current_spending}}<current_spending>
{{current_spending}}
</current_spending>{{/current_spending}}
{{#goals}}<goals>
{{goals}}
</goals>{{/goals}}
{{#household}}<household>
{{household}}
</household>{{/household}}
</context>

<task>
1. If none of the optional details are given, ask up to three short questions (rough discretionary spending, who is in the household, what the money is for) and offer a generic plan the person can adjust.
2. Recommend strict or low-spend for this person with one reason, and set the length (a calendar month, or 30 days from a start date).
3. Write 5-7 rules in plain words, including the slip rule: a slip is logged and the challenge continues the next day; it never resets to zero.
4. Allowed essentials: housing, utilities, groceries from a list, medicines and health costs, transport to work or school, childcare, minimum debt payments, and anything contractual. Name what is already booked in the household details and decide how each is handled (cap, pre-pay, homemade alternative).
5. Paused: the discretionary categories from their spending, with the normal monthly amount for each so the expected saving is visible.
6. Grey-zone test: a three-question test for purchases that are not clearly essential (Is it needed before the month ends? Is there a free or already-owned alternative? Would I buy it if I had to wait 72 hours?). Anything that fails goes on a wish list to revisit after the month.
7. Prep week: a short checklist (pause or cancel subscriptions you would not miss, unsubscribe from shop emails, remove saved cards from shopping sites, plan meals around what is in the cupboard, list free activities, agree the rules with the household). Warn against stockpiling.
8. Swaps: a table of their usual spends with a free or cheap swap each, sized to their life (families get child-friendly swaps).
9. Tracker: a copyable 30-day table with columns for date, spent on essentials, avoided spend and amount, urge or trigger noted.
10. Where the money goes: decide now, move the expected saving on day one (or weekly) to the goal account, and state the amount.
11. After the month: a short review (what you did not miss, what you did, which pause to make permanent, which wish-list items still matter).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use their amounts to estimate the saving; label estimates. Do not invent spending categories they did not mention except as optional suggestions.
- If their spending shows that essentials already use all their income, say a no-spend month will not fix that and point them to a survival budget and free money or debt advice instead.
- Never suggest skipping medication, needed healthcare, food for children, insurance premiums, rent or debt payments to hit the challenge.
- Keep the tone light and encouraging; no shaming about past spending.
{{> output/uncertainty}}
</constraints>

<output_format>
## Strict or low-spend
Recommendation and length, two lines.

## Your rules
Numbered.

## Allowed essentials
Bullets, with how each booked event is handled.

## Paused for the month
Table: category | usual monthly amount. Total = expected saving.

## Grey-zone test
Three questions.

## Prep week
Checklist.

## Swaps
Table: usual spend | swap.

## Tracker
30-row copyable table (dates may be day 1-30).

## Where the money goes
Amount, destination, when it moves.

## After the month
Five review questions.
</output_format>
