---
schema: 1
id: set-up-fitness-coach-assistant
kind: prompt
title: Set up an assistant as your ongoing training coach
description: Sets up an assistant project as an ongoing training coach with your goals, schedule, equipment and injuries, a training log format and a weekly check-in that adjusts the plan.
category: assistant-setup
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [individual]
requires: [none]
inputs: [preferences, text]
output: [prompt, plan, table]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [training-log, weekly-check-in, progressive-overload, injury-history]
pairs_with:
  prompts: [build-project-instructions, set-up-recurring-assistant-tasks]
  personas: [fitness-coach]
args:
  - name: goal
    description: What you are training for and by when (for example a first 10 km in March, stronger deadlift, general fitness), and your current level with a recent example session.
    type: text
    required: true
  - name: limits
    description: Days and minutes available per week, equipment or gym access, injuries, health conditions your doctor knows about, and anything you dislike.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Athlete profile, Coach instructions, Training log, Weekly check-in, Tests]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
One-off workout plans from an assistant are easy to get and rarely followed for long. What makes coaching work is the loop: a plan sized to real time and equipment, a log of what was actually done and how it felt, and a weekly review that progresses, holds or backs off. Good coaches progress gradually (small weekly increases in load or volume, with easier weeks), use effort ratings such as RPE or "could talk in sentences" alongside numbers, work around injuries rather than through pain, and change the plan when life gets in the way instead of piling missed sessions on. An assistant without the log forgets all of this every chat. It also must not act as a doctor or physiotherapist.

<goal>
{{goal}}
</goal>
<limits>
{{limits}}
</limits>
</context>

<task>
1. If the limits mention chest pain, fainting, a heart condition, pregnancy, recent surgery or an injury that still hurts, say to get clearance from a doctor or physiotherapist before starting, and keep the setup conservative.
2. Write an athlete profile: goal and date, current level, days and minutes, equipment, injuries and limits, preferences. Mark gaps [CONFIRM].
3. Write coach instructions, ready to paste, that:
   - plan week by week, never beyond what the schedule allows;
   - progress gradually and include easier weeks, and explain each change in one line;
   - use effort ratings as well as numbers, and favour form over load;
   - adapt after missed sessions instead of catching up;
   - stop and refer on pain that is sharp, worsening or lasting, and on dizziness or chest symptoms;
   - read the log before every answer.
4. Write a training log format: date, session, what was done (sets, reps, load, distance, time), effort rating, pain or niggles, sleep or energy note.
5. Write a weekly check-in prompt the user pastes with the week's log, and the shape of the coach's reply: what went well, what changes, next week's sessions.
6. Give four tests, including a missed week and a knee that hurts during squats.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not diagnose injuries or suggest rehab exercises for a specific injury; refer to a physiotherapist or doctor.
- Do not give diet plans or supplement doses in this setup.
- Keep the instructions under about 1,800 characters.
</constraints>

<output_format>
## Athlete profile
Bullets with [CONFIRM] gaps.
## Coach instructions
One fenced block, ready to paste.
## Training log
A table template in a fenced block.
## Weekly check-in
The prompt to paste and the reply shape.
## Tests
Four bullets: prompt and pass condition.
</output_format>
