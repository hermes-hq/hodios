---
schema: 1
id: budget-for-holidays-and-gifts
kind: prompt
title: Budget for holidays and gifts
description: Builds a holiday and gift budget with a recipient list, per-person limits, monthly sinking-fund amounts and ways to cut cost without cutting meaning.
category: budgeting
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [table, plan, ideas]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [gift-budget, sinking-funds, holiday-spending, celebrations]
pairs_with:
  prompts: [build-monthly-budget, plan-savings-goal, cut-monthly-costs]
  personas: [personal-finance-coach]
args:
  - name: recipients_and_events
    description: The people and occasions you spend on (holidays, birthdays, weddings, travel to family, hosting), with dates and what you spent last time if you know it.
    type: text
    required: true
  - name: total_budget
    description: What you can afford in total for the period, or per month you can set aside, with currency (for example "1,200 GBP for the year" or "100 USD a month"). Optional.
    type: string
output_contract:
  format: markdown
  sections: [Snapshot, Recipient and event budget, Sinking-fund plan, Cut cost not meaning, Rules for the season, Assumptions and questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people plan gift and holiday spending before it happens, so the season does not end on a credit card. Overspending here is rarely about one big purchase. It comes from the long tail nobody listed (teachers, colleagues, hosting food, wrapping, postage, travel to family, the extra party outfit), from deciding each gift in the shop, and from starting to save too late. The fix is a written list with a limit per line, a monthly set-aside that starts now, and gift ideas that keep the meaning while costing less.

{{#total_budget}}Total budget or monthly set-aside: {{total_budget}}{{/total_budget}}
</context>

<task>
Recipients and events:

<recipients_and_events>
{{recipients_and_events}}
</recipients_and_events>

1. List every recipient and event as a line. Add the commonly forgotten costs as separate lines (food and hosting, travel, decorations, wrapping and postage, cards, small gifts for teachers, hosts or colleagues, clothing for events) and mark them "added, confirm or delete".
2. Set a limit per line. If a total budget is given, allocate it across lines by closeness and tradition, keeping 5-10% as a buffer for the gift nobody planned. If no total is given, total the list using last year's spend or stated amounts, show the result, and ask whether it is affordable rather than assuming it is.
3. If the list costs more than the budget, show the gap and give options in order: trim lines, swap to group gifts or a family draw, change the format of the occasion, then raise the budget. Do not silently cut people.
4. Build the sinking fund: for each event date, months remaining from today and the monthly amount needed. Show one combined monthly figure. If the earliest event is too close to save for in full, say so and spread the rest.
5. Give cost-cutting ideas that keep meaning, tailored to the recipients (experiences or time, homemade or skill-based gifts, a family gift exchange, shared hosting, buying through the year without buying more, setting a per-person limit with family in advance), and a short script for suggesting a lower-spend arrangement to family or friends.
6. Write five rules for the season.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Show the arithmetic for every total and monthly amount; totals must add up exactly.
- Use only the people, dates and amounts given. If a date is missing, ask for it and use a clearly labelled placeholder.
- Do not suggest buy-now-pay-later, store cards or credit to fund gifts. If the plan only works with borrowing, say the list needs to shrink.
- No product, shop or brand recommendations.
- Respect the person's traditions and faith; never suggest they skip an occasion that matters to them, only cheaper ways to mark it.
- If the person says they are already behind on essential bills or in debt arrears, put those first and point to free, non-profit money advice before planning gifts.
{{> output/uncertainty}}
</constraints>

<output_format>
## Snapshot
Total planned, budget, gap or surplus, and the monthly set-aside, in four lines.

## Recipient and event budget
Table: recipient or event | date | limit | last time (if known) | notes. Totals row.

## Sinking-fund plan
Table: event | date | months left | amount | monthly set-aside. Then the combined monthly figure.

## Cut cost not meaning
Bullets tied to specific recipients, then the script for family or friends.

## Rules for the season
Five numbered rules.

## Assumptions and questions
Bullets.
</output_format>
