---
schema: 1
id: plan-relatives-extended-stay
kind: prompt
title: Plan relatives' extended stay
description: Plans a week or more of relatives staying in the family home, with sleeping arrangements, keeping the children's routines, shared meals and costs, breathing space, and agreed expectations.
category: family-logistics
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
depth: specific
tags: [houseguests, visiting-relatives, hosting, children-routines, shared-space, expectations]
pairs_with:
  prompts: [plan-holiday-visits-between-families, plan-family-meeting, coordinate-family-calendar]
args:
  - name: visit
    description: Who is coming, ages and any needs (mobility, diet, sleep), and how long, for example "my in-laws, both 70s, three weeks over the summer".
    type: text
    required: true
  - name: home
    description: Rooms and beds available, bathrooms, and the household with children's ages and routines.
    type: text
    required: true
  - name: concerns
    description: What usually gets hard, for example "bedtimes slip, Grandpa watches TV loud, I end up cooking for eight every night". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Sleeping and space, Routines to protect, Meals and costs, The rhythm of the stay, Breathing space, Expectations to share, If tension builds]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a family host relatives for an extended stay: grandparents visiting from abroad, siblings between homes, cousins for the summer. A long stay is different from a weekend: the house has to run as a home, not as a hotel. What goes wrong is cumulative: children's bedtimes and schoolwork drift, one host cooks and cleans for everyone for weeks, everyone shares one bathroom at 7.30am, there is nowhere for anyone to be alone, and small irritations build until there is a row in week two. Families who enjoy long stays agree the shape of an ordinary day in advance, share cooking and costs openly, protect the children's routines, and plan breathing space for guests as well as hosts.

<visit>
{{visit}}
</visit>
<home>
{{home}}
</home>
{{#concerns}}Concerns: {{concerns}}{{/concerns}}
</context>

<task>
1. Sleeping and space: allocate beds and rooms, considering the guests' age and mobility (stairs, a bathroom nearby), who gives up a room, and how to make a displaced child feel fine about it. Plan a bathroom schedule for busy mornings and a place for guests' things.
2. Routines to protect: list the children's routines that should stay fixed (school mornings, bedtime on school nights, homework, naps) and the ones that can relax, and how to explain this to relatives without offence.
3. Meals and costs: a simple plan for shared cooking (a rota or nights each household cooks), shopping and how costs are shared or offered, respecting the guests' diets and cultural norms about hospitality.
4. The rhythm of the stay: an outline of an ordinary weekday and weekend day, plus a few outings or special days spread across the stay rather than all at the start.
5. Breathing space: time and places for the hosts' household alone, for the guests alone (their own outings, a quiet room, a day trip), and for each parent.
6. Expectations to share: a short, warm message or conversation script to send or have before arrival covering routines, help around the house, the car, quiet hours and anything from the concerns.
7. If tension builds: a few low-key ways to reset during the stay, such as a quick check-in between the adults, splitting up for a day, or naming a small issue early.
</task>

<constraints>
- Be respectful of the guests and of cultural differences in hospitality; do not treat relatives as a problem to manage.
- Do not let the plan put all hosting work on one adult; share it out visibly.
- Account for guests' mobility or health needs in the room plan if given.
- Use [placeholders] for names not given.
</constraints>

<output_format>
## Sleeping and space
Table: Person | Room | Notes, then the morning bathroom order.
## Routines to protect
Two lists: Stays fixed | Can relax.
## Meals and costs
## The rhythm of the stay
## Breathing space
## Expectations to share
Script in a code block.
## If tension builds
</output_format>
