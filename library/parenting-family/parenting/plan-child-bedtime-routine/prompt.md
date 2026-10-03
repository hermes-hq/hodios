---
schema: 1
id: plan-child-bedtime-routine
kind: prompt
title: Plan a child's bedtime routine
description: Builds a bedtime routine matched to a child's age with wind-down steps and timings, plus calm ways to handle stalling and night waking and signs worth raising with a doctor.
category: parenting
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [text, preferences]
output: [plan, table, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [bedtime, sleep-routine, night-waking, toddlers, family-routines, wind-down]
pairs_with:
  prompts: [set-screen-time-plan, plan-behavior-approach]
  personas: [parenting-coach, bedtime-storyteller]
args:
  - name: child_age
    description: The child's age, for example "9 months", "3", "8".
    type: string
    required: true
  - name: current_routine
    description: What evenings look like now, wake-up and nap times, when they fall asleep, what goes wrong (stalling, fears, coming into your bed, night waking), siblings, room sharing and your work hours. Optional.
    type: text
output_contract:
  format: markdown
  sections: [How much sleep, The routine, Stalling, Night waking, Making the change, Talk to a doctor if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help parents build a bedtime routine that works. The evidence-backed basics are simple: a consistent bedtime and wake time, the same short sequence of calm steps every night, dim light and no screens in the last hour, the child falling asleep in their own sleep space, and a calm, boring response to stalling and night waking. Expected sleep varies by age; the American Academy of Sleep Medicine's ranges per 24 hours (including naps) are about 12 to 16 hours at 4 to 12 months, 11 to 14 hours at 1 to 2 years, 10 to 13 hours at 3 to 5 years, 9 to 12 hours at 6 to 12 years, and 8 to 10 hours at 13 to 18 years.

Child's age: {{child_age}}
{{#current_routine}}
<current_routine>
{{current_routine}}
</current_routine>
{{/current_routine}}
</context>

<task>
1. How much sleep: the typical range for this age and what it implies for bedtime given their wake-up time (and naps if relevant). If wake time is not given, ask, and work from an example.
2. The routine: a timed wind-down of about 20 to 45 minutes depending on age, working backwards from lights-out, with the same order every night (for example dinner, bath or wash, pyjamas, teeth, toilet, story or chat, cuddle and the same goodnight words, lights out). Include a visual chart idea for pre-schoolers, and a more independent version for older children and tweens that they help design. Fit it to siblings and the parents' schedule.
3. Stalling ("one more story", water, toilet, "I'm scared"): build the predictable requests into the routine, offer limited choices, and give calm scripts. For ages about 3 and up, describe a "bedtime pass" (one exchangeable request per night). For fears, validate briefly and use a comfort object or nightlight; do not dismiss or reinforce fears.
4. Night waking: what is normal at this age and a calm, consistent response: brief, quiet, low light, back to their own bed. Offer gentle options with different amounts of parent presence (for example gradually moving a chair out of the room) so the parent can choose what fits their values.
5. Making the change: introduce one change at a time, expect a few harder nights before it improves, keep weekends within about an hour of weekdays, and review after two weeks.
6. Talk to a doctor if: loud snoring most nights, pauses in breathing or gasping, very restless sleep, night terrors that are frequent or dangerous, sudden changes in sleep, daytime sleepiness or behaviour changes that may be linked to poor sleep, or the parent is exhausted and not coping.
</task>

<constraints>
- For babies under 12 months, follow safe-sleep guidance: on their back, in their own cot or crib on a firm flat surface, with nothing loose in it (no pillows, bumpers or loose blankets), and in the parents' room for at least the first six months where that is the local advice. Do not suggest any approach that conflicts with it.
- Do not recommend melatonin, antihistamines or any medicine or supplement; if the parent asks, say to discuss it with the child's doctor.
- No punitive approaches (threats, taking away comfort objects, locking doors). Respect different cultural practices, including co-sleeping, while giving safe-sleep information.
- If the child's age is missing, ask for it.
- Practical and brief; parents will read this tired.
</constraints>

<output_format>
## How much sleep
Two or three lines with the target bedtime.
## The routine
Table: Time | Step | Notes.
## Stalling
Scripts in quotes.
## Night waking
## Making the change
## Talk to a doctor if
</output_format>
