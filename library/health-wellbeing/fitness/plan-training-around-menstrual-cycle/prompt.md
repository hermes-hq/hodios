---
schema: 1
id: plan-training-around-menstrual-cycle
kind: prompt
title: Plan training around the menstrual cycle
description: Plans how to adjust training across the menstrual cycle from your own logged symptoms, with what the evidence does and does not show and red flags to raise with a doctor.
category: fitness
version: 1.0.0
status: incubating
stage: [plan, learn]
role: [individual]
requires: [none]
inputs: [notes]
output: [plan, table, explanation]
risk: read-only
advice_risk: [medical, mental-health]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [menstrual-cycle, period, womens-health, symptom-tracking, energy-availability]
pairs_with:
  prompts: [build-symptom-log, prepare-doctor-questions, track-fitness-progress]
  personas: [fitness-coach]
args:
  - name: cycle_log
    description: Your usual cycle length and how you feel across it, for example "28-32 days; heavy first 2 days with cramps, low energy days 1-3, poor sleep the week before". A few months of notes is best.
    type: text
    required: true
  - name: current_training
    description: Your normal training week and goal.
    type: text
    required: true
  - name: contraception
    description: Any hormonal contraception or hormone treatment, for example "combined pill", "hormonal IUD", "none". Optional.
    type: string
output_contract:
  format: markdown
  sections: [What the evidence says, Your pattern, Adjustments by symptom, Your month at a glance, Red flags to raise with a doctor]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a coach who works with people who menstruate and who keeps up with the research. Reviews of studies find that, on average, cycle phase has small and inconsistent effects on strength and endurance performance, and the quality of most studies is low. Individual experience varies a lot: some people have predictable symptoms (cramps, heavy bleeding, fatigue, poor sleep, bloating) that clearly affect training, and others notice nothing. So the evidence supports adjusting training to a person's own symptoms rather than rigid phase-based "cycle syncing" programmes. Hormonal contraception usually changes or removes the natural hormone pattern, so phase-based advice may not apply at all. Missing periods while training hard is not a sign of fitness; it can signal low energy availability, which harms bone and overall health.

Cycle log: {{cycle_log}}
Current training: {{current_training}}
{{#contraception}}Contraception or hormones: {{contraception}}{{/contraception}}
</context>

<task>
1. Red-flag screen first. Periods that have stopped for three months or more (when not pregnant, breastfeeding or on contraception that stops them), periods that have become much lighter or rarer since training or dieting harder, bleeding heavy enough to soak through protection every hour or two, pain that stops normal daily life, bleeding between periods or after sex, or dizziness and breathlessness that could mean low iron: say these need a doctor, and for missed periods with hard training or dieting, explain low energy availability in plain words and do not write a phase-based plan around it.
2. What the evidence says: three or four plain lines based on the context above, without overstating either way.
3. Your pattern: read their log and name the days or windows where symptoms are predictable, and where they are not. If they use hormonal contraception, say how that changes things.
4. Adjustments by symptom, not by phase name: for each symptom they report, a concrete training change (for example: heavy-flow days, swap high-impact or long sessions for moderate ones, plan bathroom access, choose dark kit; cramps, light movement often helps, keep the session but lower intensity; poor sleep in the days before a period, keep hard sessions but drop extra volume; feeling strong, schedule test sessions or hard work when they tend to feel best). Keep training going; most people can train in every phase.
5. Your month at a glance: a simple table mapping their usual cycle days to the planned training emphasis, with a rule that how they feel on the day overrides the table.
6. Suggest logging symptoms, sleep, energy and session quality for two or three cycles, and reviewing the pattern.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- If they mention restricting food, fear of eating or weight gain, purging, or feeling unable to take rest days, respond kindly, say missed periods with these patterns need a doctor, and encourage them to contact an eating disorder support service in their country; do not adjust training to push through it.
- Do not claim specific phases make people stronger, weaker, more injury-prone or better at fat burning as established fact.
- Do not recommend supplements, herbal products or changes to contraception; contraception questions go to a doctor, nurse or pharmacist.
- Use inclusive, neutral language and do not assume gender.
- If the cycle log or current training is missing, ask for them.
</constraints>

<output_format>
## What the evidence says
Three or four lines.
## Your pattern
Bullets from their log.
## Adjustments by symptom
Table: Symptom | When it usually appears | Training change.
## Your month at a glance
Table: Cycle days | Training emphasis | Notes.
## Red flags to raise with a doctor
Bullets.
</output_format>
