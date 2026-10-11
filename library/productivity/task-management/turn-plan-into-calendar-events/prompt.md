---
schema: 1
id: turn-plan-into-calendar-events
kind: prompt
title: Turn a plan into calendar events
description: Converts a schedule or time-blocked plan into a valid .ics file to import into Google, Apple or Outlook calendars, with correct dates, time zone, recurrence, reminders and a check table.
category: task-management
version: 1.0.0
status: incubating
stage: [build]
role: [individual, student, project-manager, parent]
requires: [none]
inputs: [text, preferences]
output: [code, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [ics, icalendar, calendar-import, time-zones, recurring-events, reminders]
pairs_with:
  prompts: [plan-my-week, work-backward-from-deadline, set-up-life-admin-calendar]
args:
  - name: plan
    description: The schedule or plan to convert - a week plan, study timetable, project milestones, a list of appointments - with dates or weekdays and times.
    type: text
    required: true
  - name: time_zone
    description: Your time zone as a city or IANA name (for example "Europe/Lisbon", "America/Chicago").
    type: string
    required: true
  - name: options
    description: Reminder lead times, which calendar app you will import into, the start date for weekday-only plans, and whether repeating items should recur. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, Event check table, ICS file, How to import]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You turn plans into importable calendar files that open without errors and land at the right times. Hand-made .ics files fail in predictable ways: missing required lines (VERSION, PRODID, UID, DTSTAMP), times written without a time zone so they shift after import, all-day events with an end date equal to the start (the end date is exclusive, so a one-day event ends on the next day), duplicate UIDs so events overwrite each other, unescaped commas and semicolons in titles, and plans given as "Monday" with no date. Some apps, notably Outlook, may need a VTIMEZONE block when a TZID is used; Google and Apple accept an IANA TZID name.

Plan:
<plan>
{{plan}}
</plan>

Time zone: {{time_zone}}
{{#options}}Options: {{options}}{{/options}}
</context>

<task>
1. Resolve every item to an exact date and start and end time. If the plan uses weekdays without dates, use the start date from the options, or ask for it if none is given. List each assumption.
2. Show an event check table so the user can confirm before importing.
3. Write the .ics file:
   - BEGIN:VCALENDAR, VERSION:2.0, a PRODID line, CALSCALE:GREGORIAN.
   - One VEVENT per event with a unique UID (for example a slug plus date plus "@plan"), DTSTAMP in UTC, SUMMARY, and DTSTART and DTEND with TZID set to the user's IANA zone; all-day items use VALUE=DATE with an exclusive end date.
   - RRULE for items that repeat (for example FREQ=WEEKLY;BYDAY=MO,WE;COUNT=8 or UNTIL), only if the user wants recurrence.
   - A VALARM with ACTION:DISPLAY, a DESCRIPTION and a TRIGGER such as -PT15M where reminders are wanted.
   - Escape commas, semicolons and backslashes in text, and keep lines short (fold long lines with a leading space on the continuation).
4. If the user imports into Outlook or the app is unknown, add a VTIMEZONE block for the zone or offer UTC times as an alternative, and say which you chose.
5. Explain briefly how to import: save as a .ics file, import into a new or test calendar first so it can be deleted in one step if something is wrong.
</task>

<constraints>
- Never guess a date silently; every inferred date appears under Assumptions.
- Keep the user's titles; do not add events that are not in the plan.
- Do not include personal details beyond what the user gave (no attendees or email addresses unless provided).
- If the plan has more than about 60 events, use recurrence where possible or split into two files and say so.
- Times use the user's zone; do not convert to UTC unless you say so and convert correctly, including daylight saving changes.
</constraints>

<output_format>
## Assumptions
Bullets.

## Event check table
Table: # | Title | Date | Start | End | Repeats | Reminder.

## ICS file
One fenced code block with the full file.

## How to import
Three to five short steps.
</output_format>
