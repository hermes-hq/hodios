---
schema: 1
id: set-up-calendar-system
kind: prompt
title: Set up a calendar system
description: Designs how you use your calendar - which calendars to keep, colours, what goes on it and what does not, buffers, recurring holds, reminders and sharing - so it shows the truth about your time.
category: task-management
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, manager, parent, founder]
requires: [none]
inputs: [text, preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [calendar, calendar-hygiene, colour-coding, buffers, time-blocking, shared-calendars]
pairs_with:
  prompts: [set-up-task-system, protect-deep-work-blocks, set-up-life-admin-calendar]
args:
  - name: life
    description: What your weeks hold - work, family, study, side work - and who else needs to see or book into your time.
    type: text
    required: true
  - name: problems
    description: What goes wrong now (double bookings, forgotten appointments, no time to work, partner never knows the plan).
    type: text
    required: true
  - name: tools
    description: Which calendar apps you use for work and personal life, and whether they can be connected. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Calendar setup, What goes on the calendar, Colours, Buffers and holds, Reminders and sharing, Weekly calendar check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design a calendar setup that people can trust. Calendars fail in familiar ways: work and personal lives live in separate apps so double bookings happen; the calendar is full of tasks that are not appointments, so real commitments drown; meetings sit back to back with no travel or prep time; there is no time held for actual work, so colleagues fill it; and family members cannot see what is planned. The rules that fix most of this: the calendar holds only things that happen at a specific time (appointments, meetings, and deliberate blocks for work) while tasks stay on a task list; one view combines all calendars; a few colour categories mean something; buffers and recurring holds are added by default; and sharing shows other people what they need, including free/busy only where privacy matters.

Your weeks:
<life>
{{life}}
</life>

Problems now:
<problems>
{{problems}}
</problems>
{{#tools}}Tools: {{tools}}{{/tools}}
</context>

<task>
1. Propose the set of calendars (for example work, personal, family shared, focus blocks) and how they combine into one view; if work rules prevent connecting accounts, use a busy-only mirror or manual "busy" holds and say so.
2. Write the rules for what goes on the calendar and what stays on a task list.
3. Give a colour scheme of no more than five or six categories with meaning.
4. Set default buffers (before and after meetings, travel time), recurring holds (focus blocks, admin, lunch, school runs, exercise) and a latest-meeting time.
5. Set reminder defaults by event type, and sharing rules: who sees full details, who sees free/busy only.
6. Give a ten-minute weekly calendar check, and a one-time clean-up list to apply the system.
</task>

<constraints>
- Describe settings in general terms and tell the user to find them in their app; do not invent menu paths or features.
- Respect workplace rules about syncing work calendars to personal accounts; say to check company policy before connecting them.
- Do not put every task on the calendar; keep blocks for work deliberate and limited.
- Keep the system simple enough to maintain: say what to skip if the user is not detail-minded.
</constraints>

<output_format>
## Calendar setup
Table: Calendar | Holds | Who sees it.

## What goes on the calendar
Two short lists: on the calendar, on the task list.

## Colours
Table: Colour | Meaning.

## Buffers and holds
Bullets with defaults.

## Reminders and sharing
Bullets.

## Weekly calendar check
Checklist, then the one-time clean-up list.
</output_format>
