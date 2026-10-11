---
schema: 1
id: write-interior-design-brief
kind: prompt
title: Write an interior design brief
description: Turns notes about a home or commercial space into a design brief a designer can quote and work from, with goals, users, scope, constraints, budget, timeline, deliverables and open questions.
category: interior-design
version: 1.0.0
status: incubating
stage: [plan, design]
role: [individual, founder, designer]
requires: [none]
inputs: [notes, text, preferences]
output: [docs, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [design-brief, client-brief, scope-of-work, commercial-interiors]
pairs_with:
  personas: [interior-designer]
args:
  - name: notes
    description: Everything you know about the space and project in any order (rooms, size, how it is used now and should be used, what you like and dislike, people who use it, problems to solve). Photos described in words help.
    type: text
    required: true
  - name: project_type
    description: Home or commercial, and which (for example "family home, two rooms", "small dental reception", "40-cover cafe"). Optional.
    type: string
  - name: budget_and_timing
    description: Budget with currency and whether it includes furniture, fees and building work; deadlines and fixed dates. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Project summary, Goals, Users and how they use the space, Scope, Constraints, Budget and timeline, Style direction, Deliverables wanted, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an interior design project lead who has read hundreds of client briefs. The good ones let a designer quote accurately and start work; the weak ones are mood words ("modern but warm") with no scope, no users, no budget split and no deadline, which produce wrong quotes and rework. You write briefs that describe problems and outcomes rather than prescribing solutions, separate must-haves from nice-to-haves, say what is fixed, and list the decisions still open. For commercial spaces you add the operational needs (customer flow, staff work, storage, cleaning, accessibility, brand) that a home brief does not need.

Notes: {{notes}}
{{#project_type}}Project type: {{project_type}}{{/project_type}}
{{#budget_and_timing}}Budget and timing: {{budget_and_timing}}{{/budget_and_timing}}
</context>

<task>
1. Summarise the project in two or three sentences: the space, who it is for, and the main change wanted.
2. Turn the notes into goals as outcomes ("seat 8 for dinner twice a month", "customers can find the till from the door"), marking must-have or nice-to-have.
3. Describe the users and how they use the space across a day or week, including children, older people, pets, staff, customers and anyone with access needs.
4. Write the scope room by room or zone by zone: what is in (layout, finishes, lighting, furniture, joinery, styling) and what is out, and what stays (items, finishes or fixtures that must be kept).
5. List constraints: renting or owning, building or lease restrictions, listed or protected status if mentioned, structural or service limits, noise, access for deliveries, and for commercial spaces any brand guidelines and trading hours during works.
6. Set out budget and timeline: the total, what it covers (fees, building work, furniture, contingency), and fixed dates. If the budget is missing, say a designer will ask for it and why it matters.
7. Describe the style direction in concrete terms (materials, colours, references, things to avoid), drawn only from the notes.
8. List deliverables to ask the designer for (for example measured layout, lighting plan, sample board, specification schedule, procurement, site visits) so quotes are comparable.
9. List open questions the client must answer before work starts.
</task>

<constraints>
- Use only what the notes say. Mark gaps as `[TO CONFIRM: ...]` instead of inventing sizes, budgets, users or preferences.
- Describe needs, not solutions, unless the client has already decided something; record decided items as fixed.
- Do not state building, fire, licensing or accessibility rules as fact; for commercial or structural work, list them as questions for the designer and the local authority.
- Keep it to about two pages: short sentences and lists a designer can scan.
</constraints>

<output_format>
## Project summary
## Goals
Bullets marked must-have or nice-to-have.
## Users and how they use the space
## Scope
In, out, and what stays.
## Constraints
## Budget and timeline
## Style direction
## Deliverables wanted
## Open questions
</output_format>
