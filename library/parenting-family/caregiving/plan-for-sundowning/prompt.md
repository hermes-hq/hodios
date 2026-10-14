---
schema: 1
id: plan-for-sundowning
kind: prompt
title: Plan for late-day agitation in dementia
description: Helps a family carer handle sundowning, the late-afternoon and evening restlessness of some people with dementia, with a pattern log, causes to check, a calmer evening routine and when to get help.
category: caregiving
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [individual]
requires: [none]
inputs: [notes, text]
output: [plan, checklist, questions]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [dementia, sundowning, agitation, evening-routine, carers]
pairs_with:
  prompts: [plan-dementia-conversations, plan-carer-sleep, plan-dementia-walking-safety]
  personas: [eldercare-advisor]
args:
  - name: what_happens
    description: What happens in the late afternoon or evening (pacing, asking to go home, shouting, suspicion, crying), when it starts, how long it lasts, and what seems to help or worsen it.
    type: text
    required: true
  - name: day
    description: A typical day, including naps, meals, drinks, caffeine, activity, light, TV, visitors and medicines times as given. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Check first, Spot the pattern, Shape the day, The evening routine, In the moment, Questions for their doctor, Your evenings]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help family carers manage sundowning the way an experienced dementia nurse would. Many people with dementia become more confused, restless, anxious or agitated in the late afternoon and evening. Contributing factors often include tiredness, fading light and shadows, hunger or thirst, pain, needing the toilet, too much or too little activity, a long afternoon nap, caffeine, a noisy household at dinner time, and the carer's own tiredness being picked up. A sudden worsening can signal a physical problem such as an infection, constipation, pain or a medicine effect, which needs a doctor rather than a routine. What works: noticing the pattern, front-loading activity and outdoor light earlier in the day, a predictable, calm late afternoon, responding to the feeling behind "I want to go home" rather than arguing, and the carer getting relief in the evenings.

<what_happens>
{{what_happens}}
</what_happens>
{{#day}}Typical day: {{day}}{{/day}}
</context>

<task>
1. Check first: if anything suggests a sudden change (new over a few days, fever, pain, not passing urine, constipation, a fall, a new medicine, much more drowsy), say to contact their doctor promptly before relying on routines.
2. Spot the pattern: a simple two-week log template (time it starts, what happened before, food, drink, nap, activity, light, noise, what helped) and what to look for.
3. Shape the day: changes earlier in the day (morning light and outdoor time, activity that suits them, a short early nap rather than a long late one, caffeine earlier, main meal at lunch if it helps, drinks spread through the day).
4. The evening routine: a calm late-afternoon routine for this person, with lights on before dusk, curtains closed, quieter TV and household, a familiar activity, a snack, toilet, and a predictable bedtime sequence.
5. In the moment: what to say and do when it happens (stay calm, validate the feeling, short sentences, redirect to an activity or a walk, avoid arguing or quizzing), with a few example responses to the things this person says.
6. Questions for their doctor: about pain, sleep, infections, constipation, medicines and their timing, and support from a memory service or dementia nurse.
7. Your evenings: ways the carer gets a break at this time (someone else covers the hardest hour, a sitter, rotating with family) and protecting their own sleep.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not suggest sedatives, sleep aids, alcohol, supplements or changes to medicines; frame medicines as questions for the doctor or pharmacist.
- Never suggest restraint, locking the person in a room, or arguing them out of their reality.
- Keep example responses respectful and truthful in spirit; avoid elaborate lies.
- If anyone is at risk of harm during episodes, say to contact their care team urgently or emergency services if in immediate danger.
</constraints>

<output_format>
## Check first
## Spot the pattern
Log template table.
## Shape the day
## The evening routine
Timed routine.
## In the moment
## Questions for their doctor
## Your evenings
</output_format>
