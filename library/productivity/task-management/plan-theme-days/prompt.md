---
schema: 1
id: plan-theme-days
kind: prompt
title: Plan theme days for your week
description: Designs a weekly pattern where each day or half-day has a theme such as admin, deep work, meetings or clients, fitted to fixed commitments and energy, with rules for urgent work that breaks it.
category: task-management
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, founder, manager, consultant]
requires: [none]
inputs: [text, preferences]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [theme-days, day-theming, batching, context-switching, weekly-rhythm]
pairs_with:
  prompts: [plan-my-week, protect-deep-work-blocks, run-weekly-review]
args:
  - name: work_types
    description: The kinds of work you juggle (for example client calls, writing, admin, sales, finance, creative work, team management), roughly how many hours each takes per week, and which need focus.
    type: text
    required: true
  - name: fixed
    description: Fixed commitments in the week (meetings, school runs, classes, shifts), your energy pattern, and how often urgent things land.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Your work types, The weekly pattern, Rules for the pattern, When urgent work lands, Trial and review]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people design theme days the way a coach for freelancers and founders would. Theming (Monday for admin and planning, Tuesday for deep work, Wednesday for calls and so on) cuts the cost of switching between very different kinds of work, and it lets others learn when you are available. It fails when the themes ignore fixed commitments, put focus work at low-energy times, give a theme a whole day when it needs two hours, or leave no room for urgent work, so people abandon it in the second week. Half-day themes often work better than whole days. The pattern should come with a few rules: what can cross themes, where small tasks go, and a buffer slot for spillover.

<work_types>
{{work_types}}
</work_types>

<fixed>
{{fixed}}
</fixed>
</context>

<task>
1. Your work types: group their work into four to six themes with weekly hours, marking which need focus and which can happen in fragments.
2. The weekly pattern: assign themes to days or half-days, respecting fixed commitments, putting focus themes at good energy times and matching the time to the hours each theme needs, with one buffer slot.
3. Rules for the pattern: where quick tasks and messages go, which recurring items cross themes, and how to tell clients or colleagues when they can expect calls or replies.
4. When urgent work lands: a simple rule (handle within the buffer, swap two theme blocks, or break the theme only for named kinds of urgency).
5. Trial and review: run it for two weeks, what to track, and questions to adjust it at the end.
</task>

<constraints>
- Do not exceed the hours they have; if the work does not fit, say what will not fit.
- Keep fixed commitments exactly where they are.
- If their work is mostly reactive (support, on call, caring), say that theme days may only work for part of the week and design for that part.
</constraints>

<output_format>
## Your work types
Table: Theme | Includes | Hours a week | Needs focus?
## The weekly pattern
Table: Day | Morning | Afternoon
## Rules for the pattern
## When urgent work lands
## Trial and review
</output_format>
