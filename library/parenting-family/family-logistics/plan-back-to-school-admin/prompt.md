---
schema: 1
id: plan-back-to-school-admin
kind: prompt
title: Plan back-to-school admin
description: Builds the start-of-year admin checklist for each child, covering uniform and kit, forms, payments, lunch and travel arrangements, clubs, dates for the calendar and who does what, with deadlines.
category: family-logistics
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [text, document, preferences]
output: [checklist, table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [new-school-year, school-uniform, school-forms, deadlines, school-supplies, working-parents]
pairs_with:
  prompts: [prepare-child-for-school, extract-actions-from-school-messages, plan-school-lunches]
args:
  - name: children
    description: Each child's age, school and year group, and whether anything is changing (new school, new phase, new travel route).
    type: text
    required: true
  - name: start_date
    description: The date term starts, and today's date if you want deadlines worked back.
    type: string
    required: true
  - name: school_info
    description: Any pasted school letters, kit lists, uniform rules or welcome packs. Optional.
    type: text
  - name: owners
    description: Who in the household usually handles what, or "share it out". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Timeline, Per-child checklist, Forms and payments, Travel and lunch, Dates for the calendar, Who does what, Unknowns to ask the school]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help parents get the admin of a new school year done before the first day rather than in a panic the night before. The jobs are many and small: uniform that still fits, shoes, PE kit, labels on everything, stationery lists, medical and consent forms, allergy or medication plans with the school, lunch accounts or meal registration, transport passes, clubs and wraparound care that fill up early, and term dates that need to go in the calendar and into each parent's leave plans. The bottlenecks are lead times: uniform and shoe shops are busiest in the last two weeks, some forms need a doctor or pharmacy, and wraparound care and clubs may book out. Children changing school or phase have the longest list.

<children>
{{children}}
</children>
Term starts: {{start_date}}
{{#school_info}}
<school_info>
{{school_info}}
</school_info>
{{/school_info}}
{{#owners}}Who does what: {{owners}}{{/owners}}
</context>

<task>
1. Timeline: work back from {{start_date}}: what to do 4 weeks before, 2 weeks before, the last week, the night before, and the first week of term. Put lead-time items (shoes, medication plans, wraparound care, transport passes) early.
2. Per-child checklist: uniform and shoes (try on what you have first, then list gaps), PE and club kit, bag, water bottle, stationery from the school list if given, labels, and anything new for a change of school or phase.
3. Forms and payments: contact details and emergency contacts, medical, allergy and medication forms or plans, consent forms, lunch account or meal registration, any trip or resource payments, and data or photo permissions. Use only items from {{school_info}} as definite; list the rest as "usually needed, check".
4. Travel and lunch: the route and how the child gets there, passes or permits, a practice run for new routes, and the lunch plan.
5. Dates for the calendar: term dates, closure and training days, parents' evenings, and club start dates if given; otherwise "ask the school".
6. Who does what: split the jobs between adults per {{owners}} or fairly, with deadlines.
7. Unknowns to ask the school: a short list of questions.
</task>

<constraints>
- Do not invent school rules, uniform requirements, dates or costs; use what is given and mark the rest "check".
- Keep the lists short enough to act on; group small items.
- For medication or allergy plans, say to arrange them with the school and the child's doctor; do not give medical advice.
</constraints>

<output_format>
## Timeline
Table: When | Task | Child.
## Per-child checklist
One checklist per child.
## Forms and payments
## Travel and lunch
## Dates for the calendar
## Who does what
Table: Task | Who | By.
## Unknowns to ask the school
</output_format>
