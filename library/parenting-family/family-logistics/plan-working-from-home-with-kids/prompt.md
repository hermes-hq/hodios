---
schema: 1
id: plan-working-from-home-with-kids
kind: prompt
title: Plan working from home with kids around
description: Plans a workable day for one or two parents working from home with children in the house, with a shared schedule, focus blocks, meeting cover, signals and realistic expectations by age.
category: family-logistics
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [text, preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [remote-work, home-office, focus-time, video-calls, school-holidays, working-parents]
pairs_with:
  prompts: [map-school-holiday-cover, coordinate-family-calendar, plan-rainy-day-activities]
args:
  - name: adults
    description: Each adult working at home, their hours, fixed meetings, and how flexible their work is.
    type: text
    required: true
  - name: children
    description: Children's ages and when they are home, for example "home every afternoon from 3.30; all day in holidays; 2-year-old home Mondays".
    type: text
    required: true
  - name: space
    description: Rooms or spaces available for work and play, for example "one spare room, a kitchen table". Optional.
    type: string
output_contract:
  format: markdown
  sections: [What is realistic, The shared day, Meeting and focus cover, Signals and house rules, Activities that buy time, Talking to work, When it is not working]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help parents who work from home while children are in the house: after school, in holidays, on sick days, or when a parent's work is remote and childcare is partial. The first truth experienced parents learn is that working from home is not childcare: a baby or toddler needs an adult's full attention, so with young children at home one adult works while another cares, or work happens during naps and after bedtime. Older children can play or study alongside work, with clear signals and predictable check-ins. What helps most: a shared timetable for two working adults that hands off care in blocks, protecting each person's most important meetings and focus time, and being honest with employers about availability.

<adults>
{{adults}}
</adults>
<children>
{{children}}
</children>
{{#space}}Space: {{space}}{{/space}}
</context>

<task>
1. What is realistic: by each child's age, how much focused work is realistic while they are home and awake, and where real childcare is needed. Say clearly if the plan needs extra childcare.
2. The shared day: a time-blocked schedule for a typical day showing which adult is on care and which is working, handovers, the children's activities, meals and breaks. If only one adult works from home, use naps, school hours, quiet times and evenings.
3. Meeting and focus cover: map each adult's fixed meetings and the work that needs deep focus to blocks where the other adult or an activity covers the children, and flag clashes.
4. Signals and house rules: simple signals for "in a meeting" and "can interrupt", what counts as an emergency, check-ins at set times, and where each person works.
5. Activities that buy time: a short list of independent activities by age for the hardest blocks, prepared in advance, without relying only on screens (screens are fine as a deliberate tool for a key meeting).
6. Talking to work: a short message to a manager or team describing the arrangement, core hours and when the parent is reachable, without over-apologising.
7. When it is not working: signs the arrangement needs to change (constant overrun into evenings, children unsupervised, exhaustion) and options such as part-time childcare, shifted hours or leave.
</task>

<constraints>
- Never plan for a baby or toddler to be left unsupervised while a parent works.
- Do not promise productivity the ages make impossible; be honest.
- Do not state employment rights; if relevant, suggest checking flexible working or parental leave options locally.
- Keep both adults' work and care time visibly fair.
</constraints>

<output_format>
## What is realistic
## The shared day
Table: Time | Adult 1 | Adult 2 | Children.
## Meeting and focus cover
## Signals and house rules
## Activities that buy time
Grouped by age.
## Talking to work
Message in a code block.
## When it is not working
</output_format>
