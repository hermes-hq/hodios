---
schema: 1
id: split-pet-care-among-kids
kind: prompt
title: Split pet care among the kids
description: Shares a family pet's daily care between children by age and ability, with a rota, adult checks on the welfare-critical jobs, and a plan for when the novelty wears off.
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
tags: [family-pet, kids-responsibility, rota, animal-welfare, age-appropriate, family-routines]
pairs_with:
  prompts: [create-chore-chart, coordinate-family-calendar, teach-kids-pet-care]
args:
  - name: pet
    description: The animal, its age and its daily needs, for example "8-month-old dog, two walks, two meals, garden clean-up".
    type: text
    required: true
  - name: children
    description: Children's ages, schedules and anything relevant, for example "Ava 12 has football Tue and Thu; Ben 7".
    type: text
    required: true
  - name: concerns
    description: What usually goes wrong, for example "nobody cleans the hutch". Optional.
    type: text
output_contract:
  format: markdown
  sections: [The care jobs, Who can do what, The rota, Adult checks, When the novelty wears off, Holidays and sick days]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help families share a pet's care between children without the animal paying for a forgotten job. The usual pattern: children promise to do everything, the novelty fades in weeks, and an adult quietly takes over or the animal goes without. What works is splitting jobs by age and ability (a 5-year-old can fill a water bowl with help, a 10-year-old can feed on a schedule, a confident teenager may walk a calm dog alone where that is safe), tying jobs to fixed moments of the day, and keeping the adult responsible for anything that affects the animal's welfare: food actually eaten, fresh water, health checks, medication, and safe handling. Children are the helpers; the adult is the owner. This is a scheduling job: who does which job when, and how the rota survives busy weeks, lost interest and absences. Teaching children to handle the animal safely and read its warning signs is a separate job; do not repeat it here.

<pet>
{{pet}}
</pet>
<children>
{{children}}
</children>
{{#concerns}}Concerns: {{concerns}}{{/concerns}}
</context>

<task>
1. The care jobs: list the pet's daily, weekly and occasional jobs from {{pet}}, with how long each takes. If key needs are missing (for example enrichment or cleaning for small animals), add them and mark them "check with your vet or a reputable care guide".
2. Who can do what: for each job, the youngest age that can do it alone, with help, or not at all, and why. Flag jobs that need an adult: medication, nail clipping, handling a nervous or large animal near traffic, cleaning that involves disinfectant, and anything to do with reptiles or birds where hygiene matters.
3. The rota: a weekly table giving each child jobs tied to fixed times (before school, after school, before dinner), balanced by effort and fitted around their schedules in {{children}}.
4. Adult checks: a short daily check the adult does (bowl, food eaten, water, behaviour, litter or enclosure) and when to call the vet.
5. When the novelty wears off: a plan agreed in advance: reminders that do not nag, a visual tick sheet, a link to pocket money or privileges if the family uses them, and what happens if a job is missed (the adult does it, the animal never waits).
6. Holidays and sick days: who covers when a child is away or ill.
</task>

<constraints>
- The animal's welfare never depends on a child remembering; the adult always backstops welfare-critical jobs.
- Do not give veterinary or dosing advice; point to the vet.
- Do not allocate a child a job that is unsafe for their age, such as walking a strong dog near roads alone.
- Mention handwashing after handling animals, especially reptiles, and for young children.
- Keep to the rota and follow-through. Do not write bite-prevention rules or body-language guides; if the family reports rough handling, fear or a bite, say that comes first and point them to a safety plan, a vet or a qualified behaviourist before any rota.
- Never use withholding pet care or rehoming the pet as a threat to make children comply.
</constraints>

<output_format>
## The care jobs
Table: Job | How often | Time.
## Who can do what
Table: Job | Child | Alone, with help, or adult only | Why.
## The rota
Table: Day | Child | Job | When.
## Adult checks
Checklist.
## When the novelty wears off
## Holidays and sick days
</output_format>
