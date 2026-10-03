---
schema: 1
id: choose-extracurricular-activities
kind: prompt
title: Choose after-school activities
description: Helps parents choose after-school activities by the child's interests, energy, cost and family schedule, with how many is too many and when to let a child quit.
category: parenting
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [preferences, text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [after-school-activities, extracurriculars, clubs, overscheduling, quitting, family-schedule]
pairs_with:
  prompts: [coordinate-family-calendar, plan-school-run-carpool, help-child-make-friends]
  personas: [parenting-coach]
args:
  - name: child
    description: Age, interests, temperament and what they have tried, for example "8, loves drawing and dinosaurs, tired after school, hated football, shy in groups".
    type: text
    required: true
  - name: budget_per_month
    description: What you can spend per month on activities including kit and travel, with currency, for example "60 EUR" or "about 100 dollars".
    type: string
    required: true
  - name: schedule
    description: Days and times that work, who can drive, siblings' commitments, for example "Tuesday and Thursday after 4.30, Saturday mornings; no car on weekdays". Optional.
    type: text
output_contract:
  format: markdown
  sections: [What your child needs from an activity, Shortlist, How many is enough, Try before you commit, Hidden costs and checks, When to let them quit, Decision]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help families choose activities that a child will enjoy and the family can sustain. A good activity fits the child's interests and energy, adds something school does not (movement, creativity, a different friend group, mastery), and fits the budget and the week without squeezing out free play, homework, sleep and family time. Children's interest often comes after a few sessions of competence, so a short trial with an agreed minimum is wiser than either forcing or quitting at the first wobble.

<child>
{{child}}
</child>
Budget per month: {{budget_per_month}}
{{#schedule}}Schedule: {{schedule}}{{/schedule}}
</context>

<task>
1. What your child needs from an activity: from the description, name two or three needs (for example energy release, a calm creative outlet, confidence in groups, a friend group outside school) and what to avoid (for example highly competitive teams for a child who hated football).
2. Shortlist: six to eight activities across different types (movement, creative, music, nature, building and science, community), each with why it fits this child, typical time commitment, a cost range to check locally rather than a price, and whether it suits the schedule given.
3. How many is enough: a sensible weekly load for this age and energy level, protecting at least some unscheduled afternoons, homework time and sleep, and signs of overscheduling (tiredness, dread before sessions, no time with friends, family dinners disappearing).
4. Try before you commit: how to use taster sessions, holiday camps, library or community-centre options and borrowed kit, with an agreed trial length (for example "until half-term" or six sessions) that the child helps set.
5. Hidden costs and checks: kit, uniforms, exams or competitions, travel and parent time; and safeguarding questions to ask any club (are coaches vetted under local rules, is there a child protection policy and a named lead, are parents welcome to watch, how are injuries and medical needs handled).
6. When to let them quit: a simple rule such as "finish the term or the paid block unless something is wrong", what counts as something wrong (a coach who shames or frightens, injury, bullying, lasting distress, any safeguarding concern: stop straight away), how to tell a wobble from real dislike, and how to quit well (thank the coach, reflect on what they learned).
7. Decision: recommend one or two options to start with and the budget split, and a review date.
</task>

<constraints>
- Never state prices as facts; give rough ranges labelled "check locally", or leave them as [cost].
- Respect the budget strictly, counting kit and travel; include free or low-cost options if the budget is tight.
- Do not push competition, elite pathways or "early specialisation" for young children; suggest variety first.
- Use the child's own interests; if they are not described, ask, and offer a broad starter set meanwhile.
- Before answering, check the recommended options fit within the budget and the available days.
</constraints>

<output_format>
## What your child needs from an activity
## Shortlist
Table: Activity | Why it fits | Time per week | Cost range (check locally) | Fits schedule?
## How many is enough
## Try before you commit
## Hidden costs and checks
Checklist of questions to ask a club.
## When to let them quit
## Decision
</output_format>
