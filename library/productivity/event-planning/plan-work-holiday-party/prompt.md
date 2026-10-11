---
schema: 1
id: plan-work-holiday-party
kind: prompt
title: Plan a work end-of-year party
description: Plans a company end-of-year or holiday party that includes everyone, covering timing across faiths and shifts, format, budget, alcohol and conduct, access, remote staff and getting home.
category: event-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, operations-manager, individual]
requires: [none]
inputs: [text]
output: [plan, checklist, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [office-party, end-of-year-party, team-celebration, inclusive-events, alcohol-policy, duty-of-care]
pairs_with:
  prompts: [plan-event-budget, write-event-invitation, write-event-code-of-conduct, plan-accessible-event]
args:
  - name: company
    description: "Headcount, locations and remote staff, shift patterns, the mix of people (ages, faiths, carers, non-drinkers if known), budget, and what has happened at past parties."
    type: text
    required: true
  - name: ideas
    description: "Any ideas or constraints, for example \"must be a weekday\", \"leadership wants a dinner\", \"last year's party had an incident\". Optional."
    type: text
output_contract:
  format: markdown
  sections: [Format options, Timing, Budget, Food and drink, Inclusion and accessibility, Conduct and safety, Timeline and invitation]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan workplace celebrations. You know an end-of-year party is a work event for conduct and duty of care purposes in many places; that alcohol-centred formats exclude non-drinkers and raise risk; that evenings and weekends are hard for carers and some faith observances; that December clashes with many people's own celebrations while not everyone celebrates Christmas, so neutral naming and timing help; that shift workers and remote staff are often forgotten; that a plus-one policy, travel home and clear expectations prevent problems; and that a short reminder of behaviour expectations, sent kindly, beats a long policy.

Company: {{company}}
{{#ideas}}Ideas and constraints: {{ideas}}{{/ideas}}
</context>

<task>
1. Recommend two or three formats (for example a daytime lunch, an early-evening event, an activity, a dinner) with pros and cons for this workforce, and a preferred option.
2. Timing: day and time that work for most people, avoiding major observances, with an option for shift and remote staff (a second session, a hamper or a budget per remote team).
3. Budget per head with main lines and a contingency; cover paid-for versus self-funded parts.
4. Food and drink: dietary and faith needs, good non-alcoholic options, limits on free alcohol if any, food served throughout.
5. Inclusion and accessibility: neutral naming, venue access, noise and quiet space, plus-one policy.
6. Conduct and safety: a short expectations message, named people responsible on the night, how to raise a concern, travel home (late transport, taxis), and what to do if someone is unwell.
7. Timeline and an invitation draft.
</task>

<constraints>
- Employment and liability rules vary by country; list items to check with HR or legal rather than stating law.
- Do not assume everyone celebrates any particular holiday.
- Do not suggest activities that pressure people to drink, perform or share personal information.
</constraints>

<output_format>
## Format options
## Timing
## Budget
A table: Line | Per head | Total.
## Food and drink
## Inclusion and accessibility
## Conduct and safety
## Timeline and invitation
</output_format>
