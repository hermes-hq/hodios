---
schema: 1
id: write-event-function-sheet
kind: prompt
title: Write an event function sheet
description: Turns a confirmed private event booking into the internal function sheet every department works from - timeline, set-up, menu and allergies, drinks, staffing, extras and billing.
category: hospitality
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [operations-manager, manager]
subject: [hospitality]
requires: [none]
inputs: [notes, message, text]
output: [docs, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [function-sheet, private-dining, banquet-event-order, run-sheet, dietary-requirements, events-team]
pairs_with:
  prompts: [answer-group-booking-enquiry, manage-hotel-room-block, plan-kitchen-prep-list]
args:
  - name: booking_details
    description: Everything agreed with the client - emails, notes or a booking form - including date, numbers, room, timings, menu, drinks package, dietary needs, extras and payment terms.
    type: text
    required: true
  - name: venue_info
    description: Rooms and their capacities, standard set-ups, kitchen and bar staffing ratios you use, and departments that need a copy. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Event summary, Timeline, Room set-up, Food, Drinks, Staffing, Equipment and extras, Billing, Gaps and conflicts]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an events manager at a hotel and restaurant group. The function sheet (also called a banquet event order) is the single document the kitchen, bar, floor, housekeeping and accounts work from. Events go wrong at the hand-offs: a dietary need mentioned in an email but missing from the kitchen's copy, a speech at 20:30 that nobody told the kitchen about so the mains go cold, a drinks package without a cut-off or a limit, final numbers that changed after the sheet was printed. A good sheet is complete, dated, versioned and shows what is still unconfirmed.

Booking details: {{booking_details}}
{{#venue_info}}Venue: {{venue_info}}{{/venue_info}}
</context>

<task>
1. Event summary: client and on-the-day contact (role only if no name is given), event type, date, room, guaranteed and expected numbers, final numbers deadline, version and date of the sheet.
2. Timeline: minute-by-minute from set-up to clear-down, including arrivals, drinks reception, seating, each course, speeches, entertainment, bar close and finish, with which department acts at each time.
3. Room set-up: layout, table plan, linen, cutlery per cover, stage or AV, accessibility (step-free route, space for wheelchairs), cloakroom.
4. Food: menu by course, numbers per choice if pre-ordered, and a dietary and allergy list by guest or table with how each dish will be adapted. Tell the kitchen to confirm each one.
5. Drinks: package contents, start and stop times, limits or bar tab cap, alcohol-free options, and the responsible service note (water on tables, manager decides on refusals).
6. Staffing: roles, numbers and times per department.
7. Equipment and extras: AV, decorations, cake, flowers, suppliers arriving and their access times.
8. Billing: rates, deposit received, what is charged on the night, minimum spend, service charge as agreed.
9. Gaps and conflicts: everything missing, contradictory or unconfirmed, with who must answer and by when.
</task>

<constraints>
- Use only what the booking details say. Never invent numbers, prices, menu items or timings; put `[TBC]` and list it under Gaps and conflicts.
- Copy every dietary and allergy note exactly as the client gave it; do not summarise "nut allergy" into "dietary".
- Keep personal data to what staff need for the event.
- Keep the layout scannable: each department should find its part in seconds.
</constraints>

<output_format>
## Event summary
Table: Field | Detail.
## Timeline
Table: Time | What happens | Department.
## Room set-up
## Food
Menu, then table: Guest or table | Requirement | Adaptation | Kitchen confirmed.
## Drinks
## Staffing
Table: Role | Number | From | To.
## Equipment and extras
## Billing
## Gaps and conflicts
Table: Item | Problem | Who answers | By when.
</output_format>
