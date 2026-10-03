---
schema: 1
id: streamline-school-mornings
kind: prompt
title: Streamline school mornings
description: Streamlines school-day mornings with a backwards timed schedule, a night-before routine, picture or word checklists per child and specific fixes for the household's bottlenecks.
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
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [school-mornings, family-routines, visual-checklist, getting-out-the-door, morning-rush]
pairs_with:
  prompts: [set-up-routines-for-child-with-adhd, create-chore-chart, coordinate-family-calendar]
  personas: [parenting-coach]
args:
  - name: children
    description: Each child's age and anything relevant, for example "6 (can't read yet, slow eater), 11 (wants a shower every morning), baby 1".
    type: text
    required: true
  - name: bottlenecks
    description: Where mornings break down, for example "one bathroom for five people", "can never find shoes", "arguments over the TV", "I'm making lunches at 8am", plus the adults' work start times.
    type: text
    required: true
  - name: leave_time
    description: The time you need to leave the house, for example "8:05".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Your morning at a glance, The night before, Checklists for each child, Fixes for your bottlenecks, Your own routine, Making it stick]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You fix chaotic school mornings. Most morning stress comes from a few predictable causes: decisions left until the morning (clothes, lunches, lost shoes), a schedule with no buffer, parents acting as the children's memory, screens that are hard to switch off, and one shared bottleneck such as a bathroom. The fixes: move every possible decision to the evening, plan backwards from the leave time with a 10–15 minute buffer, put each child's steps on a visible checklist (pictures for non-readers), make screens and treats conditional on being ready ("when you're ready, then"), and give the parents a head start.

Children: {{children}}
Leave time: {{leave_time}}

<bottlenecks>
{{bottlenecks}}
</bottlenecks>
</context>

<task>
1. Your morning at a glance: a timed schedule built backwards from {{leave_time}}, including a buffer before leaving, the parents' wake-up time, each child's wake-up time (staggered if there is a bathroom queue), and who is where at each point. State any assumptions about how long things take.
2. The night before: a 15-minute evening routine (bags packed and by the door, clothes chosen including shoes and coats, lunches made or prepared, forms signed, the next day's activities checked, breakfast set out), with who does what, adjusted to the children's ages.
3. Checklists for each child: a short, ordered checklist per child that they can follow by themselves, with picture prompts described for children who cannot read, and where to put it (bedroom door, bathroom mirror).
4. Fixes for your bottlenecks: for each bottleneck named, the specific fix and why it works (for example, a bathroom rota; a "launch pad" by the door for shoes, bags and keys; breakfast on the table before the children come down; no screens until ready, then whatever time is left).
5. Your own routine: what the parents do before the children wake or in parallel so they are not rushing, and how to split jobs between adults if there are two.
6. Making it stick: run it for two weeks, start with a "practice morning" at the weekend, praise each child for following their list, adjust timings at the end of week one, and keep the evening routine non-negotiable.
</task>

<constraints>
- Fit every step to the child's age: a 4-year-old needs help with dressing; a 12-year-old can own their own checklist and alarm.
- Keep the morning calm: no punishments, threats or rewards that cost money every day; use simple when-then rules and praise.
- If a child's morning struggles look like more than habit (school refusal, stomach aches every school day, extreme distress), say gently that it may be worth talking to the school or the family doctor.
- Use the times and details given; if a key fact is missing (school start time, travel time), state an assumption.
- Short and scannable; this will be printed and stuck on the fridge.
</constraints>

<output_format>
## Your morning at a glance
Table: Time | Adults | one column per child, headed by age (for example "Age 6"), with a "Bathroom" column if it is shared.
## The night before
## Checklists for each child
One short checklist per child.
## Fixes for your bottlenecks
Table: Bottleneck | Fix | Why it works.
## Your own routine
## Making it stick
</output_format>
