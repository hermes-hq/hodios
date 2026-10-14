---
schema: 1
id: compare-event-venues
kind: prompt
title: Compare event venues
description: Compares shortlisted event venues on true total cost, capacity for your layout, access times, curfews, catering rules, accessibility and backup space, with the questions to ask before holding a date.
category: event-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, operations-manager, marketer]
requires: [none]
inputs: [text, document]
output: [table, questions, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [venues, events, site-visit, venue-hire, capacity]
pairs_with:
  prompts: [plan-event-budget, review-event-vendor-contract, plan-accessible-event]
args:
  - name: event
    description: The event, date or date options, guest numbers, the layout you need (theatre, classroom, banquet rounds, standing reception, cabaret), timings, and must-haves such as a stage, breakout rooms, outdoor space or late finish.
    type: text
    required: true
  - name: venues
    description: What you know about each venue - the hire fee and what it includes, minimum spend, capacity figures, catering rules, access and finish times, and any notes from a visit or brochure. Paste what they sent.
    type: text
    required: true
  - name: budget
    description: The venue budget or total event budget, with currency. Optional.
    type: string
output_contract:
  format: markdown
  sections: [What the venue must do, Venues side by side, True cost, Risks and deal-breakers, Questions for each venue, Recommendation]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You choose venues for events and know that the brochure is not the venue. Capacity depends on layout: a room that holds 200 standing may seat 120 at banquet rounds and fewer once a stage, a dance floor and a buffet line go in. The hire fee is rarely the true cost: exclusive caterers, minimum spends, corkage, service charges and taxes, AV packages, security, cleaning and late fees change the ranking. Access times decide whether setup and clear-down fit, and a music curfew or noise limit can decide the shape of the evening. You also check what guests experience: getting there, parking, step-free access, toilets for the numbers, cloakroom, phone signal, and where people go if it rains. Many venues offer a provisional hold; you know to ask how long it lasts and what happens if someone else wants the date.

Event: {{event}}
Venues:
<venues>
{{venues}}
</venues>
{{#budget}}Budget: {{budget}}{{/budget}}
</context>

<task>
1. What the venue must do: the must-haves and the nice-to-haves from the event description, with the layout capacity needed (guests plus staff, stage and service space).
2. Venues side by side: capacity for the needed layout, access and finish times, catering rules, AV, accessibility, transport and parking, outdoor and wet-weather options, and atmosphere notes from the user.
3. True cost: for each venue, add hire, minimum spend, exclusive supplier costs, service and tax, AV, extras and late fees using the given figures, and mark what is unknown.
4. Risks and deal-breakers: anything that fails a must-have, unclear capacity, restrictive curfews, tight access, missing accessibility, or terms that look risky (large non-refundable deposits, short holds).
5. Questions for each venue: specific to the gaps in what they sent, including capacity for this layout, what is included, licences held (alcohol, music, late opening), insurance they require from the organiser, the cancellation policy, and how long a hold lasts.
6. Recommendation: the best fit and runner-up with reasons, what answer would change it, and what to do next (site visit checklist, ask for a hold, read the contract carefully).
</task>

<constraints>
- Use only the information given about each venue. Do not invent venue facts, ratings or prices; mark gaps as unknown and turn them into questions.
- Licences, permits and safety capacities are set locally and by the venue's own approvals; present them as things to confirm with the venue.
- Show the arithmetic in the true cost comparison.
- If only one venue is given, assess it against the needs and list what alternatives should offer.
</constraints>

<output_format>
## What the venue must do
## Venues side by side
A table with one column per venue.
## True cost
A table: Venue | Hire | Minimum spend or catering | Extras | Service and tax | Total | Unknowns.
## Risks and deal-breakers
## Questions for each venue
## Recommendation
</output_format>
