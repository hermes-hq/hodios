---
schema: 1
id: design-recognition-program
kind: prompt
title: Design an employee recognition programme
description: Designs an employee recognition programme with what is recognised and how, peer and manager channels, fair criteria, a budget, guardrails against favouritism and a way to measure whether it works.
category: hr-operations
version: 1.0.0
status: incubating
stage: [design]
role: [operations-manager, manager, founder, executive]
requires: [none]
inputs: [text]
output: [plan, table, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [employee-recognition, peer-recognition, awards, company-values, retention]
pairs_with:
  prompts: [design-engagement-survey, design-benefits-package]
args:
  - name: organisation
    description: Size, how people work (office, remote, shifts, frontline), countries, company values, and what prompted this (for example survey scores on recognition, attrition).
    type: text
    required: true
  - name: budget
    description: Budget per year or per head and currency, or "none". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Goals, What we recognise, Channels, Rules and fairness, Budget, Launch and measurement, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Recognition works when it is specific, timely and frequent, and fails when it becomes a popularity contest or a box-ticking ritual. Research and practice agree on a few things: specific thanks for a described behaviour matter more than prize value; peer recognition reaches work managers do not see; monthly "employee of the month" awards often demotivate everyone who did not win and favour visible roles over back-office and frontline work; cash and gift rewards can be taxable depending on the country; and shift, remote and frontline staff are routinely left out of programmes designed in an office. A programme needs rules for eligibility, nomination and selection, a check that recognition is spread fairly across teams and groups, and a way to see whether it is used.

<organisation>
{{organisation}}
</organisation>
{{#budget}}Budget: {{budget}}{{/budget}}
</context>

<task>
1. Goals: what the programme should change and how you will know, tied to what prompted it.
2. What we recognise: behaviours linked to the stated values, with concrete examples per role type, including less visible work.
3. Channels: everyday recognition (peer thanks, manager notes), moments that matter (service anniversaries, project completions) and any formal awards, with who gives, how often and where it appears. Make each channel work for remote, shift and frontline staff.
4. Rules and fairness: eligibility, nomination and selection for any award (criteria, a panel, rotating judges), limits to avoid the same people winning, and a quarterly check of distribution by team and, where lawful and available, by group.
5. Budget: how the budget splits across channels, with a no-budget version. Flag that tax treatment of gifts and awards must be confirmed locally.
6. Launch and measurement: who launches it, how managers are briefed, the first 90 days, and measures (usage, spread across teams, recognition survey item) with a review date.
7. Questions that need a decision.
</task>

<constraints>
- Do not invent tax rules or thresholds; flag them to confirm.
- Avoid designs that rank individuals publicly against each other unless the user asks, and then note the downsides.
- Keep it proportionate to the organisation's size.
{{> output/uncertainty}}
</constraints>

<output_format>
## Goals
## What we recognise
## Channels
Table: Channel | Who gives | How often | Where it shows | Works for remote and shift staff by.
## Rules and fairness
## Budget
## Launch and measurement
## Questions
</output_format>
