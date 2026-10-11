---
schema: 1
id: plan-household-cover-for-parent-surgery
kind: prompt
title: Plan household cover for a parent's surgery
description: Plans how a family runs while a parent has planned surgery and recovers, covering childcare, school runs, meals, lifting limits and help rotas from the week before until they are back to normal.
category: family-logistics
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [text, preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [planned-surgery, recovery, help-rota, meal-train, school-run, lifting-limits]
pairs_with:
  prompts: [plan-solo-parenting-stretch, coordinate-family-calendar, write-babysitter-handbook]
args:
  - name: procedure
    description: What the surgery is, the hospital stay and the recovery limits the medical team gave, for example "knee replacement, 2 nights in, no driving 6 weeks, no carrying heavy things".
    type: text
    required: true
  - name: household
    description: Who lives at home, children's ages and routines, pets, and what the parent having surgery normally does.
    type: text
    required: true
  - name: helpers
    description: People who offered help and when they can, for example "sister can stay the first 3 nights; two friends offered meals". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Questions for the medical team, Phases, Cover rota, Jobs the patient cannot do, Before admission, Help asks, Explaining it to the children]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a family plan the practical side of a parent's planned operation: who does the school run, who lifts the toddler, who cooks, and how the person recovering actually rests. The common mistakes are planning only for the hospital days and not the weeks of restricted movement after, forgetting the jobs only the patient normally does, accepting vague offers of help instead of booking specific slots, and a recovering parent lifting a child or driving too early because there was no one else. Recovery limits always come from the surgical team; your job is to turn those limits into a household plan.

<procedure>
{{procedure}}
</procedure>
<household>
{{household}}
</household>
{{#helpers}}
<helpers>
{{helpers}}
</helpers>
{{/helpers}}
</context>

<task>
1. Questions for the medical team: list what to confirm before planning: length of stay, how long no driving, no lifting (and how heavy), stairs, showering, when they can be alone with young children, follow-up appointments, and warning signs that mean calling the hospital.
2. Phases: split the period into before admission, hospital days, the first two weeks home, and the rest of recovery, using only the limits given and marking anything unknown "to confirm".
3. Cover rota: a table per phase covering school runs, childcare, meals, bedtime, pets, shopping and lifts to follow-up appointments, using the helpers given and marking open slots.
4. Jobs the patient cannot do: list the jobs they normally do that clash with their limits, such as lifting a small child into a car seat or cot, carrying laundry, driving, walking a strong dog, and who takes each.
5. Before admission: a checklist: batch-cook or set up meal deliveries, move everyday items to waist height, set up a downstairs rest spot if stairs are hard, prescriptions collected, school and work told, a care sheet for helpers about the children's routines.
6. Help asks: turn vague offers into specific asks with a short message template ("Could you do the Tuesday and Thursday school pickups on [dates]?") and a shared list of slots.
7. Explaining it to the children: a few age-appropriate lines about what is happening, what will be different, and how they can help, such as small jobs and gentle hugs.
</task>

<constraints>
- Never give medical advice or invent recovery timelines; every limit comes from the team or is marked "to confirm".
- Do not plan for the recovering parent to lift, drive or care for young children alone before the team says they can.
- Do not assume helpers beyond what is given; mark open slots clearly.
- Use [placeholders] for names, dates and contacts not given.
</constraints>

<output_format>
## Questions for the medical team
Checklist.
## Phases
## Cover rota
One table per phase: Task | Who | Days.
## Jobs the patient cannot do
## Before admission
Checklist.
## Help asks
Message template in a code block.
## Explaining it to the children
</output_format>
