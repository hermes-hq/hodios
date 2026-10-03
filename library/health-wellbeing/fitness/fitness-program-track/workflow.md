---
schema: 1
id: fitness-program-track
kind: workflow
title: Fitness programme track
description: Builds a fitness programme in gated steps, from goals and a health screen to baseline tests, a four-week plan, and a check-in that adjusts the next block. Use to start training with structure.
category: fitness
version: 1.0.0
status: incubating
stage: [discover, plan, operate, review]
role: [individual]
requires: [none]
inputs: [text, preferences]
output: [questions, plan, table, checklist]
risk: read-only
advice_risk: [medical]
invocation: user
effort: deep
interaction: interactive
model_tier: mid
reasoning: recommended
level: beginner
tags: [progressive-overload, baseline, check-in, habit-building, programme-design]
pairs_with:
  prompts: [assess-fitness-baseline, build-training-plan, track-fitness-progress, plan-nutrition-targets]
  personas: [fitness-coach]
args:
  - name: goals
    description: What you want and by when, in your words, for example "get strong enough to carry my kids without back pain", "first pull-up", "feel fitter before my 50th birthday".
    type: text
    required: true
  - name: constraints
    description: Days and minutes per week, equipment and place, injuries or conditions, what you enjoy or hate, work or family limits. Optional; asked for in the first step.
    type: text
steps:
  - {id: screen, file: steps/01-goals-and-screen.md, stage: discover, gate: approve}
  - {id: baseline, file: steps/02-baseline.md, stage: discover, gate: approve}
  - {id: plan, file: steps/03-four-week-plan.md, stage: plan, gate: approve}
  - {id: check-in, file: steps/04-check-in-and-adjust.md, stage: review, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
Takes one person from a goal to a programme they can follow and adjust, the way a good coach would run the first month: understand the goal and the person's life, screen for anything that needs a doctor first, measure a simple baseline, write a four-week block, then review it and plan the next one. Each step produces one short document and stops for the person to approve or correct it.

<goals>
{{goals}}
</goals>
{{#constraints}}
<constraints>
{{constraints}}
</constraints>
{{/constraints}}

{{> guardrails/professional-limits}}

Rules for every step:
- Check for warning signs every time the person writes: chest pain or pressure, fainting, palpitations, breathlessness out of proportion to effort, or a new sharp or joint pain. Chest symptoms during exercise mean stop and seek urgent care, and the workflow pauses until a doctor has assessed them. Pain that changes how they move goes to a physiotherapist or doctor.
- Never invent the person's numbers, schedule or history. Mark anything missing as [not given] and ask.
- Training stays at moderate effort for beginners: reps in reserve or a 1–10 effort scale, no training to failure, no maximal tests.
- Missed sessions are skipped, never doubled up. A 20-minute minimum session exists for every busy week.
- Talk about what the body can do, never about how it looks. If the goals or answers suggest disordered eating or compulsive exercise, say so gently and suggest talking to a doctor.
