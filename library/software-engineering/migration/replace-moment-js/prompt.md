---
schema: 1
id: replace-moment-js
kind: prompt
title: Replace Moment.js
description: Replaces Moment.js with date-fns, Day.js, Luxon or Temporal, mapping format tokens, mutability, time zones, parsing and locale loading, with tests around date edge cases.
category: migration
version: 1.0.0
status: incubating
stage: [maintain]
role: [frontend-engineer, backend-engineer, fullstack-engineer]
stack: [javascript]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [diff, report]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [moment-js, date-handling, time-zones, bundle-size]
pairs_with:
  prompts: [fix-date-time-bug, upgrade-major-dependency]
args:
  - name: target_library
    description: The library to move to, or leave the default to get a recommendation first.
    type: string
    default: "recommend one"
  - name: notes
    description: Where dates matter most (billing, scheduling, display), time zone needs, locales, runtime (browser, Node.js) and supported environments.
    type: text
output_contract:
  format: markdown
  sections: [Inventory, Choice, Mapping, Changes made, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Moment.js is in maintenance mode and large, but replacing it is risky because date bugs are silent. The traps: Moment objects are mutable (`m.add(1, 'day')` changes `m`), so code that relied on or was protected from that changes meaning with immutable libraries; format tokens differ (Moment's `YYYY` and `DD` are date-fns `yyyy` and `dd`, and date-fns `YYYY` is the week-numbering year, a classic end-of-December bug); `moment(string)` parses loosely while date-fns and Luxon require a format or ISO input; `moment-timezone` behaviour needs Luxon, the `Intl` API, date-fns-tz or Temporal, and Day.js needs plugins for time zones, UTC, relative time and custom parsing; `diff` rounding, month overflow (January 31 plus one month), start of week per locale, and DST transitions all differ between libraries. Locales in Moment are loaded globally while others import them per call or rely on `Intl`. Temporal is the long-term native answer, but availability depends on the runtimes you support, so a polyfill or a library is still often needed.
</context>

<task>
Replace Moment.js with {{target_library}}.
{{#notes}}
Notes:
{{notes}}
{{/notes}}

1. Inventory every import of `moment` and `moment-timezone` and group the uses: parsing (with and without formats), formatting (list every format string), arithmetic, comparisons and `diff`, start and end of periods, time zone conversion, relative time, locale use, and places where Moment objects cross API boundaries or are stored.
2. Find code that depends on mutability: Moment objects modified after being passed or stored.
3. If no target was given, recommend one from the needs found (bundle size, time zone support, immutability, runtime support for Temporal), with one paragraph of trade-offs, and confirm before continuing.
4. Write a mapping table from each Moment pattern in this codebase to the target, including every format string translated token by token.
5. Before changing code, add or extend tests around the riskiest uses: end-of-month arithmetic, the last days of December and the first days of January formatting, DST transitions in the time zones used, parsing of the real input formats, and locale output.
6. Replace module by module behind a small date utility module if the codebase does not already have one, so the library is used in one place.
7. Remove `moment` from dependencies only when no imports remain, including in tests and scripts.
8. Run the tests in at least two time zones (for example by setting the `TZ` environment variable for the test run) and compare outputs before and after.
</task>

<constraints>
- Do not translate format strings by guessing; check each token against the target library's documentation.
- Do not change what users see (formats, time zone of display) unless asked.
- Keep stored or transmitted date formats exactly the same.
{{> guardrails/no-hardcoding-to-pass-tests}}
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Inventory
Use counts by group, format strings found, mutability hotspots.
## Choice
Library chosen and why, or the recommendation awaiting confirmation.
## Mapping
Table: Moment pattern, replacement, behaviour difference to watch.
## Changes made
Files changed, utility module, tests added.
## Verification
Test results in each time zone, edge cases covered, bundle size change.
</output_format>
