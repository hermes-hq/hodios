---
schema: 1
id: match-childcare-to-shift-rotas
kind: prompt
title: Match childcare to shift rotas
description: Lines up two adults' shift rotas against school and childcare hours over a full rota cycle, finds every uncovered hour, and plans cover, handovers and sleep for night workers.
category: family-logistics
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [text, preferences]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [shift-work, rota, childcare-gaps, night-shifts, working-parents, handovers]
pairs_with:
  prompts: [coordinate-family-calendar, plan-sick-day-childcare-cover, plan-school-run-carpool]
args:
  - name: rotas
    description: 'Each adult''s shift pattern for a full cycle, with start and end times and travel time, for example "Sam: 4 on 4 off, 07:00-19:00 then 19:00-07:00, 30 min commute; Alex: Mon-Fri 9-5:30".'
    type: text
    required: true
  - name: children
    description: Children's ages and fixed hours, such as school, nursery or childminder times, clubs, and drop-off or pickup times.
    type: text
    required: true
  - name: cover_options
    description: Paid or family cover already available, with hours and cost, for example "breakfast club from 7.45, childminder until 6pm, grandparents Tuesdays". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, The coverage grid, Uncovered hours, Options to close each gap, Handovers and sleep, Rota requests, Next cycle check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help families where one or both adults work shifts: nurses, police, care workers, factory, transport and retail staff. A weekly plan does not work for them because rotas repeat on cycles of 2 to 8 weeks that do not line up with the school week. The common failures are gaps that only show up once a month, a night worker who never sleeps because they do the school run after a night shift, and childcare booked for fixed days that the rota does not respect. The fix is to lay the whole rota cycle against the children's fixed hours, find every uncovered hour including commute time, and protect sleep as a fixed block, not an afterthought.

<rotas>
{{rotas}}
</rotas>
<children>
{{children}}
</children>
{{#cover_options}}
<cover_options>
{{cover_options}}
</cover_options>
{{/cover_options}}
</context>

<task>
1. Assumptions: state the cycle length you used (the lowest common multiple of the rotas, capped at 8 weeks, or say if it is longer), the commute times, and anything you had to guess.
2. The coverage grid: for each day of the cycle, show who is at work (including travel), who is asleep after a night shift, who is free, and the children's fixed hours. Treat the 7 to 8 hours after a night shift as unavailable for childcare, apart from a sleeping parent being in the house as a last resort for an older child, which you mark as a risk.
3. Uncovered hours: list every slot where a child under the age they can safely be alone has no awake adult, including early starts before breakfast club, late finishes after nursery closes, and school holidays or inset days if given.
4. Options to close each gap: for each, offer 2 or 3 options with rough trade-offs: a paid setting with extended hours, a childminder who takes irregular days, a relative, a swap with another shift-working family, a rota request, or changing the fixed booking. Use costs only from {{cover_options}}; otherwise say "cost to check".
5. Handovers and sleep: a short handover routine for the overlap between parents (what the outgoing parent writes or says: meals, homework, worries), and a sleep protection plan for the night worker: blackout, phone off, the other adult or cover takes the school run.
6. Rota requests: a short, polite request the user could make to their employer for specific shift swaps or fixed days, based on the worst gaps, without promising it will be granted.
7. Next cycle check: what to re-check when the rota is published.
</task>

<constraints>
- Never schedule a parent to drive the school run straight after a night shift without flagging fatigue risk and offering an alternative.
- Never leave a young child without an awake, responsible adult to close a gap.
- Do not invent childcare providers, prices or opening hours; use only what is given or mark "to check".
- If a rota is incomplete, build the grid for what is given and list what is missing.
- Check every day of the cycle against the grid before answering; do not stop at the first week.
</constraints>

<output_format>
## Assumptions
## The coverage grid
Table: Day | Adult 1 | Adult 2 | Children's fixed hours | Covered?
## Uncovered hours
Table: Day | Time | Child | Why uncovered.
## Options to close each gap
## Handovers and sleep
## Rota requests
Message in a code block.
## Next cycle check
</output_format>
