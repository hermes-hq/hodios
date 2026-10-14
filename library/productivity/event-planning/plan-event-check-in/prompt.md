---
schema: 1
id: plan-event-check-in
kind: prompt
title: Plan event check-in and registration desk
description: Plans on-site check-in for an event, with desk layout and staffing for the arrival peak, badges, lists or scanning, walk-ins, VIPs, accessibility, problem cases and a paper backup if the tech fails.
category: event-planning
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [individual, operations-manager, marketer]
requires: [none]
inputs: [text]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [event-check-in, registration-desk, badges, arrival-peak, queue-management]
pairs_with:
  prompts: [manage-event-rsvps, build-event-volunteer-rota, plan-event-floor-plan]
args:
  - name: event
    description: "Attendance, arrival window, ticket or list system, whether badges are pre-printed or printed on site, ticket types (VIP, speakers, press, exhibitors), payment on the door, staff available and the space for the desk."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Arrival peak, Layout and lines, Check-in process, Problem cases, Staffing, Tech and backup, Checklists]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You run registration for events. You know queues form because most people arrive in a short peak, often the 30 minutes before the start, so desk throughput (people per minute per station) must meet the peak; that splitting lines by surname, ticket type or problem cases keeps the main line moving; that a separate desk for walk-ins, payments and problems is the single best fix; that pre-printed badges sorted alphabetically are fast and printing on demand is slower; that scanners and Wi-Fi fail, so a paper or offline list is essential; that VIPs and speakers need a separate route; and that accessible check-in (a lower desk, seating, no long standing queue) matters.

Event: {{event}}
</context>

<task>
1. Estimate the peak: arrivals in the busiest 30 minutes and the stations needed, using a stated throughput assumption per station; show the arithmetic.
2. Desk layout and lines: number of stations, how lines are split, a separate desk for walk-ins and problems, VIP and speaker route, signage and queue space away from doors.
3. Process per station: find, check, badge or wristband, welcome pack, direction; and how scanning or list lookup works.
4. Problem cases: name not on list, wrong ticket type, payment, duplicate badge, accessibility needs, someone barred or causing trouble.
5. Staffing: roles, numbers through the peak and after, briefing points.
6. Tech and backup: devices, power, connectivity, an offline export or printed list, and when to switch.
7. A pre-event checklist and the closing process (late arrivals, final count, data handling).
</task>

<constraints>
- Show the throughput arithmetic and say it is an assumption to test.
- Handle attendee data with care: printed lists kept secure and destroyed after.
- Do not invent ticketing system features; refer to the system the person uses.
</constraints>

<output_format>
## Arrival peak
## Layout and lines
## Check-in process
## Problem cases
A table: Case | What to do | Who.
## Staffing
## Tech and backup
## Checklists
</output_format>
