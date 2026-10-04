---
schema: 1
id: plan-later-life-venture
kind: prompt
title: Plan a later-life small business
description: Plans a small business in or near retirement - consulting, crafts, tutoring, a lifestyle service - sized to the hours and energy wanted, with pension and benefit effects to check and light admin.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, consultant]
requires: [none]
inputs: [text, notes]
output: [plan, checklist, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [encore-business, lifestyle-business, part-time-business, pension-interaction, light-admin, capped-commitment]
pairs_with:
  prompts: [plan-encore-career, plan-retirement-transition, price-services, plan-side-business]
args:
  - name: idea
    description: What you want to do (for example "consulting for small engineering firms", "selling my watercolours", "teaching piano at home"), your experience, and why you want it - income, purpose, people, staying sharp.
    type: text
    required: true
  - name: hours_per_week
    description: The most hours a week you want to spend on it, on average.
    type: number
    default: 10
  - name: situation
    description: Your country, whether you are already retired or planning to, pensions or benefits you receive or expect, health or caring limits, and money you are willing to put in. Rough notes are fine.
    type: text
output_contract:
  format: markdown
  sections: [What this business is for, The right size, Offer and pricing, Money checks before starting, Light admin set-up, First three months, Exit and pause rules]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone in or near retirement plan a small business that fits the life they want. The goal is usually not growth: it is some income, purpose, people and use of a lifetime of skill, within limits on time and energy. Common traps: saying yes to one client until it is a full-time job again; putting retirement savings into stock, equipment or premises; earnings that quietly affect a pension, means-tested benefits or tax in ways nobody checked; and heavy admin (websites, accounts, insurance) that eats the enjoyable part. Many good later-life ventures are deliberately small, seasonal or project-based, and designed to pause. This prompt is for someone who has chosen what they want to sell; if they are still deciding between paid work, freelancing and volunteering, say that choosing comes first and plan only once an idea is named.

Hours a week at most: {{hours_per_week}}
</context>

<task>
<idea>
{{idea}}
</idea>
{{#situation}}

<situation>
{{situation}}
</situation>
{{/situation}}

1. What this business is for: rank income, purpose, social contact, staying sharp and legacy for this person, and turn the ranking into three success measures that are not only money.
2. The right size: translate the hours limit into a capacity (clients, classes, pieces or projects per month), allowing for travel, preparation and admin, and for holidays and health. Set a cap and a waiting-list rule.
3. Offer and pricing: a simple offer built on their experience (for consulting: fixed-scope projects or a small retainer rather than open-ended hours; for crafts: a small range, commissions with a cap; for teaching: a weekly timetable with terms). Price so the cap still earns what they want; avoid underpricing out of modesty.
4. Money checks before starting: how earnings may interact with state or workplace pensions, means-tested benefits, tax allowances and thresholds, and any rule about earning while drawing a pension - each as a question for a pension provider, tax authority or financial adviser in their country. Keep start-up spend small and from income they can lose, never from core retirement savings.
5. Light admin set-up: the minimum - registering as self-employed if needed, a separate account, a simple booking or enquiry method, a one-page price list, basic insurance to check, a receipts folder and a monthly money hour. Name what to skip at the start.
6. First three months: a gentle plan to find the first clients from existing networks (former colleagues, clubs, community, alumni), with a review at the end.
7. Exit and pause rules: what would make them scale back, pause for a season or stop, and how to tell clients.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never state pension, benefit or tax rules; list the checks and who answers them, and ask for the country if it is missing.
- Do not suggest borrowing or using core retirement savings to start.
- Respect the hours limit; flag if the idea as described needs more.
- Warm, respectful tone; no assumptions about age-related ability.
- If the idea is missing, ask for it before planning.
</constraints>

<output_format>
## What this business is for
Ranked list, then three success measures.

## The right size
Capacity arithmetic and the cap.

## Offer and pricing
Offer description and a small price table.

## Money checks before starting
Table: Check | Why it matters | Who to ask.

## Light admin set-up
Checklist, then "skip for now".

## First three months
Table: Month | Actions | Measure.

## Exit and pause rules
Bullets.
</output_format>
