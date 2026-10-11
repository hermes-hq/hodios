---
schema: 1
id: implement-recurring-events
kind: prompt
title: Implement recurring events
description: Implements recurring events with RRULE storage, time-zone and DST-correct expansion, cancelled and edited occurrences, this-and-following edits and range queries.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, fullstack-engineer]
requires: [repo-read, file-write, shell]
inputs: [spec, repo]
output: [code, tests]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: expert
tags: [rrule, icalendar, time-zones, dst, calendar-events]
pairs_with:
  prompts: [implement-appointment-booking, implement-background-job]
args:
  - name: event_spec
    description: What recurs and how users edit it, for example "team meetings with weekly or monthly repeats; users can cancel or move one occurrence or change all future ones".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Data model, Expansion, Edit rules, Changes, Tests, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an engineer implementing recurring events. Recurrence is a solved problem in RFC 5545 (iCalendar), and hand-rolled versions break on time zones, month ends and edits:
- Store the rule, not the occurrences: an RRULE string, a DTSTART as local wall time plus an IANA time zone (`Europe/Berlin`, not an offset), and a duration. A weekly 09:00 meeting must stay at 09:00 local across DST; storing UTC and adding 7 days moves it by an hour twice a year.
- Expand occurrences for a requested range with a maintained library (rrule.js, python-dateutil, ical4j, the `rrule` crate or the stack's equivalent). Never hand-roll it. Always expand with a range and a cap, because rules without COUNT or UNTIL are infinite.
- RFC 5545 details that bite: UNTIL must be in UTC when DTSTART has a time zone; `BYMONTHDAY=31` skips months without a 31st (use `BYMONTHDAY=-1` for the last day); local times that do not exist or repeat at DST changes need a defined rule.
- Exceptions: a cancelled occurrence is an EXDATE; a moved or edited occurrence is an override record keyed by its original start time (RECURRENCE-ID), so it still matches after the series changes.
- Edits come in three kinds: this occurrence (override), this and following (end the old series with UNTIL before the occurrence and start a new series, moving later overrides), and all (change the master; decide what happens to overrides).
- All-day events are dates, not midnight datetimes, or they shift a day for users in other zones.
- Queries such as "what is on this week" and reminders need occurrences; either expand on read for a bounded window or keep a materialised table for a rolling horizon and refresh it when the series changes.
</context>

<task>
Implement recurring events for:
{{event_spec}}

1. Read the existing event model, time handling, time zone storage, API, reminders and tests. Find the date library and any recurrence library already used.
2. Write the data model: series, overrides and exceptions, time zone fields, and whether occurrences are expanded on read or materialised.
3. Implement creation, range queries that merge expanded occurrences with overrides and exclusions, and the three edit kinds plus cancellation.
4. Wire reminders or notifications per occurrence if the app has them.
5. Write tests: weekly event across both DST changes, monthly on the 31st and on the last day, an infinite rule queried for a range, cancel one, move one then change all future, all-day events viewed from another time zone.
6. Run the tests and linters. Fix what fails.
</task>

<constraints>
- Never store recurring times only as UTC instants with fixed offsets.
- Never expand a rule without a range bound and a cap.
- Do not add a recurrence library if one already exists in the project.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Data model
Tables or fields for series, overrides and exceptions, with time zone handling.
## Expansion
How a range query is answered, the library used and the cap.
## Edit rules
What each edit kind does to the series, overrides and exceptions.
## Changes
One line per file: `path`, what changed.
## Tests
One line per test and the case it covers.
## Verification
Commands run and their actual results.
</output_format>
