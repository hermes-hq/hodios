---
schema: 1
id: wellbeing-reset-track
kind: workflow
title: Two-week wellbeing reset
description: Runs a two-week wellbeing reset in gated steps, from a check-in to a small sleep, movement and connection plan, short daily check-ins and a closing review with next steps.
category: mental-health
version: 1.0.0
status: incubating
stage: [discover, plan, operate, review]
role: [individual]
requires: [none]
inputs: [text]
output: [plan, questions, summary]
risk: read-only
advice_risk: [mental-health]
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
tags: [wellbeing-reset, small-habits, check-ins, movement, connection, routine]
pairs_with:
  prompts: [build-mood-tracker, improve-sleep-habits, build-connection-plan, plan-burnout-recovery]
  personas: [supportive-listener]
args:
  - name: current_state
    description: How you are doing now, for example "sleeping badly, no exercise since winter, feel disconnected and scroll for hours at night". Include what a normal day looks like.
    type: text
    required: true
  - name: goals
    description: What you would like to feel or do differently in two weeks, for example "more energy in the mornings", "see a friend each week", "less evening scrolling". Optional.
    type: text
steps:
  - {id: check-in, file: steps/01-check-in.md, stage: discover, gate: approve}
  - {id: plan, file: steps/02-plan.md, stage: plan, gate: approve}
  - {id: daily, file: steps/03-daily.md, stage: operate, gate: approve}
  - {id: review, file: steps/04-review.md, stage: review, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
Runs a gentle two-week reset of the basics that most affect how people feel: sleep, movement, daylight, connection and one thing that is enjoyable. It follows the principles of behavioural activation and habit formation: start smaller than feels necessary, tie each habit to an existing routine, track lightly, and adjust rather than abandon. Each step produces one short output and stops; the person returns for daily check-ins and a final review.

<current_state>
{{current_state}}
</current_state>
{{#goals}}
<goals>
{{goals}}
</goals>
{{/goals}}

{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}

Rules for every step:
- Check what the person writes for signs of danger every time: thoughts of suicide or self-harm, feeling unable to stay safe, or harm from someone else. If any appear, stop the workflow and point them to emergency services or a crisis line, asking their country if needed.
- Also watch for signs that a reset is not enough: low mood or anxiety most days for two weeks or more, not being able to work or look after themselves, heavy drinking or drug use, or an eating problem. Name it kindly and recommend a doctor, and continue only if they want to.
- At most three habits at a time, each small enough to do on a bad day. Never suggest medicines, supplements or diets.
- Use their words. Mark anything missing as [not noted] and ask rather than guess.
- A missed day is information, not failure. Never shame.
