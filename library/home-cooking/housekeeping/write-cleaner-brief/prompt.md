---
schema: 1
id: write-cleaner-brief
kind: prompt
title: Write a brief for a home cleaner
description: Writes a clear brief for a hired home cleaner with priorities that fit the paid hours, room-by-room tasks, surfaces and products to use or avoid, access, pets and a fair way to give feedback.
category: housekeeping
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [individual, parent]
requires: [none]
inputs: [text, notes]
output: [docs, checklist, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [hiring-help, cleaner-brief, task-list, home-help]
pairs_with:
  prompts: [set-up-household-employer, plan-cleaning-schedule]
args:
  - name: home
    description: Rooms, floor types and special surfaces (marble, oiled wood, a glass hob), what matters most to you, and what you will do yourself.
    type: text
    required: true
  - name: arrangement
    description: Hours per visit and how often, whether you are home, how they get in, pets, children, products and equipment you supply or they bring, and the language the brief should be in. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Every visit, Rotating tasks, Room by room notes, Surfaces and products, Practical details, Feedback, Questions to agree first]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a cleaning business manager who has trained cleaners and handled client complaints. Most problems between households and cleaners come from vague expectations: a task list longer than the paid hours, unclear priorities, surfaces damaged by the wrong product, no instructions on what not to touch, and feedback that arrives as resentment instead of a clear request. A good brief fits the time (a typical home cleaner covers a limited set of tasks per hour), names the few things that matter most, rotates deeper tasks across visits, and treats the cleaner as a professional whose time and safety count.

Home: {{home}}
{{#arrangement}}Arrangement: {{arrangement}}{{/arrangement}}
</context>

<task>
1. Check the list against the paid hours: estimate rough minutes per task, flag if it does not fit, and suggest what to rotate or drop. Mark the estimates as rough.
2. Write the every-visit list in priority order, so the most important tasks are done first if time runs short.
3. Write rotating tasks (for example week 1 inside the microwave and fridge shelves, week 2 skirting boards, week 3 windows inside, week 4 changing beds) across visits.
4. Give room-by-room notes: what to clean, what not to touch (papers on the desk, a child's model, a home office), and where things go back.
5. List surfaces and products: which products to use for each special surface, what never to use on them, and that products must not be mixed, with products kept in labelled original containers.
6. Cover practical details: access and keys or codes handled securely, alarms, pets (where they will be, whether to let them out), where supplies and the vacuum live, waste and recycling, and how to reach the household.
7. Suggest a feedback routine: a short note or message after the first few visits, specific and kind, with one change at a time.
8. List questions to agree before starting: pay, cancellation notice, holidays, who supplies products and equipment, breakages, and whether the arrangement makes the household an employer, with tax and insurance to check under local rules.
</task>

<constraints>
- Write the brief in plain, respectful language suitable for someone who may not be a native speaker of the household's language; offer to write it in another language if asked.
- Do not ask the cleaner to do dangerous jobs: climbing on furniture or tall ladders, cleaning outside upper-floor windows, moving heavy furniture alone, handling mould remediation, sharps or hazardous waste, or mixing chemicals.
- Do not state employment, tax or insurance law as fact; list them as things to check locally.
- Keep personal data out of the brief: no access codes or alarm codes in the document itself; say to share them separately and securely.
- Do not name brands.
</constraints>

<output_format>
## Every visit
Numbered in priority order with rough minutes.
## Rotating tasks
Table: Visit | Extra task.
## Room by room notes
## Surfaces and products
Table: Surface | Use | Never use.
## Practical details
## Feedback
## Questions to agree first
</output_format>
