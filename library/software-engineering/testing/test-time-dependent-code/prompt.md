---
schema: 1
id: test-time-dependent-code
kind: prompt
title: Test time-dependent code
description: Makes code that depends on the current time, timers, time zones or daylight saving testable with an injected clock or fake timers, then writes tests for expiry, scheduling and calendar edge dates.
category: testing
version: 1.0.0
status: incubating
stage: [build, verify]
role: [software-engineer, backend-engineer, qa-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [file, repo]
output: [tests, diff]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [fake-clock, fake-timers, time-zones, daylight-saving, deterministic-tests]
pairs_with:
  prompts: [fix-date-time-bug, decouple-for-testability, fix-flaky-test]
  personas: [test-engineer]
args:
  - name: target
    description: The function, class or module whose behaviour depends on time (expiry, scheduling, rate limits, reminders, billing periods, "today" logic), as a path or pasted code.
    type: text
    required: true
  - name: test_framework
    description: The test framework and language if not obvious from the code, for example "Jest with TypeScript", "pytest", "JUnit 5", "Go testing".
    type: string
output_contract:
  format: markdown
  sections: [Time dependencies found, Seam, Tests, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a test engineer who knows that a test reading the real clock passes today and fails at midnight, at month end, on 29 February, on a daylight saving change, or on a CI runner in another time zone. Time enters code in more places than `now()`: `Date.now()` and `new Date()`, `datetime.now()` and `date.today()`, `System.currentTimeMillis()` and `Instant.now()`, `time.Now()`, timers (`setTimeout`, `setInterval`, `sleep`, scheduled executors), database `NOW()` defaults, and the process time zone (`TZ`) used by default formatting.

Two tools fix this: an injected clock (a `Clock` parameter or dependency, `java.time.Clock`, a `now` function argument) for the code's reads of the current time, and fake timers (Jest or Vitest fake timers, Sinon, `freezegun` or `time-machine` in Python, a fake clock interface in Go) for code that waits. An injected clock is usually cleaner; patching global time is the fallback for code you cannot change yet. Tests should set the time zone explicitly so they behave the same on every machine.
</context>

<task>
Make {{target}} testable with respect to time and write the tests{{#test_framework}} using {{test_framework}}{{/test_framework}}.

1. Read the code and list every place it reads the current time, waits, schedules, formats or parses a date, or relies on the process time zone.
2. Choose the seam: inject a clock or a `now` function where the code can change with low risk, keeping the default to the real clock so callers do not change; use fake timers for waits and intervals; set the test time zone explicitly. Show the small production change as a diff.
3. Write behaviour tests with fixed instants for: just before, exactly at and just after each boundary (expiry, cutoff, window end); end of day, month and year; 29 February; a daylight saving forward and backward transition in a zone that has them, for example Europe/Berlin or America/New_York; a user time zone different from the server's; and, for timers, advancing time to each firing without real waiting.
4. Run the tests, including once with a different `TZ` value for the process, and report results.
5. List any remaining time dependency you could not cover and why.
</task>

<constraints>
- No real sleeps or waits in tests, and no assertions on "close to now" with a tolerance when a fixed clock can give an exact value.
- Keep the production change minimal and behaviour-preserving; do not refactor unrelated code.
- Restore real timers and the clock after each test so other tests are not affected.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Time dependencies found
Table: location, kind (clock read, timer, formatting, time zone, database), how it will be controlled.
## Seam
The production diff.
## Tests
The test code.
## Check
Commands run, including the run with a different TZ, and results.
</output_format>
