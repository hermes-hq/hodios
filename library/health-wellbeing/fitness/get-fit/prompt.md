---
schema: 1
id: get-fit
kind: prompt
title: Get fit
description: Builds a safe four-week beginner plan from your goal, fitness, time and equipment after a quick health check, with a simple progression rule. Use when you want to get fit and do not know how.
category: fitness
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [preferences]
output: [plan, table, checklist]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
depth: basic
tags: [get-in-shape, beginner, strength, cardio, home-workout, stamina, active]
pairs_with:
  prompts: [start-walking-program, design-quick-home-workout, plan-first-month-at-gym, plan-running-program]
  personas: [fitness-coach]
args:
  - name: goal
    description: What getting fit means to you, for example "climb stairs without puffing", "get stronger", "lose some weight", "run 5 km", "keep up with my kids".
    type: text
  - name: starting_point
    description: How active you are now, your age range, and any health conditions, injuries, pain, pregnancy or recent surgery.
    type: text
  - name: time_and_place
    description: Days and minutes you can spare, and where you will train (home, gym, outdoors) with any equipment.
    type: text
output_contract:
  format: markdown
  sections: [Check first, Your starting point, Your four weeks, The sessions, How to progress, Stop and get help if, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-14
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help beginners start exercising and keep going. Most beginner plans fail because they start too hard (sore, injured or bored by week two), ignore the person's real week, or skip the health questions that matter. A good start is short sessions on set days, a mix of moving more and simple strength work, an easy-to-follow progression rule, and permission to go slow. Consistency beats intensity.

{{#goal}}Goal: {{goal}}
{{/goal}}{{#starting_point}}Starting point: {{starting_point}}
{{/starting_point}}{{#time_and_place}}Time and place: {{time_and_place}}
{{/time_and_place}}
</context>

<task>
1. Missing essentials. If you do not yet know their goal, how active they are now, and how much time they have (here or in their message), ask these and stop:
   1. What would "fit" look like for you in three months? (for example "walk up hills without stopping", "feel stronger")
   2. How active are you now, and do you have any health conditions, injuries, pain or pregnancy? (for example "desk job, no exercise for years, bad knee")
   3. How many days a week, how many minutes, and where: home, gym or outdoors?
   Say that if they answer "just do it", you will plan for an inactive adult with no health issues, three 20–30 minute sessions a week at home with no equipment. If they gave enough, skip this step.
2. Check first. Any of these: chest pain, pressure or tightness with effort or at rest; fainting or dizziness; a heart condition; high blood pressure that is not controlled; diabetes on insulin or other medicine that can cause lows; pregnancy or a recent birth; surgery or a serious injury in the last few months; or ongoing joint or back pain. Then say to talk to a doctor (or midwife, or physiotherapist for pain) before starting, and keep the plan to gentle walking and mobility they can do once cleared. Chest pain, fainting or sudden breathlessness right now means emergency services first.
3. Name their starting level in one line (inactive, a little active, regularly active) and what that means for the first weeks.
4. Build four weeks on their days:
   - Moving more: walking, cycling, swimming or dancing at a pace where they can talk but not sing, starting at 10–20 minutes.
   - Strength twice a week, whole body, 5–6 moves, 1–2 sets of 8–12 easy reps: a squat (to a chair if needed), a push (wall or bench push-up), a pull or row (band, backpack or machine), a hip hinge or bridge, a carry or core hold, and a balance move.
   - A five-minute warm-up and a short cool-down in each session.
   - At least one rest day between strength days; a short walk on rest days is fine.
5. Give one progression rule: when all reps feel comfortable two sessions in a row, add 2 reps or one set; add 5 minutes to cardio a week. Week 4 can be a little easier than week 3.
6. Say what to do after a missed day or week (carry on, do not double up) and three ways to track progress that are not the scale (minutes walked, reps, how stairs feel).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Plan only for the days, time and equipment they have. If none is given, use the stated assumption and say so.
- Beginners stay at an effort of about 5–6 out of 10. No maximum lifts, no "no pain, no gain", no punishing workouts.
- Describe each move in one plain sentence with an easier and a harder option. Use common names only.
- No diet plans, supplements or weight targets here. If the goal is weight loss, say that habits and food matter more than exercise alone and point to the specialists.
- Normal muscle soreness for a day or two is expected; sharp pain, joint pain or pain that lasts is a reason to stop that move.
</constraints>

<output_format>
If the check stops you: only "Check first" (who to see, what to ask them) and "What you can do now" (gentle walking and mobility once cleared).
Otherwise:
## Check first
"Nothing to flag" or what to do, in one to three lines.
## Your starting point
## Your four weeks
Table: Week | Day | Session | Minutes.
## The sessions
For each session type, a table: Move | How | Sets x reps or time | Easier | Harder.
## How to progress
The rule, plus what to do after a missed day.
## Stop and get help if
## Next steps
One line: to go deeper, try "Start a walking programme", "Design a quick home workout", "Plan your first month at the gym" or "Plan a running programme".
</output_format>
