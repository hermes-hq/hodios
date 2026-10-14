---
schema: 1
id: budget-for-wedding-season
kind: prompt
title: Budget for attending weddings and celebrations
description: Budgets a year of other people's weddings, stag and hen events and milestone parties - travel, outfits, gifts and time off - with what to decline, a savings plan and kind ways to say no.
category: budgeting
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text, preferences]
output: [table, plan, message]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [wedding-guest, celebrations, social-spending, saying-no]
pairs_with:
  prompts: [set-up-sinking-funds, budget-for-holidays-and-gifts, plan-savings-goal]
  personas: [personal-finance-coach]
args:
  - name: invitations
    description: The weddings, pre-wedding trips and big parties coming up, with dates, locations, your role (guest, bridesmaid, best man, organiser) and anything already paid.
    type: text
    required: true
  - name: budget_room
    description: How much you could put aside each month, or a total you can afford for the year, and any savings you could use. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Cost of each event, The year in total, Where to save, Saying no or saying less, Savings plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Being a guest can cost more than people expect, especially in the years when many friends marry at once. The headline gift is rarely the biggest cost; it is travel and accommodation, pre-wedding trips (often the most expensive single item, especially abroad), outfits and alterations, being in the wedding party (dresses, suits, organising costs), childcare, time off work, and the evening drinks. Costs and gift norms vary widely by culture and country: in some traditions cash gifts are expected and sized to cover the guest's place, in others a modest registry gift is normal. People who budget well decide per event what matters most to them (closeness of the friend, the role) and choose where to go full, go partial (ceremony only, skip the pre-wedding trip, travel day-of) or decline warmly.

<invitations>
{{invitations}}
</invitations>
{{#budget_room}}Budget room: {{budget_room}}{{/budget_room}}
</context>

<task>
1. Cost of each event: break each one into travel, accommodation, outfit, gift, pre-wedding events, wedding-party costs and extras. Use any figures given; otherwise leave the line as a question or a clearly labelled assumption the person should replace. Ask about gift norms in their culture if not stated rather than assuming one.
2. The year in total: a table by month showing when money goes out (deposits for trips and hotels often fall months before the wedding).
3. Where to save: for each event, the two or three biggest levers (book travel early, share accommodation, rewear or hire outfits, skip or shorten the pre-wedding trip, a smaller or shared gift).
4. Saying no or saying less: help them rank events by closeness and role, then draft two short, warm messages: one declining a pre-wedding trip and one declining a wedding while sending good wishes.
5. Savings plan: monthly amounts to cover the remaining total by each due date, compared with the budget room. If it does not fit, show which choices close the gap.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent prices for flights, hotels or venues; use their figures or labelled placeholders.
- Respect cultural gift expectations; do not tell them their tradition is wrong.
- Do not suggest putting celebrations on credit as the plan.
{{> output/uncertainty}}
</constraints>

<output_format>
## Cost of each event
One table per event: item | amount | note.

## The year in total
Table: month | event | payment | running total.

## Where to save
Bullets per event.

## Saying no or saying less
Ranking, then two short messages.

## Savings plan
Table: month | set aside | covers.
</output_format>
