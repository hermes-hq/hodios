---
schema: 1
id: build-gantt-chart-in-sheets
kind: prompt
title: Build a Gantt chart in a spreadsheet
description: Builds a Gantt timeline in Excel or Google Sheets with task, start and duration columns, dependency formulas, conditional-format bars and a today marker. Use to plan a project without a PM tool.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [plan, build]
role: [project-manager, operations-manager, founder, individual]
stack: [excel, google-sheets]
inputs: [text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
level: beginner
tags: [gantt, project-timeline, workdays, conditional-formatting, dependencies]
pairs_with:
  prompts: [write-conditional-formatting-rules, calculate-dates-and-workdays, build-tracker-spreadsheet]
args:
  - name: tasks
    description: The tasks, each with a start date or the task it waits for, a duration (or end date), and optionally an owner and percent complete. Mention the project start date, holidays and whether weekends count.
    type: text
    required: true
  - name: app
    description: Spreadsheet application to build it in.
    type: enum
    enum: [excel, google-sheets]
    default: google-sheets
  - name: granularity
    description: Width of each timeline column. Use day for projects up to about three months, week for longer ones.
    type: enum
    enum: [day, week]
    default: week
output_contract:
  format: markdown
  sections: [Task table, Columns and formulas, Timeline grid, Bar and today rules, Checks, Using it]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a project planner who builds Gantt charts in plain spreadsheets for teams that do not have, or do not want, a project tool. A spreadsheet Gantt is only useful if moving one date moves everything that depends on it, so every date after the first is a formula, and the bars are drawn by conditional formatting from those dates, never coloured by hand.
</context>

<task>
Build a Gantt chart in {{app}} with one timeline column per {{granularity}} for these tasks.

<tasks>
{{tasks}}
</tasks>

1. Turn the tasks into a table. If a task has neither a start date nor a predecessor, or no duration or end date, list those gaps and ask for them in one short question; build the rest with the gap marked `[?]`. Do not invent dates.
2. Columns, left of the timeline: ID, Task, Owner, Depends on (one predecessor ID), Start, Duration (working days), End, % complete. Give a formula for each computed column:
   - Start: the typed date for tasks without a predecessor; for dependent tasks, the next working day after the predecessor's End, using `WORKDAY(End of predecessor, 1, Holidays)` looked up by ID with `XLOOKUP` (or `INDEX`/`MATCH` for older Excel).
   - End: `WORKDAY(Start, Duration - 1, Holidays)`, so a one-day task starts and ends on the same day. If weekends count as working time, use `Start + Duration - 1` and say so.
   - Milestones: duration 0, shown as a single marked cell.
3. Holidays: a named range `Holidays` on a Settings sheet, used by every `WORKDAY` call. If no holidays were given, leave it empty and say so.
4. Timeline header: the first column holds the project start, rounded down to a Monday for weekly columns (`Start - WEEKDAY(Start, 2) + 1`); each next header cell adds 1 day or 7 days to the one before. Generate enough columns to cover the latest End plus a buffer. Show dates in a short format (for example `d mmm`).
5. Bars, as conditional formatting over the whole grid, written for its top-left cell with the date row locked and the task columns locked:
   - Day columns: the header date falls between the task's Start and End.
   - Week columns: the week overlaps the task, meaning the week start is on or before End and the week start plus 6 is on or after Start.
   - Progress: a darker shade where the header date is on or before Start plus Duration times % complete.
   - Weekend shading for day columns (`WEEKDAY(header, 2) > 5`).
6. Today marker: a rule that highlights the column containing today (the header equals `TODAY()` for days, or today falls in that week), placed above the bar rules so it stays visible, plus a thin border on that column if the app allows.
7. Add checks: End before Start, a predecessor ID that does not exist, and tasks ending after a deadline if one was given.
</task>

<constraints>
- Every date except the project start and tasks with fixed starts is a formula. Never ask the user to colour cells by hand.
- Use only functions available in {{app}}; mention when something needs Microsoft 365 or Excel 2021 or later and give the fallback.
- Keep one predecessor per task. If the user's plan has several predecessors per task, use the latest End among them with `MAXIFS` or `MAX` over a lookup and explain it.
- Use comma separators and note once that some locales use semicolons.
- Mention the built-in alternative in one line: Google Sheets has a Timeline view, and Excel can draw a stacked bar chart Gantt. Recommend the grid when people need to edit dates in place.
</constraints>

<output_format>
## Task table
The filled table for these tasks with the computed Start and End shown, so the user can check the logic.

## Columns and formulas
Table: Column | Formula for row 2 | Notes.

## Timeline grid
Where the grid starts, the header formulas and the number format.

## Bar and today rules
Table: Order | Applies to | Custom formula | Format, then menu steps for {{app}}.

## Checks
The check formulas and what each catches.

## Using it
Three to five bullets: adding a task, shifting a date, marking progress, printing or sharing.
</output_format>
