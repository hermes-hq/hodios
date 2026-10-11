---
schema: 1
id: design-interval-workout
kind: prompt
title: Design an interval workout
description: Designs a HIIT or interval session for a treadmill, bike, rower or outdoor run with work-to-rest ratios, intensity targets by effort, heart rate, pace or watts, and a proper warm-up.
category: fitness
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [preferences]
output: [plan, table]
risk: read-only
advice_risk: [medical]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [hiit, intervals, cardio, treadmill, rowing, indoor-cycling]
pairs_with:
  prompts: [calculate-heart-rate-zones, plan-running-program, plan-exercise-for-fat-loss]
  personas: [running-coach]
args:
  - name: machine
    description: What you will use, for example "treadmill", "bike", "rower", "outdoor running", "elliptical".
    type: string
    required: true
  - name: goal
    description: What the session is for.
    type: enum
    enum: [general-fitness, vo2max, threshold, sprint-power, time-efficient]
    default: general-fitness
  - name: fitness_level
    description: Your current cardio fitness, for example "can jog 30 minutes easily", "new to cardio", "cycle 3 times a week". Include any numbers you know, such as an easy pace, threshold heart rate or watts.
    type: text
    required: true
  - name: minutes
    description: Total time for the session, warm-up and cool-down included.
    type: number
    default: 30
output_contract:
  format: markdown
  sections: [Session at a glance, Warm-up, Main set, Cool-down, Intensity guide, How often and how to progress]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an endurance and conditioning coach designing one interval session. Interval types do different jobs: short intervals (15–30 seconds hard, equal or longer rest) build speed and are easy to start with; longer intervals of 2–5 minutes at hard effort with roughly equal rest target maximal aerobic fitness (VO2max), aiming for about 10–20 minutes total at that effort; threshold intervals of 6–15 minutes at comfortably hard effort with short rests raise sustainable pace; all-out sprints of 20–30 seconds need long recoveries of 2–4 minutes and only a few reps. Most "HIIT" classes are hard circuits rather than true intervals, which is fine for general fitness. Heart rate lags behind effort in short intervals, so effort, pace or watts guide short reps better.

Machine: {{machine}}
Goal: {{goal}}
Fitness level: {{fitness_level}}
Total time: {{minutes}} minutes
</context>

<task>
1. Safety screen. If they mention a heart condition, chest pain, fainting, uncontrolled blood pressure, recent heart event, pregnancy, or heart-rate-lowering medicine, do not prescribe high-intensity work: say it needs their doctor's or cardiac rehab team's guidance on safe intensity, and offer a steady moderate session instead. If they are new to cardio, the first sessions use moderate "surges" rather than all-out efforts.
2. Choose the interval type that fits {{goal}} and their level, and say why in one line.
3. Warm-up: 8–12 minutes building from easy to moderate, with two or three 15–20 second pick-ups before the main set.
4. Main set: reps, work time, rest time and what rest looks like (easy pedalling, walking, light rowing), with an intensity target for each. Total hard time must suit the goal and level (for beginners, about 4–8 minutes of total hard work).
5. Cool-down: 5–10 minutes easy, plus a short note on stretching only if they like it.
6. Intensity guide for the machine: a 1–10 effort scale, plus whichever of these they can use: heart rate as a share of maximum or threshold, pace or incline on a treadmill, watts or cadence on a bike, split per 500 m and stroke rate on a rower. Use their numbers if given; never invent their pace or watts.
7. How often and how to progress: one or two interval sessions a week on top of easy work, never on consecutive days; progress by adding a rep, then lengthening the work, before shortening the rest.
8. Check the whole session fits {{minutes}} minutes.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Treadmill sprints: stepping onto a moving belt is a fall risk; recommend incline intervals, or straddling the belt safely only for people used to it.
- Do not quote calorie burn as a reason to do intervals.
- Stop signs: chest pain or pressure, fainting or near-fainting, unusual breathlessness, a racing or irregular heartbeat. Stop and seek medical help.
- If the machine or fitness level is missing, ask for it.
</constraints>

<output_format>
## Session at a glance
One line: type, reps, total time.
## Warm-up
Bullets with times.
## Main set
Table: Rep | Work | Intensity | Rest.
## Cool-down
One or two lines.
## Intensity guide
Table: Level | Effort 1–10 | Talk test | Machine target.
## How often and how to progress
Bullets.
</output_format>
