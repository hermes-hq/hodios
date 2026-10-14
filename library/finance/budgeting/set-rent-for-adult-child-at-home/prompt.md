---
schema: 1
id: set-rent-for-adult-child-at-home
kind: prompt
title: Set rent for an adult child at home
description: Sets a fair monthly contribution for an adult child living at home from real household costs and their income, with options to save part of it for them and how to agree it.
category: budgeting
version: 1.0.0
status: incubating
stage: [plan]
role: [parent, individual]
requires: [none]
inputs: [text]
output: [plan, table, message]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [board-and-lodging, household-costs, family-money, young-adults]
pairs_with:
  prompts: [plan-supporting-family-financially, plan-first-job-finances, split-shared-expenses]
  personas: [personal-finance-coach]
args:
  - name: household
    description: Household costs (housing, energy, water, internet, food, local taxes), how many people live there, and how much tighter money got when the young adult stayed or moved back.
    type: text
    required: true
  - name: young_adult
    description: Their age, take-home income and how regular it is, debts, what they are saving for (deposit, car, study), and what they already pay for themselves.
    type: text
    required: true
  - name: aim
    description: "Optional: what you want the arrangement to do - cover real costs, prepare them for paying rent, help them save for a deposit, or a mix."
    type: text
output_contract:
  format: markdown
  sections: [What they add to costs, Three ways to set the amount, Suggested range, Saving part of it for them, The agreement, How to raise it, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a family agree what an adult child living at home should pay. There is no single right figure; families usually combine three anchors. The real extra cost: what the young adult adds to food, energy, water and other bills (housing itself usually costs no more, unless a room could otherwise be let). A share of their income: a modest percentage of take-home pay that rises with income and teaches the habit of paying for housing. The market ceiling: what a room locally would cost, which the contribution should normally sit well below. Many parents put part of the money aside and give it back towards a deposit, either openly as a joint goal or as a later surprise. Two less obvious points: in some countries a non-dependent adult in the home can reduce the parents' means-tested housing support or single-person discounts, and payments between family members for board are usually treated differently for tax from letting a room; both are worth checking locally.
</context>

<task>
Household:

<household>
{{household}}
</household>

The young adult:

<young_adult>
{{young_adult}}
</young_adult>

{{#aim}}
What the family wants:

<aim>
{{aim}}
</aim>

{{/aim}}
1. Estimate what the young adult adds to household costs: their share of food and variable bills, by a stated method (per-person share, or the difference since they moved back). Mark estimates as placeholders where figures are missing.
2. Set out three ways to set the amount, each with a figure: cost share, a percentage of their take-home (show a low, middle and high percentage, labelled as common ranges rather than rules), and the local room-rent ceiling as a question the family answers.
3. Suggest a range that fits the family's aim and the young adult's budget, and check it against their income: after the contribution, can they still cover their own costs, debts and a savings goal? Show the arithmetic.
4. If the aim includes helping them save, show options: the parents save a stated share and return it on moving out, or the young adult saves a set amount on top under an agreed plan. Show what each builds up to after 12 and 24 months.
5. Draft the agreement in plain words: amount, payment day (ideally their payday, by automatic transfer), what it covers, what is extra (their phone, car, takeaways), chores, how and when it will be reviewed, and what happens if income drops or stops.
6. Write a short, warm opening the parent can use to raise it, framed as a step towards independence rather than a punishment.
7. List checks: whether a non-dependent adult affects any household benefit, discount or allowance, and how the arrangement is treated for tax locally.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the figures given; label every estimate. Do not invent local rent levels.
- Present percentages as commonly used ranges, not rules or legal requirements.
- Do not take sides in a family conflict; keep the tone fair to both.
- If the young adult cannot cover basics after a contribution, say so and suggest a lower or stepped amount.
- If the input mentions abuse, coercion or financial control, say that support services exist and do not design a payment plan around it.
{{> output/uncertainty}}
</constraints>

<output_format>
## What they add to costs
Table: cost | extra per month | method.

## Three ways to set the amount
Table: method | monthly figure | notes.

## Suggested range
The range with the reasoning and a check against their budget.

## Saving part of it for them
Bullets with 12 and 24 month totals.

## The agreement
A short plain-language agreement.

## How to raise it
A short script the parent can adapt.

## Questions
Bullets, including the benefit and tax checks.
</output_format>
