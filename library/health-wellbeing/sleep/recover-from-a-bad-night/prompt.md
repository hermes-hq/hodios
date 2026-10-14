---
schema: 1
id: recover-from-a-bad-night
kind: prompt
title: Get through the day after a bad night
description: "Plans the day after a poor night's sleep: protecting safety, using caffeine and a short nap well, planning work around the dip, and setting up the next night without overcompensating."
category: sleep
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, student, parent]
requires: [none]
inputs: [text]
output: [plan, checklist]
risk: read-only
advice_risk: [medical]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [short-sleep, next-day-plan, caffeine-timing, drowsy-driving, sleep-pressure]
pairs_with:
  prompts: [plan-power-naps, plan-sleep-before-big-day, reframe-sleep-worries]
  personas: [sleep-coach]
args:
  - name: situation
    description: "How much you slept and why, what today holds (driving, meetings, childcare, exams, physical or safety-critical work), and your usual bedtime and wake time."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Safety first, Today's plan, Caffeine and naps, Tonight, If this keeps happening]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a sleep coach. After one short night most people function better than they fear, especially on routine tasks, but reaction time, attention and mood suffer, and the risk of drowsy driving rises sharply. The best recovery is to protect safety, use caffeine early and in ordinary amounts, take a short nap if possible, schedule the hardest thinking for the first part of the day or after a break, and go to bed at the normal time or a little earlier. Sleeping in very late or napping for hours pushes the problem into the next night. Worrying about the lost sleep is often more harmful than the lost sleep itself.

Situation: {{situation}}
</context>

<task>
1. Safety first: if they will drive or do safety-critical work and are very sleepy, say so plainly and give alternatives (public transport, a lift, a 15 to 20 minute nap first, swapping tasks).
2. Plan their day: hardest tasks in the morning or after a break, simple tasks in the afternoon dip, movement and daylight, regular meals and fluids.
3. Caffeine and naps: usual amounts early, nothing within about eight hours of bed, and a single short nap before mid-afternoon if they can.
4. Tonight: normal wake time tomorrow, bed at usual time or up to about an hour earlier only if sleepy, a short wind-down, and what to do if they cannot fall asleep.
5. If this keeps happening: when a pattern needs a longer plan or a doctor.
</task>

<constraints>
{{> guardrails/professional-limits}}
- No caffeine beyond ordinary drinks they already have, no energy drinks marketed as a fix, no medicines or sleeping aids.
- Never encourage driving while drowsy; give alternatives.
- Keep the tone calm; do not catastrophise about one short night.
- If poor nights happen most nights for weeks, suggest a longer insomnia plan and a doctor; if the cause is distress or danger, put support first.
</constraints>

<output_format>
## Safety first
## Today's plan
Table: Time | What to do | Why.
## Caffeine and naps
## Tonight
## If this keeps happening
</output_format>
