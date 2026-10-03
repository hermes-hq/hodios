---
schema: 1
id: plan-30-day-challenge
kind: prompt
title: Plan a 30-day challenge
description: Designs a 30-day challenge with a daily minimum, weekly progression, simple tracking, rest and missed-day rules, weekly check-ins and an end-of-challenge reflection.
category: habits
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, student]
requires: [none]
inputs: [topic, preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [30-day-challenge, daily-practice, progression, habit-tracker, reflection]
pairs_with:
  prompts: [design-habit-plan, set-woop-goals, design-daily-routine]
  personas: [productivity-coach]
args:
  - name: goal
    description: What you want the challenge to build or test, for example "write every day", "learn 300 Spanish words", "declutter the flat", "no takeaway food". Add your current level.
    type: text
    required: true
  - name: constraints
    description: Time per day, days that are always busy, equipment or budget limits, start date, and anything that ended past attempts. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Challenge card, Rules, Day by day, Tracker, Weekly check-ins, Day 30 reflection, After the challenge]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design 30-day challenges that people finish. Thirty days is long enough to learn something about a practice and short enough to commit to. Challenges fail when day one is the hardest day, when one missed day breaks the streak and the will, when the challenge does not fit busy days, or when there is no end point to decide what to keep. A good design has a daily minimum small enough for the worst day, a standard target, a gentle weekly progression, planned rest, a missed-day rule, and a reflection that turns the month into a decision.

Goal:
<goal>
{{goal}}
</goal>
{{#constraints}}
Constraints:
<constraints_from_user>
{{constraints}}
</constraints_from_user>
{{/constraints}}
</context>

<task>
1. Define the challenge in one sentence and what "done for the day" means, as an observable action. If the goal is an outcome ("lose weight", "be calmer"), pick the daily behaviour that drives it and say why. If the goal is too vague to choose a behaviour, ask up to two questions and stop.
2. Set three levels: a daily minimum that takes under five minutes and counts as a full success, a standard target, and an optional stretch. Base them on the person's current level.
3. Plan the progression over four weeks plus two days: what changes each week (amount, difficulty or variety), with week one deliberately easy.
4. Write the rules: planned rest days if the activity needs recovery (and that they count as success), the missed-day rule ("never miss twice", do the minimum the next day, no make-up days that double the load), and what happens when ill or travelling.
5. Write a day-by-day plan for all 30 days, adjusted for the busy days in the constraints.
6. Design a tracker that takes seconds: a printable 30-box grid or a note format, and what to record (done or minimum, plus one optional number or word).
7. Write weekly check-in questions (three questions, five minutes) and what to adjust based on the answers.
8. Write the day 30 reflection: questions that look at what changed, what was hard, and what the person learned about themselves, ending with a decision: keep as a habit (at what level), change, or stop.
</task>

<constraints>
- The daily minimum must fit the worst realistic day in the constraints; the standard target must fit a normal day.
- No all-or-nothing streak pressure; missing a day is planned for.
- Use the person's goal, level and constraints; do not invent details. State any assumption.
- Physical, diet or fasting challenges: keep loads and progression conservative, include rest days, avoid calorie or weight targets, and tell people with a health condition, injury, pregnancy, or a history of disordered eating to check the plan with a doctor first. Stop and suggest medical advice if the goal is extreme (for example very low-calorie eating or daily maximal training).
- Money challenges ("no spend") are about behaviour, not financial advice.
</constraints>

<output_format>
## Challenge card
The challenge in one sentence, what counts as done, the three levels, start and end date if known.

## Rules
Bullets: rest days, missed days, illness and travel.

## Day by day
Table: Day | Plan | Minimum. Mark rest days and check-in days.

## Tracker
A text grid or note format the person can copy.

## Weekly check-ins
Three questions and how to adjust.

## Day 30 reflection
Five to seven questions, then the keep, change or stop decision.

## After the challenge
Two or three sentences on how to turn the result into a lasting habit or a next challenge.
</output_format>
