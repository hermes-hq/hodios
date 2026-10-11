---
schema: 1
id: implement-appointment-booking
kind: prompt
title: Implement appointment slot booking
description: Implements bookable time slots from availability rules with time zones, DST, buffers and notice periods, and prevents double booking under concurrency. Use for appointment or reservation apps.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, fullstack-engineer, software-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [spec, repo, text]
output: [code, tests]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [scheduling, time-zones, availability, double-booking, concurrency-control]
pairs_with:
  prompts: [spec-recurring-schedule-rules, implement-state-machine, implement-transactional-email]
  personas: [backend-engineer]
args:
  - name: requirements
    description: What is booked (staff, rooms, classes), availability rules, durations, buffers, minimum notice and booking horizon, capacity, and payment or hold rules.
    type: text
    required: true
  - name: stack
    description: Language, framework and database. Leave empty to detect it from the repo.
    type: string
output_contract:
  format: markdown
  sections: [Design decisions, Changes, Tests, Verification, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a backend engineer building slot booking. The two hard parts are time and concurrency:
- Availability rules (weekly hours, exceptions, holidays) are defined in the provider's IANA time zone, such as `Europe/Lisbon`, not as UTC offsets, because offsets change with daylight saving time. Generate slots in that zone and convert to UTC instants; display in the viewer's zone. On DST days some local times do not exist and others happen twice; decide what the rule does and test both transition days.
- Store bookings as UTC start and end instants plus the zone they were made in.
- Free slots = availability minus existing bookings, each expanded by buffer before and after, minus anything inside the minimum notice period or beyond the horizon, stepped at the slot granularity.
- Double booking must be impossible in the database, not just checked in code: in Postgres an exclusion constraint on resource id and a `tstzrange` with `&&` (needs the `btree_gist` extension); elsewhere, a lock on the resource row (`SELECT ... FOR UPDATE`) around check-and-insert, or unique rows per fixed slot. Capacity above one (classes) needs a counted check under the same lock.
- Holds: when payment or a form is needed, create a pending booking that blocks the slot and expires after a few minutes; expired holds release automatically.
- Make booking idempotent so a double-click or retry does not create two bookings, and treat cancellation and rescheduling as state transitions with their own rules.
</context>

<task>
Implement booking:
{{requirements}}

{{#stack}}Stack: {{stack}}{{/stack}}

1. Read the existing models for resources, availability, bookings and users, the date and time library in use, and how times are stored.
2. State the design: availability model, time zone handling, slot generation, the database-level double-booking guarantee, holds, capacity, idempotency, cancellation and rescheduling rules.
3. Implement the migrations, slot calculation as a pure function separate from the database, the available-slots endpoint, booking creation with the guarantee, hold expiry, cancellation and rescheduling, and confirmation through the existing email path.
4. Write tests with a fixed clock, including both DST transitions and two concurrent bookings of the same slot. Run them and the type check.
</task>

<constraints>
- Never store availability as fixed UTC offsets or do date arithmetic with naive local times.
- Never rely only on an application-level "is it free" check before insert.
- Never invent library functions; if unsure, say so.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Design decisions
A table: Decision | Choice | Why.
## Changes
One line per file: `path`, what changed.
## Tests
One line per test. Cover at least: slots respect buffers, notice and horizon; spring-forward and fall-back days; viewer in another zone; two concurrent bookings produce one; capacity limit; expired hold frees the slot; retry does not double book.
## Verification
Commands run and their actual results.
## Open questions
Choices left to the business, with the default chosen.
</output_format>
