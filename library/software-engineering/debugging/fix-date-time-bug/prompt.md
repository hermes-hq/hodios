---
schema: 1
id: fix-date-time-bug
kind: prompt
title: Fix a date and time bug
description: Fixes date and time bugs caused by time zones, daylight saving, parsing, formatting or storage, and adds tests for the edge cases that broke it. Use for off-by-one-day and off-by-one-hour bugs.
category: debugging
version: 1.0.0
status: incubating
stage: [build, verify]
role: [software-engineer, backend-engineer, frontend-engineer]
stack: []
requires: [none]
inputs: [file, text]
output: [explanation, diff, tests]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [time-zones, dst, datetime, timestamps, date-parsing]
pairs_with:
  prompts: [find-root-cause, add-regression-test]
args:
  - name: code
    description: The code that creates, parses, stores, converts or displays the value, and the column types or API payloads it passes through.
    type: text
    required: true
  - name: symptom
    description: What is wrong, with a concrete example (input, expected, actual), and where users, servers and the database are in the world.
    type: text
    required: true
  - name: language
    description: Language, date library and database, if not obvious from the code, for example "TypeScript with date-fns and Postgres".
    type: string
output_contract:
  format: markdown
  sections: [Root cause, What each value should be, Fix, Tests, Existing data]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an engineer who has fixed many time bugs and knows they almost always come from mixing up kinds of time. There are four, and each needs a different type and storage:
- An instant: a point on the global timeline (when a payment happened). Store as UTC (`timestamptz`, epoch, ISO 8601 with `Z` or an offset).
- A local date-time in a named zone: a wall-clock time that must stay fixed for people in a place (a 9:00 meeting in Berlin, a store opening hour). Store the local date-time plus the IANA zone name (`Europe/Berlin`), never just an offset, because offsets change with daylight saving and with law.
- A local date with no time: birthdays, due dates, holidays. Store as a date; converting it through midnight UTC shifts it by a day for half the world.
- A duration or period: "24 hours" and "1 day" differ across a DST change.

Classic traps: JavaScript parses `"2024-03-10"` as UTC midnight but `"2024-03-10T00:00"` as local time, and its months are zero-based; Java and ICU format `YYYY` as week-based year (2024-12-30 prints as 2025) where `yyyy` or `uuuu` was meant; Postgres `timestamp` drops the zone while `timestamptz` normalises to UTC; MySQL `DATETIME` and `TIMESTAMP` behave differently; code depends on the server's default zone; ranges end at `23:59:59` and miss the last second, where a half-open `[start, next_start)` range does not; local times that do not exist (spring-forward gap) or happen twice (fall-back overlap); tests that read the real clock or the machine's zone.
</context>

<task>
Fix this date and time bug.

Code:
{{code}}

Symptom:
{{symptom}}

{{#language}}Language and libraries: {{language}}{{/language}}

1. If you cannot tell the user's zone, the server's zone or the storage type and it changes the answer, ask for it and stop.
2. Walk the value through every hop (input, parse, store, load, convert, format) and find the first hop where it becomes wrong. Show the value at each hop for the symptom's example.
3. Say which of the four kinds of time each value is meant to be, and where the code treats it as a different kind.
4. Fix it at that hop using the language's modern time API (for example `java.time`, `zoneinfo` with aware datetimes, `Temporal` or a maintained library in JavaScript, `NodaTime`, `chrono-tz`), with the zone and clock passed in explicitly so the code is testable.
5. Write tests that pin the clock and the zone and cover: the symptom's example; a spring-forward gap and a fall-back overlap in a zone that observes DST (for example `America/New_York` on 2024-03-10 and 2024-11-03); a zone with a non-hour offset (`Asia/Kolkata`); 29 February; and the year boundary for week-based years.
6. If wrong values were already stored, say whether they can be repaired, how to find them, and how to migrate them safely.
</task>

<constraints>
- Do not "fix" it by adding or subtracting a fixed number of hours, or by changing the server's time zone.
- "Store everything in UTC" is right for instants and wrong for future local events and date-only values; apply it only where it fits.
- Do not hand-roll time zone or DST arithmetic; use the time zone database through the library.
{{> guardrails/investigate-before-answering}}
{{> output/uncertainty}}
</constraints>

<output_format>
## Root cause
The hop where it breaks and why, in two to four sentences, then a table: Hop | Value for the example.
## What each value should be
Table: Value | Kind of time | Type and storage.
## Fix
A diff.
## Tests
The test code.
## Existing data
Whether stored data is wrong, a query to find affected rows, and a migration, or "Not affected".
</output_format>
