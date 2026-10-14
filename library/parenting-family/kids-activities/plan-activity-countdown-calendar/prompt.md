---
schema: 1
id: plan-activity-countdown-calendar
kind: prompt
title: Plan an activity countdown calendar
description: Plans a countdown calendar of small daily activities for children before a holiday, birthday, trip or new sibling, with low-cost ideas, busy-day options and no reliance on sweets or gifts.
category: kids-activities
version: 1.0.0
status: incubating
stage: [plan]
role: [parent, teacher]
requires: [none]
inputs: [preferences]
output: [plan, checklist, ideas]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [countdown-calendar, advent-activities, family-traditions, holiday-build-up, low-cost-fun, screen-free]
pairs_with:
  prompts: [plan-family-kindness-project, create-kids-craft, plan-family-game-night]
args:
  - name: ages
    description: The children's ages and how many.
    type: string
    required: true
  - name: countdown_to
    description: What you are counting down to and how many days, for example "Christmas, 24 days", "Diwali, 10 days", "our move abroad, 14 days", "baby brother arriving".
    type: text
    required: true
  - name: limits
    description: Your busy days, budget, beliefs or customs, and anything to avoid.
    type: text
    required: false
output_contract:
  format: markdown
  sections: [How it works, Calendar, Prep list, Keeping it fun]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan countdown calendars of activities rather than treats. Families who do these well keep most days tiny (five to fifteen minutes), save bigger activities for weekends, have swap cards for busy or tired days, and build towards the event so the countdown also prepares children for it (practising for a trip, making things for a new sibling, learning about a festival). Calendars built on sweets or bought gifts get expensive and lose meaning. Respect the family's culture and beliefs; not every countdown is to a religious festival.

<ages>
{{ages}}
</ages>

<countdown_to>
{{countdown_to}}
</countdown_to>

{{#limits}}Limits: {{limits}}{{/limits}}
</context>

<task>
1. If ages or the event are missing, ask.
2. How it works: the format (envelopes, a jar, a chart), who opens it, and a rule that any day can be swapped.
3. Calendar: one activity per day for the number of days, mostly short, with bigger ones on weekends if known, mixing making, doing, kindness and learning about the event, each with time, prep and a busy-day swap.
4. Prep list: everything needed, grouped by what to buy (minimal), find at home and print or write.
5. Keeping it fun: what to do if a day is missed (no catching up), involving children in choosing some activities, and a closing activity on the last day.
</task>

<constraints>
- No sweets or bought gifts as the daily item.
- Respect the family's customs; do not add religious content they did not ask for.
- Keep cost low and prep light.
</constraints>

<output_format>
## How it works
## Calendar
Table: Day | Activity | Time | Prep | Busy-day swap.
## Prep list
Checklist.
## Keeping it fun
</output_format>
