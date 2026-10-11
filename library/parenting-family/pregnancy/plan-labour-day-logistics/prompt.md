---
schema: 1
id: plan-labour-day-logistics
kind: prompt
title: Plan labour day logistics
description: Plans the practical side of going into labour, with transport and backup routes, cover for older children and pets, a who-to-call list, a fridge-door card and what changes for a fast or early labour.
category: pregnancy
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [preferences, text]
output: [plan, checklist, table]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [labour, birth-logistics, older-siblings, contingency-plan, maternity-care]
pairs_with:
  prompts: [write-birth-partner-guide, write-birth-preferences, prepare-for-new-baby]
args:
  - name: household
    description: Where you live and plan to give birth, roughly how far and how you would travel, who will be with you, older children and their routines, pets, work patterns of the birth partner, and the country.
    type: text
    required: true
  - name: helpers
    description: Who could help and when, for example "my sister 15 min away, free evenings and weekends; neighbour has a key; in-laws 3 hours away". Optional.
    type: text
  - name: due_date
    description: The due date, and whether an induction or caesarean date is booked. Optional.
    type: string
output_contract:
  format: markdown
  sections: [The plan at a glance, Getting there, Children and pets, Who to call, Fridge-door card, If it happens fast or early, Gaps to fix]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan labour logistics the way a well-organised friend who has done it twice would. Labour rarely starts at a convenient time: often at night, sometimes while the birth partner is at work, and second labours are often faster. The plans that fail are the ones with a single point of failure: one driver, one person to mind the toddler, a car with no fuel, a phone number nobody else has. Many people are told to phone the maternity unit before setting off; when to go in depends on what the unit advises, not on a generic rule.

<household>
{{household}}
</household>
{{#helpers}}
<helpers>
{{helpers}}
</helpers>
{{/helpers}}
{{#due_date}}Due date and bookings: {{due_date}}{{/due_date}}
</context>

<task>
1. The plan at a glance: five lines saying who does what when labour starts, day and night.
2. Getting there: primary transport with the route and journey time at different times of day (rush hour, night), a backup (second driver, taxi or ride service, and when to call an ambulance instead), parking and which entrance to use at night as things to check on a visit, and car readiness (fuel or charge, car seat fitted for coming home). Say to phone the unit before leaving, as most units ask, and to follow their advice.
3. Children and pets: a first-choice and a backup carer for each, including night-time; a handover sheet with routines, food, bedtime, school or nursery pickup and who is authorised to collect; how to prepare older children ("someone you know will look after you"); pet feeding and walks, and a key arrangement.
4. Who to call: a table of names left as blanks with role, number, when to call (labour starts, leaving for hospital, after the birth), and who tells everyone else so the parents are not answering messages.
5. Fridge-door card: a short card in a code block with the maternity unit number line, address, carers for children, key holder and the emergency number for their country.
6. If it happens fast or early: what changes if labour is quick, the birth partner is far away, or it starts weeks before the due date; what to do if the baby seems to be coming before they can leave (call emergency services and follow their instructions).
7. Gaps to fix: every single point of failure in their plan, with a suggestion and a "by week" deadline, aiming to have everything in place by about 36 weeks or a week before a booked date.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Give no medical rule about when to go in or how to manage labour at home; the maternity unit's advice wins, and calling them is always fine.
- Include the reasons to call the unit or emergency services straight away in the "If it happens fast or early" section: bleeding, waters that are green or brown, reduced baby movements, constant severe pain, a strong urge to push, or feeling very unwell.
- Never invent phone numbers, addresses or names; leave blanks to fill in.
- Assign people only to times they said they are available. If a gap remains, say so.
- Do not advise driving yourself while in active labour; the person giving birth should not be the driver.
- Scannable bullets and tables, not prose.
</constraints>

<output_format>
## The plan at a glance
## Getting there
## Children and pets
## Who to call
Table: Who | Role | Number | When to call.
## Fridge-door card
Code block.
## If it happens fast or early
## Gaps to fix
Table: Gap | Fix | By week.
</output_format>
