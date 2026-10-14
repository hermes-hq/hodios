---
schema: 1
id: plan-booking-slots-and-table-turns
kind: prompt
title: Plan booking slots and table turns
description: Plans a restaurant's booking intervals, table durations by party size, table mix and section sizes so the kitchen is not slammed and more covers fit, with a sample night tested against capacity.
category: hospitality
version: 1.0.0
status: incubating
stage: [plan, design]
role: [operations-manager, manager, founder]
subject: [hospitality]
requires: [none]
inputs: [dataset, text]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [table-turns, booking-intervals, covers-per-hour, kitchen-pacing, table-mix, dining-room-layout]
pairs_with:
  prompts: [write-host-stand-booking-script, build-staff-schedule]
args:
  - name: dining_room
    description: Tables and seats (for example "8 two-tops, 6 four-tops, 1 round of 8"), which tables can be joined, service hours and last booking time.
    type: text
    required: true
  - name: service_data
    description: Covers by half hour on a typical busy night, average dining time by party size, walk-in share, no-show rate, and how many covers the kitchen can send in 15 minutes. Use what you have.
    type: text
    required: true
  - name: problems
    description: What goes wrong now, for example "everyone arrives at 19:30", "tables of two on four-tops", "kitchen falls behind at 20:00". Optional.
    type: text
output_contract:
  format: markdown
  sections: [What limits covers, Table durations, Booking intervals and pacing, Table mix and sections, Sample night, Rules for the booking system, What to measure]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a restaurant operations manager who sets up booking systems. You know covers are limited by the tightest of four things: seats, the kitchen's output per 15 minutes, the number of servers and sections, and the door's ability to seat people. Taking every booking at 19:30 fills the room but swamps the kitchen; then tickets back up, tables run long and later bookings wait. Pacing caps (maximum covers per booking slot), realistic durations by party size, and a table mix that matches the party sizes guests actually book fit more covers in with better service.

Dining room: {{dining_room}}
Service data: {{service_data}}
{{#problems}}Problems: {{problems}}{{/problems}}
</context>

<task>
1. What limits covers: calculate seat capacity per hour, kitchen capacity per 15 minutes and per hour, and server capacity, and name the binding constraint tonight with arithmetic.
2. Table durations: a duration by party size (for example 2, 3-4, 5-6, 7+) based on the user's averages, with a short buffer for reset. If no averages are given, state rule-of-thumb assumptions and mark them.
3. Booking intervals and pacing: slot length (for example every 15 minutes), a maximum covers cap per slot derived from kitchen capacity, staggered start times by section, and how to hold space for walk-ins if they matter.
4. Table mix and sections: compare the party sizes booked with the tables; suggest joining or splitting tables, which tables go to which party size, and section sizes per server.
5. Sample night: a table-by-table timeline for the busiest service showing first and second seatings, and check that no 15-minute window exceeds the kitchen cap.
6. Rules for the booking system: durations, caps, which tables are bookable online, time limits stated to guests, deposits or card details for large tables, and over-booking only if the no-show data supports it (and how to handle it fairly if everyone arrives).
7. What to measure for four weeks: covers per seat, average dining time, ticket times, wait at the door, and no-shows.
</task>

<constraints>
- Do not invent covers, times or capacities. Mark assumptions clearly and show the arithmetic.
- Do not recommend telling guests a time limit only after they sit down; time limits must be stated at booking.
- Over-booking is optional and risky: present it with the risk and a plan for when it fails, or leave it out if the no-show rate is low.
- Keep accessibility in the table plan (step-free tables, space for wheelchairs and prams).
</constraints>

<output_format>
## What limits covers
Short calculation and the binding constraint.
## Table durations
Table: Party size | Duration | Reset | Source.
## Booking intervals and pacing
Bullets and a table: Slot | Max covers | Notes.
## Table mix and sections
Table: Table | Seats | Best for | Section.
## Sample night
Table: Table | First seating | Second seating | Third seating. Then the per-15-minute covers check.
## Rules for the booking system
Numbered.
## What to measure
Bullets.
</output_format>
