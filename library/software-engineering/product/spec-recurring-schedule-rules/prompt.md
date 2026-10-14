---
schema: 1
id: spec-recurring-schedule-rules
kind: prompt
title: Specify recurring schedule rules
description: Specifies recurring events, bookings or reminders with repeat patterns, time zone ownership, daylight saving, month-end dates, edits to one or all future occurrences and end conditions.
category: product
version: 1.0.0
status: incubating
stage: [plan, design]
role: [product-manager, business-analyst, backend-engineer, qa-engineer]
stack: []
requires: [none]
inputs: [spec, ticket, text]
output: [docs, table, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [recurrence, time-zones, daylight-saving, scheduling, requirements]
pairs_with:
  prompts: [list-feature-edge-cases, write-acceptance-criteria, spec-calculation-rules]
args:
  - name: feature_description
    description: What repeats (meetings, classes, invoices, reminders, shifts) and the repeat options users need.
    type: text
    required: true
  - name: context
    description: Where users and the things being scheduled are located, calendar integrations, and any current behaviour.
    type: text
output_contract:
  format: markdown
  sections: [Recurrence patterns, Time and time zones, Editing and exceptions, Ending and limits, Worked examples, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Recurring schedules break at the seams of the calendar. "Monthly on the 31st" has no answer in February unless someone decides one; a 9:00 weekly meeting must stay at 9:00 local time across a daylight saving change, which means it is not every 168 hours; a 1:30 reminder may not exist or may happen twice on the transition night; and an attendee in another time zone sees the meeting shift by an hour for a few weeks a year. The decisions experienced teams make up front are: which time zone owns each series (the organiser's, the venue's, or the user's), whether to store the rule and generate occurrences or store each occurrence, what "edit this and following" does to past history and to exceptions already made, and how far ahead occurrences are generated. Calendar standards such as iCalendar recurrence rules are a good reference model when the product syncs with external calendars.
</context>

<task>
<feature>
{{feature_description}}
</feature>
{{#context}}
<context_from_user>
{{context}}
</context_from_user>
{{/context}}

1. List the recurrence patterns offered (daily, weekdays, weekly on chosen days, every N weeks, monthly by date, monthly by weekday such as "second Tuesday", "last day of month", yearly) and drop those the feature does not need.
2. Specify time and time zones: which time zone owns a series, how it is shown to others, behaviour at daylight saving transitions (skipped and repeated hours), all-day items, and what happens when the owner moves time zone.
3. Specify editing and exceptions: edit one occurrence, this and following, or all; cancel one occurrence; move one occurrence; how edits interact with earlier exceptions, past occurrences, attendance or payments already recorded.
4. Specify ending and limits: end after N times, end by date, never; how far ahead occurrences are created or shown; maximum series length; what happens when the creator leaves or loses access.
5. Give worked examples with exact dates and times for: a 31st-of-month rule across February and a 30-day month, a weekly item across a daylight saving change in two time zones, and an "edit this and following" on a series with an earlier exception.
6. List open questions with a recommended default marked as a proposal.
</task>

<constraints>
- Never describe daylight saving dates for a region as fixed facts; say they are rule-based and vary by country and year, and use the time zone database as the source.
- Every worked example must use real calendar arithmetic; check weekday names against the dates.
- Do not prescribe a storage design; describe required behaviour and note the trade-off only where it changes what users see.
- If the feature has a single time zone and simple patterns, keep the spec short instead of padding it.
</constraints>

<output_format>
## Recurrence patterns
Table: pattern, offered (yes/no), rule for impossible dates.
## Time and time zones
Numbered rules.
## Editing and exceptions
Table: action, effect on past occurrences, effect on future occurrences, effect on existing exceptions.
## Ending and limits
Bullets.
## Worked examples
Table: example, rule, expected occurrences with dates and local times.
## Open questions
Numbered: question, recommended default (proposal).
</output_format>
