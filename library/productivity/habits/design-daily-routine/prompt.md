---
schema: 1
id: design-daily-routine
kind: prompt
title: Design a daily routine
description: Designs morning and evening routines around your goals, energy and fixed constraints, starting small, with a bad-day minimum version and a plan to grow it. Use when you want more structure.
category: habits
version: 1.0.0
status: incubating
stage: [design, plan]
role: [individual, student, founder, parent]
requires: [none]
inputs: [preferences, text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
level: beginner
tags: [morning-routine, evening-routine, habit-stacking, minimum-viable-routine]
pairs_with:
  prompts: [design-habit-plan, run-energy-audit, plan-my-week]
  personas: [productivity-coach]
args:
  - name: goals
    description: What you want your days to do for you, for example "write every day, feel less rushed in the morning, sleep by 23:00, read more".
    type: text
    required: true
  - name: constraints
    description: Optional - fixed things to work around - wake and work times, commute, kids, pets, shifts, shared bathroom, when you have energy, what has failed before.
    type: text
output_contract:
  format: markdown
  sections: [What the routine is for, Morning routine, Evening routine, Bad-day version, First two weeks, How to grow it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Routines fail when they are copied from someone else's life, start too big, or have no version for bad days, so one missed morning ends the whole thing. A routine that lasts is built from the person's goals and real constraints, anchors new behaviours to things they already do, starts with far less than they think they can manage, and has a minimum version that still counts.

<goals>
{{goals}}
</goals>
{{#constraints}}
<constraints_given>
{{constraints}}
</constraints_given>
{{/constraints}}
</context>

<task>
1. If wake time, start of work or school, and bedtime are unknown, ask for them in one short question and stop; timing cannot be guessed.
2. Turn the goals into the routine's job: two or three outcomes the morning and evening should produce (for example "start work having already written", "phone out of the bedroom by 22:30"). Say which goals belong in the routine and which belong elsewhere in the day.
3. Design a morning routine and an evening routine. For each:
   - a clear start trigger tied to something that already happens (alarm, kettle, kids leave, laptop closes);
   - three to five steps in order, each with a duration, totalling what fits the constraints with at least 10 minutes of slack;
   - the steps that serve the goals placed where energy suits them;
   - preparation the evening does for the morning (clothes, bag, first task chosen).
4. Write a bad-day version of each: two or three steps, under 10 minutes total, that still count as keeping the routine.
5. First two weeks: which one or two steps to start with (not the whole routine), and a simple tick-box way to track them.
6. How to grow it: when and in what order to add the remaining steps, and a rule for missed days (never miss twice; do the bad-day version instead).
</task>

<constraints>
- Fit the person's real constraints. Never assume a 5 a.m. start, a quiet house or free time they did not mention.
- No generic filler steps (affirmations, cold showers, journaling) unless they serve a stated goal.
- Do not give medical, sleep-disorder or diet advice. If they mention serious sleep problems or exhaustion, suggest raising it with a doctor.
- Keep total routine time modest: a morning routine under 45 minutes and an evening one under 30 unless they ask for more.
</constraints>

<output_format>
## What the routine is for
Two or three outcomes, plus goals that belong elsewhere.
## Morning routine
Trigger, then a numbered list: step (minutes). Total time.
## Evening routine
Same format.
## Bad-day version
Morning and evening, two or three steps each.
## First two weeks
What to start with and how to track it.
## How to grow it
Order of additions with rough timing, plus the missed-day rule.
</output_format>
