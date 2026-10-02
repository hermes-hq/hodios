---
schema: 1
id: run-energy-audit
kind: prompt
title: Run an energy audit
description: Maps what drains and restores energy across a typical week of work and life, finds the patterns behind feeling tired and plans a few small changes to test. Use when worn out without knowing why.
category: habits
version: 1.0.0
status: incubating
stage: [review, plan]
role: [individual, manager, founder, student]
requires: [none]
inputs: [text, notes]
output: [report, plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
level: beginner
tags: [energy-management, burnout-prevention, self-reflection, recovery, sustainable-pace]
pairs_with:
  prompts: [design-daily-routine, audit-time-use, design-habit-plan]
  personas: [productivity-coach]
args:
  - name: week_description
    description: A typical recent week in your words - work, commute, people, sleep, food, exercise, screens, chores, what you looked forward to and what you dreaded, and when you felt best and worst.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Energy map, Patterns, Drains to reduce, Sources to protect, Small changes to test, When to get it checked]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Energy is not only physical. People get drained or restored by the body (sleep, food, movement), the mind (focus, switching, decisions), emotions (conflict, worry, appreciation) and meaning (work that matters to them or not). An energy audit looks at a real week across those four sources, finds which activities, people and times of day reliably drain or restore, and tests small changes instead of a life overhaul. It is a self-reflection tool, not a health assessment.

<week>
{{week_description}}
</week>
</context>

<task>
1. If the description is too short to map (fewer than a handful of activities, or no sense of how things felt), ask four or five quick questions: sleep times and quality, the best and worst moments of the week, people who lift or flatten them, how work feels, and what they do to rest. Then stop.
2. Build an energy map: list each recurring activity, person or situation from the description, mark it as draining, neutral or restoring, give the likely source (body, mind, emotion, meaning), and note the time of day if it matters. Use the person's own words; where you infer, say so.
3. Find patterns across the map, for example: draining work clustered when energy is lowest; rest that does not restore (scrolling instead of recovery); too little time with restoring people; poor sleep driving everything else; lots of small switches; meaningful work squeezed out by admin.
4. Pick the three biggest drains you could realistically reduce and the three most important sources to protect, each with the evidence from the week.
5. Propose two or three small changes to test for one or two weeks. Each is specific (what, when, how long), costs little, and comes with a simple daily 1 to 5 energy rating to see if it helps.
</task>

<constraints>
- Do not diagnose or speculate about medical or psychological conditions. If the description mentions persistent exhaustion despite enough sleep, sudden changes in sleep or appetite, low mood most days, breathlessness, dizziness, or anything that has lasted several weeks, say clearly and early that it is worth seeing a doctor, and keep the lifestyle suggestions modest.
- If anything suggests the person may be in danger or thinking of harming themselves, stop the audit and point them to local emergency services or a crisis line.
- Small changes over big plans: nothing that needs more than 20 minutes a day to start.
- Respect constraints they cannot change (caring duties, shift work, a long commute); work around them rather than recommending they disappear.
- No judgement about their choices.
</constraints>

<output_format>
## Energy map
A table: Activity or situation | Drains, neutral or restores | Source | When | Note.
## Patterns
Three to five bullets, each with evidence.
## Drains to reduce
Three, each with one idea to reduce, shorten, move or batch it.
## Sources to protect
Three, each with how to keep them in the week.
## Small changes to test
Numbered, with what, when, for how long and how to measure.
## When to get it checked
One or two sentences on signs that mean seeing a doctor. If any such sign is already in the description, move this section to the top.
</output_format>
