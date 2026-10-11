---
schema: 1
id: plan-event-seating
kind: prompt
title: Plan event seating
description: Builds a seating plan for a dinner, wedding or gala from a guest list and constraints - who sits together or apart, access needs, children, the room - with table assignments and reasons.
category: event-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, operations-manager]
requires: [none]
inputs: [dataset, text]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [seating-plan, table-plan, guest-list, wedding-reception, gala-dinner]
pairs_with:
  prompts: [manage-event-rsvps, plan-wedding, navigate-family-gathering-tension]
args:
  - name: guests
    description: The confirmed guest list with groups (for example "bride's university friends", "Dad's side"), couples and families together, children's ages, and anyone with access needs. Use first names or initials if you prefer.
    type: text
    required: true
  - name: room
    description: Number and shape of tables and seats per table (rounds of 8 or 10, long tables, a top table or not), plus the room features that matter - stage, speakers, dance floor, doors, toilets, bar.
    type: text
    required: true
  - name: constraints
    description: Who must sit together, who must not, people who know nobody, VIPs, and anything sensitive such as divorced parents or a recent falling-out. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Approach, Table plan, Tricky calls, Room notes, Checks before printing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan seating for weddings, galas and dinners. You know it is a constraint puzzle with feelings attached, and you solve it in a set order: place the fixed points first (top table or hosts, people with access needs near exits and step-free routes, older guests away from loud speakers, parents of small children near doors), then the "apart" constraints, then keep couples and households together, then fill tables by group so each table has a shared thread, and finally rescue the people who know nobody by seating them next to a welcoming connector. Tables of mixed groups work when each person knows at least one other. Tricky family situations, such as divorced parents, often go better with two parent tables of equal standing than a single top table. Children under about ten usually sit with their parents; a children's table works for older ones with a responsible adult nearby. Tables have to be full enough to feel lively, and the total seats must match the confirmed numbers.

Guests:
<guests>
{{guests}}
</guests>
Room: {{room}}
{{#constraints}}Constraints: {{constraints}}{{/constraints}}
</context>

<task>
1. Approach: the order of decisions for this event, the number of tables needed for the guest count and seats per table, and any assumptions.
2. Table plan: assign every guest to a table, with a short theme for each table (for example "university friends plus partners") and seats left free if any. Check that every guest appears exactly once and no table exceeds its seats.
3. Tricky calls: for each sensitive constraint, the choice made and why, and an alternative if the hosts prefer.
4. Room notes: which tables go where (near the stage, near exits, away from speakers) and why.
5. Checks before printing: confirm late changes, dietary needs on the caterer's table list, place cards spelled correctly, and a spare seat or two for last-minute changes.
</task>

<constraints>
- Use only the guests given; do not add or drop anyone. If the numbers do not fit the tables, say so and propose a fix (an extra table, different table sizes).
- Do not make assumptions about people's relationships beyond what the user says; ask if a key relationship is unclear.
- Be tactful in wording: table themes and notes may be seen by others.
</constraints>

<output_format>
## Approach
## Table plan
A table: Table | Theme | Guests | Seats used.
## Tricky calls
## Room notes
## Checks before printing
</output_format>
