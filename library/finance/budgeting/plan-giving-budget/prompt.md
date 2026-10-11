---
schema: 1
id: plan-giving-budget
kind: prompt
title: Plan a yearly giving budget
description: Sets a yearly budget for charitable and religious giving that fits the household budget, with a split between causes, a monthly schedule and the tax relief questions to check.
category: budgeting
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text, preferences]
output: [plan, table, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [charitable-giving, tithing, donations, values-based-spending]
pairs_with:
  prompts: [build-monthly-budget, set-up-sinking-funds, plan-windfall]
  personas: [personal-finance-coach]
args:
  - name: values
    description: The causes, communities or religious commitments you want to support, and any giving you already do (regular donations, tithe, zakat, sponsorships, ad hoc appeals).
    type: text
    required: true
  - name: money_picture
    description: Take-home income, main commitments and any debts or savings goals, plus the country so tax relief can be framed as questions. Optional.
    type: text
output_contract:
  format: markdown
  sections: [How much fits, How to split it, Schedule, Saying no to the rest, Tax and records to check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
People who give regularly tend to feel better about it, and about money in general, when giving is planned rather than reactive. Without a plan, giving happens through guilt at the door, street appeals and social media fundraisers, and it either stretches the budget or gets cut first in a hard month. A giving budget sets a yearly amount (as a percentage of income, a fixed sum, or a religious obligation such as a tithe or zakat calculated by its own rules), splits it between planned regular gifts and a small pot for spontaneous appeals, and records gifts for any tax relief or matching schemes. Regular gifts help charities plan more than one-off gifts of the same size. Giving time or skills can sit alongside money.

<values>
{{values}}
</values>
{{#money_picture}}Money picture: {{money_picture}}{{/money_picture}}
</context>

<task>
1. How much fits: offer two or three levels (for example a percentage of take-home, a fixed monthly amount, or their stated commitment) with the yearly total, and check each against their commitments. If there is expensive debt or no emergency buffer, say how some people phase giving up while protecting essentials, without telling them to give less than their faith or values require.
2. How to split it: between their causes, regular versus one-off, and a small "responsive" pot for appeals and friends' fundraisers.
3. Schedule: monthly or payday amounts, and any timing for religious or seasonal giving.
4. Saying no to the rest: a short, kind line for door-step, phone and online asks that fall outside the plan.
5. Tax and records to check: questions about tax relief or deduction on donations, gift declarations, employer matching or payroll giving in their country, and a simple record to keep. Phrase as things to confirm, not rules.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Respect religious and cultural obligations; for calculations such as zakat, explain that rules vary by school and suggest checking with their religious authority rather than ruling on it.
- Do not recommend specific charities or rank causes; you can suggest how to check a charity is registered and how it reports its spending.
- Do not state tax rules as fact; frame as questions for the country.
{{> output/uncertainty}}
</constraints>

<output_format>
## How much fits
Table: level | monthly | yearly | fit with budget.

## How to split it
Table: cause | amount | regular or one-off.

## Schedule
Bullets.

## Saying no to the rest
One or two lines.

## Tax and records to check
Bulleted questions and a record template.
</output_format>
