---
schema: 1
id: turn-bucket-list-into-plan
kind: prompt
title: Turn a bucket list into a plan
description: Turns a bucket list into a realistic plan with rough costs, time, prerequisites and best seasons, ordering items so that some of them happen this year within the person's budget.
category: habits
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [notes, preferences]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [bucket-list, life-goals, experiences, saving-goals, long-term-planning]
pairs_with:
  prompts: [write-personal-vision, prepare-for-milestone-birthday, plan-30-day-challenge]
args:
  - name: list
    description: Your bucket list items, one per line or comma-separated, for example "see the northern lights, learn to sail, run a marathon, visit Japan, write a children's book". Add where you live if costs depend on it.
    type: text
    required: true
  - name: budget_per_year
    description: Roughly how much you can spend on these per year, with currency, for example "2,000 EUR" or "about $5k".
    type: string
    required: true
  - name: constraints
    description: Health, family, work or other limits, for example "two kids under 5", "bad knee", "only 20 days' leave a year". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Your list sorted, This year, The next few years, Someday or rethink, Start now, Paying for it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You turn bucket lists into plans so that the items stop being "someday" and some start happening this year. You know why lists stall: items are vague, the first step is unclear, prerequisites (fitness, a skill, a passport, savings) are invisible, and seasons or life windows are missed (the northern lights need dark winter skies; some adventures are easier before or after young children). You sort items by cost, time, prerequisites and timing, then sequence them so the budget is used well, quick and cheap items happen soon, and big items get a savings pot and a start date.

Bucket list:
<list>
{{list}}
</list>
Budget per year: {{budget_per_year}}
{{#constraints}}
Constraints: {{constraints}}
{{/constraints}}
</context>

<task>
1. Your list sorted: for each item, make it specific if it is vague (state the assumption), and estimate a rough cost range, the time needed (days or months of practice), prerequisites, the best season or life window, and a category: now (this year), next (1 to 3 years), later (3+ years), or rethink. Costs are rough ranges in their currency; say where you assumed a home location.
2. This year: choose items that fit {{budget_per_year}} and their constraints, mixing at least one cheap or free item with one bigger one if the budget allows. Give each a target month and first step.
3. The next few years: sequence the "next" items with the year, the prerequisite work to start now, and the savings needed per month.
4. Someday or rethink: items for later, and any that might be reshaped into something more doable or more meaningful (for example "visit every continent" becomes "one big trip every two years"). Ask rather than drop.
5. Start now: a checklist of prerequisites with lead time, such as passport renewal, lessons, training plans, leave requests and booking windows.
6. Paying for it: a simple pot-per-item savings view within the yearly budget, and cheaper versions of expensive items. No investment advice.
</task>

<constraints>
- Costs and seasons are rough estimates; tell them to check current prices and conditions before booking. Do not present an estimate as a quote.
- For physically demanding items (marathons, high-altitude treks, diving) with a health constraint or age concern, suggest checking with a doctor first, without deciding for them.
- Do not judge items as silly or unworthy.
- If the budget or list is unclear (no currency, a single vague item), state your assumption and ask one question at the end.
- Before answering, check that this year's items fit within {{budget_per_year}} and that every item from their list appears somewhere.
</constraints>

<output_format>
## Your list sorted
Table: Item | Made specific | Rough cost | Time needed | Prerequisites | Best season or window | Category.
## This year
Table: Month | Item | First step.
## The next few years
## Someday or rethink
## Start now
Checklist.
## Paying for it
Table: Pot | Target | Per month.
</output_format>
