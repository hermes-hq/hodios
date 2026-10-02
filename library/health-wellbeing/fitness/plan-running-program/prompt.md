---
schema: 1
id: plan-running-program
kind: prompt
title: Plan a running programme
description: Builds a running plan for a goal from first 5K to marathon, with gradual progression, easy and hard days, cross-training, deloads, a taper and injury warning signs. Use when training for a run.
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
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [running, 5k, marathon, couch-to-5k, taper, injury-prevention]
pairs_with:
  prompts: [build-training-plan, plan-sports-nutrition, track-fitness-progress, design-mobility-routine]
  personas: [fitness-coach]
args:
  - name: goal
    description: The race or target and the date if there is one, for example "first 5K, no time goal", "half marathon in 1:55 on 12 April", "marathon finish". Mention injuries or health conditions.
    type: text
    required: true
  - name: current_fitness
    description: What you can do now, for example "can't run 5 minutes non-stop", "3 runs a week, 20 km total, 10K in 58 min". Include days available and any other sport.
    type: text
    required: true
  - name: weeks
    description: Weeks until the race or goal date. Optional; a realistic length is recommended if empty.
    type: number
output_contract:
  format: markdown
  sections: [Before you start, Plan at a glance, Week by week, Session guide, Strength and cross-training, Deloads and taper, Warning signs, When life gets in the way]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an experienced running coach who has taken hundreds of people from their first run to marathon finish lines. Most running injuries come from doing too much too soon, and most stalled runners run their easy days too hard and their hard days too easy. Good plans are built from mostly easy running, one or two quality sessions a week at most, gradual increases in volume, planned easier weeks, and a taper before a race.

Goal: {{goal}}
Current fitness: {{current_fitness}}
{{#weeks}}Weeks available: {{weeks}}{{/weeks}}
</context>

<task>
1. Readiness check. If the goal or fitness notes mention chest pain, fainting, unusual breathlessness, a heart condition, pregnancy or recent birth, recent surgery or a current injury, put "get medical clearance first" at the top. If symptoms are happening now with exertion (chest pain, fainting, a racing or irregular heartbeat), do not write a plan; say these need a doctor's assessment first.
2. Judge whether the timeline is realistic from the current fitness. As rough guides: a first 5K from no running takes about 8–10 weeks with run-walk; a first half marathon needs a base of comfortably running about 30 minutes and 12–16 weeks; a first marathon needs a steady base of several runs a week and 16–20 weeks. If the weeks are missing, recommend a length. If too short, say so and offer a safer goal or a later race.
3. Choose the weekly structure from the days they have: about 80% of running easy, at a conversational pace you could talk in full sentences at; at most one or two quality sessions (strides, tempo, intervals or hills) for non-beginners and none in the first weeks for beginners; one long run that grows gradually; at least one full rest day.
4. Progress volume gradually: total weekly time or distance rises by roughly 10% at most, and the long run grows by no more than about 10–15 minutes or 1–2 km at a time. Beginners use run-walk intervals and progress the running portion first. Use time-based sessions for beginners and distance for experienced runners.
5. Write a week-by-week plan with every session described by duration or distance and effort, using a talk test or a 1–10 effort scale, not paces they have not earned. If they gave a recent race time, you may add approximate pace ranges and label them as estimates.
6. Add two short strength sessions a week (calves, hips, glutes, single-leg work, core) and optional low-impact cross-training on easy days.
7. Plan an easier week every third or fourth week (about 20–30% less volume), and a taper before the race: 1 week for a 5K or 10K, 2 weeks for a half, 2–3 weeks for a marathon, cutting volume while keeping some short, faster running.
8. For half-marathon and longer races, add a one-line reminder to practise race-day food and drink on long runs, and to try nothing new on race day.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Injury warning signs to include: pain that makes you limp or change your stride, pain that worsens as you run, pinpoint bone pain or pain at rest or at night (possible bone stress injury: stop running and see a doctor), swelling, or pain lasting more than a few days. Muscle tiredness and mild next-day soreness are normal.
- Chest pain, fainting, or breathlessness out of proportion to effort means stop and seek urgent care.
- This is a general plan, not rehabilitation. If they are returning from an injury, say a physiotherapist should set the starting point.
- Use only information given. If the goal or current fitness is missing or too vague to plan safely, ask for it instead of inventing it.
- Never schedule two hard sessions on consecutive days, and never double up missed sessions.
</constraints>

<output_format>
## Before you start
The goal restated as a target, whether the timeline is realistic, assumptions, and any clearance flag. Two to five lines.
## Plan at a glance
Table: Weeks | Phase | Focus | Weekly volume | Easier week?
## Week by week
Table per week (or per block of identical weeks): Day | Session | Duration or distance | Effort.
## Session guide
Only the session types this plan uses (for example run-walk, easy, long, strides, tempo, intervals, hills), each with what it is and an effort cue.
## Strength and cross-training
Two short routines and when to fit them.
## Deloads and taper
## Warning signs
Stop signs and who to see.
## When life gets in the way
What to do after missed days, illness, or a bad week.
</output_format>
