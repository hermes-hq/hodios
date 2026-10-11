---
schema: 1
id: plan-holiday-season-prep
kind: prompt
title: Plan the holiday season run-up
description: Spreads the run-up to a major holiday season - gifts, cards, travel, hosting, food and budget - across the weeks before it, with order-by dates and rest days, so the last week is not a scramble.
category: task-management
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [holiday-season, festive-season, hosting, seasonal-planning, family-events, countdown]
pairs_with:
  prompts: [plan-holiday-feast-schedule, keep-habits-through-disruption, plan-my-week]
args:
  - name: holiday
    description: Which holiday or season and its key dates (for example "Christmas, hosting 25th, travelling 28th-31st", "Eid al-Fitr", "Lunar New Year", "Hanukkah and New Year").
    type: string
    required: true
  - name: plans
    description: What you want to do - gifts and for how many people, cards, travel, events you host or attend, decorations, food, school or work events.
    type: text
    required: true
  - name: limits
    description: Budget, weeks until the holiday, work schedule, and who shares the jobs. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Fit check, Key deadlines, Week-by-week plan, Who does what, Budget split, What to let go]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people plan a busy holiday season so it is enjoyable rather than a sprint. The run-up goes wrong in predictable ways: the gift list is started too late for delivery cut-offs, travel is booked when prices have risen, the host does every job alone, the last week before the holiday also holds work deadlines and school events, and spending is tracked only after it happens. Good planning sets the hard dates first (postal and delivery cut-offs, booking windows, the day guests arrive), spreads the rest evenly, assigns jobs to other people early, and decides up front what the household will skip this year. Traditions differ widely, so you work from the holiday and customs the user names and do not assume any one culture.

Holiday and dates: {{holiday}}

Plans:
<plans>
{{plans}}
</plans>
{{#limits}}Limits: {{limits}}{{/limits}}
</context>

<task>
1. Fit check: estimate the hours and money the plans need against the weeks left and the budget. Say plainly if it does not fit.
2. List the hard deadlines working backwards from the holiday: travel booking, gift ordering with a delivery buffer, card or parcel posting (marked "check your carrier's cut-off date"), food orders, guest confirmations, any work or school events.
3. Build a week-by-week plan from now to the holiday, with no more than a few hours of holiday jobs on a normal week and a lighter final week; include at least one evening a week with no holiday tasks.
4. Assign jobs to the people the user named, and suggest which jobs to share with guests (bring a dish, arrive early to help).
5. Split the budget by category with a small buffer, and give one simple way to track spending as it happens.
6. List what to let go or simplify this year, and the one or two things that matter most to keep.
</task>

<constraints>
- Do not state specific postal or shipping cut-off dates or prices; tell the user to check them and plan with a buffer.
- Respect the user's traditions and wording for the holiday; do not add customs they did not mention.
- Stay within the budget given; if none is given, ask for it or present the split as percentages.
- If the user is hosting and travelling close together, flag the recovery time between them.
- Keep tasks small enough to do in an evening or a weekend block.
</constraints>

<output_format>
## Fit check
Two to four sentences with rough hours and money.

## Key deadlines
Table: Date | Deadline | Note.

## Week-by-week plan
One heading per week, bullets.

## Who does what
Table: Job | Person | By when.

## Budget split
Table: Category | Amount or percentage | Note.

## What to let go
Bullets, then the keepers.
</output_format>
