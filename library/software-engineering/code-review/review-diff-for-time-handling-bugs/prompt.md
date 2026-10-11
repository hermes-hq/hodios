---
schema: 1
id: review-diff-for-time-handling-bugs
kind: prompt
title: Review a diff for date and time bugs
description: Reviews a change that touches dates, times, durations or schedules for time zone, daylight saving, calendar, parsing, storage and clock bugs, naming the exact date that breaks each one.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [software-engineer, backend-engineer, frontend-engineer]
requires: [none]
inputs: [diff, file]
output: [report, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [time-zones, daylight-saving, date-handling, scheduling, pull-request]
pairs_with:
  personas: [code-reviewer]
  prompts: [fix-date-time-bug, review-pull-request]
args:
  - name: diff
    description: The change, with file paths and the surrounding code that creates or consumes the dates.
    type: text
    required: true
  - name: context
    description: Where users and servers are, how dates are stored (database column types), and the business rules, for example "a subscription renews on the same calendar day each month in the customer's zone".
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Findings, Test dates, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Date and time code passes tests written on a weekday in the developer's own time zone and fails on the last day of the month, the night clocks change, or for a user in another zone. Reviewers can catch these by asking which kind of time each value is: an instant (a moment on the global timeline, stored in UTC), a local date or time with a zone (a meeting at 09:00 Lisbon time, which must stay at 09:00 even if offset rules change), or a floating date (a birthday, with no zone at all). Common bugs: storing a local time without its zone, using the server's default zone, adding 24 hours instead of one calendar day across a daylight saving change, adding a month to 31 January, comparing dates as strings in non-ISO formats, end-of-day filters that miss events at 23:59:59.5, using wall-clock time for measuring durations, and a fixed offset (+01:00) saved where a zone id (Europe/Paris) is needed.
</context>

<task>
<diff>
{{diff}}
</diff>

{{#context}}
<context_given>
{{context}}
</context_given>
{{/context}}

1. List every date or time value the change creates, parses, stores, compares, formats or does arithmetic on, and classify it: instant, zoned local date-time, local date, duration or period.
2. Check each for:
   - **Zones:** implicit server or browser default zone, fixed offsets stored instead of zone ids, zone lost in serialisation or a database column type that drops it, conversion done twice or not at all.
   - **Daylight saving:** times that do not exist (spring forward gap) or happen twice (fall back overlap), 24-hour addition versus calendar-day addition, schedules that drift by an hour.
   - **Calendar arithmetic:** end of month, leap years and 29 February, week numbering and first day of week, ranges with inclusive or exclusive ends.
   - **Parsing and formatting:** ambiguous formats (03/04), two-digit years, locale-dependent parsing, string comparison of dates, milliseconds versus seconds since epoch.
   - **Clocks:** wall clock used for durations or timeouts instead of a monotonic clock, tests that depend on the current time without an injectable clock.
3. For each finding, give the specific date, time and zone that triggers it and the wrong versus expected result.
4. Rate: high (wrong charges, missed or duplicated scheduled actions, data stored wrongly), medium (display errors), low.
5. List the test dates that should be added as fixtures.
</task>

<constraints>
- Every finding includes a concrete triggering date and zone; no generic "consider time zones".
- Use the date library already in the code for fixes; do not switch libraries.
- Do not assume the business rule for calendar ambiguities (what is one month after 31 January); ask.
- At most 8 findings.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: approve | approve-with-nits | request-changes.
## Findings
Numbered: severity, `path:line`, value type, problem, triggering date and zone, wrong versus expected, fix.
## Test dates
Bullets of fixture dates and zones with why each matters.
## Questions
Business rules to confirm.
</output_format>
