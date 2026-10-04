---
schema: 1
id: set-up-farm-lone-working-checks
kind: prompt
title: Set up farm lone-working checks
description: Sets up a lone-working routine for people working alone on a farm, with check-in times, location sharing, jobs never done alone and exactly what happens when a check-in is missed.
category: farming
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [individual, founder, manager, parent]
subject: [agriculture]
requires: [none]
inputs: [notes, text]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [lone-working, check-in-routine, missed-check-in, farm-family, personal-alarm]
pairs_with:
  prompts: [write-farm-task-risk-assessment, build-farm-daily-job-sheet, write-farm-safety-induction]
  personas: [farm-safety-adviser]
args:
  - name: people
    description: Who works alone, on what jobs, when and where (out-of-sight fields, night calving checks, hill ground), plus age, health or experience that matters, and who is at home or nearby to respond.
    type: text
    required: true
  - name: signal_coverage
    description: Mobile phone signal across the farm - good everywhere, patchy (some dead spots), or none in large areas.
    type: enum
    enum: [good, patchy, none]
    default: patchy
output_contract:
  format: markdown
  sections: [Who works alone, Never-alone jobs, Check-in routine, If a check-in is missed, Kit and location, Talking it through, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a farm set up a lone-working routine that works on a busy day, not just on paper. Farmers routinely work alone out of sight and sound, and the gap between an accident and someone noticing can be hours: a person pinned by a quad bike, kicked in a calving pen at 2 a.m., or taken ill at the far end of the farm. Routines fail when check-ins are vague ("ring if you're late"), when nobody knows where the person went, when the person at home does not know what to do if the call does not come, and when signal is assumed. A good routine says where you are going, when you will check in, which jobs you never do alone, and an exact, timed escalation when a check-in is missed.

Signal coverage: {{signal_coverage}}
</context>

<task>
<people>
{{people}}
</people>

1. List who works alone, on what, when and where, and rate each pattern low, medium or high risk by the job, location, time of day and the person (age, health, experience).
2. Name the jobs never done alone, adapted to this farm. Include, where relevant: entering any slurry pit, tank, grain bin or other confined space; handling bulls or cows with newborn calves; work at height or on roofs; chainsaw and tree work; difficult calvings or lambings needing restraint; work near water in flood; repairs under raised machinery.
3. Set the check-in routine: "where I am going and back by" (whiteboard, shared message or app), check-in intervals by risk (default every 2 hours for medium, every hour or a buddy for high, and a fixed last check at night), and a named responder for each person.
4. Write the missed check-in plan with times: try to call or message; at a set time (default 15 minutes) a second attempt and alert another person; at a set time (default 30-45 minutes, sooner for high-risk jobs or night work) two people go to the last known location, taking a phone and first aid kit; call emergency services if the person is hurt or not found quickly. Say what to tell emergency services (exact location, access gate, hazards).
5. Kit and location: phone kept on the body not in the vehicle, signal-free alternatives for {{signal_coverage}} coverage (radios, a personal alarm or lone-worker device with location, agreed field names and gate numbers on a farm map, a meeting point where signal works), torch, first aid kit, quad or vehicle rules.
6. Write how to talk it through with family or staff so it sticks, including people who resist ("I've done this for 40 years").
</task>

<constraints>
- Use only the people, places and jobs given; mark missing details `[CONFIRM]`.
- Do not name or recommend specific brands, apps or devices; describe features to look for.
- Never suggest that the responder enters a slurry pit, confined space or water to rescue someone; call emergency services and stay out.
- If nobody is ever available to respond, say so plainly and suggest options (a neighbour arrangement, a monitored device, rescheduling high-risk jobs).
- If the people working alone are not described, ask and stop.
</constraints>

<output_format>
## Who works alone
Table: person | jobs alone | where | when | risk (low/medium/high).

## Never-alone jobs
Bulleted list.

## Check-in routine
Table: person | check-in method | interval | responder | last check.

## If a check-in is missed
Numbered, timed steps a responder can follow at 3 a.m. Put this on one card.

## Kit and location
Bullets.

## Talking it through
Three to five bullets.

## Questions
What to confirm.
</output_format>
