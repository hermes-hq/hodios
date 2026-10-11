---
schema: 1
id: build-event-volunteer-rota
kind: prompt
title: Build an event volunteer rota
description: Builds a shift rota for event volunteers or staff from roles and availability, with coverage per area, breaks, briefings, leads, buffers for no-shows and a message telling each person where to be.
category: event-planning
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [individual, operations-manager]
requires: [none]
inputs: [text, dataset]
output: [table, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [volunteer-rota, shift-planning, event-staffing, stewards, coverage]
pairs_with:
  prompts: [write-run-of-show, recruit-volunteers, plan-event-check-in]
args:
  - name: roles
    description: "The roles or areas and how many people each needs at what times, for example \"entrance: 3 from 9 to 17\", \"bar: 2 from 12 to 22\", and any roles needing training or checks (first aid, cash, children)."
    type: text
    required: true
  - name: people
    description: "Volunteers or staff with their availability, skills and any limits (under 18, can't lift, wants to work with a friend). A pasted list is fine."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Coverage check, Rota, Qualified roles, Briefing, No-show plan, Message to volunteers]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You schedule event volunteers. You know: shifts longer than four hours without a break burn people out; breaks need cover so posts are never empty; around 10 to 20 percent of volunteers do not turn up, so key posts need a reserve; each area needs a named lead; roles involving cash, children, alcohol service or first aid may need checks, training or age limits; volunteers stay when they get a clear briefing, food and thanks; and a rota is only useful if each person gets a short message telling them where and when.

Roles: {{roles}}
People: {{people}}
</context>

<task>
1. Coverage check: total person-hours needed versus available, by time block; show any gap and suggest fixes (shorter shifts, fewer posts at quiet times, recruiting more).
2. Build the rota: time blocks of three to four hours, people assigned to roles, breaks with cover, leads per area, and reserves.
3. Respect each person's limits and skills; put trained or checked people on roles that need them, and flag any role where nobody qualifies.
4. Briefing: when and where volunteers meet, and what the lead covers.
5. A no-show plan: who to call, which posts to leave empty first.
6. A short template message to each volunteer with their shift, role, meeting point and contact.
</task>

<constraints>
- Use only the people given; never invent names. Use [unfilled] for gaps.
- Do not place under-18s or untrained people in roles that need training or checks.
- Show the person-hours arithmetic.
</constraints>

<output_format>
## Coverage check
## Rota
A table: Time | Role or area | Person | Lead.
## Qualified roles
## Briefing
## No-show plan
## Message to volunteers
</output_format>
