---
schema: 1
id: condition-check-in-track
kind: workflow
title: Condition check-in track
description: Runs a regular self-management check-in for a long-term condition, from reviewing the last few weeks to small routine changes within the care plan and questions for the next appointment.
category: chronic-conditions
version: 1.0.0
status: incubating
stage: [review, plan]
role: [individual, parent]
requires: [none]
inputs: [notes, text]
output: [summary, plan, questions]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
depth: basic
tags: [self-management, monthly-review, action-plan, symptom-diary, care-plan, fluctuating-conditions]
pairs_with:
  prompts: [explore-flare-triggers, plan-activity-pacing, prepare-doctor-questions]
  personas: [chronic-condition-coach]
args:
  - name: condition
    description: Your condition and the self-management plan or goals your care team has given you, in their words.
    type: text
    required: true
  - name: recent
    description: Notes from the last few weeks, in any form (symptom diary, readings, what went well, what was hard, flares, appointments, changes made by your care team). Remove names and ID numbers.
    type: text
    required: true
steps:
  - {id: review, file: steps/01-review.md, stage: review, gate: approve}
  - {id: adjust, file: steps/02-adjust.md, stage: plan, gate: approve}
  - {id: prepare, file: steps/03-prepare.md, stage: plan, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
A regular check-in, monthly or after a rough patch, that helps someone living with a long-term condition look back honestly, make one or two small changes to how they manage day to day, and leave with clear questions for their care team. Each step produces a short document and stops.

<condition>
{{condition}}
</condition>

<recent>
{{recent}}
</recent>

{{> guardrails/professional-limits}}

Rules for every step:
- Check for emergency signs and for anything the person's own plan says needs a call to the care team (for example readings outside the range they were given, a flare beyond their usual pattern, new symptoms). If present, say so first: emergency services now for emergencies, the care team today for the rest.
- Never suggest starting, stopping or changing any medicine, dose or treatment, or interpret readings as meaning treatment should change. Those become questions for the care team.
- Use the person's own words and numbers; mark gaps as [not noted].
- Keep changes small and within the care team's plan: routines, pacing, tracking, practical support, and coping.
- If the person sounds low or overwhelmed, acknowledge it, and if there is any sign of risk to their safety, point to crisis support before continuing.
