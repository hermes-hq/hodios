---
schema: 1
id: scope-solo-side-project
kind: prompt
title: Scope a solo side project
description: Cuts a solo developer's app idea down to a version they can finish, with the one core loop, what to fake or buy, a week-by-week plan for limited hours and a cut list. Use before starting.
category: planning
version: 1.0.0
status: incubating
stage: [plan]
role: [software-engineer, founder, individual]
requires: [none]
inputs: [text]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [mvp, scope-cutting, indie-hacking, timeboxing]
pairs_with:
  prompts: [break-down-epic, estimate-with-ranges]
args:
  - name: idea
    description: The app idea in your own words, who it is for, the features you imagine, the stack you plan to use, and what "done" means to you (launch publicly, use it yourself, show it to friends, first paying user).
    type: text
    required: true
  - name: hours_per_week
    description: Realistic hours per week you can spend, after work, family and rest.
    type: number
    required: true
  - name: weeks
    description: How many weeks you want to give it before shipping something.
    type: number
    default: 8
output_contract:
  format: markdown
  sections: [The core loop, Version one, Fake, buy or skip, Week by week, Cut list, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a solo developer finish a side project. Side projects die for familiar reasons: the scope is a startup's roadmap, weeks go into auth, settings, admin panels and infrastructure before the core idea works, a new stack is learned at the same time as the product is built, and evenings are planned as if they were full focused days. A finished small thing beats an unfinished big one, and the fastest way to test an idea is a core loop someone can use.

Time: {{hours_per_week}} hours a week for {{weeks}} weeks.
</context>

<task>
<idea>
{{idea}}
</idea>

1. Compute the real budget: hours per week times weeks, then take about 60% as building time (evenings lose time to context switching, setup and life). State the number.
2. Name the core loop in one sentence: the single action a user repeats that delivers the value (for example "log a climb and see progress this month"). Everything else is secondary.
3. Define version one as the smallest thing that runs the loop end to end for the person who matters ("done" as they defined it). If done is unclear, use "a stranger can use the core loop without help".
4. For every other feature, decide: fake it (hard-coded data, manual work behind the scenes, a spreadsheet as admin panel), buy or borrow it (hosted auth, payments, a template or UI kit, managed database), defer it, or drop it. Auth, accounts, settings, notifications, admin and multi-platform are the usual suspects.
5. Check the stack: if more than one major part is new to them, recommend using what they know for version one, unless learning is the main goal.
6. Plan week by week inside the budget: week one ends with a deployed skeleton that does nothing useful but is live; the core loop works by the midpoint; the last week is polish and shipping only, with no new features. Each week has one goal and a "done when" check.
7. Write a cut list: features ranked by what to drop first when a week slips, and a rule (for example "if two weeks slip, ship with the first three cuts").
</task>

<constraints>
- Fit the plan to the computed building time; never stretch hours to fit the idea. If version one still does not fit, say so and cut further or suggest a longer runway.
- Do not invent user numbers, market sizes or revenue; this is about finishing, not forecasting.
- Name services only as examples of a category (hosted auth, managed Postgres); do not claim prices.
- If the idea or what "done" means is too vague to find a core loop, ask up to three questions and stop.
- Be encouraging and candid; cutting scope is a skill, not a failure.
</constraints>

<output_format>
## The core loop
One sentence, then the building-time budget with arithmetic.

## Version one
What it does, for whom, and the "done" definition, in under 120 words.

## Fake, buy or skip
Table: feature | decision (fake, buy, defer, drop) | how.

## Week by week
Table: week | goal | done when | hours.

## Cut list
Numbered list, first to cut at the top, plus the slip rule.

## Questions
Bullets, or "None".
</output_format>
