---
schema: 1
id: plan-solo-parenting-stretch
kind: prompt
title: Plan a solo-parenting stretch
description: Plans the practical side of running the household alone for days or weeks while the other parent travels for work, finding the two-places-at-once clashes and lining up help in advance.
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
depth: specific
tags: [solo-parenting, work-travel, clash-finding, backup-childcare, batch-cooking, household-routines]
pairs_with:
  prompts: [prepare-child-for-parent-absence, coordinate-family-calendar, plan-sick-day-childcare-cover]
args:
  - name: dates
    description: How long the other adult is away and when, for example "Mon 3rd to Fri 14th, home the middle weekend".
    type: string
    required: true
  - name: schedule
    description: The week as it normally runs with two adults, including work hours, school runs, clubs, pets and who usually does what.
    type: text
    required: true
  - name: helpers
    description: People who could help and when, for example "my sister Wednesdays, neighbour can do one pickup a week". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Clashes, Fixes for each clash, The solo week, Before they leave, Keeping it light, If something goes wrong]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a parent who will run the household alone while their partner is away for work: a conference, a two-week project, a rotation offshore. The hard part is not the evenings; it is the handful of moments where the normal week relies on two adults being in two places at once: one child's swimming and the other's football at 5pm, the 8am meeting that collides with drop-off, the dog that needs walking during the school run. Those clashes are solvable in advance and painful on the day. A good plan also lowers the bar on purpose (simpler meals, fewer extras) because one adult doing two jobs for a fortnight burns out. This entry covers logistics; helping children cope emotionally with a parent's absence is a separate job.

Away: {{dates}}
<normal_week>
{{schedule}}
</normal_week>
{{#helpers}}
<helpers>
{{helpers}}
</helpers>
{{/helpers}}
</context>

<task>
1. Clashes: go through the normal week and list every moment that needs two adults or one adult in two places, plus any task only the absent partner normally does (bins, a medication, the car, a login or account). Include the departure and return days.
2. Fixes for each clash: for each, offer the simplest fix: a helper, a swap with another family, skipping one session, moving a meeting, a later start agreed with work, or paid help. Prefer asking for help once for the whole stretch over daily requests.
3. The solo week: a day-by-day table for the stretch: who does each run, what is for dinner (simple or prepared ahead), and one thing the parent does for themselves.
4. Before they leave: a checklist for the departing partner: hand over their regular tasks, share passwords or account access the family needs, fill the car, fix anything broken, book any appointment that cannot move, and agree a call time with the children.
5. Keeping it light: a short list of what to drop or simplify for the stretch (clubs, cleaning standard, cooking), and batch tasks to do on day one.
6. If something goes wrong: the plan if the solo parent or a child gets ill, with the first two people to call, and what the absent partner can do remotely (booking, calling school, ordering food).
</task>

<constraints>
- Do not plan anything that leaves a young child unsupervised to resolve a clash.
- Do not assume a helper is free beyond what is given; mark proposed asks as "to ask".
- Keep the plan realistic for one tired adult: no more than the normal week's load, preferably less.
- Use [placeholders] for names and contacts not given.
</constraints>

<output_format>
## Clashes
Table: Day | Time | Clash | Why.
## Fixes for each clash
## The solo week
Table: Day | Morning | After school | Dinner | For you.
## Before they leave
Checklist.
## Keeping it light
## If something goes wrong
</output_format>
