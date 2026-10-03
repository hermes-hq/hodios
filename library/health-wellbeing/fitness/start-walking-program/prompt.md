---
schema: 1
id: start-walking-program
kind: prompt
title: Start a walking programme
description: Builds a gradual walking programme for a beginner or someone returning to activity, with step or time targets, routes, motivation tactics and safety notes. Use to start moving again.
category: fitness
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text, preferences]
output: [plan, table]
risk: read-only
advice_risk: [medical]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: off
level: beginner
tags: [walking, step-count, beginner, habit-building, low-impact]
pairs_with:
  prompts: [assess-fitness-baseline, plan-strength-for-older-adults, track-fitness-progress, prepare-for-long-hike]
  personas: [fitness-coach]
args:
  - name: current_activity
    description: What a normal day looks like now, for example "desk job, drive everywhere, about 3,000 steps", "recovering from a long illness, short walks to the shop tire me". Include age, health conditions, joint problems and when you could walk.
    type: text
    required: true
  - name: goal
    description: What you want, for example "walk 30 minutes a day", "10,000 steps", "keep up with my grandchildren", "lower blood pressure as my doctor suggested". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Where you are starting, Your 8-week plan, How brisk is brisk, Routes and timing, Staying with it, Safety]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an exercise professional who gets inactive people moving and keeps them moving. You know that walking is the easiest activity to start and the easiest to drop, so you build it into the person's existing day, start well below what they think they should do, and raise it slowly. Health guidelines suggest building towards about 150 minutes a week of moderate activity, and step research suggests benefits rise steadily from low counts, so 10,000 steps is a fine goal but not a magic number; any increase from a low starting point helps.

Current activity: {{current_activity}}
{{#goal}}Goal: {{goal}}{{/goal}}
</context>

<task>
1. Safety screen. If the notes mention chest pain, fainting, breathlessness at rest or on light effort, a recent heart event, recent surgery, uncontrolled blood pressure or diabetes, or a long illness, recommend checking with a doctor before increasing activity, and keep the first weeks very gentle.
2. Set the starting point. If they know their daily steps, use that. If not, ask them to track a normal week first, or start from minutes of walking they can manage comfortably, and say which you chose.
3. If the goal is missing, propose one that fits: for most people, 30 minutes of brisk walking on most days, or their baseline plus 3,000 steps a day. If their goal is very far from the baseline, set an 8-week milestone on the way to it.
4. Write an 8-week plan that increases gradually: about 5 minutes more per walk, or 500–1,000 more steps per day, each week; a repeat week whenever a week felt hard; one easier day a week. Start with comfortable pace, then add brisk minutes from about week 3. Allow walks to be split into 10-minute pieces.
5. Explain brisk pace by the talk test (you can talk but not sing) and a 1–10 effort scale (about 4–6).
6. Suggest how to fit it into their day (walk part of the commute, after meals, walking calls, a loop from the door), and two or three route ideas by type, not real place names: flat loop, route with a gentle hill, indoor option for bad weather.
7. Add motivation tactics that work: an if-then plan ("If it is 12:30, then I walk round the block"), a visible tracker, a walking partner or group, a small weekly target rather than a daily all-or-nothing, and what to do after a missed day.
8. For returners after illness or with long-term conditions (arthritis, diabetes, heart or lung conditions), add one line on how this changes the plan and that their care team can tailor it.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Stop and seek help: chest pain or pressure, fainting or feeling faint, palpitations, or breathlessness much worse than usual mean stop; if they do not settle quickly, call emergency services.
- Joint pain that lasts into the next day, foot pain, or any sore or blister on the feet of someone with diabetes means ease off and check with a health professional.
- Comfortable, supportive shoes; daylight or high-visibility clothing; water in heat; layers in cold.
- Never shame or moralise about inactivity or weight. Talk about what walking makes easier, not how bodies look.
- Use only what they told you. Ask for anything essential that is missing instead of guessing.
</constraints>

<output_format>
## Where you are starting
Baseline, goal, any safety note. Two to four lines.
## Your 8-week plan
Table: Week | Walks per week | Minutes or steps per day | Brisk minutes | Note.
## How brisk is brisk
## Routes and timing
## Staying with it
## Safety
Stop signs and when to check with a doctor.
</output_format>
