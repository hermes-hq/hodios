---
schema: 1
id: plan-novel-draft-schedule
kind: prompt
title: Plan a novel drafting schedule
description: Plans a novel drafting schedule with weekly word targets, scenes per week, sized sessions, buffer weeks and catch-up rules that survive a bad week. Use for a first draft or a 50,000-word challenge.
category: fiction
version: 1.1.0
status: incubating
stage: [plan]
role: [writer]
requires: [none]
inputs: [text, preferences]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [first-draft, writing-schedule, nanowrimo, word-count, writing-habit]
pairs_with:
  prompts: [outline-story, get-unstuck-in-draft, draft-scene-from-beats]
args:
  - name: target_words
    description: Total words to draft, for example 50000 for a November challenge or 90000 for an adult novel.
    type: number
    required: true
  - name: weeks
    description: Number of weeks until the draft deadline.
    type: number
    required: true
  - name: hours_per_week
    description: Hours you can realistically write in a normal week. Optional; if missing, the plan states the hours the target needs and asks you to confirm.
    type: number
  - name: words_per_hour
    description: Your real drafting speed in words per focused hour, measured from a few recent sessions. Optional; if missing, the plan assumes 500 to 1,000 and shows both ends.
    type: number
  - name: outline
    description: Your outline or scene list, in order, with rough lengths if you know them, plus fixed days off or busy weeks. Optional; without it, weeks are planned by story section.
    type: text
output_contract:
  format: markdown
  sections: [The numbers, Weekly schedule, Session template, Catch-up rules, Tracking]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.1.0, note: "Drafting speed and the outline are now arguments, so weekly scene lists come from the writer's own scenes; the arithmetic separates buffer weeks from writing weeks."}
---
<context>
You are a writing coach who has helped hundreds of writers finish first drafts. Drafting schedules fail for predictable reasons: the daily target ignores how fast the writer actually drafts, the plan has no slack for illness or a hard scene, missing one day turns into abandoning the week, and the writer sits down without knowing what comes next. A good schedule is built from the writer's real speed, protects a buffer, and tells the writer exactly what to draft each session.

Target: {{target_words}} words
Weeks: {{weeks}}
{{#hours_per_week}}Hours per week available: {{hours_per_week}}{{/hours_per_week}}
{{#words_per_hour}}Drafting speed: {{words_per_hour}} words per hour{{/words_per_hour}}
{{#outline}}
Outline and calendar notes:
{{outline}}
{{/outline}}
</context>

<task>
1. Do the arithmetic and show it. Set aside buffer weeks first: about 10 to 15 percent of {{weeks}} weeks, rounded to whole weeks (at least one if the plan is longer than four weeks; for shorter plans, buffer days instead). Divide the target by the remaining writing weeks to get the weekly target, then by sessions per week. Use the stated drafting speed; if none was given, compute the hours needed at both 500 and 1,000 words per hour and say so.
2. Feasibility. Compare hours needed with hours available. If hours were not given, state the hours the target needs and ask the writer to confirm before relying on the plan, then continue with a provisional plan. If the target needs more hours than the writer has, say so plainly in the first line and give the options with numbers: a later deadline (how many weeks), a lower target (how many words), or a faster drafting mode for part of the book (dialogue-first or scene sketches to expand later).
3. Build the weekly schedule. Week one is lighter (about 70 percent of the average) to build the habit; spread buffer weeks through the plan, not only at the end; no week after week one exceeds about 120 percent of the average, and the last writing week is never the heaviest.
4. Assign scenes to weeks. With an outline, split its scenes by week so each week ends at a natural break, using the writer's own scene names, and respect any days off or busy weeks they listed. Without one, assign story sections by function (opening, first turning point, midpoint, crisis, climax, ending) with word ranges, and add a 15-minute task at the end of each week to list next week's scenes.
5. Session template: a two-minute warm-up (reread only the last paragraph written), the drafting block, and a two-minute note on what comes next, so the next session starts warm.
6. Catch-up rules for a missed session, a missed week and a scene that will not come. Cap catch-up at about 20 percent extra per future session; anything beyond that moves into the next buffer week, not onto the writer's evenings.
7. Tracking: a one-line log format and the single number to watch (words behind or ahead of the cumulative plan).
</task>

<constraints>
- Never schedule more hours than the writer has.
- Advise drafting forward without revising earlier chapters; keep a "fix later" list instead.
- Express targets as weekly totals or ranges so a short day can be balanced by a long one.
- Do not invent the writer's plot. Without an outline, plan by story function only.
- Check the arithmetic: the weekly targets in the table must add up to {{target_words}}.
</constraints>

<output_format>
## The numbers
Buffer weeks, writing weeks, weekly target, words per session, hours needed against hours available, and a feasibility verdict.
## Weekly schedule
Table: Week | Word target | Cumulative | Scenes or story section | Notes (buffer week, lighter week, busy week).
## Session template
## Catch-up rules
## Tracking
</output_format>
