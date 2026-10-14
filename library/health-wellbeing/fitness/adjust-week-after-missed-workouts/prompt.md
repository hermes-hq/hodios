---
schema: 1
id: adjust-week-after-missed-workouts
kind: prompt
title: Adjust the week after missed workouts
description: Rearranges the rest of a training week after missed sessions, deciding what to keep, merge or drop so the key work still happens without cramming or back-to-back hard days.
category: fitness
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text]
output: [plan, table]
risk: read-only
advice_risk: [medical]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [missed-sessions, weekly-schedule, strength-training, running, recovery]
pairs_with:
  prompts: [build-training-plan, build-exercise-consistency, plan-maintenance-training-phase]
  personas: [fitness-coach]
args:
  - name: planned_week
    description: The week as planned, session by session, for example "Mon upper, Tue run intervals, Thu lower, Sat long run, Sun full body".
    type: text
    required: true
  - name: missed
    description: Which sessions you missed and why, for example "missed Mon and Tue, work deadline" or "sick with a cold Wed to Fri".
    type: text
    required: true
  - name: days_left
    description: The days left this week and roughly how much time each has, for example "Thu 45 min, Sat 90 min, Sun 30 min".
    type: text
    required: true
  - name: goal
    description: What the training is building toward, for example "half marathon in 6 weeks" or "general strength". Optional.
    type: string
output_contract:
  format: markdown
  sections: [What matters most this week, Revised week, Merged sessions, What to drop, Next week]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a coach triaging a week that went off plan. Missing a few sessions costs very little fitness: strength and endurance barely change over one or two lighter weeks. What does cost people is cramming the missed work into the days left, stacking hard sessions back to back, and then getting hurt or giving up. The right move is to protect the one or two sessions that matter most for the goal, merge the rest sensibly, and let the plan carry on.

Planned week: {{planned_week}}
Missed: {{missed}}
Days left: {{days_left}}
{{#goal}}Goal: {{goal}}{{/goal}}
</context>

<task>
1. Check why they missed. If it was illness: with a fever, chest symptoms, body aches or stomach illness, no training until symptoms clear, then the first session back is easy; with only mild head-cold symptoms, easy movement is fine if they feel like it. If the reason was injury or pain, say training around it needs advice from a physiotherapist or doctor and plan only what is clearly unaffected.
2. Rank the planned sessions by importance for the goal. Usual order: for strength, the sessions with the main lifts; for endurance events, the long session, then the key quality session (intervals or tempo), then easy runs; strength sessions for runners and accessory work come after.
3. Rebuild the remaining days:
   - keep the top one or two sessions in full;
   - merge where it makes sense: the main lifts from two strength sessions into one, accessories trimmed; never merge two hard runs;
   - at least one easier day or rest day between two hard sessions for the same muscles or energy system;
   - no doubling up to "make up" missed volume, and no session longer than the time available.
4. List what is dropped and why it does not matter this week.
5. Next week: resume the plan as written, without catching up. If two or more weeks have been patchy, suggest repeating the current week of the plan rather than moving on, or shifting the event plan by a week if the date allows.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never schedule two hard sessions on the same day, or more hard sessions in the remaining days than the original plan had in that span.
- Fit each session inside the time given for that day.
- Do not invent sessions or exercises the plan did not have, except shortened versions of planned ones.
- If the planned week or missed sessions are unclear, ask one question before rearranging.
</constraints>

<output_format>
## What matters most this week
One to three lines naming the sessions to protect.
## Revised week
Table: Day | Session | Time | Notes.
## Merged sessions
For each merged session: the exercises or parts kept, sets and order.
## What to drop
Bullets with a reason each.
## Next week
Two or three lines.
</output_format>
