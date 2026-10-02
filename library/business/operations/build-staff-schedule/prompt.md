---
schema: 1
id: build-staff-schedule
kind: prompt
title: Build a staff schedule
description: Builds a staff rota from hourly demand, availability, skills and labour rules, with coverage, cost and fairness checks and an absence-cover plan. For shops, restaurants, clinics and support teams.
category: operations
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [manager, operations-manager, founder]
inputs: [text, dataset]
output: [table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [rota, shift-planning, workforce-planning, labour-cost, coverage]
pairs_with:
  prompts: [plan-inventory, write-sop]
  personas: [small-business-advisor]
args:
  - name: demand
    description: How busy you are by day and hour (sales, covers, appointments, tickets or footfall), opening hours, and the minimum staff needed at any time.
    type: text
    required: true
  - name: staff
    description: Each person (first name or initials) with contracted hours, availability, skills or roles (for example keyholder, barista, first aid), pay rate if relevant, and preferences.
    type: text
    required: true
  - name: rules
    description: Labour and house rules - maximum hours, minimum rest between shifts, break rules, minors' limits, budget for hours, skills that must be on every shift. Leave empty to have the common checks listed.
    type: text
output_contract:
  format: markdown
  sections: [Coverage target, Rota, Checks, Fairness, Absence cover, Assumptions and questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You build staff rotas for small and mid-sized teams. A good rota puts enough people with the right skills where demand is, stays inside the hours budget and the labour rules, and is fair enough that staff do not burn out or quit. Most rotas fail by copying last week's pattern instead of following demand, by forgetting skill cover (no keyholder on the closing shift), or by quietly giving the same people every weekend.
</context>

<task>
Build a one-week rota.

<demand>
{{demand}}
</demand>

<staff>
{{staff}}
</staff>
{{#rules}}
<rules>
{{rules}}
</rules>
{{/rules}}

1. Coverage target: convert demand into the number of staff needed per hour or per block for each day, with the ratio used (for example one barista per 25 orders an hour) and the minimum staffing. Show the peak and quiet blocks.
2. Required skills per block: keyholder for opening and closing, supervisor, first aider, specialist roles.
3. Build the rota: assign shifts that cover the target, respecting availability, contracted hours, skills and rules. Prefer shift lengths that match demand (short peak shifts where allowed) over long flat shifts. Include breaks.
4. Checks: coverage gaps and overstaffed blocks per day; each person's total hours versus contracted hours and maximums; rest periods between shifts; minors' limits; skill cover on every shift; total labour hours and cost versus the budget if given.
5. Fairness: distribution of weekend, closing and early shifts, and of requested days off honoured; flag anyone who gets more than their share, and suggest a rotation for the coming weeks.
6. Absence cover: for each shift with a single-point skill, name the backup; give a short sick-call procedure and a priority list for extra hours.
7. If the target cannot be met with the available staff or budget, say where and by how much, and offer options (adjust opening hours, cross-train, add a part-time hire, accept a slower service level).
</task>

<constraints>
- Do not invent staff, availability or rules. If labour rules are not given, list the common checks (maximum weekly hours, daily rest, breaks, minors, notice of schedules) as items to confirm against local law and contracts, and apply a conservative default that you state.
- Use first names or initials only as given; do not ask for or add personal details beyond what scheduling needs.
- Arithmetic of hours and costs must be exact.
- Employment law and contracts vary by country and sector; recommend checking with HR or an employment adviser when a rule is unclear.
</constraints>

<output_format>
## Coverage target
Table: Day | Block | Demand | Staff needed | Skills needed.
## Rota
Table: Person | Mon | Tue | Wed | Thu | Fri | Sat | Sun | Total hours. Shifts as start-end.
## Checks
Bullets per check, marked OK or with the problem.
## Fairness
Table: Person | Weekend shifts | Closes | Opens | Requests honoured. Then the rotation suggestion.
## Absence cover
## Assumptions and questions
</output_format>
