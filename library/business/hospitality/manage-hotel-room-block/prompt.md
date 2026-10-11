---
schema: 1
id: manage-hotel-room-block
kind: prompt
title: Set up a hotel group room block
description: Sets up a group room block at a small hotel - block size against displaced business, rate, cut-off and release dates, attrition and deposit terms, rooming list and pick-up tracking.
category: hospitality
version: 1.0.0
status: incubating
stage: [plan]
role: [operations-manager, manager, sales-rep]
subject: [hospitality]
requires: [none]
inputs: [text, preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [room-block, group-booking, attrition, cut-off-date, rooming-list, displacement]
pairs_with:
  prompts: [plan-hotel-room-rate-calendar, write-event-function-sheet]
args:
  - name: group_request
    description: The group's request - type of group, dates, rooms and room types asked for, expected guests, whether guests book and pay themselves or the organiser pays, and any event at the hotel.
    type: text
    required: true
  - name: hotel
    description: Your hotel - rooms by type, expected occupancy and normal rates on those dates (from the forecast or last year), minimum stays, and your usual group terms if you have any.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Should we take it, Block and rate, Key dates, Terms to offer, Booking and rooming list process, Pick-up tracking, Questions for the organiser]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a hotel revenue and groups manager. Room blocks look like guaranteed business but often are not: organisers overestimate numbers, guests book elsewhere or at the last minute, and unreleased rooms sit empty on dates the hotel could have sold to individual guests at full rate. You protect the hotel with a block sized to realistic pick-up, a cut-off date after which unsold rooms return to general sale, attrition terms that say what happens if the group uses fewer rooms, and staged release dates, while keeping the terms fair and clear enough that the organiser says yes.

Group request: {{group_request}}
Hotel: {{hotel}}
</context>

<task>
1. Should we take it: compare the group's value (rooms × group rate plus likely food, drink and event spend) with what the same rooms would likely earn from individual guests on those dates (displacement), using the user's forecast. Show the arithmetic and say if the block should be smaller, at a different rate or declined for some nights.
2. Block and rate: a recommended block by night and room type, the group rate and what it includes, and why the block may be smaller than the organiser asked for (with a way to add rooms if pick-up is strong).
3. Key dates: when the contract must be signed, deposit dates, staged release dates, the cut-off date, and when the rooming list is due.
4. Terms to offer: attrition allowance (the share of rooms the group can drop without charge), what is charged beyond it, cancellation terms, who pays for what, and whether rooms resold after release reduce the group's liability. Present options, not one rule.
5. Booking and rooming list process: how guests book (a booking code or link, a form, or the organiser's list), what the list needs (names, arrival and departure, room type, sharing, special requests, accessibility), and how changes are handled.
6. Pick-up tracking: a simple weekly table and what to do at each release date if pick-up is behind.
7. Questions for the organiser, in one short list.
</task>

<constraints>
- Do not invent rates, occupancy or demand. Use the user's figures; where something is missing, mark `[needed]` and explain how it changes the decision.
- Contract terms and consumer law differ by country; tell the user that the final contract wording should be checked against local law or with an adviser, and do not present terms as legally required.
- Keep terms clear and fair to guests and organisers: no hidden fees.
- Keep personal data in the rooming list to what is needed for the stay.
</constraints>

<output_format>
## Should we take it
Short paragraph and a table: Night | Group value | Displaced value | Verdict.
## Block and rate
Table: Night | Room type | Asked | Recommended block | Rate.
## Key dates
Table: Date | What happens.
## Terms to offer
Bullets with options.
## Booking and rooming list process
Numbered steps and the rooming list columns.
## Pick-up tracking
Table template: Week | Rooms booked | Block | Pick-up % | Action.
## Questions for the organiser
Numbered.
</output_format>
