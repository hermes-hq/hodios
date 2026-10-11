---
schema: 1
id: plan-walking-bus
kind: prompt
title: Plan a walking bus or bike train
description: Organises a walking bus or bike train to school with neighbouring families, with a route and stops, a volunteer rota, adult-to-child ratios, safety rules, weather plans and a sign-up form.
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
tags: [school-run, active-travel, walking-bus, bike-train, road-safety, volunteer-rota]
pairs_with:
  prompts: [plan-school-run-carpool, streamline-school-mornings, plan-child-independence-ladder]
args:
  - name: route
    description: Where families live relative to school, road crossings, distances and timings, as best you know.
    type: text
    required: true
  - name: group
    description: How many families and children, ages, and how many adults might volunteer and when.
    type: text
    required: true
  - name: mode
    description: Walking, cycling or both. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Route and stops, Ratios and roles, Volunteer rota, Safety rules, Weather and cancellations, Sign-up and consent, Talking to the school]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help parents set up a walking bus (children walk to school in a supervised group, picking others up at set stops on a timetable) or a bike train (the same on bikes). They cut cars at the school gate, give children exercise and independence, and free parents from daily runs. They work when the route is checked on foot for safe crossings, stops have fixed times, there are enough adults (a leader at the front and one at the back as a minimum, more for young children, busy roads or bikes), volunteers commit to a simple rota, and everyone knows what happens on a wet day or when a volunteer drops out. Some schools, councils or local road-safety teams support these schemes with guidance, training, high-visibility vests or insurance; it is worth asking.

<route>
{{route}}
</route>
<group>
{{group}}
</group>
{{#mode}}Mode: {{mode}}{{/mode}}
</context>

<task>
1. Route and stops: propose a route and stops with times, working back from the school start, favouring quiet streets, controlled crossings and wide pavements or paths. Say the route must be walked or ridden by adults first to check, and list what to look for (crossings, driveways, blind corners, narrow pavements).
2. Ratios and roles: suggest adult numbers for the group size and ages: a leader, a back marker, and extra adults for young children, busy crossings or cycling. Mark the numbers as suggestions and say to check any guidance from the school or local road-safety team.
3. Volunteer rota: a weekly table filling each day with at least the minimum adults from the volunteers given, a standby per week, and a fair count per family.
4. Safety rules: for children and adults: high-visibility vests, staying between the leader and back marker, crossing procedure, counting at each stop and at the gate, what to do if a child is late to a stop (the bus does not wait beyond a set time), and for bike trains: helmets where the family chooses or the law requires, bike checks, riding order and when to dismount.
5. Weather and cancellations: a rule for rain, ice, heat or darkness, and a message format for cancelling with notice.
6. Sign-up and consent: a short sign-up form with [placeholders]: child, stop, days, parent contacts, medical needs relevant to the walk, and consent for the child to travel with the group.
7. Talking to the school: what to ask for: support, drop-off arrangements at the gate, any guidance or insurance cover, and help recruiting families.
</task>

<constraints>
- Do not state legal requirements (helmets, ratios, insurance) as fact; mark them "check locally".
- Never run a group with a single adult or without an adult at the back.
- Do not invent the route's road conditions; base the plan on what is given and say what must be checked on foot.
- Use [placeholders] for names and contacts not given.
</constraints>

<output_format>
## Route and stops
Table: Stop | Time | Notes.
## Ratios and roles
## Volunteer rota
Table: Day | Leader | Back marker | Extra, then a count per family.
## Safety rules
## Weather and cancellations
## Sign-up and consent
Form in a code block.
## Talking to the school
</output_format>
