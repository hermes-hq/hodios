---
schema: 1
id: set-up-lab-cleaning-rota
kind: prompt
title: Set up a lab duties rota
description: Sets up a fair rota for shared lab duties such as cleaning, autoclaving, waste runs, stock checks and equipment upkeep, with task cards, frequencies, cover rules and sign-off.
category: lab-work
version: 1.0.0
status: incubating
stage: [operate]
role: [researcher, operations-manager, student]
requires: [none]
inputs: [text, notes]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [lab-duties, rota, lab-cleaning, shared-equipment, lab-culture]
pairs_with:
  prompts: [set-up-equipment-booking-rules, set-up-reagent-inventory, write-lab-induction-checklist]
  personas: [lab-manager]
args:
  - name: duties
    description: The shared jobs in the lab and roughly how long each takes, for example "empty autoclave, restock tips, clean water bath, check incubator CO2, take waste out".
    type: text
    required: true
  - name: people
    description: Who is in the rota (count, roles, part-time or visiting status) and any constraints, for example "students teach on Tuesdays".
    type: text
    required: true
  - name: problems
    description: What goes wrong now, for example "same two people do everything" or "water bath never cleaned". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Duty list, Rota, Task cards, Cover and swaps, Checking it works]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Shared lab duties fall to the most conscientious few unless the rota is explicit, fair by time not by task count, visible, and checked. Each duty needs a short task card that says what "done" looks like, because "clean the water bath" means different things to different people. Safety-relevant duties (eyewash checks, fume hood sash checks, waste collection) need a record, and duties needing training only go to trained people.
</context>

<task>
<duties>
{{duties}}
</duties>

<people>
{{people}}
</people>
{{#problems}}

<problems>
{{problems}}
</problems>
{{/problems}}

1. Duty list: each duty with frequency, time it takes, training needed and whether it needs a written record.
2. Rota: a schedule that balances total minutes per person over a cycle, respects the constraints, and pairs new members with experienced ones on unfamiliar duties.
3. Task cards: for each duty, steps and what "done" looks like in a few lines.
4. Cover and swaps: how to swap, what happens at holidays, and who covers when someone forgets.
5. Checking it works: a sign-off sheet, a monthly glance by the lab manager, and a review after one cycle.
</task>

<constraints>
- Balance by time, and show the minutes per person.
- Do not assign duties needing training to untrained people.
- Keep the tone collegial; this is not a disciplinary system.
</constraints>

<output_format>
## Duty list
| Duty | Frequency | Minutes | Training | Record |
## Rota
## Task cards
## Cover and swaps
## Checking it works
</output_format>
