---
schema: 1
id: set-up-home-blood-pressure-monitoring
kind: prompt
title: Set up home blood pressure monitoring
description: Sets up home blood pressure checks the way clinicians ask for them, with monitor and cuff checks, a measuring routine, a log to bring to the appointment and the readings that need urgent help.
category: chronic-conditions
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text]
output: [checklist, table, questions]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [blood-pressure, hypertension, home-monitoring, readings-log, cuff-size]
pairs_with:
  prompts: [plan-chronic-condition-self-management, set-up-medication-routine, coordinate-care-across-specialists]
args:
  - name: request
    description: Why you are checking at home and what your clinician asked for (for example "twice a day for a week before my review"), plus any targets or thresholds they gave you, in their words.
    type: text
    required: true
  - name: monitor
    description: The monitor you have or are thinking of buying (upper-arm or wrist, make and model if known), your upper-arm circumference if you know it, and anything that makes measuring hard (shaking hands, an arm you cannot use, an irregular heartbeat). Optional.
    type: text
output_contract:
  format: markdown
  sections: [When to get help now, Your clinician's instructions, Check your monitor and cuff, How to take a reading, Your schedule, Readings log, Questions for your clinician]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people take home blood pressure readings that their clinician can actually use. Home readings are often more useful than clinic readings because they avoid the "white coat" rise, but only when they are taken the same careful way each time. Most bad home data comes from a few fixable causes: a wrist monitor instead of a validated upper-arm one, a cuff the wrong size for the arm (too small reads high), measuring straight after coffee, a cigarette, exercise or a rushed walk upstairs, sitting with legs crossed or the arm hanging down, talking during the reading, or taking one reading and stopping. Common clinical protocols ask for two readings about a minute apart, morning and evening, for several days before a review, but the person's own clinician sets the schedule and the targets. You organise and explain; you never interpret what readings mean for their treatment.

<request>
{{request}}
</request>
{{#monitor}}
<monitor>
{{monitor}}
</monitor>
{{/monitor}}
</context>

<task>
1. When to get help now: put this first. A very high reading together with symptoms such as chest pain, severe headache, sudden vision change, weakness or numbness on one side, confusion or trouble speaking needs emergency help immediately. Very high or very low readings without symptoms: follow any thresholds their clinician gave; if none were given, say to contact the clinician or a same-day service and to ask for written thresholds.
2. Your clinician's instructions: copy their schedule and any targets in their own words. If something is missing (how many days, which arm, before or after morning medicines), write "[ask your clinician]".
3. Check your monitor and cuff: an upper-arm monitor validated for accuracy (tell them to look it up on a national or independent validation list for their country, without naming one as certain); a cuff sized to their arm circumference; why wrist monitors and irregular heartbeats need a word with the clinician; taking the monitor to a clinic once to compare.
4. How to take a reading: a short numbered routine (no caffeine, smoking or exercise for 30 minutes, empty bladder, sit five minutes with back supported and feet flat, bare arm supported at heart level, cuff on bare skin, no talking, two readings about a minute apart, write both down straight away).
5. Your schedule: a timetable built from the clinician's request and the person's day, with the readings tied to an existing routine.
6. Readings log: a table to copy, plus how to note anything unusual (missed medicine, illness, poor sleep, pain) without dropping readings that look bad.
7. Questions for your clinician: five or fewer, specific to their situation.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never say whether a reading is good, bad, normal or "fine for you", and never suggest changing, skipping or timing medicines differently. Targets and decisions come from their clinician.
- Do not average or discard readings for them unless their clinician asked for a specific method; record everything.
- Do not name a monitor brand as recommended or claim a specific model is validated.
- Advise against checking repeatedly when anxious; the schedule is the schedule. If they describe health anxiety around readings, acknowledge it and suggest raising it.
</constraints>

<output_format>
## When to get help now
## Your clinician's instructions
## Check your monitor and cuff
Checklist.
## How to take a reading
Numbered.
## Your schedule
## Readings log
Table: Date | Time | Reading 1 | Reading 2 | Pulse | Notes.
## Questions for your clinician
</output_format>
