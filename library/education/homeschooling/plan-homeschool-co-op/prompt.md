---
schema: 1
id: plan-homeschool-co-op
kind: prompt
title: Plan a homeschool co-op
description: Plans starting or reorganising a homeschool co-op - purpose, age groups, class timetable, parent roles and rotas, costs and fees, venue, ground rules, safeguarding and how decisions are made.
category: homeschooling
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [notes, preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [co-op, parent-rota, group-classes, safeguarding, shared-costs, community-group]
pairs_with:
  prompts: [plan-homeschool-socialisation, design-homeschool-unit-study]
args:
  - name: group
    description: The families involved - how many, children's ages, what parents can teach or help with, what the group wants from the co-op (academics, social time, arts, sport, exam subjects), and how often you want to meet.
    type: text
    required: true
  - name: practicalities
    description: Optional - possible venues and their cost, budget per family, the country or region, any existing problems if reorganising (uneven workload, conflict, drop-outs).
    type: text
output_contract:
  format: markdown
  sections: [Purpose and shape, Groups and timetable, Roles and rota, Money and venue, Ground rules and safeguarding, Decisions and first term]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You have helped many home-educating families set up and keep co-ops running. You know co-ops rarely fail on teaching; they fail on people: a few parents doing all the work, unclear expectations about drop-off versus staying, money disputes, one family's child behaving badly with no agreed process, and decisions made by whoever shouts loudest. Successful co-ops agree a clear purpose first (academic classes, social and enrichment, or a mix), keep the timetable simple, require every family to contribute in a defined way, put money and safeguarding in writing, and review after the first term. Group sizes, venue rules, insurance and safeguarding expectations depend on the venue and the country, and anyone working with children who are not their own may need background checks under local rules.

Group: {{group}}
{{#practicalities}}Practicalities: {{practicalities}}{{/practicalities}}
</context>

<task>
1. Purpose and shape: a one-paragraph purpose statement the families can agree on, the meeting pattern (weekly, fortnightly, term-time), and whether parents stay or can drop off.
2. Groups and timetable: age groups that fit the children listed (ranges that keep groups workable), and a sample day with class blocks, breaks, free play and tidy-up. Match classes to what parents can actually teach, and mark gaps that need an outside tutor or a different format.
3. Roles and rota: the jobs (coordinator, treasurer, timetable, venue contact, safeguarding lead, first aid, snacks and cleaning) and a fair rota so every family contributes, with how cover works when someone is ill.
4. Money and venue: a simple budget (venue, materials, insurance if needed, outside tutors), how fees are set and collected, refunds when a family leaves, and questions to ask a venue (capacity, insurance, accessibility, cancellation).
5. Ground rules and safeguarding: a short agreement covering arrival and collection, phones, behaviour and how concerns about a child's behaviour are handled, allergies and medical needs, photos and social media, and a safeguarding approach (named lead, never one adult alone with a child where avoidable, how to raise a concern). Note that background-check and insurance requirements depend on local rules and the venue.
6. Decisions and first term: how decisions are made (who decides what, voting, how to raise disagreements), a launch checklist, and a review at the end of the first term with the questions to ask.
</task>

<constraints>
- Do not state legal, insurance or background-check requirements for a place as facts; list them as things to confirm with the venue, an insurer or the relevant authority.
- Keep the plan sized to the number of families given; small groups need fewer roles.
- Write the ground rules in plain, friendly language that families would sign up to.
- If reorganising an existing co-op with conflict, address the specific problems described without taking sides.
</constraints>

<output_format>
## Purpose and shape
## Groups and timetable
A table: Time | Group | Activity | Led by.
## Roles and rota
## Money and venue
## Ground rules and safeguarding
## Decisions and first term
</output_format>
